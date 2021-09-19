import React, { useState, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import { validateEmail, validateName, validatePwd } from '../../../utils/validate';
import { Context as AuthContext } from '../../../context/auth/authContext';
import { Context as PopUpContext } from '../../../context/popup/popUpContext';
import { screens } from '../../../constants/screens';

const SignUpForm = ({ navigate }) => {
  const {
    signUpAction,
  } = useContext(AuthContext);
  const { showAlert, dismissAlert } = useContext(PopUpContext);

  const [email, setEmail] = useState();
  const [nickname, setNickname] = useState();
  const [pwd, setPwd] = useState();
  const [pwdCheck, setPwdCheck] = useState();

  const onSubmit = async () => {
    if (!email || !nickname || !pwd || !pwdCheck) {
      showAlert({
        message: '공란이 있습니다. 빈칸을 채워주세요.',
        onConfirm: dismissAlert,
      });
      return;
    }
    if (!validateEmail(email) || !validatePwd(pwd)) {
      showAlert({
        message: '이메일 또는 비밀번호 형식이 올바르지 않습니다.',
        onConfirm: dismissAlert,
      });
      return;
    } if (!validateName(nickname)) {
      showAlert({
        message: '닉네임은 2~8글자의 한글 또는 영문자로 설정해주세요.',
        onConfirm: dismissAlert,
      });
      return;
    } if (pwd !== pwdCheck) {
      showAlert({
        message: '비밀번호가 일치하지 않습니다.',
        onConfirm: dismissAlert,
      });
      return;
    }
    signUpAction(email, pwd, nickname, (user, error) => {
      if (error) {
        showAlert({
          message: error.message,
          onConfirm: dismissAlert,
        });
      } else {
        showAlert({
          message: '회원가입이 완료되었습니다.',
          onConfirm: () => {
            navigate(screens.SIGN_IN.name);
            dismissAlert();
          },
          backPress: () => {
            navigate(screens.SIGN_IN.name);
            dismissAlert();
          },
          onCancel: dismissAlert,
        });
      }
    });
  };

  return (
    <View style={styles.container}>
      <Input
        onChangeText={(e) => { setEmail(e); }}
        placeholder="Email"
      />
      <Input
        onChangeText={(e) => { setNickname(e); }}
        placeholder="Nickname"
        inputStyle={{ marginTop: 24 }}
      />
      <Input
        onChangeText={(e) => { setPwd(e); }}
        placeholder="Password"
        textContentType="password"
        inputStyle={{ marginTop: 24 }}
      />
      <Input
        onChangeText={(e) => { setPwdCheck(e); }}
        placeholder="PasswordCheck"
        textContentType="password"
        inputStyle={{ marginTop: 24 }}
      />
      <Button
        type="dark"
        onPress={onSubmit}
        title="회원가입"
        containerStyle={{ marginTop: 48 }}
      />
    </View>
  );
};

SignUpForm.propTypes = {
  navigate: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },
  findUserInfoButton: {
    marginTop: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default SignUpForm;
