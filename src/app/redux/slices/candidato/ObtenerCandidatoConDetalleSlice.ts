import { createSlice } from '@reduxjs/toolkit';

import { getCandidatoConDetalleById } from 'app/redux/actions/CandidatoActions/CandidatoActions';
import { EditCandidatoConDetalleEntity } from 'app/api/domain/entities/CandidatoEntities/CandidatoEntity';

export interface initialStateSlice {
  data: EditCandidatoConDetalleEntity | null;
  loading: boolean;
  error: string | null;
}

const initialState: initialStateSlice = {
  data: null,
  error: null,
  loading: false
}

export const getCandidatoConDetalleSlice = createSlice({
  name: 'GetCandidatoConDetalleSlice',
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
      .addCase(getCandidatoConDetalleById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCandidatoConDetalleById.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getCandidatoConDetalleById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
})

export default getCandidatoConDetalleSlice.reducer