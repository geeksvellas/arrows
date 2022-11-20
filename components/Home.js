import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  StatusBar,
  View,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {firebase} from '@react-native-firebase/functions';
import {getUser} from './functions/helper';

import SideMenu from './SideMenu';

const Home = ({navigation}) => {
  // console.disableYellowBox = true;
  // console.log(navigation.state.params);
  const [params, setParams] = useState(null);
  const [loading, setLoading] = useState(false);
  const openInventory = () => {
    // setLoading(true);
    var oApi = {
      warehouse: 'http://vellas.ddns.net:8083/fg/api/param',
      RackList: 'http://vellas.ddns.net:8083/fg/api/param/GetRack?search=',
      RackLevelList:
        'http://vellas.ddns.net:8083/fg/api/paramracklevel/GetLevel?search=',
      StockAvailableList:
        'http://vellas.ddns.net:8083/fg/api/stockavailable/GetRecord3?',
      QRCodeData:
        'http://vellas.ddns.net:8083/fg/api/stockavailable/GetRecord4?rack=',
    };
    navigation.navigate('Inventory', {
      warehouse: {},
      api: oApi,
    });
  };
  useEffect(() => {
    var rights = getUser()['ACCESS_RIGHT'];
    setParams(rights);
  }, []);
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
        <ScrollView>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
            }}>
            {params != 3 && (
              <>
                <TouchableOpacity
                  onPress={openInventory}
                  style={{
                    height: Dimensions.get('window').width / 6,
                    width: Dimensions.get('window').width / 6,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    resizeMode="contain"
                    style={{
                      height: '100%',
                      width: '100%',
                    }}
                    source={require('../assets/1.png')}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    height: Dimensions.get('window').width / 6,
                    width: Dimensions.get('window').width / 6,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    resizeMode="contain"
                    style={{
                      height: '100%',
                      width: '100%',
                    }}
                    source={require('../assets/2.png')}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    height: Dimensions.get('window').width / 6,
                    width: Dimensions.get('window').width / 6,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    resizeMode="contain"
                    style={{
                      height: '100%',
                      width: '100%',
                    }}
                    source={require('../assets/4.png')}
                  />
                </TouchableOpacity>
              </>
            )}
            <TouchableOpacity
              style={{
                height: Dimensions.get('window').width / 6,
                width: Dimensions.get('window').width / 6,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => navigation.navigate('Delivery')}>
              <Image
                resizeMode="contain"
                style={{
                  height: '100%',
                  width: '100%',
                }}
                source={require('../assets/3.png')}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator animating={true} size="large" color="red" />
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    alignItems: 'center',
  },
  loading: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.8)',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;
