import { createSlice } from '@reduxjs/toolkit';
import { getAllInspectionOrders } from 'app/redux/actions/OrderActions';
import { InspectionOrderEntity } from 'app/api/domain/entities/OrderEntity';

export interface initialStateSlice {
  data: InspectionOrderEntity[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: initialStateSlice = {
  data: null,
  error: null,
  loading: false
}

export const getAllInspectionSlice = createSlice({
  name: 'GetAllInspectionSlice',
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
      .addCase(getAllInspectionOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllInspectionOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getAllInspectionOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
})

export default getAllInspectionSlice.reducer