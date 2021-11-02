import React, { useEffect, useRef, useState } from 'react';
import WebView from 'react-native-webview';
import {
  FlatList, Linking, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { get } from 'lodash';
import { fetchCurrentLocation } from '../utils/location';

const MapView = ({ keyword, location }) => {
  const [placeData, setPlaceData] = useState([]);
  const [mapSize, setMapSize] = useState(0.5);
  const [listSize, setListSize] = useState(0.5);
  const [icon, setIcon] = useState('up');
  const [loading, setLoading] = useState(true);
  let webviewRef = useRef();

  useEffect(() => {
    const latitude = get(location, 'latitude');
    const longitude = get(location, 'longitude');
    const locateName = get(location, 'keyword');
    webviewRef.postMessage(JSON.stringify({
      type: 'Location',
      data: {
        latitude,
        longitude,
      },
    }));
    webviewRef.postMessage(JSON.stringify({
      type: 'Keyword',
      data: {
        keyword: locateName ? `${locateName}` : '맛집',
      },
    }));
  }, [location]);

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
        keyword: keyword ? `${keyword} 맛집` : '맛집',
      },
    }));
  };

  const handleOnMessage = ({ nativeEvent: { data } }) => {
    const dataFromWebView = JSON.parse(data);
    if (dataFromWebView?.type === 'placeData') {
      if (dataFromWebView?.message) {
        setPlaceData(dataFromWebView.message);
        setLoading(false);
      }
    }
  };

  const handleMapSize = () => {
    if (mapSize === 0.5) {
      setMapSize(0);
      setListSize(1);
      setIcon('down');
    } else {
      setMapSize(0.5);
      setListSize(0.5);
      setIcon('up');
    }
  };

  const renderRestaurantList = ({
    item: {
      place_name, address_name, phone, distance, place_url,
    },
  }) => (

    <TouchableOpacity
      style={styles.restaurantCard}
      onPress={async () => { await Linking.openURL(place_url); }}
    >
      <View>
        <Text style={styles.title}>
          {place_name}
        </Text>
        <Text style={styles.address}>
          {address_name}
        </Text>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.info}>
            {'tel : '}
            <Text>
              {phone || '-'}
            </Text>
          </Text>
          <Text style={styles.info}>
            {'거리 : '}
            <Text>
              {Math.round(distance / 10) / 100}
              {' '}
              km
            </Text>
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: mapSize }}>
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
      <View style={{ flex: listSize, marginTop: 12 }}>
        <TouchableOpacity
          style={{ alignItems: 'center' }}
          onPress={handleMapSize}
        >
          <AntDesign name={icon} size={20} />
        </TouchableOpacity>
        {/* eslint-disable-next-line no-nested-ternary */}
        {!loading ? (
          placeData.length > 0 ? (
            <FlatList
              data={placeData}
              renderItem={renderRestaurantList}
            />
          ) : (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Text>
                검색 결과가 없습니다.
              </Text>
            </View>
          )
        ) : (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>
              로딩중...
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  restaurantCard: {
    marginTop: 12,
    marginHorizontal: 20,
    paddingVertical: 20,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  address: {
    fontSize: 14,
    marginTop: 8,
  },
  info: {
    marginTop: 8,
    fontSize: 12,
    color: '#646464',
    marginRight: 20,
  },
});

export default MapView;
