import React from 'react';
import {
  View, Text, StyleSheet, SafeAreaView, Image,
} from 'react-native';
import PropTypes from 'prop-types';
import { screens } from '../../constants/screens';
import { images } from '../../constants/assets';
import Button from '../../components/Button';

const HomeScreen = ({ navigation: { navigate } }) => {
  const goToQuestion = () => {
    navigate(screens.SORT_BY_CRAVING.name);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={{ width: '100%', alignItems: 'center' }}>
          <Text style={styles.title}>
            선택 장애인 당신을 위한 솔루션
          </Text>
          <Image source={images.LOGO_IMAGE} style={styles.image} resizeMode="contain" />
        </View>
        <Button type="dark" onPress={goToQuestion} title="오늘 메뉴 정하기" />
      </View>
    </SafeAreaView>
  );
};

HomeScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 24,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 40,
  },
  image: {
    width: '100%',
    marginTop: 80,
  },
});

export default HomeScreen;
