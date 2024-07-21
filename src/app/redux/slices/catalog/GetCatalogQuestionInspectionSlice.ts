import { createSlice } from '@reduxjs/toolkit';
import { getCatalogQuestionInspection } from 'app/redux/actions/CatalogueActions';
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

export const getCatalogQuestionInspectionSlice = createSlice({
  name: 'GetCatalogQuestionInspection',
  initialState: initialState,
  reducers: {},
  
  extraReducers: (builder) => {
    builder
      .addCase(getCatalogQuestionInspection.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCatalogQuestionInspection.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getCatalogQuestionInspection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      });
  },
})

export default getCatalogQuestionInspectionSlice.reducer