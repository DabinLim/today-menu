import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import axios from 'axios';
import Config from 'react-native-config';
import { get } from 'lodash';
import MapView from '../../components/MapView';
import FilterModal from './component/FilterModal';
import { cityData, getCountiesByCity, getCountyData } from '../../context/addressData';
import DropDown from '../../components/DropDown';
import { fetchCurrentLocation } from '../../utils/location';

axios.defaults.headers.common.Authorization = `KakaoAK ${Config.REACT_APP_KAKAO_LOCAL_KEY}`;

const LocalFoodScreen = () => {
  const [filterVisible, setFilterVisible] = useState(false);
  const [cityOpen, setCityOpen] = useState(false);
  const [cityValue, setCityValue] = useState('서울');
  const [cityItems, setCityItems] = useState(cityData);
  const [countyOpen, setCountyOpen] = useState(false);
  const [countyValue, setCountyValue] = useState(0);
  const [countyItems, setCountyItems] = useState();
  const [location, setLocation] = useState(null);

  useEffect(() => {
    initializeLocation();
  }, []);

  useEffect(() => {
    const getCounty = getCountiesByCity(cityValue);
    const countyData = getCountyData(getCounty);
    setCountyItems(countyData);
  }, [cityValue]);

  const onCityOpen = useCallback(() => {
    setCountyOpen(false);
  }, []);

  const onCountyOpen = useCallback(() => {
    if (!cityValue) {
      setCountyOpen(false);
      alert('시, 도를 먼저 선택해주세요.');
    }
    setCityOpen(false);
  }, []);

  const initializeLocation = async () => {
    try {
      const { latitude, longitude } = await fetchCurrentLocation();
      const response = await axios.get('https://dapi.kakao.com/v2/local/geo/coord2address.json', {
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
    } catch (e) {
      console.log(e.message);
    }
  };

  const getGeocodeByKeyword = async (keyword) => {
    if (keyword) {
      try {
        const response = await axios.get('https://dapi.kakao.com/v2/local/search/address.json', {
          params: {
            query: keyword,
          },
        });
        const { x, y } = get(response, 'data.documents[0]');
        setLocation({
          latitude: y,
          longitude: x,
          keyword,
        });
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <DropDown
        open={cityOpen}
        onOpen={onCityOpen}
        value={cityValue}
        items={cityItems}
        setOpen={setCityOpen}
        setValue={setCityValue}
        setItems={setCityItems}
        style={{ borderRadius: 0 }}
        zIndex={3000}
        zIndexInverse={1000}
      />
      <DropDown
        open={countyOpen}
        onOpen={onCountyOpen}
        value={countyValue}
        items={countyItems}
        setOpen={setCountyOpen}
        setValue={setCountyValue}
        setItems={setCountyItems}
        placeholder="시, 군, 구를 선택해주세요."
        style={{ borderRadius: 0, borderTopWidth: 0 }}
        zIndex={1000}
        zIndexInverse={3000}
        onChangeValue={getGeocodeByKeyword}
      />
      <MapView
        location={location}
      />
      <FilterModal
        onClose={() => setFilterVisible(false)}
        visible={filterVisible}
      />
    </SafeAreaView>
  );
};

export default LocalFoodScreen;
