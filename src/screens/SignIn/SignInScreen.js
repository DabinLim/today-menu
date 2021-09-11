import React from 'react';
import {
  View, StyleSheet, Image, Text, SafeAreaView,
} from 'react-native';
import PropTypes from 'prop-types';
import SignInForm from './component/SignInForm';
import { images } from '../../constants/assets';
import Button from '../../_components/Button';
import { screens } from '../../constants/screens';

const SignInScreen = ({ navigation: { navigate } }) => {
  const onHandleSkipSignIn = () => {
    navigate(screens.HOME.name);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.imageBox}>
          <Image source={images.LOGO_IMAGE} style={{ width: 200, height: 150 }} />
        </View>
        <SignInForm />
        <Button
          type="gray"
          onPress={onHandleSkipSignIn}
          title="로그인 생략하기"
          containerStyle={{ marginTop: 32 }}
        />
        <View style={styles.noAccount}>
          <Text style={{ fontSize: 13, color: '#839191' }}>
            아직 아이디가 없다면?
          </Text>
          <Button
            type="underline"
            onPress={() => { navigate(screens.SIGN_UP.name); }}
            title="회원가입"
            containerStyle={{ marginLeft: 8 }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

SignInScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

SignInScreen.navigationOptions = {
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

export default SignInScreen;
