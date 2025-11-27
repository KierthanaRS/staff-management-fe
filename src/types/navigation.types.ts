export type RootStackParamList = {
  Main: {
    screen: 'StaffStatus' | 'ShiftSchedule' | 'Addstaff';
    params?: {
      staff?: any;
    };
  };
  StaffStatus: undefined;
  ShiftSchedule: undefined;
  Addstaff: {
    staff?: any;
  } | undefined;
};
