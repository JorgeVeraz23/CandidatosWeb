import { createSlice } from '@reduxjs/toolkit';

import { createTransparencia } from 'app/redux/actions/TransparenciaActions/TransparenciaActions';

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

export const crearTransparenciaSlice = createSlice({
  name: 'CrearTransparenciaSlice',
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
      .addCase(createTransparencia.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTransparencia.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(createTransparencia.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
})

export default crearTransparenciaSlice.reducer