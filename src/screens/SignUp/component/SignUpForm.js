import React, { useState, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import Input from '../../../_components/Input';
import Button from '../../../_components/Button';
import { validateEmail, validateName, validatePwd } from '../../../utils/validate';
import { Context as AuthContext } from '../../../context/auth/AuthContext';

const SignUpForm = () => {
  const {
    signUpAction,
  } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [pwd, setPwd] = useState('');
  const [pwdCheck, setPwdCheck] = useState('');

  const onSubmit = async () => {
    if (!validateEmail(email) || !validatePwd(pwd)) {
      alert('이메일 또는 비밀번호 형식이 올바르지 않습니다.');
      return;
    } if (!validateName(nickname)) {
      alert('닉네임은 2~8글자의 한글 또는 영문자로 설정해주세요.');
      return;
    } if (pwd !== pwdCheck) {
      alert('비밀번호가 일치하지 않습니다.');
    }
    signUpAction(email, pwd, nickname, (error) => {
      alert(error);
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
