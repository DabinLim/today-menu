import React from 'react';
import {
  Image, Text, View,
} from 'react-native';

// eslint-disable-next-line react/prop-types
const WorldCupItem = ({ item }) => (
  <View style={{ alignItems: 'center' }}>
    {item && (
      <>
        <Image
          source={{ uri: item.imageUrl }}
          style={{ width: 200, height: 150 }}
        />
        <Text style={{ fontSize: 24, marginVertical: 20 }}>
          {item.name}
        </Text>
      </>
    )}
  </View>
);

export default WorldCupItem;
