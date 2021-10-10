import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import MapView from './component/MapView';

const LocalFoodScreen = () => {
  let temp;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MapView />
    </SafeAreaView>
  );
};

export default LocalFoodScreen;
