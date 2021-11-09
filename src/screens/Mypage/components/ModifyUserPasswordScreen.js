import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Input from '../../../components/Input';
import { validatePwd } from '../../../utils/validate';
import Button from '../../../components/Button';
import { Context as AuthContext } from '../../../context/auth/authContext';
import { Context as PopUpContext } from '../../../context/popup/popUpContext';
import { screens } from '../../../constants/screens';

const ModifyUserPasswordScreen = ({ navigation }) => {
  const {
    modifyUserPassword,
  } = useContext(AuthContext);
  const {
    showAlert,
    dismissAlert,
  } = useContext(PopUpContext);

  const [pwd, setPwd] = useState();
  const [pwdCheck, setPwdCheck] = useState();

  const validate = !validatePwd(pwd) || pwd !== pwdCheck;

  const onSubmit = () => {
    modifyUserPassword(pwd, (response, error) => {
      if (response) {
        showAlert({
          message: '비밀번호가 성공적으로 변경되었습니다.',
          onConfirm: () => {
            navigation.goBack();
            dismissAlert();
          },
        });
      }
      if (error) {
        showAlert({
          message: error.message,
          onConfirm: dismissAlert,
        });
      }
    });
  };
  return (
    <View style={styles.container}>
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
        title="비밀번호 변경"
        containerStyle={{ marginTop: 36 }}
        disabled={validate}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    marginTop: 8,
  },
  empty: {
    height: 10,
    marginTop: 8,
  },
  warn: {
    fontSize: 10,
    lineHeight: 10,
    marginTop: 8,
    color: '#eb1e1e',
  },
});

ModifyUserPasswordScreen.navigationOptions = {
  title: '비밀번호 변경',
};

export default ModifyUserPasswordScreen;
