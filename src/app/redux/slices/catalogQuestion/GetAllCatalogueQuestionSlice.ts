import { createSlice } from '@reduxjs/toolkit';


import { getAllCatalogQuestion } from 'app/redux/actions/CatalogQuestionActions/CatalogQuestionActions';
import { ShowCatalogQuestionEntity } from 'app/api/domain/entities/CatalogQuestionEntities/CatalogQuestionEntity';

export interface initialStateSlice {
  data: ShowCatalogQuestionEntity[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: initialStateSlice = {
  data: null,
  error: null,
  loading: false
}

export const getAllCatalogQuestionSlice = createSlice({
  name: 'GetAllCatalogQuestionSlice',
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
      .addCase(getAllCatalogQuestion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllCatalogQuestion.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getAllCatalogQuestion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
})

export default getAllCatalogQuestionSlice.reducer