import React, { useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import { Context as AuthContext } from '../../../context/auth/authContext';
import { Context as PopUpContext } from '../../../context/popup/popUpContext';

const SignInForm = () => {
  const {
    signInAction,
  } = useContext(AuthContext);
  const { showAlert, dismissAlert } = useContext(PopUpContext);

  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');

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
});

export default SignInForm;
