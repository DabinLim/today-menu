import React, { useContext } from 'react';
import { FlatList, View } from 'react-native';
import { Context as AuthContext } from '../../../context/auth/authContext';
import RestaurantItem from '../../../components/RestaurantItem';

const BookmarkedListScreen = () => {
  const {
    state: {
      bookmarkedRestaurant,
    },
  } = useContext(AuthContext);
  console.log(bookmarkedRestaurant);

  const renderRestaurantList = ({
    item: {
      name,
      address,
      roadAddress,
      phoneNumber,
      url,
      category,
      x,
      y,
    },
  }) => (
    <RestaurantItem
      place_name={name}
      place_url={url}
      address_name={address}
      phone={phoneNumber}
      road_address_name={roadAddress}
      category_group_name={category}
      longitude={x}
      latitude={y}
    />
  );
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        keyExtractor={({ restaurantId }) => restaurantId}
        data={bookmarkedRestaurant}
        renderItem={renderRestaurantList}
      />
    </View>
  );
};

BookmarkedListScreen.navigationOptions = {
  title: '즐겨찾는 맛집',
};

export default BookmarkedListScreen;
