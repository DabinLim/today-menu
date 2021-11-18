import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import { SafeAreaView } from 'react-native';
import MapView from '../../components/MapView';
import FilterModal from './component/FilterModal';
import { cityData, getCountiesByCity, getCountyData } from '../../context/addressData';
import DropDown from '../../components/DropDown';

const LocalFoodScreen = () => {
  const [filterVisible, setFilterVisible] = useState(false);
  const [cityOpen, setCityOpen] = useState(false);
  const [cityValue, setCityValue] = useState('서울');
  const [cityItems, setCityItems] = useState(cityData);
  const [countyOpen, setCountyOpen] = useState(false);
  const [countyValue, setCountyValue] = useState(0);
  const [countyItems, setCountyItems] = useState();

  const listRef = useRef();

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

  const scrollUp = () => {
    listRef?.current?.scrollToOffset({
      animated: false,
      offset: 0,
    });
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
        onChangeValue={scrollUp}
      />
      <MapView
        listRef={listRef}
        cityValue={cityValue}
        countyValue={countyValue}
        setCityValue={setCityValue}
        setCountyValue={setCountyValue}
      />
      <FilterModal
        onClose={() => setFilterVisible(false)}
        visible={filterVisible}
      />
    </SafeAreaView>
  );
};

export default LocalFoodScreen;
