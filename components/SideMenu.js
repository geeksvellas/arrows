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
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getUser} from './functions/helper';

const SideMenu = (props) => {
  const [rights, setrights] = useState(null);

  // console.disableYellowBox = true;
  useEffect(() => {
    var rights = getUser()['ACCESS_RIGHT'];
    setrights(rights);
  }, []);
  const signOut = async () => {
    await AsyncStorage.removeItem('username');
    await AsyncStorage.removeItem('password');
    props.navigation.reset({
      index: 0,
      routes: [{name: 'SignInContainer'}],
    });
  };
  return (
    <View>
      <View>
        <ScrollView>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Home')}
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 5,
            }}>
            <Icon name="home" color="white" style={{padding: 5}} size={30} />
          </TouchableOpacity>
          {rights != 3 && (
            <>
              <TouchableOpacity
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingVertical: 5,
                }}>
                <Icons
                  name="search"
                  color="white"
                  style={{padding: 5}}
                  size={30}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingVertical: 5,
                }}>
                <Icon
                  name="barcode"
                  color="white"
                  style={{padding: 5}}
                  size={30}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingVertical: 5,
                }}
                // onPress={() => props.navigation.navigate('Reports')}
              >
                <Icon
                  name="clipboard-pulse-outline"
                  color="white"
                  style={{padding: 5}}
                  size={30}
                />
              </TouchableOpacity>
            </>
          )}
          <TouchableOpacity
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 5,
            }}
            onPress={() => props.navigation.navigate('Delivery')}>
            <Icons
              name="md-logo-dropbox"
              color="white"
              style={{padding: 5}}
              size={30}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 5,
            }}
            onPress={signOut}>
            <Icon name="power" color="white" style={{padding: 5}} size={30} />
          </TouchableOpacity>
        </ScrollView>
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

export default SideMenu;
