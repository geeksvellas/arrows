import React, {useEffect, useState, useRef} from 'react';
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

export default function Login({navigation}) {
  const [usernameIsError, setusernameIsError] = useState(false);
  const [username, setusername] = useState('');
  const [passwordIsError, setpasswordIsError] = useState(false);
  const [password, setpassword] = useState('');
  const [inValidText, setinValidText] = useState('');
  const [loading, setloading] = useState(false);
  const passwordR = useRef(null);
  const usernameR = useRef(null);

  const onLogOut = () => {
    auth().signOut();
    navigation.reset({
      index: 0,
      routes: [{name: 'ClientSign'}],
    });
  };

  const login = () => {
    setloading(true);
    // this.state.navigation.navigate('Home');
    if (username && password) {
      // var baseUrl = await AsyncStorage.getItem('hb-isInstalled');
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
              console.log(response, 'success');
              if (JSON.parse(response.data.body).length > 0) {
                AsyncStorage.setItem('username', username);
                AsyncStorage.setItem('password', password);
                setUser(JSON.parse(response.data.body)[0]);
                console.log(JSON.parse(response.data.body)[0].CID);

                setloading(false);
                setusername(null);
                setpassword(null);
                navigation.reset({
                  index: 0,
                  routes: [{name: 'LoggedInContainer'}],
                });
              } else {
                setloading(false);
                setinValidText('User does not exist');
              }
            })
            .catch((error) => {
              console.log(error, 'Function error');
              setloading(false);
              setinValidText('User does not exist');
            });
        })
        .catch((error) => {
          console.log(error, 'File upload');
        });
    } else {
      setloading(false);
      setinValidText('Please fill the fields');
    }
  };
  useEffect(() => {}, []);
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
          <Text style={styles.inputText}>Username</Text>
          <TextInput
            placeholderTextColor="black"
            style={[
              styles.input,
              usernameIsError ? styles.error : null,
              {marginBottom: 10},
            ]}
            onChangeText={(text) => {
              setusername(text);
              setusernameIsError(false);
              setinValidText('');
            }}
            value={username}
            ref={usernameR}
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
            ref={passwordR}
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
      <TouchableOpacity>
        <Text
          style={{textAlign: 'center', color: '#002e71'}}
          onPress={onLogOut}>
          Log out Client
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
