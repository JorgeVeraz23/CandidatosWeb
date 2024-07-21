import { createSlice } from '@reduxjs/toolkit';
import { getAllFormCatalogs } from '../../actions/CatalogueActions';
import { FormCatalog } from 'app/api/domain/entities/CatalogueEntity';

export interface initialStateSlice {
  data: FormCatalog[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: initialStateSlice = {
  data: null,
  error: null,
  loading: false
}

export const getAllFormCatalogsSlice = createSlice({
  name: 'GetAllFormCatalogsSlice',
  initialState: initialState,
  reducers: {
    resetState: (state) => {
      state.data = null;
      state.error = null;
      state.loading = false;
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(getAllFormCatalogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllFormCatalogs.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getAllFormCatalogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      });
  },
})

export default getAllFormCatalogsSlice.reducer