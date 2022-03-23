import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import WebView from 'react-native-webview';
import {
  ActivityIndicator,
  FlatList, Text, TouchableOpacity, View,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { get } from 'lodash';
import axios from 'axios';
import Config from 'react-native-config';
import { fetchCurrentLocation } from '../utils/location';
import { Context as PopUpContext } from '../context/popup/popUpContext';
import { handleError } from '../context/utils';
import RestaurantItem from './RestaurantItem';

const MapView = ({
  keyword, cityValue, countyValue, setCountyValue, setCityValue, listRef,
}) => {
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

  // useEffect(() => {
  //   if (webviewRef) {
  //     const handlePostMessage = () => {
  //       webviewRef.postMessage(JSON.stringify({
  //         type: 'Click',
  //       }));
  //     };
  //     webviewRef.addListener('click', handlePostMessage);
  //     return () => {
  //       webviewRef.removeListeners('click', handlePostMessage);
  //     };
  //   }
  // }, [webviewRef]);

  useEffect(async () => {
    if (countyValue && isWebViewLoaded) {
      await getGeocodeByCountyValue(countyValue);
    }
  }, [countyValue]);

  useEffect(() => {
    if (isWebViewLoaded) {
      setLoading(true);
      setLastPage(false);
      setPage(1);
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
      console.log('webview loaded');
      // const latitude = 37.322214523741145;
      // const longitude = -122.0635577203627;
      const { latitude, longitude } = await fetchCurrentLocation();
      console.log('location ready');
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
      place_name,
      address_name,
      road_address_name,
      phone,
      distance,
      place_url,
      id,
      category_group_name,
      x,
      y,
    },
  }) => (
    <RestaurantItem
      map
      onPress={() => handleCustomOverlay(id)}
      place_name={place_name}
      place_url={place_url}
      address_name={address_name}
      phone={phone}
      distance={distance}
      road_address_name={road_address_name}
      category_group_name={category_group_name}
      longitude={x}
      latitude={y}
    />
  );

  const renderSpinner = () => !lastPage && <ActivityIndicator size="large" />;

  const renderEmptyView = () => lastPage && (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>
        검색 결과가 없습니다.
      </Text>
    </View>
  );

  const handleCustomOverlay = (id) => {
    webviewRef.postMessage(JSON.stringify({
      type: 'CardClick',
      data: {
        id,
      },
    }));
  };

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
        {!loading && (
          <TouchableOpacity
            style={{ alignItems: 'center' }}
            onPress={handleMapSize}
          >
            <AntDesign name={icon} size={20} />
          </TouchableOpacity>
        )}
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

export default MapView;
