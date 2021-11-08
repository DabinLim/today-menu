import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import { Context as FoodContext } from '../../../context/food/foodContext';

const BookmarkedListScreen = () => {
  const {
    state: {
      bookmarkedRestaurantList,
    },
  } = useContext(FoodContext);
  return (
    <View>
      <Text>
        준비중입니다.
      </Text>
    </View>
  );
};

BookmarkedListScreen.navigationOptions = {
  title: '즐겨찾는 맛집',
};

export default BookmarkedListScreen;
