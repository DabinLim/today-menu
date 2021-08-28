import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { screens } from "../constants/screens";

const BottomNavigationBar = ({navigation}) => (
  <View style={styles.container}>
    <Text>
      홈
    </Text>
    <Text>
      홈2
    </Text>
    <Text>
      홈3
    </Text>
    <Text>
      홈4
    </Text>
    <TouchableOpacity onPress={screens.MY_PAGE.name}>
      <Text>
        홈5
      </Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    borderTopWidth: 1,
    borderTopColor: '#000000',
  },
});

export default BottomNavigationBar;
