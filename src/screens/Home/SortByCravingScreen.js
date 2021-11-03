import React, {
  useCallback, useContext, useEffect, useState,
} from 'react';
import {
  SafeAreaView, StyleSheet, View,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { get } from 'lodash';
import BeforeStartQuestView from './components/BeforeStartQuestView';
import AfterStartQuestView from './components/AfterStartQuestView';
import SelectedFoodView from '../../components/SelectedFoodView';
import { Context as FoodContext } from '../../context/food/foodContext';
import { Context as PopUpContext } from '../../context/popup/popUpContext';
import Button from '../../components/Button';
import { screens } from '../../constants/screens';

const SortByCravingScreen = ({ navigation: { navigate } }) => {
  const {
    state: {
      selectedFoodByType,
    },
    getFoodByType,
  } = useContext(FoodContext);
  const {
    showAlert,
    dismissAlert,
  } = useContext(PopUpContext);

  const [scenarioIdx, setScenarioIdx] = useState();
  const [isStart, setIsStart] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [answerList, setAnswerList] = useState([]);
  const [negativeList, setNegativeList] = useState([]);

  const selectedFoodName = get(selectedFoodByType, 'name');

  useFocusEffect(
    useCallback(() => {
      setIsStart(false);
      setAnswerList([]);
      setNegativeList([]);
      setIsDone(false);
    }, []),
  );

  useEffect(() => {
    if (isDone) {
      const answers = {};
      answerList.forEach((v) => {
        answers[v] = true;
      });
      negativeList.forEach((v) => {
        answers[v] = false;
      });
      getFoodByType(answers, (error) => {
        if (error) {
          showAlert({
            message: error.message,
            onConfirm: dismissAlert,
          });
        }
      });
    }
  }, [isDone]);

  const resetQuestion = () => {
    setIsStart(false);
    setAnswerList([]);
    setNegativeList([]);
    setIsDone(false);
  };

  const goToFindRestaurant = () => {
    navigate(screens.FOOD_MAP_SCREEN.name, { keyword: selectedFoodName });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* eslint-disable-next-line no-nested-ternary */}
      {isDone ? (
        <View style={styles.selectedContainer}>
          <SelectedFoodView
            selectedFood={selectedFoodByType}
            isSelected
          />
          <View style={{ width: '100%' }}>
            <Button
              onPress={goToFindRestaurant}
              title={`${selectedFoodName} 맛집 찾기`}
              type="dark"
            />
            <Button
              onPress={resetQuestion}
              title="처음으로"
              type="gray"
              containerStyle={{ marginTop: 20 }}
            />
          </View>
        </View>
      ) : (
        isStart ? (
          <AfterStartQuestView
            scenarioIdx={scenarioIdx}
            setIsDone={setIsDone}
            setAnswerList={setAnswerList}
            answerList={answerList}
            negativeList={negativeList}
            setNegativeList={setNegativeList}
          />
        ) : (
          <BeforeStartQuestView
            setScenarioIdx={setScenarioIdx}
            setIsStart={setIsStart}
            setAnswerList={setAnswerList}
            answerList={answerList}
          />
        )
      )}
    </SafeAreaView>
  );
};

SortByCravingScreen.navigationOptions = {
  title: '오늘 뭐 먹지?',
};

const styles = StyleSheet.create({
  selectedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
});

export default SortByCravingScreen;
