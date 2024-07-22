import { createSlice } from '@reduxjs/toolkit';

import { deleteTransparencia } from 'app/redux/actions/TransparenciaActions/TransparenciaActions';

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

export const deleteTransparenciaSlice = createSlice({
  name: 'DeleteTransparenciaSlice',
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
      .addCase(deleteTransparencia.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTransparencia.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(deleteTransparencia.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
})

export default deleteTransparenciaSlice.reducer