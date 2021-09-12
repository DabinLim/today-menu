import React from 'react';
import {
  View, StyleSheet, Text, Image,
} from 'react-native';
import PropTypes from 'prop-types';
import { images } from '../../constants/assets';
import SignUpForm from './component/SignUpForm';
import Button from '../../_components/Button';
import { screens } from '../../constants/screens';

const SignUpScreen = ({ navigation: { navigate } }) => (
  <View style={styles.container}>
    <View style={styles.imageBox}>
      <Image source={images.LOGO_IMAGE} style={{ width: 200, height: 150 }} />
    </View>
    <SignUpForm navigate={navigate} />
    <View style={styles.noAccount}>
      <Text style={{ fontSize: 13, color: '#839191' }}>
        이미 아이디가 있다면?
      </Text>
      <Button
        type="underline"
        onPress={() => { navigate(screens.SIGN_IN.name); }}
        title="로그인"
        containerStyle={{ marginLeft: 8 }}
      />
    </View>
  </View>
);

SignUpScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

SignUpScreen.navigationOptions = {
  headerShown: false,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  imageBox: {
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noAccount: {
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SignUpScreen;
