import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

const Input = ({ onChangeText }) => (
  <>
    <TextInput
      placeholder="ㅎㅇㅎㅇ"
      style={styles.input}
      onChangeText={onChangeText}
    />
  </>
);

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 1,
  },
});

export default Input;
