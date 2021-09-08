import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Input from '../../../_components/Input';
import Button from '../../../_components/Button';
import { validateEmail, validateName, validatePwd } from '../../../utils/validate';
import { requestSignUp } from '../../../recoil/auth/authApis';

const SignUpForm = () => {
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
    }
    const { data, error } = await requestSignUp(email, pwd, nickname);
    console.log(data, error);
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
        onSubmit={onSubmit}
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
