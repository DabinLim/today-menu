import React, { useContext } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { Context as FoodContext } from '../../../context/food/foodContext';
import { images } from '../../../constants/assets';
import Button from '../../../components/Button';

const BeforeStartView = ({ setStartWorldCup }) => {
  const {
    getRandomFoodList,
  } = useContext(FoodContext);

  const startFoodWorldCup = () => {
    getRandomFoodList();
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
