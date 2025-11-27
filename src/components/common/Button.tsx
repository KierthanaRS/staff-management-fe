import React from 'react';
import { ActivityIndicator, TouchableOpacity, Text } from 'react-native';
import { ButtonProps } from '../../types';
import { buttonStyles } from '../styles/Button.styles';
import { theme } from '../../theme';

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
}) => {
  const buttonStyle = [
    buttonStyles.button,
    variant === 'primary' ? buttonStyles.primary : buttonStyles.secondary,
    disabled && buttonStyles.disabled,
  ];

  const textStyle = [
    buttonStyles.text,
    variant === 'primary'
      ? buttonStyles.primaryText
      : buttonStyles.secondaryText,
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' ? theme.colours.background : theme.colours.primary}
        />
      ) : (
        <Text style={textStyle}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;
