import { createSlice } from '@reduxjs/toolkit';
import { getClients } from '../../actions/CatalogueActions';
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

export const catalogClientSlice = createSlice({
  name: 'CatalogClientSlice',
  initialState: initialState,
  reducers: {},
  
  extraReducers: (builder) => {
    builder
      .addCase(getClients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getClients.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getClients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      });
  },
})

export default catalogClientSlice.reducer