import React, { useContext, useState } from 'react';
import {
  Dimensions, Image, StyleSheet, View,
} from 'react-native';
import DropDown from '../../../components/DropDown';
import { getFirstQuestion } from '../utils';
import Button from '../../../components/Button';
import { Context as PopUpContext } from '../../../context/popup/popUpContext';
import { images } from '../../../constants/assets';

const BeforeStartQuestView = ({
  setScenarioIdx, setIsStart, setAnswerList, answerList,
}) => {
  const { showAlert, dismissAlert } = useContext(PopUpContext);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState();
  const [items, setItems] = useState(getFirstQuestion);

  const width = Dimensions.get('window').width / 1.2;
  const height = width;

  const startQuest = () => {
    if (!value && value !== 0) {
      showAlert({
        message: '찾으시는 목록을 골라주세요.',
        onConfirm: dismissAlert,
      });
      return;
    }
    const newList = answerList;
    newList.push(items[value].key);
    setAnswerList(newList);
    setIsStart(true);
    setScenarioIdx(value);
  };

  return (
    <>
      <View style={styles.container}>
        <Image source={images.WHAT_EAT} style={{ width, height }} />
      </View>
      <View style={styles.btnBox}>
        <DropDown
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          showArrowIcon={false}
          placeholder="찾으시는 목록을 골라주세요."
        />
        <Button
          title="오늘 메뉴 찾기"
          onPress={startQuest}
          type="dark"
          containerStyle={{ marginTop: 20 }}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  btnBox: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
});

export default BeforeStartQuestView;
