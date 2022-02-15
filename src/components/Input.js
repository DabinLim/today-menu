import React, { forwardRef } from 'react';
import { StyleSheet, TextInput, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';

const Input = forwardRef(({
  onChangeText, placeholder, textContentType, inputStyle, keyboardType, value, ...rest
}, ref) => (
  <>
    <TextInput
      placeholder={placeholder}
      placeholderTextColor="#B0B0C3"
      textContentType={textContentType}
      style={[styles.input, inputStyle]}
      onChangeText={onChangeText}
      secureTextEntry={textContentType === 'password'}
      keyboardType={keyboardType}
      autoCapitalize="none"
      autoCorrect={false}
      autoCompleteType="off"
      value={value}
      ref={ref}
      {...rest}
    />
  </>
));

Input.defaultProps = {
  inputStyle: {},
  textContentType: 'none',
  placeholder: undefined,
};

Input.propTypes = {
  onChangeText: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  textContentType: PropTypes.string,
  inputStyle: ViewPropTypes.style,
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#F5F5F5',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    fontSize: 18,
    marginTop: 14,
    color: '#000000',
  },
});

export default Input;
