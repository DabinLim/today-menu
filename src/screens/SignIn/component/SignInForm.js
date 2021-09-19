import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Input from '../../../components/Input';
import Button from '../../../components/Button';

const SignInForm = () => {
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');

  console.log(email, pwd);

  const onSubmit = () => {

  };

  const onHandleFindEmail = () => {

  };

  const onHandleFindPassword = () => {

  };

  return (
    <View style={styles.container}>
      <Input
        onChangeText={(e) => { setEmail(e); }}
        placeholder="Email"
      />
      <Input
        onChangeText={(e) => { setPwd(e); }}
        placeholder="Password"
        textContentType="password"
      />
      <View style={styles.findUserInfoButton}>
        <Button
          type="text"
          onPress={onHandleFindEmail}
          title="아이디 찾기"
        />
        <Text style={{ color: '#839191' }}>
          {'  |  '}
        </Text>
        <Button
          type="text"
          onPress={onHandleFindPassword}
          title="비밀번호 찾기"
        />
      </View>
      <Button
        type="dark"
        onPress={onSubmit}
        title="로그인"
        containerStyle={{ marginTop: 32 }}
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

export default SignInForm;
