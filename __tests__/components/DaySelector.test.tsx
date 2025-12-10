import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import DaySelector from '../../src/components/common/DaySelector';
import { DAYS } from '../../src/types';
import * as useAppLayoutModule from '../../src/hooks/useAppLayout';
import { StyleSheet } from 'react-native';
import { theme } from '../../src/theme';

jest.mock('../../src/hooks/useAppLayout');

describe('DaySelector Component', () => {
  const mockOnChange = jest.fn();
  const mockUseAppLayout = useAppLayoutModule.useAppLayout as jest.MockedFunction<
    typeof useAppLayoutModule.useAppLayout
  >;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseAppLayout.mockReturnValue({
      width: 375,
      isWeb: false,
      isDesktop: false,
      isTablet: false,
      isMobile: true,
      isios: false,
    });
  });

  describe('Day Selection', () => {
    it('should call onChange with added day when unselected day is clicked', () => {
      const { getByText } = render(
        <DaySelector value={[]} onChange={mockOnChange} />
      );

      fireEvent.press(getByText('Mon'));

      expect(mockOnChange).toHaveBeenCalledTimes(1);
      expect(mockOnChange).toHaveBeenCalledWith(['Mon']);
    });

    it('should call onChange with removed day when selected day is clicked', () => {
      const { getByText } = render(
        <DaySelector value={['Mon', 'Wed', 'Fri']} onChange={mockOnChange} />
      );

      fireEvent.press(getByText('Wed'));

      expect(mockOnChange).toHaveBeenCalledTimes(1);
      expect(mockOnChange).toHaveBeenCalledWith(['Mon', 'Fri']);
    });

    it('should add multiple days sequentially', () => {
      const { getByText, rerender } = render(
        <DaySelector value={[]} onChange={mockOnChange} />
      );

      fireEvent.press(getByText('Mon'));
      expect(mockOnChange).toHaveBeenCalledWith(['Mon']);

      rerender(<DaySelector value={['Mon']} onChange={mockOnChange} />);

      fireEvent.press(getByText('Tue'));
      expect(mockOnChange).toHaveBeenCalledWith(['Mon', 'Tue']);
    });

    it('should handle selecting all days', () => {
      const { getByText, rerender } = render(
        <DaySelector value={[]} onChange={mockOnChange} />
      );

      let selectedDays: string[] = [];
      
      DAYS.forEach(day => {
        fireEvent.press(getByText(day));
        selectedDays = [...selectedDays, day];
        rerender(<DaySelector value={selectedDays} onChange={mockOnChange} />);
      });

      expect(mockOnChange).toHaveBeenCalledTimes(DAYS.length);
    });

    it('should handle deselecting all days', () => {
      const { getByText, rerender } = render(
        <DaySelector value={[...DAYS]} onChange={mockOnChange} />
      );

      let selectedDays = [...DAYS];

      DAYS.forEach(day => {
        fireEvent.press(getByText(day));
        selectedDays = selectedDays.filter(d => d !== day);
        rerender(<DaySelector value={selectedDays} onChange={mockOnChange} />);
      });

      expect(mockOnChange).toHaveBeenCalledTimes(DAYS.length);
      expect(mockOnChange).toHaveBeenLastCalledWith([]);
    });
  });

  describe('Toggle Behavior', () => {
    it('should preserve order when toggling days', () => {
      const { getByText } = render(
        <DaySelector value={['Mon', 'Wed']} onChange={mockOnChange} />
      );

      fireEvent.press(getByText('Tue'));

      expect(mockOnChange).toHaveBeenCalledWith(['Mon', 'Wed', 'Tue']);
    });
  });

  describe('Multiple Interactions', () => {
    it('should handle rapid consecutive clicks on same day', () => {
      const { getByText, rerender } = render(
        <DaySelector value={[]} onChange={mockOnChange} />
      );

      fireEvent.press(getByText('Mon'));
      rerender(<DaySelector value={['Mon']} onChange={mockOnChange} />);
      
      fireEvent.press(getByText('Mon'));
      rerender(<DaySelector value={[]} onChange={mockOnChange} />);
      
      fireEvent.press(getByText('Mon'));

      expect(mockOnChange).toHaveBeenCalledTimes(3);
      expect(mockOnChange).toHaveBeenNthCalledWith(1, ['Mon']);
      expect(mockOnChange).toHaveBeenNthCalledWith(2, []);
      expect(mockOnChange).toHaveBeenNthCalledWith(3, ['Mon']);
    });

    it('should handle clicks on different days', () => {
      const { getByText } = render(
        <DaySelector value={[]} onChange={mockOnChange} />
      );

      fireEvent.press(getByText('Mon'));
      fireEvent.press(getByText('Wed'));
      fireEvent.press(getByText('Fri'));

      expect(mockOnChange).toHaveBeenCalledTimes(3);
    });
  });
});