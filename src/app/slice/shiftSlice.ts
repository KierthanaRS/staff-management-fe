import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Config from "react-native-config";
import { ShiftState, CreateShiftPayload, DeletePayload } from "../../types"

const BASE_URL = `${Config.REACT_NATIVE_BACKEND_URL}/shift`;

export const fetchShifts = createAsyncThunk(
  "shifts/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(BASE_URL);
      return response.data.data; 
    } catch (error) {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.message || "Failed to fetch shifts"
        : "Failed to fetch shifts";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createShift = createAsyncThunk<any,CreateShiftPayload>(
  "shifts/create",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.post(BASE_URL, payload);
      return response.data.data;
    } catch (error) {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.message || "Failed to create shift"
        : "Failed to create shift";

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteShift = createAsyncThunk<any,DeletePayload>(
  "shifts/delete",
  async (props, thunkAPI) => {
    try {
      await axios.delete(`${BASE_URL}/${props.id}`);
      return props.id;
    } catch (error) {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.message || "Failed to delete shift"
        : "Failed to delete shift";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const initialState: ShiftState = {
  shifts: [],
  selectedShift: null,
  loading: false,
  status: 'idle',
};


const shiftSlice = createSlice({
  name: "shifts",
  initialState,
  reducers: {
    clearShiftError: (state) => {
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchShifts.pending, (state) => {
        state.loading = true;
        state.status = 'loading';
      })
      .addCase(fetchShifts.fulfilled, (state, action) => {
        state.loading = false;
        state.shifts = action.payload;
        state.status = 'success';
      })
      .addCase(fetchShifts.rejected, (state, action) => {
        state.loading = false;
        state.status = 'error';
      })

      .addCase(createShift.pending, (state) => {
        state.loading = true;
        state.status = 'loading';
      })
      .addCase(createShift.fulfilled, (state, action) => {
        state.loading = false;
        state.shifts.push(action.payload);
        state.status = 'success'
      })
      .addCase(createShift.rejected, (state, action) => {
        state.loading = false;
        state.status = 'error'
      })


      .addCase(deleteShift.pending, (state) => {
        state.loading = true;
        state.status = 'loading'
      })
      .addCase(deleteShift.fulfilled, (state, action) => {
        state.loading = false;
        state.shifts = state.shifts.filter(
          (shift) => shift.id !== action.payload
        );
        state.status = 'success'
      })
      .addCase(deleteShift.rejected, (state, action) => {
        state.loading = false;
        state.status = 'error'
      });
  },
});

export const { clearShiftError } = shiftSlice.actions;

export default shiftSlice.reducer;
