import { createSlice } from '@reduxjs/toolkit';

import { getPropuestaById } from 'app/redux/actions/PropuestaActions/PropuestaActions';
import { EditarPropuestaEntity } from 'app/api/domain/entities/PropuestasEntities/PropuestaEntity';

export interface initialStateSlice {
  data: EditarPropuestaEntity | null;
  loading: boolean;
  error: string | null;
}

const initialState: initialStateSlice = {
  data: null,
  error: null,
  loading: false
}

export const getPropuestaSlice = createSlice({
  name: 'GetPropuestaSlice',
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
      .addCase(getPropuestaById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPropuestaById.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getPropuestaById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
})

export default getPropuestaSlice.reducer