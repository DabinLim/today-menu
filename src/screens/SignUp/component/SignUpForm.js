import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
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
  const validate = !validateEmail(email)
    || !validateName(nickname)
    || !validatePwd(pwd)
    || pwd !== pwdCheck;

  const onSubmit = async () => {
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
        });
      }
    });
  };

  return (
    <View style={styles.container}>
      <Input
        onChangeText={(e) => { setEmail(e); }}
        placeholder="Email"
        keyboardType="email-address"
      />
      {/* todo 비밀번호 찾기에 사용되므로 정확한 이메일을 입력해주세요. 이메일은 분실시 찾을 수 없습니다. */}
      {email && !validateEmail(email) ? (
        <Text style={styles.warn}>이메일 형식이 올바르지 않습니다.</Text>
      ) : <View style={styles.empty} />}
      <Input
        onChangeText={(e) => { setNickname(e); }}
        placeholder="Nickname"
        inputStyle={styles.input}
      />
      {nickname && !validateName(nickname) ? (
        <Text style={styles.warn}>닉네임은 2~8글자의 한글 또는 영문자로 설정해주세요.</Text>
      ) : <View style={styles.empty} />}
      <Input
        onChangeText={(e) => { setPwd(e); }}
        placeholder="Password"
        textContentType="password"
        inputStyle={styles.input}
      />
      {pwd && !validatePwd(pwd) ? (
        <Text style={styles.warn}>비밀번호는 8~16글자의 영문, 숫자, 특수문자를 포함하여 설정해주세요.</Text>
      ) : <View style={styles.empty} />}
      <Input
        onChangeText={(e) => { setPwdCheck(e); }}
        placeholder="PasswordCheck"
        textContentType="password"
        inputStyle={styles.input}
      />
      {pwdCheck && pwd !== pwdCheck ? (
        <Text style={styles.warn}>비밀번호가 일치하지 않습니다.</Text>
      ) : <View style={styles.empty} />}
      <Button
        type="dark"
        onPress={onSubmit}
        title="회원가입"
        containerStyle={{ marginTop: 36 }}
        disabled={validate}
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
  input: {
    marginTop: 8,
  },
  warn: {
    fontSize: 10,
    lineHeight: 10,
    marginTop: 8,
    color: '#eb1e1e',
  },
  empty: {
    height: 10,
    marginTop: 8,
  },
  emailNotice: {
    fontSize: 14,
  },
});

export default SignUpForm;
