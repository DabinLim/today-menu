import React from 'react';
import {
  StyleSheet, Text, TouchableOpacity, ViewPropTypes,
} from 'react-native';
import PropTypes from 'prop-types';

const setContainerStyleByType = (type, disabled) => {
  switch (type) {
    case 'dark':
      return {
        backgroundColor: disabled ? '#e9e9e9' : '#ffa033',
      };
    case 'white':
      return {
        backgroundColor: disabled ? '#F5F5F5' : '#ffffff',
      };
    case 'darkGray':
      return {
        backgroundColor: '#e9e9e9',
      };
    case 'gray':
      return {
        backgroundColor: '#F5F5F5',
      };
    case 'underline':
      return {
        alignSelf: 'flex-start',
        width: 'auto',
        height: 'auto',
      };
    case 'text':
      return {
        alignSelf: 'flex-start',
        width: 'auto',
        height: 'auto',
      };
    default:
      return {};
  }
};

const setTextStyleByType = (type, disabled) => {
  switch (type) {
    case 'dark':
      return {
        color: disabled ? '#B0B0C3' : '#ffffff',
      };
    case 'darkGray':
      return {
        color: '#000',
      };
    case 'white':
      return {
        color: disabled ? '#B0B0C3' : '#000000',
      };
    case 'gray':
      return {
        color: '#2C2929',
      };
    case 'underline':
      return {
        textDecorationLine: 'underline',
        fontSize: 13,
        fontWeight: 'normal',
      };
    case 'text':
      return {
        color: '#838391',
        fontSize: 13,
        fontWeight: 'normal',
      };
    default:
      return {};
  }
};

const Button = ({
  onPress, title, containerStyle, textStyle, type, disabled, clickable,
}) => {
  const containerStyleByType = setContainerStyleByType(type, disabled);
  const textStyleByType = setTextStyleByType(type, disabled);
  const btnDisabled = clickable ? false : disabled;

  return (
    <TouchableOpacity
      style={[styles.button, containerStyleByType, containerStyle]}
      disabled={btnDisabled}
      onPress={onPress}
    >
      <Text style={[styles.text, textStyleByType, textStyle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

Button.defaultProps = {
  containerStyle: {},
  textStyle: {},
  clickable: false,
  disabled: false,
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 60,
    borderRadius: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Button;
