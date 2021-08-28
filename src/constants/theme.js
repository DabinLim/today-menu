import React from 'react';
import { Image, Platform, View } from 'react-native';
import { DefaultTheme } from '@react-navigation/native';

export const themes = {
  navContainer: {
    ...DefaultTheme,
    dark: false,
    colors: {
      ...DefaultTheme.colors,
      primary: '#000000',
      background: '#000000',
      notification: '#000000',
      text: '#000000',
    },
  },
  navScreenOptions: {
    headerTitleStyle: {
      // fontFamily: '',
      fontSize: 16,
      lineHeight: 24,
      color: '#000000',
    },
    headerTitleAlign: 'center',
    headerBackTitleVisible: false,
    headerBackImage: () => (
      <View style={{ marginStart: Platform.OS === 'android' ? 9 : 20 }}>
        {/* <Image */}
        {/*  source={assets.IC_ARROW_LEFT} */}
        {/*  style={{ */}
        {/*    width: 24, */}
        {/*    height: 24, */}
        {/*  }} */}
        {/* /> */}
      </View>
    ),
  },
};
