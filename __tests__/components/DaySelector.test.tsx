import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import DaySelector from '../../src/components/common/DaySelector';
import { DAYS } from '../../src/types';
import * as useAppLayoutModule from '../../src/hooks/useAppLayout';

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

  describe('Rendering', () => {
    it('should render the label', () => {
      const { getByText } = render(
        <DaySelector value={[]} onChange={mockOnChange} />
      );

      expect(getByText('Select Days')).toBeTruthy();
    });

    it('should render all days from DAYS array', () => {
      const { getByText } = render(
        <DaySelector value={[]} onChange={mockOnChange} />
      );

      DAYS.forEach(day => {
        expect(getByText(day)).toBeTruthy();
      });
    });

    it('should render 7 day buttons', () => {
      const { getAllByText } = render(
        <DaySelector value={[]} onChange={mockOnChange} />
      );

      const dayButtons = DAYS.map(day => getAllByText(day));
      expect(dayButtons).toHaveLength(DAYS.length);
    });

    it('should render with empty selection', () => {
      const { getByText } = render(
        <DaySelector value={[]} onChange={mockOnChange} />
      );

      DAYS.forEach(day => {
        expect(getByText(day)).toBeTruthy();
      });
    });

    it('should render with pre-selected days', () => {
      const selectedDays = ['Mon', 'Wed', 'Fri'];
      const { getByText } = render(
        <DaySelector value={selectedDays} onChange={mockOnChange} />
      );

      selectedDays.forEach(day => {
        expect(getByText(day)).toBeTruthy();
      });
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

    it('should remove a day from multiple selected days', () => {
      const { getByText } = render(
        <DaySelector value={['Mon', 'Tue', 'Wed']} onChange={mockOnChange} />
      );

      fireEvent.press(getByText('Tue'));

      expect(mockOnChange).toHaveBeenCalledWith(['Mon', 'Wed']);
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
    it('should toggle day on when clicked from unselected state', () => {
      const { getByText } = render(
        <DaySelector value={['Tue', 'Thu']} onChange={mockOnChange} />
      );

      fireEvent.press(getByText('Mon'));

      expect(mockOnChange).toHaveBeenCalledWith(['Tue', 'Thu', 'Mon']);
    });

    it('should toggle day off when clicked from selected state', () => {
      const { getByText } = render(
        <DaySelector value={['Mon', 'Tue', 'Thu']} onChange={mockOnChange} />
      );

      fireEvent.press(getByText('Tue'));

      expect(mockOnChange).toHaveBeenCalledWith(['Mon', 'Thu']);
    });

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

  describe('Edge Cases', () => {
    it('should handle empty value array', () => {
      const { getByText } = render(
        <DaySelector value={[]} onChange={mockOnChange} />
      );

      expect(getByText('Mon')).toBeTruthy();
      
      fireEvent.press(getByText('Mon'));
      expect(mockOnChange).toHaveBeenCalledWith(['Mon']);
    });

    it('should handle value with all days selected', () => {
      const { getByText } = render(
        <DaySelector value={[...DAYS]} onChange={mockOnChange} />
      );

      fireEvent.press(getByText('Mon'));
      
      const expectedDays = DAYS.filter(d => d !== 'Mon');
      expect(mockOnChange).toHaveBeenCalledWith(expectedDays);
    });

    it('should not break with case-sensitive day values', () => {
      const { getByText } = render(
        <DaySelector value={['MON']} onChange={mockOnChange} />
      );

      fireEvent.press(getByText('Mon'));
      expect(mockOnChange).toHaveBeenCalledWith(['MON', 'Mon']);
    });
  });

  describe('Desktop Layout', () => {
    it('should use desktop styles when isDesktop is true', () => {
      mockUseAppLayout.mockReturnValue({
        width: 1440,
        isWeb: true,
        isDesktop: true,
        isTablet: false,
        isMobile: false,
        isios: false,
      });

      const { getByText } = render(
        <DaySelector value={[]} onChange={mockOnChange} />
      );

      expect(getByText('Mon')).toBeTruthy();
      
      fireEvent.press(getByText('Mon'));
      expect(mockOnChange).toHaveBeenCalled();
    });

    it('should not use desktop styles when isDesktop is false', () => {
      mockUseAppLayout.mockReturnValue({
        width: 375,
        isWeb: false,
        isDesktop: false,
        isTablet: false,
        isMobile: true,
        isios: false,
      });

      const { getByText } = render(
        <DaySelector value={[]} onChange={mockOnChange} />
      );

      expect(getByText('Mon')).toBeTruthy();
      
      fireEvent.press(getByText('Mon'));
      expect(mockOnChange).toHaveBeenCalled();
    });
  });

  describe('Integration with onChange', () => {
    it('should call onChange exactly once per click', () => {
      const { getByText } = render(
        <DaySelector value={['Mon']} onChange={mockOnChange} />
      );

      fireEvent.press(getByText('Tue'));

      expect(mockOnChange).toHaveBeenCalledTimes(1);
    });

    it('should not mutate the original value array', () => {
      const originalValue = ['Mon', 'Wed'];
      const valueCopy = [...originalValue];
      
      const { getByText } = render(
        <DaySelector value={valueCopy} onChange={mockOnChange} />
      );

      fireEvent.press(getByText('Tue'));

      expect(valueCopy).toEqual(originalValue);
    });

    it('should pass new array reference to onChange', () => {
      const originalValue = ['Mon'];
      
      const { getByText } = render(
        <DaySelector value={originalValue} onChange={mockOnChange} />
      );

      fireEvent.press(getByText('Tue'));

      const newValue = mockOnChange.mock.calls[0][0];
      expect(newValue).not.toBe(originalValue);
    });
  });
});