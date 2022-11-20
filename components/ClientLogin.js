import React, {Component, useState, useRef} from 'react';
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
export default function ClientLogin({navigation}) {
  const [passwordIsError, setpasswordIsError] = useState(false);
  const [password, setpassword] = useState('');
  const [username, setusername] = useState('');
  const [inValidText, setinValidText] = useState('');
  const [loading, setloading] = useState(false);

  const login = () => {
    setloading(true);
    setinValidText('');
    console.log(username);
    if (username && password) {
      var usermail = username + '@client.com';
      auth()
        .signInWithEmailAndPassword(usermail, password)
        .then((data) => {
          console.log('User signed in!', data);
          navigation.reset({
            index: 0,
            routes: [{name: 'SignInContainer'}],
          });
        })
        .catch((error) => {
          console.log(error);
          setloading(false);
          if (error.code === 'auth/user-not-found') {
            console.log('Inavlid user');
            setinValidText('User does not exist');
          } else if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
            setinValidText('User invalid');
          } else if (error.code === 'auth/wrong-password') {
            console.log('Password is incorrect');
            // passwordR.current.focus();
            setinValidText('Password is incorrect');
          } else if (error.code.includes('network-request-failed')) {
            setinValidText('Check your network connection');
          }
          // console.error(error);
        });
      //   navigation.navigate('Home');
    } else {
      setloading(false);
      setinValidText('Please fill the fields');
    }
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
      <View style={{flexDirection: 'row', marginHorizontal: 30}}>
        <View style={{flex: 1, margin: 15}}>
          <Text style={styles.inputText}>Client code</Text>
          <TextInput
            placeholderTextColor="black"
            style={[styles.input, {marginBottom: 10}]}
            onChangeText={(text) => {
              setusername(text);
              setinValidText('');
            }}
            value={username}
          />
        </View>
        <View style={{flex: 1, margin: 15}}>
          <Text style={styles.inputText}>Password</Text>
          <TextInput
            placeholderTextColor="black"
            secureTextEntry
            style={[
              styles.input,
              passwordIsError ? styles.error : null,
              {marginBottom: 10},
            ]}
            onChangeText={(text) => {
              setpassword(text);
              setpasswordIsError(false);
              setinValidText('');
            }}
            value={password}
          />
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={login}>
        <Text
          style={{
            color: 'white',
            fontSize: Dimensions.get('window').width / 30,
            fontFamily: 'sans-serif-condensed',
          }}>
          Login
        </Text>
      </TouchableOpacity>
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
    fontSize: Dimensions.get('window').width / 30,
    fontFamily: 'sans-serif-condensed',
    fontWeight: '700',
  },
  input: {
    color: 'black',
    marginBottom: 10,
    height: 70,
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
