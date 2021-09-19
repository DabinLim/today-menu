import React, {
  useCallback, useContext, useEffect, useState,
} from 'react';
import {
  Dimensions,
  ScrollView, StyleSheet, Text, View,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import PropTypes from 'prop-types';
import { Context as FoodContext } from '../../../context/food/foodContext';
import WorldCupItem from './WorldCupItem';
import Button from '../../../components/Button';

const AfterStartView = ({ setIsSelectedDone, startWorldCup, setSelectedItem }) => {
  const {
    state: {
      randomFoodList,
    },
  } = useContext(FoodContext);
  const [worldCupFoodList, setWorldCupFoodList] = useState([]);
  const [topItem, setTopItem] = useState();
  const [bottomItem, setBottomItem] = useState();
  const [nextList, setNextList] = useState([]);
  const [grade, setGrade] = useState(32);

  // nextList 초기화
  useFocusEffect(useCallback(() => {
    setNextList([]);
  }, []));

  // worldCupFoodList 초기화 및 불변성 관리
  useEffect(() => {
    const list = [...randomFoodList];
    setWorldCupFoodList(list);
  }, [startWorldCup, randomFoodList]);

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
      setIsSelectedDone(true);
      if (selected === 'top') {
        setSelectedItem(worldCupFoodList[0]);
      } else {
        setSelectedItem(worldCupFoodList[1]);
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container} style={{ width: '100%' }}>
      <Text style={{fontSize: 16}}>
        {grade === 2
          ? '결승전 !!'
          : `${(nextList.length + 1) * 2} / ${grade}강`}
      </Text>
      <View style={styles.item}>
        <WorldCupItem item={topItem} />
        <Button
          onPress={() => {
            selectItem('top');
          }}
          title="선택하기"
          type="dark"
        />
      </View>
      <Text style={{
        fontSize: 32,
        fontWeight: 'bold',
        textAlignVertical: 'center',
        marginVertical: 20,
      }}
      >
        VS
      </Text>
      <View style={styles.item}>
        <WorldCupItem item={bottomItem} />
        <Button
          onPress={() => {
            selectItem('bottom');
          }}
          title="선택하기"
          type="dark"
        />
      </View>
    </ScrollView>
  );
};

AfterStartView.propTypes = {
  setIsSelectedDone: PropTypes.func,
  setSelectedItem: PropTypes.func,
  startWorldCup: PropTypes.bool.isRequired,
};

AfterStartView.defaultProps = {
  setIsSelectedDone: () => {
  },
  setSelectedItem: () => {
  },
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  item: {
    width: '100%',
    alignItems: 'center',
  },
});

export default AfterStartView;
