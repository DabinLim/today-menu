import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import { screens } from '../../constants/screens';

const HomeScreen = ({ navigation }) => (
  <View style={{ flex: 1 }}>
    <Text>
      여기는 홈스크린 입니다.
    </Text>
    <TouchableOpacity
      onPress={() => navigation.navigate(screens.MY_PAGE.name)}
    >
      <Text>
        여기를 누르면 마이페이지로 이동합니다.
      </Text>
    </TouchableOpacity>
  </View>
);

export default HomeScreen;
