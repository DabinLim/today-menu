import React, { useState } from 'react';
import { SafeAreaView, Text, TouchableOpacity } from 'react-native';
import MapView from '../../components/MapView';
import FilterModal from './component/FilterModal';

const LocalFoodScreen = () => {
  const [filterVisible, setFilterVisible] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableOpacity
        onPress={() => setFilterVisible(true)}
      >
        <Text>
          지역설정하기
        </Text>
      </TouchableOpacity>
      <MapView />
      <FilterModal
        onClose={() => setFilterVisible(false)}
        visible={filterVisible}
      />
    </SafeAreaView>
  );
};

export default LocalFoodScreen;
