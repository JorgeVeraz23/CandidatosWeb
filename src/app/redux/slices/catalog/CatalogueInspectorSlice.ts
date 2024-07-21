import { createSlice } from '@reduxjs/toolkit';
import { getInspectors } from '../../actions/CatalogueActions';
import { CatalogueEntityInspector } from 'app/api/domain/entities/CatalogueEntity';

export interface initialStateSlice {
  data: CatalogueEntityInspector[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: initialStateSlice = {
  data: null,
  error: null,
  loading: false
}

export const catalogInspectorSlice = createSlice({
  name: 'CatalogInspectorSlice',
  initialState: initialState,
  reducers: {},
  
  extraReducers: (builder) => {
    builder
      .addCase(getInspectors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getInspectors.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getInspectors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      });
  },
})

export default catalogInspectorSlice.reducer