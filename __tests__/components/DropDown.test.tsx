import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import DropDown from '../../src/components/common/DropDown';
import * as useAppLayoutModule from '../../src/hooks/useAppLayout';

jest.mock('../../src/hooks/useAppLayout');

describe('DropDown Component', () => {
  const mockOnValueChange = jest.fn();
  const mockUseAppLayout = useAppLayoutModule.useAppLayout as jest.MockedFunction<
    typeof useAppLayoutModule.useAppLayout
  >;

  const mockItems = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
  ];

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

  describe('Modal Interaction', () => {
    it('should open modal when input is pressed', async () => {
      const { getByText } = render(
        <DropDown
          label="Select"
          selectedValue=""
          onValueChange={mockOnValueChange}
          items={mockItems}
        />
      );

      fireEvent.press(getByText('Select an option'));

      await waitFor(() => {
        expect(getByText('Option 1')).toBeTruthy();
        expect(getByText('Option 2')).toBeTruthy();
        expect(getByText('Option 3')).toBeTruthy();
      });
    });

    it('should display all items in modal', async () => {
      const { getByText } = render(
        <DropDown
          label="Select"
          selectedValue=""
          onValueChange={mockOnValueChange}
          items={mockItems}
        />
      );

      fireEvent.press(getByText('Select an option'));

      await waitFor(() => {
        mockItems.forEach(item => {
          expect(getByText(item.label)).toBeTruthy();
        });
      });
    });

    it('should display cancel button in modal', async () => {
      const { getByText } = render(
        <DropDown
          label="Select"
          selectedValue=""
          onValueChange={mockOnValueChange}
          items={mockItems}
        />
      );

      fireEvent.press(getByText('Select an option'));

      await waitFor(() => {
        expect(getByText('Cancel')).toBeTruthy();
      });
    });

    it('should close modal when cancel button is pressed', async () => {
      const { getByText, queryByText } = render(
        <DropDown
          label="Select"
          selectedValue=""
          onValueChange={mockOnValueChange}
          items={mockItems}
        />
      );

      fireEvent.press(getByText('Select an option'));

      await waitFor(() => {
        expect(getByText('Cancel')).toBeTruthy();
      });

      fireEvent.press(getByText('Cancel'));

      await waitFor(() => {
        expect(queryByText('Option 1')).toBeNull();
      });
    });

    it('should not display modal initially', () => {
      const { queryByText } = render(
        <DropDown
          label="Select"
          selectedValue=""
          onValueChange={mockOnValueChange}
          items={mockItems}
        />
      );

      expect(queryByText('Cancel')).toBeNull();
    });
  });

  describe('Value Selection', () => {
    it('should call onValueChange when an option is selected', async () => {
      const { getByText } = render(
        <DropDown
          label="Select"
          selectedValue=""
          onValueChange={mockOnValueChange}
          items={mockItems}
        />
      );

      fireEvent.press(getByText('Select an option'));

      await waitFor(() => {
        expect(getByText('Option 2')).toBeTruthy();
      });

      fireEvent.press(getByText('Option 2'));

      expect(mockOnValueChange).toHaveBeenCalledTimes(1);
      expect(mockOnValueChange).toHaveBeenCalledWith('option2');
    });

    it('should close modal after selecting an option', async () => {
      const { getByText, queryByText, getAllByText } = render(
        <DropDown
          label="Select"
          selectedValue=""
          onValueChange={mockOnValueChange}
          items={mockItems}
        />
      );

      fireEvent.press(getByText('Select an option'));

      await waitFor(() => {
        const options = getAllByText('Option 1');
        expect(options.length).toBeGreaterThan(0);
      });

      const optionButtons = getAllByText('Option 1');
      fireEvent.press(optionButtons[optionButtons.length - 1]);

      await waitFor(() => {
        expect(queryByText('Cancel')).toBeNull();
      });
    });

    it('should select different options correctly', async () => {
      const { getByText, getAllByText, rerender } = render(
        <DropDown
          label="Select"
          selectedValue=""
          onValueChange={mockOnValueChange}
          items={mockItems}
        />
      );

      fireEvent.press(getByText('Select an option'));

      await waitFor(() => {
        expect(getByText('Option 1')).toBeTruthy();
      });

      const option1Buttons = getAllByText('Option 1');
      fireEvent.press(option1Buttons[option1Buttons.length - 1]);

      expect(mockOnValueChange).toHaveBeenCalledWith('option1');

      rerender(
        <DropDown
          label="Select"
          selectedValue="option1"
          onValueChange={mockOnValueChange}
          items={mockItems}
        />
      );

      fireEvent.press(getByText('Option 1')); 

      await waitFor(() => {
        expect(getByText('Option 3')).toBeTruthy();
      });

      fireEvent.press(getByText('Option 3'));

      expect(mockOnValueChange).toHaveBeenCalledWith('option3');
      expect(mockOnValueChange).toHaveBeenCalledTimes(2);
    });

  });

  describe('Edge Cases', () => {
    it('should handle items with special characters in labels', async () => {
      const specialItems = [
        { label: 'Option & Special', value: 'special1' },
        { label: 'Option < > "', value: 'special2' },
      ];

      const { getByText } = render(
        <DropDown
          label="Select"
          selectedValue=""
          onValueChange={mockOnValueChange}
          items={specialItems}
        />
      );

      fireEvent.press(getByText('Select an option'));

      await waitFor(() => {
        expect(getByText('Option & Special')).toBeTruthy();
      });
    });

    it('should handle very long labels', async () => {
      const longLabelItems = [
        { 
          label: 'This is a very long option label that should wrap or truncate properly',
          value: 'long'
        },
      ];

      const { getByText } = render(
        <DropDown
          label="Select"
          selectedValue=""
          onValueChange={mockOnValueChange}
          items={longLabelItems}
        />
      );

      fireEvent.press(getByText('Select an option'));

      await waitFor(() => {
        expect(getByText('This is a very long option label that should wrap or truncate properly')).toBeTruthy();
      });
    });

    it('should handle rapid open/close of modal', async () => {
      const { getByText, queryByText } = render(
        <DropDown
          label="Select"
          selectedValue=""
          onValueChange={mockOnValueChange}
          items={mockItems}
        />
      );

      fireEvent.press(getByText('Select an option'));
      await waitFor(() => {
        expect(getByText('Cancel')).toBeTruthy();
      });

      fireEvent.press(getByText('Cancel'));
      await waitFor(() => {
        expect(queryByText('Cancel')).toBeNull();
      });

      fireEvent.press(getByText('Select an option'));
      await waitFor(() => {
        expect(getByText('Cancel')).toBeTruthy();
      });

      expect(getByText('Option 1')).toBeTruthy();
    });

    it('should not call onValueChange when cancel is pressed', async () => {
      const { getByText } = render(
        <DropDown
          label="Select"
          selectedValue=""
          onValueChange={mockOnValueChange}
          items={mockItems}
        />
      );

      fireEvent.press(getByText('Select an option'));

      await waitFor(() => {
        expect(getByText('Cancel')).toBeTruthy();
      });

      fireEvent.press(getByText('Cancel'));

      expect(mockOnValueChange).not.toHaveBeenCalled();
    });
  });
});