import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import StaffStatusScreen from '../../../src/screens/StaffStatus/StaffStatusScreen';
import { fetchStaffs, deleteStaffData } from '../../../src/app/slice/staffSlice';
import { getAttendance } from '../../../src/app/slice/attendanceSlice';
import { NavigationProp } from '@react-navigation/native';

jest.mock('../../../src/hooks/useAppLayout', () => ({
  useAppLayout: () => ({ isDesktop: false }),
}));

const mockDispatch = jest.fn();
const mockNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: mockNavigate } as unknown as NavigationProp<any>),
}));

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: () => mockDispatch,
}));

jest.mock('../../../src/app/slice/staffSlice', () => ({
  fetchStaffs: jest.fn(() => ({ type: 'fetchStaffs' })),
  deleteStaffData: jest.fn((payload) => ({ type: 'deleteStaffData', payload })),
}));

jest.mock('../../../src/app/slice/attendanceSlice', () => ({
  getAttendance: jest.fn(() => ({ type: 'getAttendance' })),
}));

jest.mock('../../../src/components/common/Button', () => {
  const React = require('react');
  const { TouchableOpacity, Text } = require('react-native');
  return ({ title, onPress }: any) => (
    <TouchableOpacity onPress={onPress} testID="add-button">
      <Text>{title}</Text>
    </TouchableOpacity>
  );
});

jest.mock('../../../src/screens/StaffStatus/components/StaffCard', () => {
  const React = require('react');
  const { TouchableOpacity } = require('react-native');
  return ({ onEdit, onDelete, name }: any) => (
    <>
      <TouchableOpacity onPress={onEdit} testID={`edit-${name}`} />
      <TouchableOpacity onPress={onDelete} testID={`delete-${name}`} />
    </>
  );
});

const mockUseSelector = require('react-redux').useSelector as jest.Mock;

describe('StaffStatusScreen ', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('dispatches fetchStaffs and getAttendance on mount', () => {
    mockUseSelector.mockImplementation(selector =>
      selector({
        staff: { loading: false, staffList: [], status: 'idle' },
      })
    );

    render(<StaffStatusScreen />);

    expect(mockDispatch).toHaveBeenCalledWith(fetchStaffs());
    expect(mockDispatch).toHaveBeenCalledWith(getAttendance());
  });

  it('shows loading state when staff loading is true', () => {
    mockUseSelector.mockImplementation(selector =>
      selector({
        staff: { loading: true, staffList: [], status: 'idle' },
      })
    );

    const { getByText } = render(<StaffStatusScreen />);

    expect(getByText('Loading data...')).toBeTruthy();
  });

  it('navigates to Addstaff on add button press', () => {
    mockUseSelector.mockImplementation(selector =>
      selector({
        staff: { loading: false, staffList: [], status: 'idle' },
      })
    );

    const { getByTestId } = render(<StaffStatusScreen />);

    fireEvent.press(getByTestId('add-button'));

    expect(mockNavigate).toHaveBeenCalledWith('Main', {
      screen: 'Addstaff',
      params: undefined,
    });
  });

  it('handles edit and delete actions from StaffCard', () => {
    const sample = { id: 1, full_name: 'John', shifts: { shift_name: 'Shift A' } };

    mockUseSelector.mockImplementation(selector =>
      selector({
        staff: { loading: false, status: 'idle', staffList: [sample] },
      })
    );

    const { getByTestId } = render(<StaffStatusScreen />);

    fireEvent.press(getByTestId('edit-John'));
    fireEvent.press(getByTestId('delete-John'));

    expect(mockNavigate).toHaveBeenCalledWith('Main', {
      screen: 'Addstaff',
      params: { staff: sample },
    });
    expect(mockDispatch).toHaveBeenCalledWith(deleteStaffData({ id: sample.id }));
  });
});
