import { createSlice } from '@reduxjs/toolkit';

import { getAllPropuesta } from 'app/redux/actions/PropuestaActions/PropuestaActions';
import { MostrarPropuestaEntity } from 'app/api/domain/entities/PropuestasEntities/PropuestaEntity';

export interface initialStateSlice {
  data: MostrarPropuestaEntity[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: initialStateSlice = {
  data: null,
  error: null,
  loading: false
}

export const getAllPropuestaSlice = createSlice({
  name: 'GetAllPropuestaSlice',
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
      .addCase(getAllPropuesta.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllPropuesta.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getAllPropuesta.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
})

export default getAllPropuestaSlice.reducer