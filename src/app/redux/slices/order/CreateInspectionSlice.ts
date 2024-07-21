import { createSlice } from '@reduxjs/toolkit';
import { createInspection } from 'app/redux/actions/OrderActions';

export interface initialStateSlice {
  data: boolean | null;
  loading: boolean;
  error: string | null;
}

const initialState: initialStateSlice = {
  data: null,
  error: null,
  loading: false
}

export const createInspectionSlice = createSlice({
  name: 'CreateInspectionSlice',
  initialState: initialState,
  reducers: {
    resetState: (state) => {
      state.data = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createInspection.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createInspection.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(createInspection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
})

export default createInspectionSlice.reducer