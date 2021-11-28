import React from 'react';
import {
  StyleSheet, View,
} from 'react-native';
import { get } from 'lodash';
import Button from '../../../components/Button';
import { screens } from '../../../constants/screens';
import SelectedFoodView from '../../../components/SelectedFoodView';

const WinnerFoodView = ({ navigate, food, resetWorldCup }) => {
  const name = get(food, 'name');

  const goToFindRestaurant = () => {
    navigate(screens.FOOD_MAP_SCREEN.name, { keyword: name });
  };
  console.log(`food: ${JSON.stringify(food)}`);

  return (
    <View style={styles.container}>
      <SelectedFoodView
        selectedFood={food}
        isSelected
        goToFindRestaurant={goToFindRestaurant}
      />
      <Button
        onPress={resetWorldCup}
        title="월드컵 다시 하기"
        type="gray"
        containerStyle={{ marginTop: 20 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  image: {
    width: 300,
    height: 200,
  },
  text: {
    fontSize: 24,
    marginTop: 24,
    textAlign: 'center',
  },
});

export default WinnerFoodView;
