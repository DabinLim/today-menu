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

  return (
    <View style={styles.container}>
      <SelectedFoodView
        selectedFood={food}
        isSelected
        goToFindRestaurant={goToFindRestaurant}
      />
      <View style={{ flexDirection: 'row' }}>
        <Button
          onPress={resetWorldCup}
          title="다시하기"
          type="gray"
          containerStyle={styles.buttonLeft}
        />
        <Button
          onPress={goToFindRestaurant}
          title="맛집 찾기"
          type="dark"
          containerStyle={styles.buttonRight}
        />
      </View>
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
  buttonLeft: {
    flex: 0.3,
  },
  buttonRight: {
    flex: 0.7,
    marginLeft: 20,
  },
});

export default WinnerFoodView;
