export interface ShiftState {
  shifts: any[];
  selectedShift: any | null;
  loading: boolean;
  status: 'idle' | 'loading' | 'success' | 'error';
}

export interface CreateShiftPayload {
  shift_name: string;
  start_time: string;
  end_time: string;
  shift_days: string[];
}

export interface ShiftForm {
  shiftName : string,
  startTime: string,
  endTime : string,
  days: string,
}