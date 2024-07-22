import { createSlice } from '@reduxjs/toolkit';


import { getTrasnparenciaById } from 'app/redux/actions/TransparenciaActions/TransparenciaActions';
import { EditarTransparienciaEntity } from 'app/api/domain/entities/TransparienciaEntities/TransparienciaEntity';

export interface initialStateSlice {
  data: EditarTransparienciaEntity | null;
  loading: boolean;
  error: string | null;
}

const initialState: initialStateSlice = {
  data: null,
  error: null,
  loading: false
}

export const getTransparenciaSlice = createSlice({
  name: 'GetTransparenciaSlice',
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
      .addCase(getTrasnparenciaById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTrasnparenciaById.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getTrasnparenciaById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
})

export default getTransparenciaSlice.reducer