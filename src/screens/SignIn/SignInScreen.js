import React, { useContext } from 'react';
import {
  View, StyleSheet, Image, Text, SafeAreaView,
} from 'react-native';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SignInForm from './component/SignInForm';
import { images } from '../../constants/assets';
import Button from '../../components/Button';
import { screens } from '../../constants/screens';
import { Context as AuthContext } from '../../context/auth/authContext';

const SignInScreen = ({ navigation: { navigate } }) => {
  const {
    setSkipSignIn,
  } = useContext(AuthContext);
  const onHandleSkipSignIn = async () => {
    await AsyncStorage.setItem('skipSignIn', 'skip');
    setSkipSignIn();
  };

  const onHandleFindPassword = () => {

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
        <View style={styles.findPassword}>
          <Text style={{ fontSize: 13, color: '#839191' }}>
            또는
          </Text>
          <Button
            type="underline"
            onPress={onHandleFindPassword}
            title="비밀번호 찾기"
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
  findPassword: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SignInScreen;
