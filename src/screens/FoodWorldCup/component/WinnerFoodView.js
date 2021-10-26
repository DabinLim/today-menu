import React from 'react';
import {
  Image, StyleSheet, Text, View,
} from 'react-native';
import { get } from 'lodash';
import Button from '../../../components/Button';
import { screens } from '../../../constants/screens';

const WinnerFoodView = ({ navigate, food, resetWorldCup }) => {
  const image = get(food, 'imageUrl');
  const name = get(food, 'name');

  const goToFindRestaurant = () => {
    navigate(screens.FOOD_MAP_SCREEN.name, { keyword: name });
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} resizeMode="cover" style={styles.image} />
      <Text style={styles.text}>
        {`${name} 우승 !!`}
      </Text>
      <View style={{ width: '100%', marginTop: 24 }}>
        <Button
          onPress={goToFindRestaurant}
          title={`${name} 맛집 찾기`}
          type="dark"
        />
        <Button
          onPress={resetWorldCup}
          title="월드컵 다시 하기"
          type="gray"
          containerStyle={{ marginTop: 20 }}
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
