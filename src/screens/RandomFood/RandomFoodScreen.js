import React, { useContext, useEffect, useState } from 'react';
import {
  SafeAreaView, StyleSheet, View,
} from 'react-native';
import Button from '../../components/Button';
import { Context as FoodContext } from '../../context/food/foodContext';
import { images } from '../../constants/assets';
import SelectedFoodView from './component/SelectedFoodView';

const RandomFoodScreen = () => {
  const [randomFood, setRandomFood] = useState({
    id: null,
    name: '',
    image: images.LOGO_IMAGE,
  });
  const isSelected = randomFood.id;

  const {
    state: {
      randomFoodList,
    },
    getRandomFoodList,
  } = useContext(FoodContext);

  useEffect(() => {
    getRandomFoodList();
  }, []);

  const getFoodList = () => {
    const randomNumber = pickRandomFood(0, randomFoodList?.length - 1);
    const selectedRandomFood = randomFoodList[randomNumber];
    setRandomFood(selectedRandomFood);
    getRandomFoodList();
  };

  const goToFindRestaurant = () => {
    alert('준비중입니다.');
  };

  const pickRandomFood = (min, max) => Math.round(Math.random() * (max - min) + min);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <SelectedFoodView
          randomFood={randomFood}
          isSelected={isSelected}
        />
        <View style={{ width: '100%' }}>
          {isSelected
          && (
            <>
              <Button
                onPress={goToFindRestaurant}
                title={`${randomFood
                  .name} 맛집 찾기`}
                type="dark"
              />
              <Button
                onPress={getFoodList}
                title="다시 뽑기"
                type="gray"
                containerStyle={{ marginTop: 20 }}
              />
            </>
          )}
          {!isSelected && (
            <Button
              onPress={getFoodList}
              title="랜덤 음식 뽑기"
              type="dark"
              containerStyle={{ marginTop: 20 }}
            />
          )}
        </View>
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
});

export default RandomFoodScreen;
