import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { buttonStyles } from '../styles/Button.styles';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  loading?: boolean;
}

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
    variant === 'primary' ? buttonStyles.primaryText : buttonStyles.secondaryText,
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
          color={variant === 'primary' ? '#FFFFFF' : '#007AFF'}
        />
      ) : (
        <Text style={textStyle}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;
