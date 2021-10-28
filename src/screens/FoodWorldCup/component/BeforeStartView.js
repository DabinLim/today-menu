import React, { useContext, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import DropDownPicker from 'react-native-dropdown-picker';
import { Context as FoodContext } from '../../../context/food/foodContext';
import { Context as PopUpContext } from '../../../context/popup/popUpContext';
import { images } from '../../../constants/assets';
import Button from '../../../components/Button';

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
    { label: '라운드를 선택하세요.', value: 0 },
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
  return (
    <>
      <View style={styles.imageContainer}>
        <Image
          source={images.LOGO_IMAGE}
          resizeMode="cover"
          style={{ width: 300, height: 200 }}
        />
      </View>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        onChangeValue={() => {
          setGrade(value);
        }}
      />
      <Button
        onPress={startFoodWorldCup}
        title="음식 월드컵 시작하기"
        type="dark"
        containerStyle={{ marginTop: 20 }}
      />
    </>
  );
};

BeforeStartView.propTypes = {
  setStartWorldCup: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default BeforeStartView;
