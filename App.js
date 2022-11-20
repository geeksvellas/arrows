/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import Home from './components/Home';
import Reports from './components/Reports';
import IReports from './components/IReports';
import EReports from './components/EReports';
import Delivery from './components/Delivery';
import Inventory from './components/Inventory';
import Login from './components/Login';
import ClientLogin from './components/ClientLogin';
import Welcome from './components/Welcome';
import ScanBarcode from './components/ScanBarcode';
const Stack = createNativeStackNavigator();
export default function App() {
  const [initializing, setInitializing] = useState(true);
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [isNew, setisNew] = useState(true);
  const [isLoading, setisLoading] = useState(true);
  const [initialRoute, setinitialRoute] = useState('');

  useEffect(() => {
    // auth().signOut();
    const {currentUser} = auth();
    if (currentUser) {
      setinitialRoute('WelcomeScreen');
    } else {
      setinitialRoute('ClientSign');
    }
  }, []);

  const SignInContainer = ({navigation}) => {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    );
  };

  const WelcomeScreen = ({navigation}) => {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Welcome" component={Welcome} />
      </Stack.Navigator>
    );
  };

  const ClientSign = ({navigation}) => {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="ClientLogin" component={ClientLogin} />
      </Stack.Navigator>
    );
  };

  const LoggedInContainer = ({navigation}) => {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Inventory" component={Inventory} />
        <Stack.Screen name="EReports" component={EReports} />
        <Stack.Screen name="IReports" component={IReports} />
        <Stack.Screen name="Reports" component={Reports} />
        <Stack.Screen name="Delivery" component={Delivery} />
        <Stack.Screen name="ScanBarcode" component={ScanBarcode} />
      </Stack.Navigator>
    );
  };
  return (
    // <View>
    //   <Text>sdsd</Text>
    // </View>
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" backgroundColor="#F4F6FA" />
      {initialRoute && (
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={initialRoute}
            screenOptions={{headerShown: false}}>
            <Stack.Screen name="ClientSign" component={ClientSign} />
            <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
            <Stack.Screen
              name="LoggedInContainer"
              component={LoggedInContainer}
            />
            <Stack.Screen name="SignInContainer" component={SignInContainer} />
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </SafeAreaProvider>
  );
}
