import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  StatusBar,
  View,
  TextInput,
  Image,
  Modal,
  FlatList,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  LogBox,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/Ionicons';
import DropDownPicker from 'react-native-dropdown-picker';
import DatePicker from 'react-native-datepicker';
import {DataTable} from 'react-native-paper';
import SideMenu from './SideMenu';
import DetailDialog from './DetailDialog';
import ListDialog from './ListDialog';
import auth from '@react-native-firebase/auth';
import {firebase} from '@react-native-firebase/functions';

export default function Inventory({route, navigation}) {
  const [showHeader, setshowHeader] = useState(true);
  const [selectedItem, setselectedItem] = useState({});
  const [searchVal, setsearchVal] = useState('');
  const [iconName, seticonName] = useState('chevron-up');
  const [inValidText, isetnValidText] = useState('');
  const [loading, setloading] = useState(false);
  const [visibleModal, setvisibleModal] = useState(false);
  const [visibleModalRack, setvisibleModalRack] = useState(false);
  const [selectedWarehouse, setselectedWarehouse] = useState(null);
  const [selectedRack, setselectedRack] = useState(null);
  const [WarehouseList, setWarehouseList] = useState([]);
  const [RackList, setRackList] = useState([]);
  const [organisationModalVisible, setorganisationModalVisible] =
    useState(false);
  const [tableData, settableData] = useState({
    headers: ['Location', 'SKU/Description', 'Ctn No.', 'Pallet No.', 'Qty'],
    data: [],
  });
  const [headerData, setheaderData] = useState({
    warehouse: null,
    racks: null,
    rackList: [],
    rackListIsError: false,
    levels: null,
    levelList: [],
    levelListIsError: false,
    warehouseIsError: false,
    warehouseList: [],
    warehouseName: null,
    rackName: null,
  });
  const [totalWeight, settotalWeight] = useState('0');
  const [totalCtn, settotalCtn] = useState('0');
  const [tempData, settempData] = useState([]);
  useEffect(() => {
    LogBox.ignoreAllLogs(true);
    settempData(tableData.data);
    setloading(true);
    auth()
      .currentUser.getIdToken(true)
      .then(async function (idToken) {
        firebase
          .app()
          .functions('asia-southeast1')
          .httpsCallable('getWarehouseList?token=' + idToken)({
            token: 'b95909e1-d33f-469f-90c6-5a2fb1e5627c',
            wh: '',
          })
          .then(response => {
            // console.log(response, 'success');
            setloading(false);

            var body = JSON.parse(response.data.body);
            var isEven = body.length % 5;
            if (isEven != 0) {
              var count = 5 - isEven;
              for (var i = 0; i < count; i++) {
                body.push({NAME: ''});
              }
            }

            setWarehouseList(body);
          })
          .catch(error => {
            setloading(false);

            console.log(error, 'Function error');
          });
      })
      .catch(error => {
        setloading(false);
        console.log(error, 'Auth Error');
      });
    const {scan} = route.params;
    console.log(scan, 'Scan');
    if (scan) {
      auth()
        .currentUser.getIdToken(true)
        .then(async function (idToken) {
          firebase
            .app()
            .functions('asia-southeast1')
            .httpsCallable('getInventoryByBarcode?token=' + idToken)({
              token: 'aba55c5b-9919-4d08-9809-13d1705f849f',
              racklabel: scan,
            })
            .then(response => {
              // console.log(response, 'success');
              setloading(false);

              var body = JSON.parse(response.data.body);
              var tWeight = 0;
              body.map(val => {
                tWeight += val.AVAILABLE;
              });
              settotalWeight(tWeight);
              settotalCtn(body.length);
              tableData.data = body;
              settableData({...tableData});
            })
            .catch(error => {
              setloading(false);

              console.log(error, 'Function error');
            });
        })
        .catch(error => {
          setloading(false);
          console.log(error, 'Auth Error');
        });
    }
  }, []);

  const toggleHeader = () => {
    var curr = showHeader;
    var iconName = curr ? 'chevron-down' : 'chevron-up';
    setshowHeader(!curr);
    seticonName(iconName);
  };
  const onChangeWarehouse = item => {
    console.log(item);
    setvisibleModal(false);
    setselectedWarehouse(item);
    setselectedRack(null);

    setsearchVal('');
    setloading(true);
    auth()
      .currentUser.getIdToken(true)
      .then(async function (idToken) {
        firebase
          .app()
          .functions('asia-southeast1')
          .httpsCallable('getRackList?token=' + idToken)({
            token: '234200ac-90d5-49a9-8aa8-5c7e90dc85f1',
            wh: item,
          })
          .then(response => {
            // console.log(response, 'success');
            setloading(false);

            var body = JSON.parse(response.data.body);
            var isEven = body.length % 5;
            if (isEven != 0) {
              var count = 5 - isEven;
              for (var i = 0; i < count; i++) {
                body.push({RACK_LABEL: ''});
              }
            }
            setRackList(body);
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
  };

  const onChangeRack = item => {
    console.log(item);
    setvisibleModalRack(false);
    setselectedRack(item);
    setsearchVal('');
    tableData.data = [];
    settableData({...tableData});
    setloading(true);
    auth()
      .currentUser.getIdToken(true)
      .then(async function (idToken) {
        firebase
          .app()
          .functions('asia-southeast1')
          .httpsCallable('getInventoryBySelection?token=' + idToken)({
            token: 'aba55c5b-9919-4d08-9809-13d1705f849f',
            warehouse: headerData.warehouse,
            rack: item,
          })
          .then(response => {
            console.log(response, 'success');
            setloading(false);

            var body = JSON.parse(response.data.body);
            var tWeight = 0;
            body.map(val => {
              tWeight += val.AVAILABLE;
            });
            settotalWeight(tWeight);
            settotalCtn(body.length);
            tableData.data = body;
            settableData({...tableData});
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
  };
  const searchFilterFunction = text => {
    console.log(text);

    setloading(true);
    auth()
      .currentUser.getIdToken(true)
      .then(async function (idToken) {
        firebase
          .app()
          .functions('asia-southeast1')
          .httpsCallable('getInventoryBySearch?token=' + idToken)({
            token: 'aba55c5b-9919-4d08-9809-13d1705f849f',
            search: text.toLowerCase(),
          })
          .then(response => {
            setloading(false);
            setselectedRack(null);
            setselectedWarehouse(null);
            tableData.data = [];
            settableData({...tableData});
            var body = JSON.parse(response.data.body);
            // console.log(body, 'success');
            var tWeight = 0;
            body.map(val => {
              tWeight += val.AVAILABLE;
            });
            settotalWeight(tWeight);
            settotalCtn(body.length);
            tableData.data = body;
            settableData({...tableData});
          })
          .catch(error => {
            setloading(false);

            console.log(error, 'Function error');
          });
      })
      .catch(error => {
        console.log(error, 'Auth error');
      });
    // if (text && tableData.data) {
    //   newData = tempData.filter((item) => {
    //     // console.log(item);
    //     const itemData = `${item.SKU.toUpperCase()}`;
    //     const textData = text.toUpperCase();
    //     return itemData.indexOf(textData) > -1;
    //   });
    // } else {
    //   newData = tempData;
    // }
    // settableData({headers: tableData.headers, data: newData});
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <StatusBar backgroundColor="#002e71" barStyle="light-content" />
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
          <View style={{display: showHeader ? 'flex' : 'none'}}>
            <View
              style={{
                flexDirection: 'row',
                padding: 10,
                width: '100%',
                alignItems: 'center',
              }}>
              <TouchableOpacity
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
                }}
                onPress={() => {
                  // setTimeout(setvisibleModal(true), 300);
                  setTimeout(() => {
                    setvisibleModal(true);
                  }, 300);
                }}>
                <Text style={{color: 'black'}}>
                  {selectedWarehouse ? selectedWarehouse : 'Select Warehouse'}
                </Text>
              </TouchableOpacity>
              {/* <DropDownPicker
                items={headerData.warehouseList}
                placeholder="Warehouse"
                defaultValue={headerData.warehouse}
                containerStyle={{
                  height: 40,
                  width: 150,
                  // flex: 1,
                  //   padding: 10,
                  marginHorizontal: 20,
                }}
                labelStyle={{
                  fontSize: Dimensions.get('window').width / 50,
                  fontFamily: 'sans-serif-condensed',
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
                }}
                dropDownMaxHeight={240}
                onChangeItem={(item) => onChangeWarehouse(item)}
              /> */}
              {/* <DropDownPicker
                items={headerData.rackList}
                defaultValue={headerData.racks}
                placeholder="Rack"
                containerStyle={{
                  height: 40,
                  width: 150,
                  // flex: 1,
                  //   padding: 10,
                  marginHorizontal: 20,
                }}
                labelStyle={{
                  fontSize: Dimensions.get('window').width / 50,
                  fontFamily: 'sans-serif-condensed',
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
                }}
                dropDownMaxHeight={240}
                onChangeItem={(item) => onChangeRack(item)}
              /> */}

              <TouchableOpacity
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
                }}
                onPress={() => {
                  setTimeout(() => {
                    setvisibleModalRack(true);
                  }, 300);
                  // setvisibleModal(true);
                }}>
                <Text style={{color: 'black'}}>
                  {selectedRack ? selectedRack : 'Select Rack'}
                </Text>
              </TouchableOpacity>
              <Text style={{color: 'black'}}> OR </Text>
              <TouchableOpacity
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: 5,
                }}
                onPress={() => navigation.navigate('ScanBarcode')}>
                <Icon name="barcode-scan" color="black" size={50} />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}>
              <TextInput
                value={searchVal}
                placeholder="Search SKU"
                placeholderTextColor="black"
                style={[styles.input]}
                onChangeText={setsearchVal}
                onSubmitEditing={event =>
                  searchFilterFunction(event.nativeEvent.text)
                }
              />
              <View
                style={{
                  padding: 10,
                  justifyContent: 'center',
                }}>
                <Text style={{color: 'black'}}>
                  Total Weight: {totalWeight}
                </Text>
                <Text style={{color: 'black'}}>Total Ctn: {totalCtn}</Text>
              </View>
            </View>
          </View>
          <View style={{alignItems: 'center', width: '100%'}}>
            <TouchableOpacity
              style={{width: '100%', alignItems: 'center'}}
              onPress={toggleHeader}>
              <Icons name={iconName} color="black" size={20} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1,
            }}>
            <View style={styles.listWrapperHeader}>
              {tableData.headers.map((value, index) => {
                return (
                  <Text key={index} style={[styles.row, styles.colorWhite]}>
                    {value}
                  </Text>
                );
              })}
            </View>
            <FlatList
              data={tableData.data}
              keyExtractor={(item, index) => item['$id']}
              renderItem={(itemData, index) => (
                <TouchableOpacity
                  // onPress={() => {
                  //   setselectedItem(itemData.item);
                  //   setorganisationModalVisible(true);
                  // }}
                  key={index}
                  style={styles.listWrapper}>
                  <Text style={[styles.row, styles.colorBlue]}>
                    {itemData.item.RACK_LABEL}
                  </Text>
                  <Text style={[styles.row, styles.colorBlue]}>
                    {itemData.item.SKU + itemData.item.DESC_ENG}
                  </Text>
                  <Text style={[styles.row, styles.colorBlue]}>
                    {itemData.item.CARTON_NO}
                  </Text>
                  <Text style={[styles.row, styles.colorBlue]}>
                    {itemData.item.PALLET_NO}
                  </Text>
                  <Text style={[styles.row, styles.colorBlue]}>
                    {itemData.item.AVAILABLE}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </View>
      <ListDialog
        type="Warehouse"
        onSelect={item => onChangeWarehouse(item)}
        visibleModal={visibleModal}
        list={WarehouseList}
        onClose={() => setvisibleModal(false)}
      />
      <ListDialog
        type="Rack"
        onSelect={item => onChangeRack(item)}
        visibleModal={visibleModalRack}
        list={RackList}
        onClose={() => setvisibleModalRack(false)}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={organisationModalVisible}
        onRequestClose={() => setorganisationModalVisible(false)}>
        <DetailDialog
          data={selectedItem}
          onClose={() => setorganisationModalVisible(false)}
        />
      </Modal>
      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator animating={true} size="large" color="red" />
        </View>
      ) : null}
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
  loading: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.8)',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
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
    flex: 1,
    height: 40,
    // maxWidth: 200,
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
});
