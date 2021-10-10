import React, { useRef, useState } from 'react';
import WebView from 'react-native-webview';
import {
  FlatList, StyleSheet, Text, View,
} from 'react-native';
import { get } from 'lodash';
import { fetchCurrentLocation } from '../../../utils/location';

const MapView = () => {
  const [placeData, setPlaceData] = useState([]);
  let webviewRef = useRef();

  const handleSetRef = (ref) => {
    webviewRef = ref;
  };

  const handleEndLoading = async () => {
    const { latitude, longitude } = await fetchCurrentLocation();
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
