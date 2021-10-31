import React from 'react';
import DropDownPicker from 'react-native-dropdown-picker';

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
    {...rest}
  />
);

DropDown.defaultProps = {
  onChangeValue: () => {},
};

export default DropDown;
