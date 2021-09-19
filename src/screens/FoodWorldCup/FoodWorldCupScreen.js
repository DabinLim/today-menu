import React, { useCallback, useContext, useState } from 'react';
import {
  SafeAreaView, StyleSheet, Text, View,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import BeforeStartView from './component/BeforeStartView';
import AfterStartView from './component/AfterStartView';

const FoodWorldCupScreen = () => {
  const [startWorldCup, setStartWorldCup] = useState(false);
  const [isSelectedDone, setIsSelectedDone] = useState(false);
  const [selectedItem, setSelectedItem] = useState();

  // 화면 이동 시 월드컵 다시 시작
  useFocusEffect(
    useCallback(() => () => {
      setStartWorldCup(false);
      setIsSelectedDone(false);
      setSelectedItem();
    }, []),
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        {/* eslint-disable-next-line no-nested-ternary */}
        {isSelectedDone ? (
          <Text>
            {selectedItem?.name}
          </Text>
        ) : (
          startWorldCup ? (
            <AfterStartView
              startWorldCup={startWorldCup}
              setIsSelectedDone={setIsSelectedDone}
              setSelectedItem={setSelectedItem}
            />
          ) : (
            <BeforeStartView setStartWorldCup={setStartWorldCup} />
          )
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 24,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default FoodWorldCupScreen;
