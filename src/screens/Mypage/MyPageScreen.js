import React, { useContext } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, SafeAreaView,
} from 'react-native';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { screens } from '../../constants/screens';
import { Context as AuthContext } from '../../context/auth/authContext';

const MyPageScreen = ({ navigation: { navigate } }) => {
  const {
    setSkipSignIn,
  } = useContext(AuthContext);
  const goToSignIn = async () => {
    await AsyncStorage.removeItem('skipSignIn');
    setSkipSignIn();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <Text>
          로그인이 필요합니다.
        </Text>
        <TouchableOpacity onPress={goToSignIn}>
          <Text>
            로그인 페이지로
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

MyPageScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default MyPageScreen;
