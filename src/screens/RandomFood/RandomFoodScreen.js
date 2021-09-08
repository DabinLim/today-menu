import React from 'react';
import { SafeAreaView, Text } from 'react-native';

const RandomFoodScreen = () => {
  let temp;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text>
        여기는 랜덤 음식 추천 화면 입니다.
      </Text>
    </SafeAreaView>
  );
};

export default RandomFoodScreen;
