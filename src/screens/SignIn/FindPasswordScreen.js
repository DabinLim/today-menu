import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Input from '../../components/Input';
import { validateEmail, validateName } from '../../utils/validate';
import Button from '../../components/Button';
import { requestFindPassword } from '../../context/auth/authApis';

const FindPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const nameRef = useRef(null);
  const validate = email && name && validateName(name) && validateEmail(email);

  const onSubmit = async () => {
    await requestFindPassword(email, name);
  };
  return (
    <View style={styles.container}>
      <Input
        onChangeText={(e) => { setEmail(e); }}
        placeholder="이메일"
        onSubmitEditing={() => { nameRef?.current.focus(); }}
      />
      {email && !validateEmail(email) ? (
        <Text style={styles.warn}>이메일 형식이 올바르지 않습니다.</Text>
      ) : <View style={styles.empty} />}
      <Input
        onChangeText={(e) => { setName(e); }}
        placeholder="닉네임"
        ref={nameRef}
        onSubmitEditing={validate ? onSubmit : () => {}}
      />
      <Button
        type="dark"
        onPress={onSubmit}
        title="로그인"
        containerStyle={{ marginTop: 50 }}
        disabled={!validate}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
});

FindPasswordScreen.navigationOptions = {
  title: '비밀번호 찾기',
};

export default FindPasswordScreen;
