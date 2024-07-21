import { createSlice } from '@reduxjs/toolkit';

import { getDetailCatalogQuestionById } from 'app/redux/actions/DetailCatalogQuestionActions/DetailCatalogQuestionActions';
import { EditDetailCatalogQuestionEntity } from 'app/api/domain/entities/DetailCatalogQuestion/DetailCatalogQuestionEntity';
export interface initialStateSlice {
  data: EditDetailCatalogQuestionEntity | null;
  loading: boolean;
  error: string | null;
}

const initialState: initialStateSlice = {
  data: null,
  error: null,
  loading: false
}

export const getDetailCatalogQuestionSlice = createSlice({
  name: 'GetDetailCatalogQuestionSlice',
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
      .addCase(getDetailCatalogQuestionById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDetailCatalogQuestionById.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getDetailCatalogQuestionById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
})

export default getDetailCatalogQuestionSlice.reducer