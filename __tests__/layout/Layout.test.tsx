import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Layout from '../../src/layout/Layout';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useRoute: () => ({ name: 'Main', params: {} }),
  useNavigation: () => ({ navigate: mockNavigate }),
  getFocusedRouteNameFromRoute: jest.fn(),
}));

jest.mock('../../src/hooks/useAppLayout', () => ({
  useAppLayout: () => ({ isDesktop: false }),
}));

describe('Layout business logic', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('navigates to StaffStatus when clicking Staff Status', () => {
    (getFocusedRouteNameFromRoute as jest.Mock).mockReturnValue('ShiftSchedule');
    const { getByText } = render(
      <Layout>
        <></>
      </Layout>
    );

    fireEvent.press(getByText('Staff Status'));

    expect(mockNavigate).toHaveBeenCalledWith('Main', { screen: 'StaffStatus' });
  });

  it('navigates to ShiftSchedule when clicking Shift Schedules', () => {
    (getFocusedRouteNameFromRoute as jest.Mock).mockReturnValue('StaffStatus');
    const { getByText } = render(
      <Layout>
        <></>
      </Layout>
    );

    fireEvent.press(getByText('Shift Schedules'));

    expect(mockNavigate).toHaveBeenCalledWith('Main', { screen: 'ShiftSchedule' });
  });
});
