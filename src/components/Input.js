import React from 'react';
import { StyleSheet, TextInput, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';

const Input = ({
  onChangeText, placeholder, textContentType, inputStyle, keyboardType,
}) => (
  <>
    <TextInput
      lab
      placeholder={placeholder}
      textContentType={textContentType}
      style={[styles.input, inputStyle]}
      onChangeText={onChangeText}
      secureTextEntry={textContentType === 'password'}
      keyboardType={keyboardType}
      autoCapitalize={'none'}
    />
  </>
);

Input.defaultProps = {
  inputStyle: {},
  textContentType: 'none',
};

Input.propTypes = {
  onChangeText: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  textContentType: PropTypes.string,
  inputStyle: ViewPropTypes.style,
};

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 1,
    paddingVertical: 12,
    fontSize: 18,
    marginTop: 14,
  },
});

export default Input;
