import React, { useContext, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Input from '../../components/Input';
import { validateEmail, validateName } from '../../utils/validate';
import Button from '../../components/Button';
import { requestFindPassword } from '../../context/auth/authApis';
import { Context as PopUpContext } from '../../context/popup/popUpContext';
import { handleError } from '../../context/utils';

const FindPasswordScreen = () => {
  const { showAlert, dismissAlert } = useContext(PopUpContext);

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const nameRef = useRef(null);
  const validate = email && name && validateName(name) && validateEmail(email);

  const onSubmit = async () => {
    try {
      await requestFindPassword(email, name);
      showAlert({
        message: '임시 비밀번호가 입력하신 이메일로 발송되었습니다.\n로그인 후 변경해주세요.',
        onConfirm: dismissAlert,
      });
    } catch (e) {
      const error = handleError(e);
      if (error.status === 404) {
        showAlert({
          message: '존재하지 않는 이메일이거나\n등록된 이메일과 이메일이 일치하지 않습니다.\n다시 확인해주세요.',
          onConfirm: dismissAlert,
        });
      }
    }
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
      {name && !validateName(name) ? (
        <Text style={styles.warn}>닉네임은 2~8글자의 한글 또는 영문자 입니다.</Text>
      ) : <View style={styles.empty} />}
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
