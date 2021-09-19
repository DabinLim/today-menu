import React, { useContext } from 'react';
import {
  Image,
  SafeAreaView, StyleSheet, Text, View,
} from 'react-native';
import Button from '../../components/Button';
import { Context as FoodContext } from '../../context/food/foodContext';
import { images } from '../../constants/assets';

const FoodWorldCupScreen = () => {
  const {
    state: {
      randomFoodList,
    },
    getRandomFoodList,
  } = useContext(FoodContext);

  const startFoodWorldCup = () => {
    alert('준비중입니다.');
    return;
    getRandomFoodList();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={images.LOGO_IMAGE}
            resizeMode="cover"
            style={{ width: 300, height: 200 }}
          />
        </View>
        <Button
          onPress={startFoodWorldCup}
          title="음식 월드컵 시작하기"
          type="dark"
          containerStyle={{ marginTop: 20 }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 24,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default FoodWorldCupScreen;
