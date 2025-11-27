import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Config from "react-native-config";
import {StaffState, CreateStaffPayload, DeletePayload, UpdateStaffPayload} from '../../types'
const BASE_URL = `${Config.REACT_NATIVE_BACKEND_URL}/staff`;

export const fetchStaffs = createAsyncThunk(
  "staff/fetchAll",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(BASE_URL);
      return res.data.data; // APIResponse.success() stores data in .data
    } catch (error) {
      const message =
        axios.isAxiosError(error)
          ? error.response?.data?.message || "Failed to fetch staff"
          : "Failed to fetch staff";

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createStaff = createAsyncThunk<any, CreateStaffPayload>(
  "staff/create",
  async (payload: any, thunkAPI) => {
    try {
      const res = await axios.post(BASE_URL, payload);
      return res.data.data; // newly created staff
    } catch (error) {
      const message =
        axios.isAxiosError(error)
          ? error.response?.data?.message || "Failed to create staff"
          : "Failed to create staff";

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateStaffData = createAsyncThunk<any,UpdateStaffPayload >(
  "staff/update",
  async ({ id, data }, thunkAPI) => {
    try {
      const res = await axios.put(`${BASE_URL}/${id}`, data);
      return res.data.data;
    } catch (error) {
      const message =
        axios.isAxiosError(error)
          ? error.response?.data?.message || "Failed to update staff"
          : "Failed to update staff";

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteStaffData = createAsyncThunk<any,DeletePayload>(
  "staff/delete",
  async (props, thunkAPI) => {
    try {
      await axios.delete(`${BASE_URL}/${props.id}`);
      return props.id; 
    } catch (error) {
      const message =
        axios.isAxiosError(error)
          ? error.response?.data?.message || "Failed to delete staff"
          : "Failed to delete staff";

      return thunkAPI.rejectWithValue(message);
    }
  }
);

const initialState: StaffState = {
  staffList: [],
  selectedStaff: null,
  loading: false,
  error: null,
  status: 'idle'
};

const staffSlice = createSlice({
  name: "staff",
  initialState,
  reducers: {
    clearStaffError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchStaffs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStaffs.fulfilled, (state, action) => {
        state.loading = false;
        state.staffList = action.payload;
      })
      .addCase(fetchStaffs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.status='error';
      })

      .addCase(createStaff.pending, (state) => {
        state.loading = true;
      })
      .addCase(createStaff.fulfilled, (state, action) => {
        state.loading = false;
        state.staffList.push(action.payload);
      })
      .addCase(createStaff.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.status='error';
      })

      .addCase(updateStaffData.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateStaffData.fulfilled, (state, action) => {
        state.loading = false;
        state.staffList = state.staffList.map((staff) =>
          staff.id === action.payload.id ? action.payload : staff
        );
      })
      .addCase(updateStaffData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.status='error';
      })

      .addCase(deleteStaffData.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteStaffData.fulfilled, (state, action) => {
        state.loading = false;
        state.staffList = state.staffList.filter(
          (staff) => staff.id !== action.payload
        );
      })
      .addCase(deleteStaffData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.status='error';
      });
  },
});

export const { clearStaffError } = staffSlice.actions;

export default staffSlice.reducer;