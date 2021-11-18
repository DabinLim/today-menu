import React, { useContext, useState } from 'react';
import {
  View, StyleSheet, TouchableOpacity, SafeAreaView, Image, Text,
} from 'react-native';
import PropTypes from 'prop-types';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { screens } from '../constants/screens';
import { images } from '../constants/assets';
import { Context as AuthContext } from '../context/auth/authContext';
import { Context as PopUpContext } from '../context/popup/popUpContext';

const BottomNavigator = ({ navigation: { navigate } }) => {
  const {
    setSkipSignIn,
    state: {
      skipSignIn,
    },
  } = useContext(AuthContext);
  const {
    showAlert,
    dismissAlert,
  } = useContext(PopUpContext);
  const [selectedMenu, setSelectedMenu] = useState('Home');

  const handleNavigate = (screen) => {
    switch (screen) {
      case 'Home':
        navigate(screens.HOME.name);
        break;
      case 'LocalFood':
        navigate(screens.LOCAL_FOOD.name);
        break;
      case 'RandomFood':
        navigate(screens.RANDOM_FOOD.name);
        break;
      case 'FoodWorldCup':
        navigate(screens.FOOD_WORLD_CUP.name);
        break;
      case 'MyPage':
        if (skipSignIn) {
          showAlert({
            message: '로그인이 필요합니다.',
            onConfirm: async () => {
              await AsyncStorage.removeItem('skipSignIn');
              setSkipSignIn(false);
              dismissAlert();
            },
            onCancel: dismissAlert,
          });
        } else {
          navigate(screens.MY_PAGE.name);
        }
        break;
      default:
        break;
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.bottomNavi}
          onPress={() => {
            handleNavigate('Home');
            setSelectedMenu('Home');
          }}
        >
          {selectedMenu === 'Home' ? (
            <Ionicons name="restaurant" size={30} />
          ) : (
            <Ionicons name="restaurant-outline" size={30} />
          )}
          <Text style={styles.naviText}>선택장애</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomNavi}
          onPress={() => {
            handleNavigate('LocalFood');
            setSelectedMenu('LocalFood');
          }}
        >
          {selectedMenu === 'LocalFood' ? (
            <Ionicons name="location" size={30} />
          ) : (
            <Ionicons name="location-outline" size={30} />
          )}
          <Text style={styles.naviText}>지역맛집</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomNavi}
          onPress={() => {
            handleNavigate('RandomFood');
            setSelectedMenu('RandomFood');
          }}
        >
          {selectedMenu === 'RandomFood' ? (
            <MaterialCommunityIcons name="slot-machine" size={30} />
          ) : (
            <MaterialCommunityIcons name="slot-machine-outline" size={30} />
          )}
          <Text style={styles.naviText}>랜덤뽑기</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomNavi}
          onPress={() => {
            handleNavigate('FoodWorldCup');
            setSelectedMenu('FoodWorldCup');
          }}
        >
          {selectedMenu === 'FoodWorldCup' ? (
            <Image source={images.WORLD_CUP} style={{ width: 30, height: 30 }} />
          ) : (
            <Image source={images.WORLD_CUP_OUTLINED} style={{ width: 30, height: 30 }} />
          )}
          <Text style={styles.naviText}>월드컵</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomNavi}
          onPress={() => {
            handleNavigate('MyPage');
            setSelectedMenu('MyPage');
          }}
        >
          {selectedMenu === 'MyPage' ? (
            <Ionicons name="person" size={30} />
          ) : (
            <Ionicons name="person-outline" size={30} />
          )}
          <Text style={styles.naviText}>내정보</Text>
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
    borderTopColor: '#d2d2d2',
    paddingHorizontal: 20,
  },
  bottomNavi: {
    width: 40,
    height: 40,
    borderColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  naviText: {
    fontSize: 10,
    marginTop: 4,
    color: '#839191',
  },
});

export default BottomNavigator;
