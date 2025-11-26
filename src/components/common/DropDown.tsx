import React from 'react';
import { View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { dropDownStyles } from '../styles/DropDown.styles';

interface DropDownItem {
  label: string;
  value: string;
}

interface DropDownProps {
  label?: string;
  selectedValue: string;
  onValueChange: (value: string) => void;
  items: DropDownItem[];
  placeholder?: string;
  error?: string;
}

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
          {items.map((item) => (
            <Picker.Item key={item.value} label={item.label} value={item.value} />
          ))}
        </Picker>
      </View>
      {error && <Text style={dropDownStyles.errorText}>{error}</Text>}
    </View>
  );
};

export default DropDown;
