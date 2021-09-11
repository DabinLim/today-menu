import React from 'react';
import { SafeAreaView, Text } from 'react-native';

const SortByCravingScreen = () => {
  let temp;
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text>
        뭐가 땡기는지 골라봐
      </Text>
    </SafeAreaView>
  );
};

SortByCravingScreen.navigationOptions = {
  title: '오늘 뭐 먹지?',
};

export default SortByCravingScreen;
