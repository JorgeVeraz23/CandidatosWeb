import { createSlice } from '@reduxjs/toolkit';

import { getCatalogQuestionItemById } from 'app/redux/actions/CatalogQuestionItemActions/CatalogQuestionItemActions';
import { EditCatalogQuestionItemEntity } from 'app/api/domain/entities/CatalogQuestionItemEntity/CatalogQuestionItemEntity';
export interface initialStateSlice {
  data: EditCatalogQuestionItemEntity | null;
  loading: boolean;
  error: string | null;
}

const initialState: initialStateSlice = {
  data: null,
  error: null,
  loading: false
}

export const getCatalogQuestionItemByIdSlice = createSlice({
  name: 'GetCatalogQuestionItemByIdSlice',
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
      .addCase(getCatalogQuestionItemById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCatalogQuestionItemById.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getCatalogQuestionItemById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
})

export default getCatalogQuestionItemByIdSlice.reducer