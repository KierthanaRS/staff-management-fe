import React from 'react';
import { DropDownProps } from '../../types';
import { dropDownStyles } from '../styles/DropDown.styles';
import { Picker } from '@react-native-picker/picker';
import { View, Text } from 'react-native';

const DropDown: React.FC<DropDownProps> = ({
  label,
  selectedValue,
  onValueChange,
  items,
  placeholder = 'Select an option',
  error,
}) => {
  return (
    <View style={dropDownStyles.container}>
      {label && <Text style={dropDownStyles.label}>{label}</Text>}
      <View style={dropDownStyles.pickerContainer}>
        <Picker
          selectedValue={selectedValue}
          onValueChange={onValueChange}
          style={dropDownStyles.picker}
        >
          <Picker.Item label={placeholder} value="" />
          {items.map(item => (
            <Picker.Item
              key={item.value}
              label={item.label}
              value={item.value}
            />
          ))}
        </Picker>
      </View>
      {error && <Text style={dropDownStyles.errorText}>{error}</Text>}
    </View>
  );
};

export default DropDown;
