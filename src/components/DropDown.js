import React from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { StyleSheet } from 'react-native';

const DropDown = ({
  open, setOpen, value, setValue, items, setItems, onChangeValue, ...rest
}) => (
  <DropDownPicker
    open={open}
    value={value}
    items={items}
    setOpen={setOpen}
    setValue={setValue}
    setItems={setItems}
    onChangeValue={onChangeValue}
    dropDownContainerStyle={styles.dropDownContainer}
    dropDownStyle={styles.dropDownContainer}
    style={styles.picker}
    {...rest}
  />
);

DropDown.defaultProps = {
  onChangeValue: () => {},
};

const styles = StyleSheet.create({
  picker: {
    backgroundColor: '#ffffff',
    shadowColor: '#7d7d7d',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6,
    borderWidth: 0,
    elevation: 14,
  },
  dropDownContainer: {
    borderColor: 'lightgray',
  },
});

export default DropDown;
