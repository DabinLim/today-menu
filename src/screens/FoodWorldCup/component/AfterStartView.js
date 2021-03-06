import React, {
  useCallback, useContext, useEffect, useState,
} from 'react';
import {
  ScrollView, StyleSheet, Text, View,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Context as FoodContext } from '../../../context/food/foodContext';
import FoodCard from '../../../components/FoodCard';

const AfterStartView = ({
  setIsSelectedDone, startWorldCup, setSelectedItem, defaultGrade,
}) => {
  const {
    state: {
      foodWorldCupList,
    },
  } = useContext(FoodContext);
  const [worldCupFoodList, setWorldCupFoodList] = useState([]);
  const [topItem, setTopItem] = useState();
  const [bottomItem, setBottomItem] = useState();
  const [nextList, setNextList] = useState([]);
  const [grade, setGrade] = useState(defaultGrade);

  // nextList 초기화
  useFocusEffect(useCallback(() => {
    setNextList([]);
  }, []));

  // worldCupFoodList 초기화 및 불변성 관리
  useEffect(() => {
    const list = [...foodWorldCupList];
    if (list.length > grade) {
      while (list.length > grade) {
        list.splice(0, 1);
      }
    }
    setWorldCupFoodList(list);
  }, [startWorldCup, foodWorldCupList]);

  useEffect(() => {
    if (worldCupFoodList.length > 1) {
      setTopItem(worldCupFoodList[0]);
      setBottomItem(worldCupFoodList[worldCupFoodList.length - 1]);
    }
  }, [worldCupFoodList]);

  const selectItem = (selected) => {
    if (selected === 'top') {
      const newList = [...worldCupFoodList];
      const newItem = newList.splice(0, 1);
      newList.pop();
      setWorldCupFoodList(() => newList);
      nextList.push(...newItem);
    } else {
      const newList = [...worldCupFoodList];
      const newItem = newList.pop();
      newList.splice(0, 1);
      setWorldCupFoodList(() => newList);
      nextList.push(newItem);
    }
    // 방금 선택지가 마지막 선택지였다면 다음 토너먼트로
    if (worldCupFoodList.length === 2 && nextList.length >= 2) {
      const nextTournament = [...nextList];
      setWorldCupFoodList(() => nextTournament);
      setNextList([]);
      setGrade(nextList.length);
    }
    // 방금 선택지가 마지막 선택지였고 다음 토너먼트도 없다면 최종 선택
    if (worldCupFoodList.length === 2 && nextList.length < 2) {
      if (selected === 'top') {
        setSelectedItem(worldCupFoodList[0]);
      } else {
        setSelectedItem(worldCupFoodList[1]);
      }
      setIsSelectedDone(true);
    }
  };
  console.log(topItem);

  return (
    <ScrollView contentContainerStyle={styles.container} style={{ width: '100%' }}>
      <Text style={{ fontSize: 18 }}>
        {grade === 2
          ? '결승'
          : `${(nextList.length + 1) * 2} / ${grade}강`}
      </Text>
      <View style={styles.item}>
        <FoodCard
          item={topItem}
          selectItem={() => selectItem('top')}
          worldCup
        />
      </View>
      <Text style={{
        fontSize: 32,
        fontWeight: 'bold',
        textAlignVertical: 'center',
      }}
      >
        VS
      </Text>
      <View style={styles.item}>
        <FoodCard
          item={bottomItem}
          selectItem={() => {
            selectItem('bottom');
          }}
          worldCup
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  item: {
    width: '100%',
    alignItems: 'center',
    minHeight: 225,
  },
});

export default AfterStartView;
