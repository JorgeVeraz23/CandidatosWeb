import { createSlice } from '@reduxjs/toolkit';
import { getInspectorsActive } from '../../actions/CatalogueActions';
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

export const catalogInspectorActiveSlice = createSlice({
  name: 'CatalogInspectorActiveSlice',
  initialState: initialState,
  reducers: {},
  
  extraReducers: (builder) => {
    builder
      .addCase(getInspectorsActive.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getInspectorsActive.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getInspectorsActive.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      });
  },
})

export default catalogInspectorActiveSlice.reducer