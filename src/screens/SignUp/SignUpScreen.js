import React from 'react';
import {
  View, StyleSheet, Text, Image,
} from 'react-native';
import { images } from '../../constants/assets';
import SignUpForm from './component/SignUpForm';
import Button from '../../_components/Button';
import { screens } from '../../constants/screens';

// eslint-disable-next-line react/prop-types
const SignUpScreen = ({ navigation: { navigate } }) => (
  <View style={styles.container}>
    <View style={styles.imageBox}>
      <Image source={images.LOGO_IMAGE} style={{ width: 200, height: 150 }} />
    </View>
    <SignUpForm />
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
