import { createSlice } from '@reduxjs/toolkit';

import { getDetailCatalogQuestionItemById } from 'app/redux/actions/CatalogQuestionItemActions/CatalogQuestionItemActions';

import { EditCatalogQuestionEntity } from 'app/api/domain/entities/CatalogQuestionEntities/CatalogQuestionEntity';
export interface initialStateSlice {
  data: EditCatalogQuestionEntity | null;
  loading: boolean;
  error: string | null;
}

const initialState: initialStateSlice = {
  data: null,
  error: null,
  loading: false
}

export const getDetailCatalogQuestionItemByIdSlice = createSlice({
  name: 'GetDetailCatalogQuestionItemByIdSlice',
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
      .addCase(getDetailCatalogQuestionItemById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDetailCatalogQuestionItemById.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getDetailCatalogQuestionItemById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
})

export default getDetailCatalogQuestionItemByIdSlice.reducer