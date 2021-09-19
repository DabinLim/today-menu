import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { includes } from 'lodash';
import { screens } from '../constants/screens';
import BottomNavigationBar from './BottomNavigator';
import { themes } from '../constants/theme';

const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();

const getStackScreens = (target) => {
  const screenList = Object.values(screens).filter(({ flow }) => includes(flow, target));
  return screenList.map((screen) => (
    <Stack.Screen
      key={screen.name}
      name={screen.name}
      component={screen.component}
      options={screen.options}
    />
  ));
};

export const BottomNavigation = () => (
  <BottomTab.Navigator
    initialRouteName={screens.HOME.name}
    tabBar={(props) => <BottomNavigationBar {...props} />}
  >
    {Object.values(screens)
      .filter(({ flow }) => includes(flow, 'BOTTOM'))
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

export const AuthNavigation = () => (
  <Stack.Navigator
    initialRouteName={screens.SIGN_IN.name}
    screenOptions={themes.navScreenOptions}
  >
    {getStackScreens('AUTH')}
  </Stack.Navigator>
);

export const MainNavigation = () => (
  <Stack.Navigator
    initialRouteName="HOME"
    screenOptions={themes.navScreenOptions}
  >
    {getStackScreens('MAIN')}
    <Stack.Screen
      name="HOME"
      component={BottomNavigation}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);
