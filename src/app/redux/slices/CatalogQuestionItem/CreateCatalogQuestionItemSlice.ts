import { createSlice } from '@reduxjs/toolkit';

import { createCatalogQuestionItem } from 'app/redux/actions/CatalogQuestionItemActions/CatalogQuestionItemActions';

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

export const createCatalogQuestionItemSlice = createSlice({
  name: 'CreateCatalogQuestionItemSlice',
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
      .addCase(createCatalogQuestionItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCatalogQuestionItem.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(createCatalogQuestionItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
})

export default createCatalogQuestionItemSlice.reducer