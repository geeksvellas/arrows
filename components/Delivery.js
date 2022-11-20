import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  StatusBar,
  View,
  TextInput,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  LogBox,
  Text,
  FlatList,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/Ionicons';
import DropDownPicker from 'react-native-dropdown-picker';
import DatePicker from 'react-native-datepicker';
import SideMenu from './SideMenu';
import Dialog from './Dialog';
import {firebase} from '@react-native-firebase/functions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getUser} from './functions/helper';
import auth from '@react-native-firebase/auth';
import ListDialog from './ListDialog';

export default function Delivery({navigation}) {
  const [inValidText, setinValidText] = useState('');
  const [visibleModal, setvisibleModal] = useState(false);
  const [DriverList, setDriverList] = useState([]);
  const [alertVisible, setalertVisible] = useState(false);
  const oUser = getUser();
  const [alertType, setalertType] = useState('');
  const [totRecords, settotRecords] = useState(0);
  const [selected, setselected] = useState(null);
  const [loading, setloading] = useState(false);
  const [tableData, settableData] = useState([]);
  const [temptableData, settemptableData] = useState([]);
  const [showHeader, setshowHeader] = useState(true);
  const [iconName, seticonName] = useState('chevron-up');
  const [tableHeader, settableHeader] = useState([
    'Invoice Number',
    'Address',
    'Status',
  ]);
  const [selectedDriver, setselectedDriver] = useState(null);

  const toggleHeader = () => {
    var curr = showHeader;
    var iconName = curr ? 'chevron-down' : 'chevron-up';
    setshowHeader(!curr);
    seticonName(iconName);
  };
  const searchFilterFunction = text => {
    setloading(true);
    var newData;
    if (text && temptableData) {
      newData = temptableData.filter(item => {
        const itemData = `${item['INV_NO'].toUpperCase()}`;
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
    } else {
      newData = temptableData;
    }
    settableData(newData);
    settotRecords(newData.length);
    setloading(false);
  };
  useEffect(() => {
    setloading(true);
    console.log(oUser, 'user');
    if (oUser.ACCESS_RIGHT == 3) {
      auth()
        .currentUser.getIdToken(true)
        .then(async function (idToken) {
          var uid = oUser.CID;
          firebase
            .app()
            .functions('asia-southeast1')
            .httpsCallable('getInvoiceData?token=' + idToken)({
              id: uid,
              token: '469f09e1-d33f-469f-90c6-1d96567a24cd',
            })
            .then(response => {
              // console.log(response, 'success');
              setloading(false);

              var body = JSON.parse(response.data.body);
              settableData(body);
              settemptableData(body);
              settotRecords(body.length);
            })
            .catch(error => {
              setloading(false);

              console.log(error, 'Function error');
            });
        })
        .catch(error => {
          console.log(error, 'File upload');
        });
    } else {
      auth()
        .currentUser.getIdToken(true)
        .then(async function (idToken) {
          firebase
            .app()
            .functions('asia-southeast1')
            .httpsCallable('getDriverList?token=' + idToken)({
              token: 'f896819f-0a48-46ce-a504-078cb918c23f',
            })
            .then(response => {
              // console.log(response, 'success');
              setloading(false);

              var body = JSON.parse(response.data.body);
              console.log(body);

              setDriverList(body);
            })
            .catch(error => {
              setloading(false);

              console.log(error, 'Function error');
            });
        })
        .catch(error => {
          setloading(false);
          console.log(error, 'Auth error');
        });
    }
  }, []);
  const onStatus = item => {
    // alert('ssfs');
    if (item.status !== 'Time In') {
      var stateText = '';
      switch (item.status) {
        case 'Time Out':
          stateText = 'timeout';
          break;
        case 'Sign':
          stateText = 'sign';
          break;
        case 'Signed':
          stateText = 'signed';
          break;
        default:
          stateText = 'timeout';
          break;
      }
      console.log(stateText);
      setalertVisible(true);
      setalertType(stateText);
      setselected(item);
      console.log(item);
    }
  };
  const stateIndicator = state => {
    var stateColor = '';
    switch (state) {
      case 'Time Out':
        stateColor = 'red';
        break;
      case 'Sign':
        stateColor = 'orange';
        break;
      case 'Signed':
        stateColor = 'blue';
        break;
      case 'Time In':
        stateColor = 'green';
        break;
      default:
        stateColor = 'red';
        break;
    }
    return stateColor;
  };
  const onDialogAccept = async (state, imagebase64) => {
    // alert(state);
    // console.log(imagebase64.split(',')[1]);
    if (imagebase64) {
      var user = await AsyncStorage.getItem('username');
      setloading(true);
      setalertVisible(false);
      auth()
        .currentUser.getIdToken(true)
        .then(function (idToken) {
          firebase
            .app()
            .functions('asia-southeast1')
            .httpsCallable('setDeliveryConfirm?token=' + idToken)({
              TOKEN: '92dh23sd-d33f-469f-90c6-1d96567a24cd',
              INVUID: selected.UID,
              SIGNATURE: imagebase64.split(',')[1],
              UPDATEDBY: user,
            })
            .then(response => {
              console.log(response, 'update Success');
              if (response.data.body && JSON.parse(response.data.body)) {
                Alert.alert('Successfully updated');
                var currData = tableData.map(obj => {
                  if (obj.UID === selected.UID) {
                    return {...obj, status: state};
                  }

                  return obj;
                });

                settableData(currData);
                setloading(false);
              } else {
                Alert.alert('Failed to update');
                setloading(false);
              }
            })
            .catch(error => {
              Alert.alert('Failed to update:');

              setloading(false);
              console.log(error);
            });
        })
        .catch(error => {
          setloading(false);
          Alert.alert('Failed to update');
          console.log(error, 'File upload');
        });
    }
  };
  const onDialogReject = () => {
    setalertVisible(false);
  };

  const onChangeDriver = item => {
    console.log(item);
    setvisibleModal(false);
    setselectedDriver(item[0]);
    setloading(true);
    auth()
      .currentUser.getIdToken(true)
      .then(async function (idToken) {
        firebase
          .app()
          .functions('asia-southeast1')
          .httpsCallable('getInvoiceData?token=' + idToken)({
            id: item[1],
            token: '469f09e1-d33f-469f-90c6-1d96567a24cd',
          })
          .then(response => {
            // console.log(response, 'success');
            setloading(false);

            var body = JSON.parse(response.data.body);
            settableData(body);
            settemptableData(body);
            settotRecords(body.length);
          })
          .catch(error => {
            setloading(false);

            console.log(error, 'Function error');
          });
      })
      .catch(error => {
        console.log(error, 'File upload');
      });
  };
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <StatusBar backgroundColor="#002e71" />
      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator animating={true} size="large" color="red" />
        </View>
      ) : null}
      <View
        style={{
          backgroundColor: '#002e71',
          height: 30,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <Image
          source={require('../assets/logo2.png')}
          style={{width: '10%'}}
          resizeMode="contain"
        />
      </View>
      <View style={{flexDirection: 'row', flex: 1}}>
        <View style={{backgroundColor: '#396698', width: '10%'}}>
          <SideMenu navigation={navigation} />
        </View>
        <View style={{flex: 1}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: 20,
              display: showHeader ? 'flex' : 'none',
            }}>
            {/* <TouchableOpacity
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingVertical: 5,
                }}>
                <Icon
                  name="barcode-scan"
                  color="black"
                  style={{
                    padding: 5,
                  }}
                  size={50}
                />
              </TouchableOpacity> */}
            <TextInput
              placeholder="Invoice No."
              placeholderTextColor="black"
              style={styles.input}
              onChangeText={searchFilterFunction}
            />
            {oUser.ACCESS_RIGHT != 3 && (
              <TouchableOpacity
                onPress={() => {
                  // setTimeout(setvisibleModal(true), 300);
                  setTimeout(() => {
                    setvisibleModal(true);
                  }, 300);
                }}
                style={{
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                  borderBottomLeftRadius: 10,
                  borderBottomRightRadius: 10,
                  borderTopWidth: 1,
                  borderBottomWidth: 1,
                  borderLeftWidth: 1,
                  borderRightWidth: 1,
                  borderColor: '#002e71',
                  padding: 10,
                  marginLeft: 10,
                  width: 150,
                }}>
                <Text style={{color: 'black'}}>
                  {selectedDriver ? selectedDriver : 'Select Driver'}
                </Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{flex: 1}}>Total records: {totRecords}</Text>
            <View
              style={{
                alignItems: 'center',
                flex: 1,
              }}>
              <TouchableOpacity
                style={{width: '100%', alignItems: 'center'}}
                onPress={toggleHeader}>
                <Icons name={iconName} color="black" size={20} />
              </TouchableOpacity>
            </View>
            <View style={{flex: 1}}></View>
          </View>
          <View
            style={{
              flex: 1,
            }}>
            <View style={styles.listWrapperHeader}>
              {tableHeader.map((value, index) => {
                return (
                  <Text key={index} style={[styles.row, styles.colorWhite]}>
                    {value}
                  </Text>
                );
              })}
            </View>
            {tableData.length > 0 && (
              <FlatList
                data={tableData}
                keyExtractor={(item, index) => item.UID}
                renderItem={itemData => (
                  <View style={styles.listWrapper}>
                    <Text style={[styles.row, styles.colorBlue]}>
                      {itemData.item.INV_NO}
                    </Text>
                    <Text style={[styles.row, styles.colorBlue]}>
                      {itemData.item.ADDRESS2}
                    </Text>
                    <TouchableOpacity
                      style={styles.row}
                      onPress={() => onStatus(itemData.item)}>
                      <Text
                        style={[
                          styles.status,
                          styles.colorWhite,
                          {
                            backgroundColor: stateIndicator(
                              itemData.item.status,
                            ),
                          },
                        ]}>
                        {itemData.item.status
                          ? itemData.item.status
                          : 'Time Out'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              />
            )}
          </View>
        </View>
        <ListDialog
          type="Driver"
          onSelect={item => onChangeDriver(item)}
          visibleModal={visibleModal}
          list={DriverList}
          onClose={() => setvisibleModal(false)}
        />
        <Dialog
          visibleAlert={alertVisible}
          type={alertType}
          onAccept={onDialogAccept}
          onReject={onDialogReject}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    width: '100%',
  },
  inputText: {
    color: '#002e71',
    fontSize: Dimensions.get('window').width / 30,
    fontFamily: 'sans-serif-condensed',
    fontWeight: '700',
  },
  input: {
    color: 'black',
    marginHorizontal: 20,
    borderColor: '#002e71',
    borderWidth: 1,
    borderRadius: 10,
    fontSize: Dimensions.get('window').width / 50,
    fontFamily: 'sans-serif-condensed',
    width: Dimensions.get('window').width / 2,
    height: 40,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#002e71',
    margin: 10,
    marginHorizontal: 40,
    padding: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listWrapperHeader: {
    backgroundColor: '#002e71',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    borderBottomWidth: 0.5,
    paddingHorizontal: 10,
  },
  listWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    borderBottomWidth: 0.5,
    paddingHorizontal: 10,
  },
  row: {
    flex: 1,
    fontSize: Dimensions.get('window').width / 70,
    fontWeight: 'bold',
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  colorBlue: {
    color: '#002e71',
  },
  colorWhite: {
    color: 'white',
  },
  status: {
    borderRadius: 6,
    padding: 10,
  },
  loading: {
    backgroundColor: 'rgba(1,1,1,0.4)',
    position: 'absolute',
    top: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    justifyContent: 'center',
    zIndex: 999,
  },
});
