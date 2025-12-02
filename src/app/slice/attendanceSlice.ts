import axios from 'axios';
import Config from 'react-native-config';
import { AttendanceState } from '../../types';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = `${Config.REACT_NATIVE_BACKEND_URL}/attendance`;
const initialState: AttendanceState = {
  checkIns: {},
  loading: false,
  error: null,
};

export const checkIn = createAsyncThunk(
  'attendance/checkIn',
  async (staff_id: number, thunkAPI) => {
    try {
      const res = await axios.post(`${BASE_URL}/checkIn`, {
        staff_id,
        check_in: new Date(),
      });
      return res.data.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to check-in',
      );
    }
  },
);

export const checkOut = createAsyncThunk(
  'attendance/checkOut',
  async ({ attendance_id }: { attendance_id: number }, thunkAPI) => {
    try {
      const res = await axios.post(`${BASE_URL}/checkOut`, {
        attendance_id,
        check_out: new Date(),
      });
      return res.data.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to check-out',
      );
    }
  },
);

export const getAttendance = createAsyncThunk(
  'attendance/get',
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(BASE_URL);
      return res.data.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to get attendance details',
      );
    }
  },
);

const attendanceSlice = createSlice({
  name: 'attendance',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(checkIn.fulfilled, (state, action) => {
        const attendance = action.payload;
        state.checkIns[attendance.staff_id] = attendance.id;
      })
      .addCase(checkOut.fulfilled, (state, action) => {
        const attendance = action.payload;
        delete state.checkIns[attendance.staff_id];
      })
      .addCase(checkIn.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(checkOut.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(getAttendance.fulfilled, (state, action) => {
        const attendance = action.payload;
        const mapping: Record<number, number> = {};

        attendance.forEach((entry: any) => {
          mapping[entry.staff_id] = entry.id;
        });

        state.checkIns = mapping;
      })
      .addCase(getAttendance.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export default attendanceSlice.reducer;
