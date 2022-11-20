import React, {Component, useState, useEffect} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Linking,
  Text,
  View,
  StatusBar,
  Image,
  Dimensions,
  TextInput,
  ActivityIndicator,
  ImageBackground,
  FlatList,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {firebase} from '@react-native-firebase/functions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setUser} from './functions/helper';
export default function Welcome({navigation}) {
  const [loading, setloading] = useState(true);
  const [inValidText, setinValidText] = useState(
    'Please wait while we check your login',
  );

  const checkLogin = async () => {
    var username = await AsyncStorage.getItem('username');
    var password = await AsyncStorage.getItem('password');
    console.log(username + password);
    if (username && password) {
      auth()
        .currentUser.getIdToken(true)
        .then(function (idToken) {
          firebase
            .app()
            .functions('asia-southeast1')
            .httpsCallable('userLogin?token=' + idToken)({
              username: username,
              pass: password,
            })
            .then((response) => {
              if (JSON.parse(response.data.body).length > 0) {
                console.log(JSON.parse(response.data.body), 'success');
                setloading(false);
                AsyncStorage.setItem('username', username);
                AsyncStorage.setItem('password', password);
                setUser(JSON.parse(response.data.body)[0]);
                // console.log(JSON.parse(response.data.body)[0].CID);
                navigation.reset({
                  index: 0,
                  routes: [{name: 'LoggedInContainer'}],
                });
              } else {
                navigation.reset({
                  index: 0,
                  routes: [{name: 'SignInContainer'}],
                });
                AsyncStorage.removeItem('username');
                AsyncStorage.removeItem('password');
              }
            })
            .catch((error) => {
              console.log(error, 'Function error');
              setloading(false);
              navigation.reset({
                index: 0,
                routes: [{name: 'SignInContainer'}],
              });
              AsyncStorage.removeItem('username');
              AsyncStorage.removeItem('password');
            });
        })
        .catch((error) => {
          console.log(error, 'Auth Error');
          setinValidText('Auth error');
        });
    } else {
      //   navigation.navigate('SignInContainer');
      navigation.reset({
        index: 0,
        routes: [{name: 'SignInContainer'}],
      });
    }
  };

  useEffect(() => {
    checkLogin();
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
      <View>
        <Text style={styles.inputText}>Welcome</Text>
      </View>
      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator animating={true} size="large" color="red" />
        </View>
      ) : null}
      <Text
        style={{
          color: 'red',
          paddingTop: 10,
          fontSize: Dimensions.get('window').width / 24,
          fontFamily: 'sans-serif-condensed',
          display: inValidText ? 'flex' : 'none',
          textAlign: 'center',
        }}>
        {inValidText}
      </Text>
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
    fontSize: Dimensions.get('window').width / 20,
    fontFamily: 'sans-serif-condensed',
    fontWeight: '700',
    textAlign: 'center',
    marginVertical: 20,
  },
  input: {
    color: 'black',
    marginBottom: 10,
    borderColor: 'rgba(1,1,1,0.3)',
    borderWidth: 2,
    padding: 10,
    borderRadius: 10,
    fontSize: Dimensions.get('window').width / 24,
    fontFamily: 'sans-serif-condensed',
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
});
