import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, SafeAreaView,
} from 'react-native';
import PropTypes from 'prop-types';
import { screens } from '../../constants/screens';

const MyPageScreen = ({ navigation: { navigate } }) => {
  const goToSignIn = () => {
    navigate(screens.SIGN_IN.name);
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
