import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Button from '../../src/components/common/Button';
import { theme } from '../../src/theme';

describe('Button Component', () => {
  const mockOnPress = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render with title text', () => {
      const { getByText } = render(
        <Button title="Click Me" onPress={mockOnPress} />
      );

      expect(getByText('Click Me')).toBeTruthy();
    });

    it('should render ActivityIndicator when loading', () => {
      const { getByTestId, queryByText } = render(
        <Button title="Loading" onPress={mockOnPress} loading={true} />
      );

      expect(queryByText('Loading')).toBeNull();
      expect(getByTestId('activity-indicator')).toBeTruthy();
    });

    it('should show correct ActivityIndicator color for primary variant', () => {
      const { getByTestId } = render(
        <Button title="Loading" onPress={mockOnPress} loading={true} variant="primary" />
      );

      const indicator = getByTestId('activity-indicator');
      expect(indicator.props.color).toBe(theme.colours.background);
    });

    it('should show correct ActivityIndicator color for secondary variant', () => {
      const { getByTestId } = render(
        <Button title="Loading" onPress={mockOnPress} loading={true} variant="secondary" />
      );

      const indicator = getByTestId('activity-indicator');
      expect(indicator.props.color).toBe(theme.colours.primary);
    });

    it('should render with primary variant by default', () => {
      const { getByText } = render(
        <Button title="Default Button" onPress={mockOnPress} />
      );

      expect(getByText('Default Button')).toBeTruthy();
    });

    it('should render with secondary variant when specified', () => {
      const { getByText } = render(
        <Button title="Secondary Button" onPress={mockOnPress} variant="secondary" />
      );

      expect(getByText('Secondary Button')).toBeTruthy();
    });
  });

  describe('Interaction', () => {
    it('should call onPress when button is pressed', () => {
      const { getByText } = render(
        <Button title="Press Me" onPress={mockOnPress} />
      );

      fireEvent.press(getByText('Press Me'));

      expect(mockOnPress).toHaveBeenCalledTimes(1);
    });

    it('should not call onPress when button is disabled', () => {
      const { getByText } = render(
        <Button title="Disabled" onPress={mockOnPress} disabled={true} />
      );

      fireEvent.press(getByText('Disabled'));

      expect(mockOnPress).not.toHaveBeenCalled();
    });

    it('should not call onPress when button is loading', () => {
      const { getByTestId } = render(
        <Button title="Loading" onPress={mockOnPress} loading={true} />
      );

      const touchable = getByTestId('activity-indicator').parent?.parent;
      if (touchable) {
        fireEvent.press(touchable);
      }

      expect(mockOnPress).not.toHaveBeenCalled();
    });

    it('should handle multiple rapid presses', () => {
      const { getByText } = render(
        <Button title="Rapid Press" onPress={mockOnPress} />
      );

      const button = getByText('Rapid Press');
      fireEvent.press(button);
      fireEvent.press(button);
      fireEvent.press(button);

      expect(mockOnPress).toHaveBeenCalledTimes(3);
    });
  });

  describe('Loading State', () => {
    it('should not show title text when loading', () => {
      const { queryByText } = render(
        <Button title="Hidden Title" onPress={mockOnPress} loading={true} />
      );

      expect(queryByText('Hidden Title')).toBeNull();
    });

    it('should show ActivityIndicator when loading', () => {
      const { getByTestId } = render(
        <Button title="Loading" onPress={mockOnPress} loading={true} />
      );

      expect(getByTestId('activity-indicator')).toBeTruthy();
    });

    it('should use small size for ActivityIndicator', () => {
      const { getByTestId } = render(
        <Button title="Loading" onPress={mockOnPress} loading={true} />
      );

      const indicator = getByTestId('activity-indicator');
      expect(indicator.props.size).toBe('small');
    });

    it('should not be loading by default', () => {
      const { queryByTestId } = render(
        <Button title="Not Loading" onPress={mockOnPress} />
      );

      expect(queryByTestId('activity-indicator')).toBeNull();
    });
  });

  describe('Variant Prop', () => {
    it('should accept primary variant', () => {
      const { getByText } = render(
        <Button title="Primary" onPress={mockOnPress} variant="primary" />
      );

      expect(getByText('Primary')).toBeTruthy();
    });

    it('should accept secondary variant', () => {
      const { getByText } = render(
        <Button title="Secondary" onPress={mockOnPress} variant="secondary" />
      );

      expect(getByText('Secondary')).toBeTruthy();
    });

    it('should default to primary when variant is not specified', () => {
      const { getByText } = render(
        <Button title="Default" onPress={mockOnPress} />
      );

      expect(getByText('Default')).toBeTruthy();
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty title', () => {
      const { getByText } = render(
        <Button title="" onPress={mockOnPress} />
      );

      expect(getByText('')).toBeTruthy();
    });

    it('should handle very long title', () => {
      const longTitle = 'This is a very long button title that might wrap to multiple lines';
      const { getByText } = render(
        <Button title={longTitle} onPress={mockOnPress} />
      );

      expect(getByText(longTitle)).toBeTruthy();
    });

    it('should handle undefined onPress gracefully', () => {
      const { getByText } = render(
        <Button title="No Handler" onPress={undefined as any} />
      );

      expect(() => fireEvent.press(getByText('No Handler'))).not.toThrow();
    });
  });

  describe('Prop Combinations', () => {
    it('should handle primary variant with disabled state', () => {
      const { getByText } = render(
        <Button 
          title="Primary Disabled" 
          onPress={mockOnPress} 
          variant="primary" 
          disabled={true} 
        />
      );

      fireEvent.press(getByText('Primary Disabled'));
      expect(mockOnPress).not.toHaveBeenCalled();
    });

    it('should handle secondary variant with loading state', () => {
      const { getByTestId } = render(
        <Button 
          title="Secondary Loading" 
          onPress={mockOnPress} 
          variant="secondary" 
          loading={true} 
        />
      );

      expect(getByTestId('activity-indicator')).toBeTruthy();
    });

    it('should prioritize loading over title display', () => {
      const { queryByText, getByTestId } = render(
        <Button 
          title="Should Not Show" 
          onPress={mockOnPress} 
          loading={true} 
        />
      );

      expect(queryByText('Should Not Show')).toBeNull();
      expect(getByTestId('activity-indicator')).toBeTruthy();
    });

    it('should disable interaction when both disabled and loading', () => {
      const { getByTestId } = render(
        <Button 
          title="Both States" 
          onPress={mockOnPress} 
          disabled={true}
          loading={true} 
        />
      );

      const touchable = getByTestId('activity-indicator').parent?.parent;
      if (touchable) {
        fireEvent.press(touchable);
      }
      
      expect(mockOnPress).not.toHaveBeenCalled();
    });
  });
});