import { createSlice } from '@reduxjs/toolkit';
import { deleteCatalogQuestionItem } from 'app/redux/actions/CatalogQuestionItemActions/CatalogQuestionItemActions';

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

export const deleteCatalogQuestionItemSlice = createSlice({
  name: 'DeleteCatalogQuestionItemSlice',
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
      .addCase(deleteCatalogQuestionItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCatalogQuestionItem.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(deleteCatalogQuestionItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
})

export default deleteCatalogQuestionItemSlice.reducer