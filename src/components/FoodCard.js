import React from 'react';
import {
  Image, StyleSheet, Text, View,
} from 'react-native';
import Button from './Button';

const FoodCard = ({
  item, selectItem, goToFindRestaurant, worldCup,
}) => (
  <View style={{ width: '100%', paddingRight: 10 }}>
    <View style={styles.container}>
      {item && (
      <>
        <View style={styles.leftSide}>
          <View style={styles.textWrap}>
            <Text style={styles.foodName}>
              {item.name}
            </Text>
            <Text style={{ marginBottom: 8 }}>
              <Text style={{ fontSize: 16 }}>
                분류:
                {' '}
              </Text>
              {item.type}
            </Text>
            <Text>
              <Text style={{ fontSize: 16 }}>
                국가:
                {' '}
              </Text>
              {item.country}
            </Text>
          </View>
          <Button
            onPress={worldCup ? selectItem : goToFindRestaurant}
            title={worldCup ? '선택하기' : '맛집찾기'}
            type="dark"
            containerStyle={styles.selectBtn}
          />
        </View>
        <View style={styles.imageWrap}>
          <Image
            source={{ uri: item.imageUrl }}
            style={styles.image}
          />
        </View>
      </>
      )}
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: 28,
    paddingLeft: 18,
    paddingBottom: 24,
    width: '100%',
    position: 'relative',
    height: 200,
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
  },
  leftSide: {
    justifyContent: 'space-between',
    width: '50%',
  },
  textWrap: {
    paddingLeft: 10,
  },
  foodName: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  imageWrap: {
    borderRadius: 100,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    position: 'absolute',
    top: 25,
    right: -20,
  },
  selectBtn: {
    height: 40,
    width: 100,
    borderRadius: 20,
  },
  image: {
    borderRadius: 100,
    width: 150,
    height: 150,
  },
});

export default FoodCard;
