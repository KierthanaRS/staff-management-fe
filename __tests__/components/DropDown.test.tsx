import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import DropDown from '../../src/components/common/DropDown';
import * as useAppLayoutModule from '../../src/hooks/useAppLayout';

// Mock the useAppLayout hook
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

  describe('Rendering', () => {
    it('should render with label', () => {
      const { getByText } = render(
        <DropDown
          label="Select Option"
          selectedValue=""
          onValueChange={mockOnValueChange}
          items={mockItems}
        />
      );

      expect(getByText('Select Option')).toBeTruthy();
    });

    it('should render without label', () => {
      const { queryByText } = render(
        <DropDown
          selectedValue=""
          onValueChange={mockOnValueChange}
          items={mockItems}
        />
      );

      expect(queryByText('Select Option')).toBeNull();
    });

    it('should display placeholder when no value is selected', () => {
      const { getByText } = render(
        <DropDown
          label="Select"
          selectedValue=""
          onValueChange={mockOnValueChange}
          items={mockItems}
          placeholder="Choose one"
        />
      );

      expect(getByText('Choose one')).toBeTruthy();
    });

    it('should display default placeholder when no custom placeholder provided', () => {
      const { getByText } = render(
        <DropDown
          label="Select"
          selectedValue=""
          onValueChange={mockOnValueChange}
          items={mockItems}
        />
      );

      expect(getByText('Select an option')).toBeTruthy();
    });

    it('should display selected value label', () => {
      const { getByText } = render(
        <DropDown
          label="Select"
          selectedValue="option2"
          onValueChange={mockOnValueChange}
          items={mockItems}
        />
      );

      expect(getByText('Option 2')).toBeTruthy();
    });

    it('should display error message when error prop is provided', () => {
      const { getByText } = render(
        <DropDown
          label="Select"
          selectedValue=""
          onValueChange={mockOnValueChange}
          items={mockItems}
          error="This field is required"
        />
      );

      expect(getByText('This field is required')).toBeTruthy();
    });

    it('should not display error message when error prop is not provided', () => {
      const { queryByText } = render(
        <DropDown
          label="Select"
          selectedValue=""
          onValueChange={mockOnValueChange}
          items={mockItems}
        />
      );

      // Assuming no error text exists
      expect(queryByText('This field is required')).toBeNull();
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

    it('should display label in modal header', async () => {
      const { getByText, getAllByText } = render(
        <DropDown
          label="Choose Item"
          selectedValue=""
          onValueChange={mockOnValueChange}
          items={mockItems}
        />
      );

      fireEvent.press(getByText('Select an option'));

      await waitFor(() => {
        const labels = getAllByText('Choose Item');
        expect(labels.length).toBeGreaterThan(0);
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
      const { getByText, getAllByText } = render(
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

      fireEvent.press(getByText('Option 1')); 

      await waitFor(() => {
        expect(getByText('Option 3')).toBeTruthy();
      });

      fireEvent.press(getByText('Option 3'));

      expect(mockOnValueChange).toHaveBeenCalledWith('option3');
      expect(mockOnValueChange).toHaveBeenCalledTimes(2);
    });

    it('should handle selecting the same option multiple times', async () => {
      const { getByText, rerender } = render(
        <DropDown
          label="Select"
          selectedValue="option1"
          onValueChange={mockOnValueChange}
          items={mockItems}
        />
      );

      fireEvent.press(getByText('Option 1'));

      await waitFor(() => {
        expect(getByText('Cancel')).toBeTruthy();
      });

      const option1Buttons = getByText('Option 1');
      fireEvent.press(option1Buttons);

      expect(mockOnValueChange).toHaveBeenCalledWith('option1');
    });
  });

  describe('Items Prop', () => {
    it('should handle empty items array', () => {
      const { getByText } = render(
        <DropDown
          label="Select"
          selectedValue=""
          onValueChange={mockOnValueChange}
          items={[]}
        />
      );

      expect(getByText('Select an option')).toBeTruthy();
    });

    it('should handle single item', async () => {
      const singleItem = [{ label: 'Only Option', value: 'only' }];
      
      const { getByText } = render(
        <DropDown
          label="Select"
          selectedValue=""
          onValueChange={mockOnValueChange}
          items={singleItem}
        />
      );

      fireEvent.press(getByText('Select an option'));

      await waitFor(() => {
        expect(getByText('Only Option')).toBeTruthy();
      });
    });

    it('should handle many items', async () => {
      const manyItems = Array.from({ length: 20 }, (_, i) => ({
        label: `Option ${i + 1}`,
        value: `option${i + 1}`,
      }));

      const { getByText } = render(
        <DropDown
          label="Select"
          selectedValue=""
          onValueChange={mockOnValueChange}
          items={manyItems}
        />
      );

      fireEvent.press(getByText('Select an option'));

      await waitFor(() => {
        expect(getByText('Option 1')).toBeTruthy();
        expect(getByText('Option 20')).toBeTruthy();
      });
    });

    it('should display correct label for selected value', () => {
      const { getByText } = render(
        <DropDown
          label="Select"
          selectedValue="option3"
          onValueChange={mockOnValueChange}
          items={mockItems}
        />
      );

      expect(getByText('Option 3')).toBeTruthy();
    });

    it('should show placeholder when selected value is not in items', () => {
      const { getByText } = render(
        <DropDown
          label="Select"
          selectedValue="nonexistent"
          onValueChange={mockOnValueChange}
          items={mockItems}
          placeholder="Not found"
        />
      );

      expect(getByText('Not found')).toBeTruthy();
    });
  });

  describe('Desktop Layout', () => {
    it('should render in desktop mode when isDesktop is true', async () => {
      mockUseAppLayout.mockReturnValue({
        width: 1440,
        isWeb: true,
        isDesktop: true,
        isTablet: false,
        isMobile: false,
        isios: false,
      });

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
      });

      fireEvent.press(getByText('Option 1'));
      expect(mockOnValueChange).toHaveBeenCalledWith('option1');
    });

    it('should render in mobile mode when isDesktop is false', async () => {
      mockUseAppLayout.mockReturnValue({
        width: 375,
        isWeb: false,
        isDesktop: false,
        isTablet: false,
        isMobile: true,
        isios: false,
      });

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
      expect(mockOnValueChange).toHaveBeenCalledWith('option2');
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

      // Open
      fireEvent.press(getByText('Select an option'));
      await waitFor(() => {
        expect(getByText('Cancel')).toBeTruthy();
      });

      // Close
      fireEvent.press(getByText('Cancel'));
      await waitFor(() => {
        expect(queryByText('Cancel')).toBeNull();
      });

      // Open again
      fireEvent.press(getByText('Select an option'));
      await waitFor(() => {
        expect(getByText('Cancel')).toBeTruthy();
      });

      // Should still work
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

  describe('Error State', () => {
    it('should display and hide error message dynamically', () => {
      const { getByText, rerender, queryByText } = render(
        <DropDown
          label="Select"
          selectedValue=""
          onValueChange={mockOnValueChange}
          items={mockItems}
          error="Error message"
        />
      );

      expect(getByText('Error message')).toBeTruthy();

      rerender(
        <DropDown
          label="Select"
          selectedValue=""
          onValueChange={mockOnValueChange}
          items={mockItems}
        />
      );

      expect(queryByText('Error message')).toBeNull();
    });

    it('should show error without affecting dropdown functionality', async () => {
      const { getByText } = render(
        <DropDown
          label="Select"
          selectedValue=""
          onValueChange={mockOnValueChange}
          items={mockItems}
          error="Please select an option"
        />
      );

      expect(getByText('Please select an option')).toBeTruthy();

      fireEvent.press(getByText('Select an option'));

      await waitFor(() => {
        expect(getByText('Option 1')).toBeTruthy();
      });

      fireEvent.press(getByText('Option 1'));
      expect(mockOnValueChange).toHaveBeenCalledWith('option1');
    });
  });
});