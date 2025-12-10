import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { StyleSheet, Text } from 'react-native';
import InputField from '../../src/components/common/InputField';
import { theme } from '../../src/theme';

describe('InputField Component', () => {
  const mockOnChangeText = jest.fn();
  const mockOnIconPress = jest.fn();
  const mockOnFocus = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Text Input', () => {
    it('should call onChangeText when text is entered', () => {
      const { getByPlaceholderText } = render(
        <InputField
          value=""
          onChangeText={mockOnChangeText}
          placeholder="Enter text"
        />
      );

      const input = getByPlaceholderText('Enter text');
      fireEvent.changeText(input, 'Hello World');

      expect(mockOnChangeText).toHaveBeenCalledTimes(1);
      expect(mockOnChangeText).toHaveBeenCalledWith('Hello World');
    });

    it('should update value when text changes', () => {
      const { getByPlaceholderText, rerender } = render(
        <InputField
          value=""
          onChangeText={mockOnChangeText}
          placeholder="Enter text"
        />
      );

      const input = getByPlaceholderText('Enter text');
      fireEvent.changeText(input, 'New value');

      rerender(
        <InputField
          value="New value"
          onChangeText={mockOnChangeText}
          placeholder="Enter text"
        />
      );

      expect(getByPlaceholderText('Enter text').props.value).toBe('New value');
    });

    it('should handle multiple text changes', () => {
      const { getByPlaceholderText } = render(
        <InputField
          value=""
          onChangeText={mockOnChangeText}
          placeholder="Enter text"
        />
      );

      const input = getByPlaceholderText('Enter text');
      
      fireEvent.changeText(input, 'First');
      fireEvent.changeText(input, 'Second');
      fireEvent.changeText(input, 'Third');

      expect(mockOnChangeText).toHaveBeenCalledTimes(3);
      expect(mockOnChangeText).toHaveBeenNthCalledWith(1, 'First');
      expect(mockOnChangeText).toHaveBeenNthCalledWith(2, 'Second');
      expect(mockOnChangeText).toHaveBeenNthCalledWith(3, 'Third');
    });
  });

  describe('Focus State', () => {
    it('should handle onFocus event', () => {
      const { getByPlaceholderText, getByTestId } = render(
        <InputField
          value=""
          onChangeText={() => {}}
          placeholder="Enter text"
        />
      );
    
      const input = getByPlaceholderText("Enter text");
      const container = getByTestId("input-container");

      let flat = StyleSheet.flatten(container.props.style);
      expect(flat.borderColor).not.toBe(theme.colours.primary);
      fireEvent(input, 'focus');
      flat = StyleSheet.flatten(container.props.style);
      expect(flat.borderColor).toBe(theme.colours.primary);
    });

    it('should handle onBlur event', () => {
      const { getByPlaceholderText, getByTestId } = render(
        <InputField
          value=""
          onChangeText={mockOnChangeText}
          placeholder="Enter text"
        />
      );

      const input = getByPlaceholderText("Enter text");
      const container = getByTestId("input-container");
      fireEvent(input, 'focus');
      let flat = StyleSheet.flatten(container.props.style);
      expect(flat.borderColor).not.toBe(theme.colours.border);
      fireEvent(input, 'blur');
      flat = StyleSheet.flatten(container.props.style);
      expect(flat.borderColor).toBe(theme.colours.border);
    });
  });

  describe('Secure Text Entry', () => {
    it('should have secureTextEntry false by default', () => {
      const { getByPlaceholderText } = render(
        <InputField
          value=""
          onChangeText={mockOnChangeText}
          placeholder="Enter text"
        />
      );

      const input = getByPlaceholderText('Enter text');
      expect(input.props.secureTextEntry).toBe(false);
    });

    it('should enable secureTextEntry when prop is true', () => {
      const { getByPlaceholderText } = render(
        <InputField
          value=""
          onChangeText={mockOnChangeText}
          placeholder="Enter password"
          secureTextEntry={true}
        />
      );

      const input = getByPlaceholderText('Enter password');
      expect(input.props.secureTextEntry).toBe(true);
    });

    it('should disable secureTextEntry when prop is false', () => {
      const { getByPlaceholderText } = render(
        <InputField
          value=""
          onChangeText={mockOnChangeText}
          placeholder="Enter text"
          secureTextEntry={false}
        />
      );

      const input = getByPlaceholderText('Enter text');
      expect(input.props.secureTextEntry).toBe(false);
    });
  });

  describe('Keyboard Type', () => {
    it('should have default keyboardType', () => {
      const { getByPlaceholderText } = render(
        <InputField
          value=""
          onChangeText={mockOnChangeText}
          placeholder="Enter text"
        />
      );

      const input = getByPlaceholderText('Enter text');
      expect(input.props.keyboardType).toBe('default');
    });

    it('should accept email-address keyboardType', () => {
      const { getByPlaceholderText } = render(
        <InputField
          value=""
          onChangeText={mockOnChangeText}
          placeholder="Enter email"
          keyboardType="email-address"
        />
      );

      const input = getByPlaceholderText('Enter email');
      expect(input.props.keyboardType).toBe('email-address');
    });

    it('should accept numeric keyboardType', () => {
      const { getByPlaceholderText } = render(
        <InputField
          value=""
          onChangeText={mockOnChangeText}
          placeholder="Enter number"
          keyboardType="numeric"
        />
      );

      const input = getByPlaceholderText('Enter number');
      expect(input.props.keyboardType).toBe('numeric');
    });

    it('should accept phone-pad keyboardType', () => {
      const { getByPlaceholderText } = render(
        <InputField
          value=""
          onChangeText={mockOnChangeText}
          placeholder="Enter phone"
          keyboardType="phone-pad"
        />
      );

      const input = getByPlaceholderText('Enter phone');
      expect(input.props.keyboardType).toBe('phone-pad');
    });
  });

  describe('Auto Capitalize', () => {
    it('should have none autoCapitalize by default', () => {
      const { getByPlaceholderText } = render(
        <InputField
          value=""
          onChangeText={mockOnChangeText}
          placeholder="Enter text"
        />
      );

      const input = getByPlaceholderText('Enter text');
      expect(input.props.autoCapitalize).toBe('none');
    });

    it('should accept words autoCapitalize', () => {
      const { getByPlaceholderText } = render(
        <InputField
          value=""
          onChangeText={mockOnChangeText}
          placeholder="Enter name"
          autoCapitalize="words"
        />
      );

      const input = getByPlaceholderText('Enter name');
      expect(input.props.autoCapitalize).toBe('words');
    });

    it('should accept sentences autoCapitalize', () => {
      const { getByPlaceholderText } = render(
        <InputField
          value=""
          onChangeText={mockOnChangeText}
          placeholder="Enter text"
          autoCapitalize="sentences"
        />
      );

      const input = getByPlaceholderText('Enter text');
      expect(input.props.autoCapitalize).toBe('sentences');
    });

    it('should accept characters autoCapitalize', () => {
      const { getByPlaceholderText } = render(
        <InputField
          value=""
          onChangeText={mockOnChangeText}
          placeholder="Enter text"
          autoCapitalize="characters"
        />
      );

      const input = getByPlaceholderText('Enter text');
      expect(input.props.autoCapitalize).toBe('characters');
    });
  });

  describe('Icon Interaction', () => {
    it('should call onIconPress when icon is pressed', () => {
      const mockIcon = <Text testID="test-icon">Icon</Text>;
      
      const { getByTestId } = render(
        <InputField
          value=""
          onChangeText={mockOnChangeText}
          icon={mockIcon}
          onIconPress={mockOnIconPress}
        />
      );

      const iconButton = getByTestId('test-icon').parent!;
      fireEvent.press(iconButton);

      expect(mockOnIconPress).toHaveBeenCalledTimes(1);
    });

    it('should handle multiple icon presses', () => {
      const mockIcon = <Text testID="test-icon">Icon</Text>;
      
      const { getByTestId } = render(
        <InputField
          value=""
          onChangeText={mockOnChangeText}
          icon={mockIcon}
          onIconPress={mockOnIconPress}
        />
      );

      const iconButton = getByTestId('test-icon').parent!;
      
      fireEvent.press(iconButton);
      fireEvent.press(iconButton);
      fireEvent.press(iconButton);

      expect(mockOnIconPress).toHaveBeenCalledTimes(3);
    });

    it('should not crash when icon is present but onIconPress is undefined', () => {
      const mockIcon = <Text testID="test-icon">Icon</Text>;
      
      const { getByTestId } = render(
        <InputField
          value=""
          onChangeText={mockOnChangeText}
          icon={mockIcon}
        />
      );

      const iconButton = getByTestId('test-icon').parent;
      
      expect(() => {
        if (iconButton) {
          fireEvent.press(iconButton);
        }
      }).not.toThrow();
    });
  });

  describe('Error State', () => {
    it('should handle error state changes', () => {
      const { getByText, rerender, queryByText } = render(
        <InputField
          value=""
          onChangeText={mockOnChangeText}
          error="Error message"
        />
      );

      expect(getByText('Error message')).toBeTruthy();

      rerender(
        <InputField
          value=""
          onChangeText={mockOnChangeText}
        />
      );

      expect(queryByText('Error message')).toBeNull();
    });
  });

  describe('Prop Combinations', () => {
    it('should handle all props together', () => {
      const mockIcon = <Text testID="test-icon">Icon</Text>;
      
      const { getByText, getByPlaceholderText, getByTestId } = render(
        <InputField
          label="Password"
          value=""
          onChangeText={mockOnChangeText}
          placeholder="Enter password"
          secureTextEntry={true}
          keyboardType="default"
          autoCapitalize="none"
          error="Password is required"
          icon={mockIcon}
          onIconPress={mockOnIconPress}
        />
      );

      expect(getByText('Password')).toBeTruthy();
      expect(getByPlaceholderText('Enter password')).toBeTruthy();
      expect(getByText('Password is required')).toBeTruthy();
      expect(getByTestId('test-icon')).toBeTruthy();

      const input = getByPlaceholderText('Enter password');
      expect(input.props.secureTextEntry).toBe(true);
    });
  });
});