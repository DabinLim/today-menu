import React from 'react';
import {
  Image, Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import { get } from 'lodash';
import MapView from './MapView';
import { images } from '../constants/assets';

const FoodMapScreen = ({ navigation, route }) => {
  const keyword = get(route, 'params.keyword');
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={styles.header}
      >
        <TouchableOpacity
          onPress={() => { navigation.goBack(); }}
        >
          <Image
            source={images.ARROW_LEFT}
            style={{
              width: 24,
              height: 24,
            }}
          />
        </TouchableOpacity>
        <Text
          style={styles.headerTitle}
        >
          {keyword}
          {' '}
          맛집
        </Text>
        <View style={{ width: 24, height: 24 }} />
      </View>
      <MapView keyword={keyword} />
    </SafeAreaView>
  );
};

FoodMapScreen.navigationOptions = {
  headerShown: false,
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingVertical: Platform.OS === 'ios' ? 9 : 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 24,
    color: '#000000',
  },
});

export default FoodMapScreen;
