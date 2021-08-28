import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Input from '../../_components/Input';

const SignInScreen = () => (
  <View style={styles.container}>
    <Input />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

export default SignInScreen;
