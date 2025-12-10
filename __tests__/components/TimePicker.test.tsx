import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Platform } from 'react-native';
import TimePicker from '../../src/components/common/TimePicker';
import { useAppLayout } from '../../src/hooks/useAppLayout';

jest.mock('../../src/hooks/useAppLayout');

let lastDateTimeProps: any;
jest.mock('@react-native-community/datetimepicker', () => {
  const React = require('react');
  return function MockDateTimePicker(props: any) {
    lastDateTimeProps = props;
    return null;
  };
});

jest.mock('lucide-react-native', () => {
  const React = require('react');
  const MockClock = () => null;
  MockClock.displayName = 'Clock';
  return { Clock: MockClock };
});

const mockUseAppLayout = useAppLayout as jest.MockedFunction<typeof useAppLayout>;

describe('TimePicker business logic', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    lastDateTimeProps = undefined;
  });

  const setLayout = (overrides: Partial<ReturnType<typeof useAppLayout>>) => {
    mockUseAppLayout.mockReturnValue({
      width: 375,
      isWeb: false,
      isDesktop: false,
      isTablet: false,
      isMobile: true,
      isios: false,
      ...overrides,
    });
  };

  it('formats Android selection immediately via onTimeSelected', async () => {
    (Platform as any).OS = 'android';
    setLayout({ isios: false, isWeb: false });

    const { getByText } = render(<TimePicker value="" onChange={mockOnChange} />);

    fireEvent.press(getByText('HH:MM'));

    await waitFor(() => expect(lastDateTimeProps).toBeDefined());

    const newTime = new Date();
    newTime.setHours(9, 45);

    lastDateTimeProps.onChange({}, newTime);

    expect(mockOnChange).toHaveBeenCalledWith('09:45');
  });

  it('stores selection on iOS then confirms with formatted time', async () => {
    (Platform as any).OS = 'ios';
    setLayout({ isios: true, isWeb: false });

    const { getByText } = render(<TimePicker value="" onChange={mockOnChange} />);

    fireEvent.press(getByText('HH:MM'));

    await waitFor(() => expect(lastDateTimeProps).toBeDefined());

    const chosen = new Date();
    chosen.setHours(16, 20);
    lastDateTimeProps.onChange({}, chosen);

    expect(mockOnChange).not.toHaveBeenCalled();
    await waitFor(() => {
      expect(lastDateTimeProps.value.getHours()).toBe(16);
      expect(lastDateTimeProps.value.getMinutes()).toBe(20);
    });

    fireEvent.press(getByText('Confirm'));

    expect(mockOnChange).toHaveBeenCalledWith('16:20');
  });

  it('initializes DateTimePicker value from existing prop', async () => {
    (Platform as any).OS = 'ios';
    setLayout({ isios: true, isWeb: false });

    const { getByText } = render(<TimePicker value="14:30" onChange={mockOnChange} />);

    fireEvent.press(getByText('14:30'));

    await waitFor(() => expect(lastDateTimeProps).toBeDefined());

    expect(lastDateTimeProps.value).toBeInstanceOf(Date);
    expect(lastDateTimeProps.value.getHours()).toBe(14);
    expect(lastDateTimeProps.value.getMinutes()).toBe(30);
  });

  it('calls onChange for web input changes', () => {
    (Platform as any).OS = 'web';
    setLayout({ isWeb: true, isDesktop: true, isMobile: false, isios: false });

    const { getByTestId } = render(<TimePicker value="10:00" onChange={mockOnChange} />);

    const input = getByTestId('web-time-input');

    fireEvent(input, 'onChange', { target: { value: '12:45' } });

    expect(mockOnChange).toHaveBeenCalledWith('12:45');
  });
});
