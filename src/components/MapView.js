import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import WebView from 'react-native-webview';
import {
  ActivityIndicator,
  FlatList, Linking, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { get } from 'lodash';
import axios from 'axios';
import Config from 'react-native-config';
import { fetchCurrentLocation } from '../utils/location';
import { Context as FoodContext } from '../context/food/foodContext';
import { Context as PopUpContext } from '../context/popup/popUpContext';
import { handleError } from '../context/utils';

const MapView = ({
  keyword, cityValue, countyValue, setCountyValue, setCityValue, listRef,
}) => {
  const { addBookmark } = useContext(FoodContext);
  const { showAlert, dismissAlert } = useContext(PopUpContext);

  const [placeData, setPlaceData] = useState([]);
  const [mapSize, setMapSize] = useState(0.5);
  const [listSize, setListSize] = useState(0.5);
  const [icon, setIcon] = useState('up');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(false);
  const [isWebViewLoaded, setIsWebViewLoaded] = useState(false);
  const [location, setLocation] = useState();
  const [selectedPlace, setSelectedPlace] = useState(null);

  let webviewRef = useRef();

  const lat = get(location, 'latitude');
  const lng = get(location, 'longitude');

  // console.log(JSON.stringify(placeData));

  useEffect(async () => {
    if (countyValue && isWebViewLoaded) {
      await getGeocodeByCountyValue(countyValue);
    }
  }, [countyValue]);

  useEffect(() => {
    if (isWebViewLoaded) {
      setLoading(true);
      setLastPage(false);
      webviewRef.postMessage(JSON.stringify({
        type: 'Location',
        data: {
          latitude: lat,
          longitude: lng,
          page: 1,
        },
      }));
      webviewRef.postMessage(JSON.stringify({
        type: 'Keyword',
        data: {
          keyword: '',
        },
      }));
    }
  }, [location]);

  useEffect(() => {
    if (page !== 1) {
      setLoading(true);
      webviewRef.postMessage(JSON.stringify({
        type: 'Location',
        data: {
          latitude: lat,
          longitude: lng,
          page,
        },
      }));
    }
  }, [page]);

  const getGeocodeByCountyValue = async (value) => {
    if (value) {
      try {
        const response = await axios.get('https://dapi.kakao.com/v2/local/search/address.json', {
          headers: {
            common: {
              Authorization: `KakaoAK ${Config.REACT_APP_KAKAO_LOCAL_KEY}`,
            },
          },
          params: {
            query: value,
          },
        });
        const { x, y } = get(response, 'data.documents[0]');
        setLocation({
          latitude: y,
          longitude: x,
        });
      } catch (e) {
        const error = handleError(e);
        showAlert({
          message: error.message,
          onConfirm: dismissAlert,
        });
      }
    }
  };

  const handleSetRef = (ref) => {
    webviewRef = ref;
  };

  const handleEndLoading = async () => {
    try {
      const { latitude, longitude } = await fetchCurrentLocation();
      // memo : 앱에서 겸색결과가 없는 경우 서대문구로 표시되는 이유
      // 첫 렌더시 디폴트 위경도인 서대문구로 지도 렌더
      // -> Location 메세지를 보내지만 Keyword가 없어 지도 재렌더링 x
      // -> 검색결과 없어 재렌더링 x
      // 해결 방법 = 검색결과 없어도 위치기반 재렌더링
      webviewRef.postMessage(JSON.stringify({
        type: 'Location',
        // 영통구
        data: {
          latitude,
          longitude,
          page: 1,
        },
      }));
      webviewRef.postMessage(JSON.stringify({
        type: 'Keyword',
        data: {
          keyword: keyword ? `${keyword}` : '',
        },
      }));
      if (countyValue || cityValue) {
        const response = await axios.get('https://dapi.kakao.com/v2/local/geo/coord2address.json', {
          headers: {
            common: {
              Authorization: `KakaoAK ${Config.REACT_APP_KAKAO_LOCAL_KEY}`,
            },
          },
          params: {
            x: longitude,
            y: latitude,
          },
        });
        const { region_1depth_name, region_2depth_name } = get(response, 'data.documents[0].address');
        console.log(region_1depth_name);
        console.log(region_2depth_name);
        setCityValue(region_1depth_name);
        setCountyValue(region_2depth_name);
      }
      setLocation({
        latitude,
        longitude,
      });
      setIsWebViewLoaded(true);
    } catch (e) {
      const error = handleError(e);
      showAlert({
        message: error.message,
        onConfirm: dismissAlert,
      });
    }
  };

  const handleOnMessage = ({ nativeEvent: { data } }) => {
    const dataFromWebView = JSON.parse(data);
    if (dataFromWebView?.type === 'placeData') {
      if (dataFromWebView?.message) {
        setPlaceData(dataFromWebView.message);
        setLoading(false);
        console.log(dataFromWebView.message.length);
      }
    } else if (dataFromWebView.type === 'selectedPlace') {
      if (dataFromWebView.message) {
        setSelectedPlace(dataFromWebView.message + 1);
      } else {
        setSelectedPlace(null);
      }
    } else if (dataFromWebView.type === 'lastPage') {
      setLastPage(true);
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

  const getNextRestaurantList = () => {
    if (!lastPage && !loading) {
      setPage((n) => n + 1);
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

  const renderSpinner = () => !lastPage && <ActivityIndicator size="large" />;

  const renderEmptyView = () => lastPage && (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>
        검색 결과가 없습니다.
      </Text>
    </View>
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
        <FlatList
          ref={listRef}
          data={placeData}
          keyExtractor={(place_name, idx) => place_name + idx}
          renderItem={renderRestaurantList}
          onEndReached={getNextRestaurantList}
          onEndReachedThreshold={0.2}
          ListFooterComponent={renderSpinner}
          ListEmptyComponent={renderEmptyView}
        />
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
