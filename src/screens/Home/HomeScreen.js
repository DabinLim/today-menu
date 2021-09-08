import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, SafeAreaView,
} from 'react-native';
import PropTypes from 'prop-types';
import { screens } from '../../constants/screens';

const HomeScreen = ({ navigation: { navigate } }) => (
  <SafeAreaView style={{ flex: 1 }}>
    <Text>
      여기는 홈스크린 입니다.
    </Text>
    <TouchableOpacity
      onPress={() => navigate(screens.MY_PAGE.name)}
    >
      <Text>
        여기를 누르면 마이페이지로 이동합니다.
      </Text>
    </TouchableOpacity>
  </SafeAreaView>
);

HomeScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default HomeScreen;
