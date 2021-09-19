import React from 'react';
import { Image, Platform, View } from 'react-native';
import { DefaultTheme } from '@react-navigation/native';
import { CardStyleInterpolators } from '@react-navigation/stack';
import { images } from './assets';

export const themes = {
  navContainer: {
    ...DefaultTheme,
    dark: false,
    colors: {
      background: '#ffffff',
    },
  },
  navScreenOptions: {
    headerStyle: {
      borderBottomWidth: 1,
      borderBottomColor: '#EFEFEF',
    },
    headerTitleStyle: {
      fontSize: 16,
      fontWeight: 'bold',
      lineHeight: 24,
      color: '#000000',
    },
    headerTitleAlign: 'center',
    headerBackTitleVisible: false,
    headerBackImage: () => (
      <View style={{ marginStart: Platform.OS === 'android' ? 9 : 20 }}>
        <Image
          source={images.ARROW_LEFT}
          style={{
            width: 24,
            height: 24,
          }}
        />
      </View>
    ),
    gestureEnabled: true,
    gestureDirection: 'horizontal',
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  },
};
