import React, { useState, useContext, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import { validateEmail, validateName, validatePwd } from '../../../utils/validate';
import { Context as AuthContext } from '../../../context/auth/authContext';
import { Context as PopUpContext } from '../../../context/popup/popUpContext';

const SignUpForm = () => {
  const {
    signUpAction,
    signInAction,
  } = useContext(AuthContext);
  const { showAlert, dismissAlert } = useContext(PopUpContext);

  const [email, setEmail] = useState();
  const [nickname, setNickname] = useState();
  const [pwd, setPwd] = useState();
  const [pwdCheck, setPwdCheck] = useState();
  const validate = validateEmail(email)
    && validateName(nickname)
    && validatePwd(pwd)
    && pwd === pwdCheck;
  const nickNameRef = useRef();
  const pwdRef = useRef();
  const pwdCheckRef = useRef();

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
            handleSignIn();
            dismissAlert();
          },
        });
      }
    });
  };

  const handleSignIn = () => {
    signInAction(email, pwd, (user, error) => {
      if (error) {
        showAlert({
          message: error.message,
          onConfirm: dismissAlert,
        });
      }
    });
  };

  return (
    <View>
      <Input
        onChangeText={(e) => { setEmail(e); }}
        placeholder="이메일"
        keyboardType="email-address"
        returnKeyType="next"
        onSubmitEditing={() => nickNameRef?.current.focus()}
      />
      {email && !validateEmail(email) ? (
        <Text style={styles.warn}>비밀번호 찾기에 사용되므로 정확한 이메일을 입력해주세요.</Text>
      ) : <View style={styles.empty} />}
      <Input
        onChangeText={(e) => { setNickname(e); }}
        placeholder="닉네임"
        inputStyle={styles.input}
        returnKeyType="next"
        ref={nickNameRef}
        onSubmitEditing={() => pwdRef?.current.focus()}
      />
      {nickname && !validateName(nickname) ? (
        <Text style={styles.warn}>닉네임은 2~8글자의 한글 또는 영문자로 설정해주세요.</Text>
      ) : <View style={styles.empty} />}
      <Input
        onChangeText={(e) => { setPwd(e); }}
        placeholder="비밀번호"
        textContentType="password"
        inputStyle={styles.input}
        returnKeyType="next"
        ref={pwdRef}
        onSubmitEditing={() => pwdCheckRef?.current?.focus()}
      />
      {pwd && !validatePwd(pwd) ? (
        <Text style={styles.warn}>비밀번호는 8~16글자의 영문, 숫자, 특수문자를 포함하여 설정해주세요.</Text>
      ) : <View style={styles.empty} />}
      <Input
        onChangeText={(e) => { setPwdCheck(e); }}
        placeholder="비밀번호 확인"
        textContentType="password"
        inputStyle={styles.input}
        returnKeyType="done"
        ref={pwdCheckRef}
        onSubmitEditing={validate ? onSubmit : () => {}}
      />
      {pwdCheck && pwd !== pwdCheck ? (
        <Text style={styles.warn}>비밀번호가 일치하지 않습니다.</Text>
      ) : <View style={styles.empty} />}
      <Button
        type="dark"
        onPress={onSubmit}
        title="회원가입"
        containerStyle={{ marginTop: 36 }}
        disabled={!validate}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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
    lineHeight: 14,
    marginTop: 8,
    color: '#eb1e1e',
  },
  empty: {
    height: 14,
    marginTop: 8,
  },
  emailNotice: {
    fontSize: 14,
  },
});

export default SignUpForm;
