/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type { Node } from 'react';
import {
  StatusBar,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { screens } from './constants/screens';
import BottomNavigationBar from './_components/BottomNavigator';
import { themes } from './constants/theme';
import { Provider as AuthProvider } from './context/auth/authContext';
import { Provider as FoodProvider } from './context/food/foodContext';
import { Provider as PopUpProvider } from './context/popup/popUpContext';
import Alert from './_components/Alert';

const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();

const getStackScreens = () => {
  const screenList = Object.values(screens);
  return screenList.map((screen) => (
    <Stack.Screen
      key={screen.name}
      name={screen.name}
      component={screen.component}
      options={screen.options}
    />
  ));
};

const BottomNavigation = () => (
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
          options={{ ...options, headerShown: false }}
        />
      ))}
  </BottomTab.Navigator>
);

const HomeNavigation = () => (
  <Stack.Navigator
    initialRouteName="MAIN_HOME"
    screenOptions={themes.navScreenOptions}
  >
    {getStackScreens()}
    <Stack.Screen
      name="MAIN_HOME"
      component={BottomNavigation}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

const App: () => Node = () => (
  <>
    <NavigationContainer theme={themes.navContainer}>
      <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
      <HomeNavigation />
      <Alert />
    </NavigationContainer>
  </>
);

export default () => (
  <SafeAreaProvider>
    <AuthProvider>
      <FoodProvider>
        <PopUpProvider>
          <App />
        </PopUpProvider>
      </FoodProvider>
    </AuthProvider>
  </SafeAreaProvider>
);
