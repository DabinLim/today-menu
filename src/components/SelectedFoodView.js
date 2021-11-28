import React from 'react';
import {
  Dimensions,
  Image, StyleSheet, Text, View,
} from 'react-native';
import { get } from 'lodash';
import FoodCard from './FoodCard';

const SelectedFoodView = ({ selectedFood, isSelected, goToFindRestaurant }) => {
  const image = get(selectedFood, 'imageUrl');
  return (
    <View style={styles.container}>
      {isSelected ? (
        <FoodCard
          item={selectedFood}
          goToFindRestaurant={goToFindRestaurant}
        />
      ) : (
        <>
          <Image source={image} resizeMode="cover" style={styles.image} />
          <Text style={styles.text}>
            오늘의 랜덤 추천 음식은 ?
          </Text>
        </>
      )}
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
    borderRadius: 100,
    width: 150,
    height: 150,
  },
  text: {
    fontSize: 24,
    marginTop: 24,
    textAlign: 'center',
  },
});

export default SelectedFoodView;
