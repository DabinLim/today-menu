import React, { useCallback, useState } from 'react';
import {
  SafeAreaView,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import BeforeStartQuestView from './components/BeforeStartQuestView';
import { images } from '../../constants/assets';
import AfterStartQuestView from './components/AfterStartQuestView';

const SortByCravingScreen = () => {
  const [scenarioIdx, setScenarioIdx] = useState();
  const [isStart, setIsStart] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setIsStart(false);
    }, []),
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {isStart ? (
        <AfterStartQuestView
          scenarioIdx={scenarioIdx}
        />
      ) : (
        <BeforeStartQuestView
          setScenarioIdx={setScenarioIdx}
          setIsStart={setIsStart}
        />
      )}
    </SafeAreaView>
  );
};

SortByCravingScreen.navigationOptions = {
  title: '오늘 뭐 먹지?',
};

export default SortByCravingScreen;
