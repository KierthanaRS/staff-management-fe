import React, { useState } from 'react';
import { InputFieldProps } from '../../types';
import { inputFieldStyles } from '../styles/InputField.styles';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { theme } from '../../theme';

const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'none',
  error,
  icon,
  onIconPress,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const inputContainerStyle = [
    inputFieldStyles.inputContainer,
    isFocused && inputFieldStyles.inputContainerFocused,
    error && inputFieldStyles.inputContainerError,
  ];

  return (
    <View style={inputFieldStyles.container}>
      {label && <Text style={inputFieldStyles.label}>{label}</Text>}
      <View style={inputContainerStyle}>
        <TextInput
          style={inputFieldStyles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={theme.colours.muted}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          underlineColorAndroid="transparent" 
        />
        {icon && (
          <TouchableOpacity onPress={onIconPress} style={inputFieldStyles.icon}>
            {icon}
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={inputFieldStyles.errorText}>{error}</Text>}
    </View>
  );
};

export default InputField;
