import { createSlice } from '@reduxjs/toolkit';
import { getInspectionOrderById } from 'app/redux/actions/OrderActions';
import { EditInspectionEntity } from 'app/api/domain/entities/OrderEntity';

export interface initialStateSlice {
  data: EditInspectionEntity | null;
  loading: boolean;
  error: string | null;
}

const initialState: initialStateSlice = {
  data: null,
  error: null,
  loading: false
}

export const getInspectionOrderSlice = createSlice({
  name: 'getInspectionOrderSlice',
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
      .addCase(getInspectionOrderById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getInspectionOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getInspectionOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
})

export default getInspectionOrderSlice.reducer