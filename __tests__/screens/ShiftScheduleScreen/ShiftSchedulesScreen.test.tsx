import React from 'react';
import { render } from '@testing-library/react-native';
import ShiftSchedulesScreen from '../../../src/screens/ShiftSchedules/ShiftSchedulesScreen';
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

jest.mock('../../../src/screens/ShiftSchedules/components/NewShift', () => () => null);
jest.mock('../../../src/screens/ShiftSchedules/components/ExsistingShift', () => () => null);

const mockUseSelector = require('react-redux').useSelector as jest.Mock;

describe('ShiftSchedulesScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('dispatches fetchShifts on mount', () => {
    mockUseSelector.mockImplementation(selector =>
      selector({ shift: { status: 'idle' } })
    );

    render(<ShiftSchedulesScreen />);

    expect(mockDispatch).toHaveBeenCalledWith(fetchShifts());
  });

  it('shows toast when shift load fails', () => {
    mockUseSelector.mockImplementation(selector =>
      selector({ shift: { status: 'error' } })
    );

    render(<ShiftSchedulesScreen />);

    expect(Toast.show).toHaveBeenCalledWith({
      type: 'error',
      text1: 'Failed to load shift data',
    });
  });
});
