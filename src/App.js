/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import type { Node } from 'react';
import {
  SafeAreaView, StatusBar, StyleSheet,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { screens } from './constants/screens';
import BottomNavigationBar from './_components/BottomNavigationBar';
import { themes } from './constants/theme';

const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();

const getStackScreens = (flow) => {
  const flowScreens = Object.values(screens).filter(({ flows }) => flows.includes(flow));
  return flowScreens.map((screen) => (
    <Stack.Screen
      key={screen.name}
      name={screen.name}
      component={screen.component}
      options={screen.options}
    />
  ));
};

const BottomTabScreens = () => (
  <BottomTab.Navigator
    initialRouteName={screens.HOME.name}
    tabBar={(props) => <BottomNavigationBar {...props} />}
  >
    {Object.values(screens)
      .filter(({ flows }) => flows.includes('BOTTOM_NAVI'))
      .map(({ name, component, options }) => (
        <BottomTab.Screen
          name={name}
          key={name}
          component={component}
          options={options}
        />
      ))}
  </BottomTab.Navigator>
);

const AuthFlow = () => (
  <Stack.Navigator
    initialRouteName={screens.SIGN_IN.name}
    screenOptions={themes.navScreenOptions}
  >
    {getStackScreens('AUTH')}
  </Stack.Navigator>
);

const MainFlow = () => (
  <Stack.Navigator
    initialRouteName="MAIN_HOME"
    screenOptions={themes.navScreenOptions}
  >
    {getStackScreens('MAIN')}
    <Stack.Screen
      name="MAIN_HOME"
      component={BottomTabScreens}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

const App: () => Node = () => {
  const [skipSignIn, setSkipSignIn] = useState(true);

  useEffect(async () => {
    const isSkipSignIn = await AsyncStorage.getItem('skipSignIn');
    console.log(`isSkipSignIn : ${isSkipSignIn}`);
    if (isSkipSignIn === 'skip') {
      setSkipSignIn(true);
    } else {
      setSkipSignIn(false);
    }
  }, []);

  return (
    <>
      <NavigationContainer>
        <SafeAreaView style={styles.statusBar}>
          <StatusBar backgroundColor="#000000" barStyle="light-content" />
        </SafeAreaView>
        {skipSignIn ? (
          <MainFlow />
        ) : (
          <AuthFlow />
        )}
      </NavigationContainer>
    </>
  );
};

const styles = StyleSheet.create({
  statusBar: {
    backgroundColor: '#000000',
  },
});

export default App;
