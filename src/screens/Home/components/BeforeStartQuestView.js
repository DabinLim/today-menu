import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import DropDown from '../../../components/DropDown';
import { getFirstQuestion } from '../utils';
import Button from '../../../components/Button';

const BeforeStartQuestView = ({
  setScenarioIdx, setIsStart, setAnswerList, answerList,
}) => {
  const [open, setOpen] = useState(true);
  const [value, setValue] = useState();
  const [items, setItems] = useState(getFirstQuestion);

  const startQuest = () => {
    const newList = answerList;
    newList.push(items[value].key);
    setAnswerList(newList);
    setIsStart(true);
    setScenarioIdx(value);
  };

  return (
    <>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <DropDown
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          placeholder="찾으시는 목록을 골라주세요."
        />
      </View>
      <View style={styles.btnBox}>
        <Button
          title="오늘 메뉴 찾기"
          onPress={startQuest}
          type="dark"
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  btnBox: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
});

export default BeforeStartQuestView;
