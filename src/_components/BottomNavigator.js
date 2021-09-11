import React, { useState } from 'react';
import {
  View, StyleSheet, TouchableOpacity, SafeAreaView, Image,
} from 'react-native';
import PropTypes from 'prop-types';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { screens } from '../constants/screens';
import { images } from '../constants/assets';

const BottomNavigator = ({ navigation: { navigate } }) => {
  const [selectedMenu, setSelectedMenu] = useState('Home');

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.bottomNavi}
          onPress={() => {
            navigate(screens.HOME.name);
            setSelectedMenu('Home');
          }}
        >
          {selectedMenu === 'Home' ? (
            <Ionicons name="restaurant" size={30} />
          ) : (
            <Ionicons name="restaurant-outline" size={30} />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomNavi}
          onPress={() => {
            navigate(screens.LOCAL_FOOD.name);
            setSelectedMenu('LocalFood');
          }}
        >
          {selectedMenu === 'LocalFood' ? (
            <Ionicons name="location" size={30} />
          ) : (
            <Ionicons name="location-outline" size={30} />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomNavi}
          onPress={() => {
            navigate(screens.RANDOM_FOOD.name);
            setSelectedMenu('RandomFood');
          }}
        >
          {selectedMenu === 'RandomFood' ? (
            <AntDesign name="questioncircle" size={26} />
          ) : (
            <AntDesign name="questioncircleo" size={26} />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomNavi}
          onPress={() => {
            navigate(screens.FOOD_WORLD_CUP.name);
            setSelectedMenu('FoodWorldCup');
          }}
        >
          {selectedMenu === 'FoodWorldCup' ? (
            <Image source={images.WORLD_CUP} style={{ width: 30, height: 30 }} />
          ) : (
            <Image source={images.WORLD_CUP_OUTLINED} style={{ width: 30, height: 30 }} />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomNavi}
          onPress={() => {
            navigate(screens.MY_PAGE.name);
            setSelectedMenu('MyPage');
          }}
        >
          {selectedMenu === 'MyPage' ? (
            <Ionicons name="person" size={30} />
          ) : (
            <Ionicons name="person-outline" size={30} />
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

BottomNavigator.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 56,
    borderTopWidth: 1,
    borderTopColor: '#000000',
    paddingHorizontal: 20,
  },
  bottomNavi: {
    width: 30,
    height: 30,
    borderColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BottomNavigator;
