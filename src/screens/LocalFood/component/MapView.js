import React, { useRef, useState } from 'react';
import WebView from 'react-native-webview';
import {
  FlatList, StyleSheet, Text, View,
} from 'react-native';
import { get } from 'lodash';

const MapView = () => {
  const [placeData, setPlaceData] = useState([]);
  const [location, setLocation] = useState({
    latitude: 37.27869377902859,
    longitude: 127.05759316285203,
  });

  const latitude = get(location, 'latitude');
  const longitude = get(location, 'longitude');
  let webviewRef = useRef();

  const handleSetRef = (ref) => {
    webviewRef = ref;
  };

  const handleEndLoading = () => {
    webviewRef.postMessage(JSON.stringify({
      type: 'Location',
      // 영통구
      data: {
        latitude,
        longitude,
      },
    }));
    webviewRef.postMessage(JSON.stringify({
      type: 'Keyword',
      data: {
        keyword: '맛집',
      },
    }));
  };

  const handleOnMessage = ({ nativeEvent: { data } }) => {
    const dataFromWebView = JSON.parse(data);
    if (dataFromWebView?.type === 'placeData') {
      if (dataFromWebView?.message) {
        setPlaceData(dataFromWebView.message);
      }
    }
  };

  const renderRestaurantList = ({
    item: {
      place_name, address_name, phone, distance,
    },
  }) => (
    <View style={styles.restaurantCard}>
      <Text>
        {place_name}
      </Text>
      <Text>
        {address_name}
      </Text>
      <Text>
        {'tel : '}
        <Text>
          {phone}
        </Text>
      </Text>
      <Text>
        {'거리 : '}
        <Text>
          {Math.round(distance / 100) / 10}
          {' '}
          km
        </Text>
      </Text>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 0.6 }}>
        <WebView
          originWhitelist={['http://*', 'https://*']}
          onLoadEnd={handleEndLoading}
          onMessage={handleOnMessage}
          ref={handleSetRef}
          javaScriptEnabled
          domStorageEnabled
          source={{ uri: 'https://dabinlim.github.io/eat_what_map' }}
        />
      </View>
      <View style={{ flex: 0.4 }}>
        <FlatList
          data={placeData}
          renderItem={renderRestaurantList}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  restaurantCard: {
    marginTop: 12,
    marginHorizontal: 20,
  },
});

export default MapView;
