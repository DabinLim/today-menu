import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { screens } from '../constants/screens';

const Stack = createStackNavigator();

const getStackScreens = () => Object.values(screens).map((screen) => (
  <Stack.Screen
    key={screen.name}
    name={screen.name}
    component={screen.component}
    options={screen.options}
  />
));
AsyncStorage.removeItem('skipSignIn');

const StackNavigation = () => {
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

  console.log(skipSignIn);

  return (
    <>
      {skipSignIn ? (
        <Stack.Navigator
          initialRouteName={screens.HOME.name}
        >
          {getStackScreens()}
        </Stack.Navigator>
      ) : (
        <Stack.Navigator
          initialRouteName={screens.SIGN_IN.name}
        >
          {getStackScreens()}
        </Stack.Navigator>
      )}
    </>
  );
};

export default StackNavigation;
