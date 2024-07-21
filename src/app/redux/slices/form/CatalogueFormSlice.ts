import { createSlice } from '@reduxjs/toolkit';

import { CatalogueEntity } from 'app/api/domain/entities/CatalogueEntity';
import { getForms } from '../../actions/CatalogueActions';
export interface initialStateSlice {
  data: CatalogueEntity[] | null;
  loading: boolean;
  error: string | null;
}

export const initialState: initialStateSlice = {
  data:null,
  //  [{
  //   value: "",
  //   label: "",
  // }],
  error: null,
  loading: false
}

export const catalogueFormSlice = createSlice({
  name: 'GetAllFormSlice',
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
      .addCase(getForms.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getForms.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getForms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
})

export default catalogueFormSlice.reducer