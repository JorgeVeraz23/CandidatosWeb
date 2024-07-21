import { createSlice } from '@reduxjs/toolkit';
import { getRoles } from 'app/redux/actions/CatalogueActions';
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

export const catalogRolSlice = createSlice({
  name: 'CatalogRolSlice',
  initialState: initialState,
  reducers: {},
  
  extraReducers: (builder) => {
    builder
      .addCase(getRoles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRoles.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getRoles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      });
  },
})

export default catalogRolSlice.reducer