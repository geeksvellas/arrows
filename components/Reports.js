import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  StatusBar,
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/Ionicons';
import SideMenu from './SideMenu';

const Reports = (props) => {
  // console.disableYellowBox = true;
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <StatusBar backgroundColor="#002e71" />
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
          <SideMenu navigation={props.navigation} />
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
          }}>
          <TouchableOpacity
            style={{
              height: Dimensions.get('window').width / 6,
              width: Dimensions.get('window').width / 6,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => props.navigation.navigate('IReports')}>
            <Image
              resizeMode="contain"
              style={{
                height: '100%',
                width: '100%',
              }}
              source={require('../assets/5.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              height: Dimensions.get('window').width / 6,
              width: Dimensions.get('window').width / 6,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => props.navigation.navigate('EReports')}>
            <Image
              resizeMode="contain"
              style={{
                height: '100%',
                width: '100%',
              }}
              source={require('../assets/6.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    alignItems: 'center',
  },
});

export default Reports;
