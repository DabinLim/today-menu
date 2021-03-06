import React, {
  useContext, useEffect, useState, useCallback,
} from 'react';
import {
  Dimensions, Image,
  SafeAreaView, StyleSheet, View,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { get } from 'lodash';
import Button from '../../components/Button';
import { Context as FoodContext } from '../../context/food/foodContext';
import { Context as PopUpContext } from '../../context/popup/popUpContext';
import { images } from '../../constants/assets';
import SelectedFoodView from '../../components/SelectedFoodView';
import { screens } from '../../constants/screens';
import DropDown from '../../components/DropDown';
import { foodTypes } from './utils';

const RandomFoodScreen = ({ navigation: { navigate } }) => {
  const {
    state: {
      randomFood,
      selectedFoodByType,
    },
    getRandomFood,
    getFoodByType,
  } = useContext(FoodContext);
  const { showAlert, dismissAlert } = useContext(PopUpContext);

  const [selectedFood, setSelectedFood] = useState({
    id: null,
    name: '',
    imageUrl: images.LOGO_IMAGE,
  });
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(false);
  const [items, setItems] = useState(foodTypes);
  const isSelected = get(selectedFood, 'id');
  const selectedFoodName = get(selectedFood, 'name');

  useFocusEffect(
    useCallback(() => {
      setSelectedFood({
        id: null,
        name: '',
        imageUrl: images.LOGO_IMAGE,
      });
      setValue(null);
    }, []),
  );

  useEffect(() => {
    const id = get(selectedFoodByType, 'id');
    const name = get(selectedFoodByType, 'name');
    const imageUrl = get(selectedFoodByType, 'imageUrl');
    const type = get(selectedFoodByType, 'type');
    const country = get(selectedFoodByType, 'country');
    setSelectedFood({
      id,
      name,
      imageUrl,
      type,
      country,
    });
  }, [selectedFoodByType]);

  useEffect(() => {
    const id = get(randomFood, 'id');
    const name = get(randomFood, 'name');
    const imageUrl = get(randomFood, 'imageUrl');
    const type = get(randomFood, 'type');
    const country = get(randomFood, 'country');
    setSelectedFood({
      id,
      name,
      imageUrl,
      type,
      country,
    });
  }, [randomFood]);

  const selectFood = () => {
    if (!value) {
      showAlert({
        message: '?????? ????????? ???????????????.',
        onConfirm: dismissAlert,
      });
      return;
    }
    if (value === 'All') {
      getRandomFood((error) => {
        if (error) {
          showAlert({
            message: error.message,
            onConfirm: dismissAlert,
          });
        }
      });
    } else {
      const foodType = {};
      foodType[value] = true;
      getFoodByType(foodType, (error) => {
        if (error) {
          showAlert({
            message: error.message,
            onConfirm: dismissAlert,
          });
        }
      });
    }
  };

  const goToFindRestaurant = () => {
    navigate(screens.FOOD_MAP_SCREEN.name, { keyword: selectedFoodName });
  };

  const resetFood = () => {
    setSelectedFood({
      id: null,
      name: '',
      imageUrl: images.LOGO_IMAGE,
    });
    setValue(null);
  };

  const width = Dimensions.get('window').width / 1.1;
  const height = width;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={{ width: '100%', flex: 1 }}>
          {isSelected
          && (
            <>
              <SelectedFoodView
                selectFood={selectFood}
                selectedFood={selectedFood}
                isSelected={isSelected}
              />
              <View style={{ flexDirection: 'row' }}>
                <Button
                  onPress={resetFood}
                  title="????????????"
                  type="gray"
                  containerStyle={styles.buttonLeft}
                />
                <Button
                  onPress={goToFindRestaurant}
                  title="?????? ??????"
                  type="dark"
                  containerStyle={styles.buttonRight}
                />
              </View>
            </>
          )}
          {!isSelected && (
            <View style={{ flex: 1 }}>
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Image
                  source={images.RANDOM_FOOD}
                  style={{ width, height }}
                />
              </View>
              <DropDown
                open={open}
                setOpen={setOpen}
                value={value}
                setValue={setValue}
                items={items}
                setItems={setItems}
                showArrowIcon={false}
                placeholder="?????? ????????? ???????????????"
              />
              <Button
                onPress={selectFood}
                title="?????? ?????? ??????"
                type="dark"
                containerStyle={{ marginTop: 20 }}
              />
            </View>
          )}
        </View>
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
    justifyContent: 'center',
    width: '100%',
  },
  buttonLeft: {
    flex: 0.3,
  },
  buttonRight: {
    flex: 0.7,
    marginLeft: 20,
  },
});

export default RandomFoodScreen;
