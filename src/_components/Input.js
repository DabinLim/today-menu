import React from 'react';
import { StyleSheet, TextInput, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';

const Input = ({
  onChangeText, placeholder, textContentType, inputStyle,
}) => (
  <>
    <TextInput
      lab
      placeholder={placeholder}
      textContentType={textContentType}
      style={[styles.input, inputStyle]}
      onChangeText={onChangeText}
      secureTextEntry={textContentType === 'password'}
    />
  </>
);

Input.propTypes = {
  onChangeText: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  textContentType: PropTypes.string,
  inputStyle: ViewPropTypes.style,
};

Input.defaultProps = {
  inputStyle: {},
  textContentType: 'none',
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
