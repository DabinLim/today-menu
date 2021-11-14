/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useContext, useEffect } from 'react';
import type { Node } from 'react';
import {
  StatusBar,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import { themes } from './constants/theme';
import { Provider as AuthProvider, Context as AuthContext } from './context/auth/authContext';
import { Provider as FoodProvider } from './context/food/foodContext';
import { Provider as PopUpProvider } from './context/popup/popUpContext';
import Alert from './components/Alert';
import { AuthNavigation, MainNavigation } from './components/StackNavigation';

const App: () => Node = () => {
  const {
    state: {
      skipSignIn,
      user,
      isChecked,
    },
    checkSession,
  } = useContext(AuthContext);

  useEffect(() => {
    checkSession();
  }, []);

  useEffect(() => {
    if (isChecked) {
      SplashScreen.hide();
    }
  }, [isChecked]);

  return (
    <NavigationContainer theme={themes.navContainer}>
      <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
      {skipSignIn || user ? (
        <MainNavigation />
      ) : (
        <AuthNavigation />
      )}
      <Alert />
    </NavigationContainer>
  );
};

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
