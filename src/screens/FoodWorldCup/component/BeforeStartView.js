import React, { useContext, useState } from 'react';
import {
  Dimensions, Image, StyleSheet, View,
} from 'react-native';
import PropTypes from 'prop-types';
import { Context as FoodContext } from '../../../context/food/foodContext';
import { Context as PopUpContext } from '../../../context/popup/popUpContext';
import { images } from '../../../constants/assets';
import Button from '../../../components/Button';
import DropDown from '../../../components/DropDown';

const BeforeStartView = ({ setStartWorldCup, setGrade }) => {
  const {
    getWorldCupFoodList,
  } = useContext(FoodContext);
  const {
    showAlert,
    dismissAlert,
  } = useContext(PopUpContext);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);
  const [items, setItems] = useState([
    { label: '8강', value: 8 },
    { label: '16강', value: 16 },
    { label: '32강', value: 32 },
    { label: '64강', value: 64 },
  ]);

  const startFoodWorldCup = () => {
    if (value === 0) {
      showAlert({
        message: '라운드를 선택하세요.',
        onConfirm: dismissAlert,
      });
      return;
    }
    getWorldCupFoodList(value);
    setStartWorldCup(true);
  };

  const width = Dimensions.get('window').width / 1.1;
  const height = width;
  return (
    <View style={styles.container}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image
          source={images.FOOD_VERSUS}
          style={{ width, height }}
        />
      </View>
      <DropDown
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        onChangeValue={() => {
          setGrade(value);
        }}
        showArrowIcon={false}
        placeholder="라운드를 선택하세요."
      />
      <Button
        onPress={startFoodWorldCup}
        title="음식 월드컵 시작하기"
        type="dark"
        containerStyle={{ marginTop: 20 }}
      />
    </View>
  );
};

BeforeStartView.propTypes = {
  setStartWorldCup: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 20,
  },
});

export default BeforeStartView;
