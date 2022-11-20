import React, {Component} from 'react';
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
  FlatList,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/Ionicons';
import DropDownPicker from 'react-native-dropdown-picker';
import DatePicker from 'react-native-datepicker';
import {DataTable} from 'react-native-paper';
import SideMenu from './SideMenu';
export default class EReports extends Component {
  constructor(props) {
    super(props);
    this.password = React.createRef();
    this.username = React.createRef();
    this.state = {
      usernameIsError: false,
      navigation: props.navigation,
      username: '',
      passwordIsError: false,
      password: '',
      inValidText: '',
      loading: false,
      endDate: null,
      startDate: null,
      gender: null,
      genderIsError: false,
      tableData: {
        headers: ['GR No.', 'SKU', 'Qty', 'Pallet No.'],
        data: [
          {
            id: '1',
            grnum: 'GRN-20070001',
            sku: 'US1117 - USA SRF WAGYU SHORT PLATE KALBI EYE - BLACK',
            qty: 439.43,
            pall: 2206,
          },
          {
            id: '2',
            grnum: 'GRN-20070001',
            sku: 'US1117 - USA SRF WAGYU SHORT PLATE KALBI EYE - BLACK',
            qty: 439.43,
            pall: 2206,
          },
          {
            id: '3',
            grnum: 'GRN-20070001',
            sku: 'US1117 - USA SRF WAGYU SHORT PLATE KALBI EYE - BLACK',
            qty: 439.43,
            pall: 2206,
          },
          {
            id: '4',
            grnum: 'GRN-20070001',
            sku: 'US1117 - USA SRF WAGYU SHORT PLATE KALBI EYE - BLACK',
            qty: 439.43,
            pall: 2206,
          },
          {
            id: '5',
            grnum: 'GRN-20070001',
            sku: 'US1117 - USA SRF WAGYU SHORT PLATE KALBI EYE - BLACK',
            qty: 439.43,
            pall: 2206,
          },
          {
            id: '6',
            grnum: 'GRN-20070001',
            sku: 'US1117 - USA SRF WAGYU SHORT PLATE KALBI EYE - BLACK',
            qty: 439.43,
            pall: 2206,
          },
          {
            id: '7',
            grnum: 'GRN-20070001',
            sku: 'US1117 - USA SRF WAGYU SHORT PLATE KALBI EYE - BLACK',
            qty: 439.43,
            pall: 2206,
          },
          {
            id: '8',
            grnum: 'GRN-20070001',
            sku: 'US1117 - USA SRF WAGYU SHORT PLATE KALBI EYE - BLACK',
            qty: 439.43,
            pall: 2206,
          },
          {
            id: '9',
            grnum: 'GRN-20070001',
            sku: 'US1117 - USA SRF WAGYU SHORT PLATE KALBI EYE - BLACK',
            qty: 439.43,
            pall: 2206,
          },
        ],
      },
    };
  }
  componentDidMount = () => {
    LogBox.ignoreAllLogs(true);
  };
  changeValue = (field, value) => {
    this.setState({[field]: value});
    this.setState({[field + 'IsError']: false});
    this.setState({inValidText: ''});
  };
  render() {
    const {DOB, gender, tableData, navigation} = this.state;
    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <StatusBar backgroundColor="#002e71" navigation="" />
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
            <View style={{flexDirection: 'row'}}>
              <View
                style={{flex: 2, flexDirection: 'row', paddingVertical: 10}}>
                <DropDownPicker
                  items={[
                    {label: 'Male', value: 'Male'},
                    {label: 'Female', value: 'Female'},
                  ]}
                  defaultValue={gender}
                  placeholder="Select Vendor"
                  containerStyle={{
                    height: 40,
                    //   width: 150,
                    flex: 1,
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
                  onChangeItem={(item) =>
                    this.changeValue('gender', item.value)
                  }
                />
                <DropDownPicker
                  items={[
                    {label: 'Male', value: 'Male'},
                    {label: 'Female', value: 'Female'},
                  ]}
                  defaultValue={gender}
                  placeholder="Select SKU"
                  containerStyle={{
                    height: 40,
                    //   width: 150,
                    flex: 1,
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
                  onChangeItem={(item) =>
                    this.changeValue('gender', item.value)
                  }
                />
              </View>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View>
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      paddingVertical: 5,
                    }}>
                    <Icons
                      name="search"
                      color="black"
                      style={{
                        padding: 5,
                        borderColor: '#002e71',
                        borderWidth: 1,
                        borderRadius: 10,
                      }}
                      size={30}
                    />
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    padding: 10,
                    justifyContent: 'center',
                  }}>
                  <Text>Total Records: 29838</Text>
                  {/* <Text>Total Ctn: 220634</Text> */}
                </View>
              </View>
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
                keyExtractor={(item, index) => item.id}
                renderItem={(itemData) => (
                  <TouchableOpacity style={styles.listWrapper}>
                    <Text style={[styles.row, styles.colorBlue]}>
                      {itemData.item.grnum}
                    </Text>
                    <Text style={[styles.row, styles.colorBlue]}>
                      {itemData.item.sku}
                    </Text>
                    <Text style={[styles.row, styles.colorBlue]}>
                      {itemData.item.qty}
                    </Text>
                    <Text style={[styles.row, styles.colorBlue]}>
                      {itemData.item.pall}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
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
    flex: 1,
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
});
