import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Config from 'react-native-config';
import axios from 'axios';

export const fetchStaffDetails = createAsyncThunk(
    'staff/fetchStaffDetails',
    async (_, thunkAPI) => {
    try {
      const backend = Config.REACT_NATIVE_BACKEND_URL ;
      const res= await axios.get(`${backend}/staff`)
      return res.data;
    } catch (err) {
        throw new Error(`Failed to fetch staff details ${err}`)
    }
  },
)

const staffSlice = createSlice({
  name: "staff",
  initialState: {
    staffList: [],
    loading: false,
    error: null as string | null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchStaffDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStaffDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.staffList = action.payload;
      })
      .addCase(fetchStaffDetails.rejected, (state, action) => {
        state.loading = false;
        state.error =  "Something went wrong";
      });
  },
});

export default staffSlice.reducer;