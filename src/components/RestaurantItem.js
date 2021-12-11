import React, { useContext } from 'react';
import {
  Linking, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { includes } from 'lodash';
import { Context as AuthContext } from '../context/auth/authContext';

const RestaurantItem = ({
  place_name,
  category_group_name,
  address_name,
  road_address_name,
  phone,
  distance,
  place_url,
  id,
  x,
  y,
}) => {
  const {
    state: {
      bookmarkedIdList,
      bookmarkedRestaurant,
    },
    addBookMark,
    removeBookmark,
  } = useContext(AuthContext);

  // console.log(bookmarkedIdList);
  // console.log(bookmarkedRestaurant);

  const isBookmarked = includes(bookmarkedIdList, place_name);

  const modifyBookmark = () => {
    if (isBookmarked) {
      const restaurant = bookmarkedRestaurant.find((v) => v.name === place_name);
      if (restaurant) {
        removeBookmark(restaurant.restaurantId, (_result, error) => {
          if (error) {
            console.error(error);
          }
        });
      }
    } else {
      addBookMark(
        place_name,
        category_group_name,
        address_name,
        road_address_name,
        phone,
        place_url,
        x,
        y,
        (_result, error) => {
          if (error) {
            console.error(error);
          }
        },
      );
    }
  };

  return (
    <TouchableOpacity
      style={styles.restaurantCard}
      onPress={async () => { await Linking.openURL(place_url); }}
    >
      <View>
        <View style={styles.titleRow}>
          <Text style={styles.title}>
            {place_name}
          </Text>
          <TouchableOpacity
            onPress={modifyBookmark}
          >
            <FontAwesome name={isBookmarked ? 'bookmark' : 'bookmark-o'} size={24} />
          </TouchableOpacity>
        </View>
        <Text style={styles.address}>
          {address_name}
        </Text>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.info}>
            {'tel : '}
            <Text>
              {phone || '-'}
            </Text>
          </Text>
          <Text style={styles.info}>
            {'거리 : '}
            <Text>
              {Math.round(distance / 10) / 100}
              {' '}
              km
            </Text>
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  restaurantCard: {
    marginTop: 12,
    marginHorizontal: 20,
    paddingVertical: 20,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
    backgroundColor: '#ffffff',
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  address: {
    fontSize: 14,
    marginTop: 8,
  },
  info: {
    marginTop: 8,
    fontSize: 12,
    color: '#646464',
    marginRight: 20,
  },
});

export default RestaurantItem;
