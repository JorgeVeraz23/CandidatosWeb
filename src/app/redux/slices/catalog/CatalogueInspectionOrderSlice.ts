import { createSlice } from '@reduxjs/toolkit';
import { getInspectionOrders } from '../../actions/CatalogueActions';
import { CatalogueEntity } from 'app/api/domain/entities/CatalogueEntity';

export interface initialStateSlice {
  data: CatalogueEntity[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: initialStateSlice = {
  data: null,
  error: null,
  loading: false
}

export const catalogInspectionOrderSlice = createSlice({
  name: 'CatalogInspectionOrderSlice',
  initialState: initialState,
  reducers: {},
  
  extraReducers: (builder) => {
    builder
      .addCase(getInspectionOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getInspectionOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getInspectionOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      });
  },
})

export default catalogInspectionOrderSlice.reducer