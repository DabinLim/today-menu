import React, { useContext, useRef, useState } from 'react';
import {
  StyleSheet, Text, View,
} from 'react-native';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import { Context as AuthContext } from '../../../context/auth/authContext';
import { Context as PopUpContext } from '../../../context/popup/popUpContext';
import { validateEmail } from '../../../utils/validate';

const SignInForm = () => {
  const {
    signInAction,
  } = useContext(AuthContext);
  const { showAlert, dismissAlert } = useContext(PopUpContext);

  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const validate = email && pwd && validateEmail(email);

  const pwdRef = useRef();

  const onSubmit = () => {
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
        placeholder="Email"
        onSubmitEditing={() => { pwdRef?.current.focus(); }}
      />
      {email && !validateEmail(email) ? (
        <Text style={styles.warn}>이메일 형식이 올바르지 않습니다.</Text>
      ) : <View style={styles.empty} />}
      <Input
        onChangeText={(e) => { setPwd(e); }}
        placeholder="Password"
        textContentType="password"
        ref={pwdRef}
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
});

export default SignInForm;
