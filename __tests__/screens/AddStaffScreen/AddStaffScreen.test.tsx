import React from 'react';
import { render } from '@testing-library/react-native';
import AddStaffScreen from '../../../src/screens/AddStaff/AddStaffScreen';
import { fetchShifts } from '../../../src/app/slice/shiftSlice';
import Toast from 'react-native-toast-message';

jest.mock('react-native-toast-message', () => ({ show: jest.fn() }));

jest.mock('../../../src/hooks/useAppLayout', () => ({
  useAppLayout: () => ({ isDesktop: false }),
}));

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: () => mockDispatch,
}));

jest.mock('../../../src/app/slice/shiftSlice', () => ({
  fetchShifts: jest.fn(() => ({ type: 'fetchShifts' })),
}));

jest.mock('../../../src/screens/AddStaff/components/Name', () => {
  const React = require('react');
  return React.forwardRef((_props: any, ref: any) => {
    if (ref) (ref as any).current = { validate: jest.fn(() => true) };
    return null;
  });
});

jest.mock('../../../src/screens/AddStaff/components/Email', () => {
  const React = require('react');
  return React.forwardRef((_props: any, ref: any) => {
    if (ref) (ref as any).current = { validate: jest.fn(() => true) };
    return null;
  });
});
jest.mock('../../../src/screens/AddStaff/components/PhoneNumber', () => {
  const React = require('react');
  return React.forwardRef((_props: any, ref: any) => {
    if (ref) (ref as any).current = { validate: jest.fn(() => true) };
    return null;
  });
});
jest.mock('../../../src/screens/AddStaff/components/Shift', () => {
  const React = require('react');
  return React.forwardRef((_props: any, ref: any) => {
    if (ref) (ref as any).current = { validate: jest.fn(() => true) };
    return null;
  });
});
jest.mock('../../../src/screens/AddStaff/components/Role', () => {
  const React = require('react');
  return React.forwardRef((_props: any, ref: any) => {
    if (ref) (ref as any).current = { validate: jest.fn(() => true) };
    return null;
  });
});
jest.mock('../../../src/screens/AddStaff/components/NestedButton', () => () => null);

const mockUseSelector = require('react-redux').useSelector as jest.Mock;

describe('AddStaffScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('dispatches fetchShifts on mount', () => {
    mockUseSelector.mockImplementation(selector =>
      selector({ shift: { status: 'idle' } })
    );

    render(<AddStaffScreen />);

    expect(mockDispatch).toHaveBeenCalledWith(fetchShifts());
  });

  it('renders loading state when shift status is loading', () => {
    mockUseSelector.mockImplementation(selector =>
      selector({ shift: { status: 'loading' } })
    );

    const { getByText } = render(<AddStaffScreen />);

    expect(getByText('Loading data...')).toBeTruthy();
  });

  it('shows toast when shift load fails', () => {
    mockUseSelector.mockImplementation(selector =>
      selector({ shift: { status: 'error' } })
    );

    render(<AddStaffScreen />);

    expect(Toast.show).toHaveBeenCalledWith({
      type: 'error',
      text1: 'Failed to load shift data',
    });
  });
});
