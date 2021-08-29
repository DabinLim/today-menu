import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Input from '../../../_components/Input';
import Button from '../../../_components/Button';

const SignUpForm = () => {
  const [email, setEmail] = useState('');
  const [nickName, setNickName] = useState('');
  const [pwd, setPwd] = useState('');
  const [pwdCheck, setPwdCheck] = useState('');

  console.log(email, pwd);

  const onSubmit = () => {

  };

  return (
    <View style={styles.container}>
      <Input
        onChangeText={(e) => { setEmail(e); }}
        placeholder="Email"
      />
      <Input
        onChangeText={(e) => { setNickName(e); }}
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
    marginTop: 50,
  },
  findUserInfoButton: {
    marginTop: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default SignUpForm;
