import React from 'react';
import {
  View, StyleSheet, Text, TouchableOpacity, SafeAreaView,
} from 'react-native';
import PropTypes from 'prop-types';
import { screens } from '../constants/screens';

const BottomNavigator = ({ navigation: { navigate } }) => (
  <SafeAreaView>
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.bottomNavi}
        onPress={() => { navigate(screens.HOME.name); }}
      >
        <Text>
          홈
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.bottomNavi}
        onPress={() => { navigate(screens.LOCAL_FOOD.name); }}
      >
        <Text>
          홈2
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.bottomNavi}
        onPress={() => { navigate(screens.RANDOM_FOOD.name); }}
      >
        <Text>
          홈3
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.bottomNavi}
        onPress={() => { navigate(screens.FOOD_WORLD_CUP.name); }}
      >
        <Text>
          홈4
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.bottomNavi}
        onPress={() => { navigate(screens.MY_PAGE.name); }}
      >
        <Text>
          홈5
        </Text>
      </TouchableOpacity>
    </View>
  </SafeAreaView>
);

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
    borderWidth: 1,
    width: 24,
    height: 24,
    borderColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BottomNavigator;
