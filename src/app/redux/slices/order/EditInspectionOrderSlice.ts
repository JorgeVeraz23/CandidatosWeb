import { createSlice } from '@reduxjs/toolkit';
import { editInspectionOrder } from 'app/redux/actions/OrderActions';

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

export const editInspectionOrderSlice = createSlice({
  name: 'EditInspectionSlice',
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
      .addCase(editInspectionOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editInspectionOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(editInspectionOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
})

export default editInspectionOrderSlice.reducer