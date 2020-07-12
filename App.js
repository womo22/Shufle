import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';

import useCachedResources from './hooks/useCachedResources';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import LinkingConfiguration from './navigation/LinkingConfiguration';
import AsyncStorage from '@react-native-community/async-storage';
import LoginScreen from './screens/LoginScreen';

const Stack = createStackNavigator();
const AuthContext = React.createContext();

export default function App({navigation}) {
  const isLoadingComplete = useCachedResources();
  const [loggedIn, setLoggedIn] = React.useState(false);


  console.log(loggedIn);
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <View style={styles.container}>
        <NavigationContainer linking={LinkingConfiguration}>
            <Stack.Navigator>
              {!loggedIn ? (
              <Stack.Screen name="Login" component={LoginScreen} initialParams={{ 'func': setLoggedIn }} />
              ): (
                <Stack.Screen name="Root" component={BottomTabNavigator} />
              )}
            </Stack.Navigator>
        </NavigationContainer>
        <StatusBar style="auto" />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
