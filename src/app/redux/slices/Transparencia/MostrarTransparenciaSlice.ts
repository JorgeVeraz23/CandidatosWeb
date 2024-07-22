import { createSlice } from '@reduxjs/toolkit';

import { getAllTransparencia } from 'app/redux/actions/TransparenciaActions/TransparenciaActions';
import { MostrarTransparienciaEntity } from 'app/api/domain/entities/TransparienciaEntities/TransparienciaEntity';

export interface initialStateSlice {
  data: MostrarTransparienciaEntity[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: initialStateSlice = {
  data: null,
  error: null,
  loading: false
}

export const getAllTransparenciaSlice = createSlice({
  name: 'GetAllTransparenciaSlice',
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
      .addCase(getAllTransparencia.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllTransparencia.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getAllTransparencia.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
})

export default getAllTransparenciaSlice.reducer