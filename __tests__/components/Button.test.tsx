import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Button from '../../src/components/common/Button';
import { theme } from '../../src/theme';
import { StyleSheet } from 'react-native';

describe('Button Component', () => {
  const mockOnPress = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {

    describe('Interaction', () => {
      it('should call onPress when button is pressed', () => {
        const { getByText } = render(
          <Button title="Press Me" onPress={mockOnPress} />,
        );

        fireEvent.press(getByText('Press Me'));

        expect(mockOnPress).toHaveBeenCalledTimes(1);
      });

      it('should not call onPress when button is disabled', () => {
        const { getByText } = render(
          <Button title="Disabled" onPress={mockOnPress} disabled={true} />,
        );

        fireEvent.press(getByText('Disabled'));

        expect(mockOnPress).not.toHaveBeenCalled();
      });

      it('should not call onPress when button is loading', () => {
        const { getByTestId } = render(
          <Button title="Loading" onPress={mockOnPress} loading={true} />,
        );

        const touchable = getByTestId('activity-indicator').parent?.parent;
        if (touchable) {
          fireEvent.press(touchable);
        }

        expect(mockOnPress).not.toHaveBeenCalled();
      });

      it('should handle multiple rapid presses', () => {
        const { getByText } = render(
          <Button title="Rapid Press" onPress={mockOnPress} />,
        );

        const button = getByText('Rapid Press');
        fireEvent.press(button);
        fireEvent.press(button);
        fireEvent.press(button);

        expect(mockOnPress).toHaveBeenCalledTimes(3);
      });
    });

    describe('Loading State', () => {
      it('should render ActivityIndicator when loading is true', () => {
        const { getByTestId } = render(
          <Button title="Loading" onPress={mockOnPress} loading />
        );
  
        expect(getByTestId('activity-indicator')).toBeTruthy();
      });
  
      it('should not render ActivityIndicator when loading is false', () => {
        const { queryByTestId } = render(
          <Button title="Not Loading" onPress={mockOnPress} />
        );
  
        expect(queryByTestId('activity-indicator')).toBeNull();
      });
    });


    describe('Prop Combinations', () => {
      it('should disable interaction when both disabled and loading', () => {
        const { getByTestId } = render(
          <Button
            title="Both States"
            onPress={mockOnPress}
            disabled={true}
            loading={true}
          />,
        );

        const touchable = getByTestId('activity-indicator').parent?.parent;
        if (touchable) {
          fireEvent.press(touchable);
        }

        expect(mockOnPress).not.toHaveBeenCalled();
      });
    });
  });
});
