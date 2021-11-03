import React from 'react';
import {
  Image, StyleSheet, Text, View,
} from 'react-native';
import { get } from 'lodash';

const SelectedFoodView = ({ selectedFood, isSelected }) => {
  const image = get(selectedFood, 'imageUrl');
  const name = get(selectedFood, 'name');
  return (
    <View style={styles.container}>
      {isSelected ? (
        <>
          <Image source={{ uri: image }} resizeMode="cover" style={styles.image} />
          <Text style={styles.text}>
            {`${name} 당첨 !!\n\n오늘은 ${name} 어때요?`}
          </Text>
        </>
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

export default SelectedFoodView;
