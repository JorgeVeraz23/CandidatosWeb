import { createSlice } from '@reduxjs/toolkit';
import { deleteInspectionOrder } from 'app/redux/actions/OrderActions';


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

export const deleteInspectionSlice = createSlice({
  name: 'DeleteInspectionSlice',
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
      .addCase(deleteInspectionOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteInspectionOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(deleteInspectionOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
})

export default deleteInspectionSlice.reducer