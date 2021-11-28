import React from 'react';
import {
  Dimensions,
  Image, StyleSheet, Text, View,
} from 'react-native';
import { get } from 'lodash';

const SelectedFoodView = ({ selectedFood, isSelected }) => {
  const image = get(selectedFood, 'imageUrl');
  const name = get(selectedFood, 'name');
  const type = get(selectedFood, 'type');
  const country = get(selectedFood, 'country');
  return (
    <View style={styles.container}>
      {isSelected ? (
        <View style={styles.foodWrap}>
          <Image
            source={{ uri: image }}
            style={styles.image}
          />
          <View style={styles.foodInfo}>
            <View>
              <Text style={styles.foodName}>
                {name}
              </Text>
              <Text style={styles.foodInfoContents}>
                <Text style={styles.foodInfoTitle}>
                  분류:
                  {' '}
                </Text>
                {type}
              </Text>
              <Text style={styles.foodInfoContents}>
                <Text style={styles.foodInfoTitle}>
                  국가:
                  {' '}
                </Text>
                {country}
              </Text>
            </View>
          </View>
        </View>
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
    paddingHorizontal: 20,
  },
  foodWrap: {
    width: '100%',
    height: 290,
    alignItems: 'center',
    shadowColor: '#7d7d7d',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6,
    elevation: 14,
    backgroundColor: '#ffffff',
    borderRadius: 24,
    position: 'relative',
  },
  image: {
    borderRadius: Dimensions.get('window').width / 3,
    width: Dimensions.get('window').width / 2,
    height: Dimensions.get('window').width / 2,
    position: 'absolute',
    top: -60,
  },
  foodInfo: {
    flex: 1,
    marginTop: (Dimensions.get('window').width / 2) - 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  foodName: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  foodInfoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  foodInfoContents: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 4,
  },
  text: {
    fontSize: 24,
    marginTop: 24,
    textAlign: 'center',
  },
});

export default SelectedFoodView;
