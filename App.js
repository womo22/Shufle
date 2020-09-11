import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
//import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import useCachedResources from './hooks/useCachedResources';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import TopTabNavigation from './navigation/TopTabNavigation';
import LinkingConfiguration from './navigation/LinkingConfiguration';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import SignupInformation from './screens/SignupInformation';

const Stack = createStackNavigator();
const AuthContext = React.createContext();

export default function App({navigation}) {
  useCachedResources();
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [signedIn, setSignedIn] = React.useState(false);
  const [location, setLocation] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState(false);

  // React.useEffect(() => {
  //   (async () => {
  //     let { status } = await Location.requestPermissionsAsync();
  //     if (status !== 'granted') {
  //       setErrorMsg('Permission to access location was denied');
  //     }

  //     let location = await Location.getCurrentPositionAsync({});
  //     setLocation(location);
  //     console.log(JSON.stringify(location));
  //   })();
  // });

  // let text = 'Waiting..' ;
  // if (errorMsg) {
  //   text = errorMsg;
  // } else if (location) {
  //  console.log(JSON.stringify(location));
  // }

  return (
    <View style={styles.container}>
      <NavigationContainer linking={LinkingConfiguration}>
        <Stack.Navigator>
          {!loggedIn && !signedIn && (
            [
              <Stack.Screen name="Login" component={LoginScreen} initialParams={{ 'func': setLoggedIn }} />,
              <Stack.Screen name="Signup" component={SignupScreen} initialParams={{ 'func': setSignedIn }} />
            ]
          )} 
          {signedIn && (
            [
              <Stack.Screen name="SignupInfo" component={SignupInformation} initialParams={{ 'func': setLoggedIn }} />
            ]
          )} 
          {loggedIn && (
            [
              <Stack.Screen name="Home" component={TopTabNavigation} />
            ]
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}



 
  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
