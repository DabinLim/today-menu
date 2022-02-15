import React, { useContext } from 'react';
import { FlatList, Text, View } from 'react-native';
import { isEmpty } from 'lodash';
import { Context as AuthContext } from '../../../context/auth/authContext';
import RestaurantItem from '../../../components/RestaurantItem';

const BookmarkedListScreen = () => {
  const {
    state: {
      bookmarkedRestaurant,
    },
  } = useContext(AuthContext);

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
      {isEmpty(bookmarkedRestaurant) ? (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <View>
            <Text>
              즐겨찾는 맛집이 없습니다.
            </Text>
          </View>
        </View>
      ) : (
        <FlatList
          keyExtractor={({ restaurantId }) => restaurantId}
          data={bookmarkedRestaurant}
          renderItem={renderRestaurantList}
        />
      )}
    </View>
  );
};

BookmarkedListScreen.navigationOptions = {
  title: '즐겨찾는 맛집',
};

export default BookmarkedListScreen;
