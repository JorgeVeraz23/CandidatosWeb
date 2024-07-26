import { createSlice } from '@reduxjs/toolkit';

// import { getPartidoById } from 'app/redux/actions/PartidoActions/PartidoActions';
// import { EditPartidoEntity } from 'app/api/domain/entities/PartidoEntities/PartidoEntity';

import { getCandidatoById } from 'app/redux/actions/CandidatoActions/CandidatoActions';
import { EditCandidatoEntity } from 'app/api/domain/entities/CandidatoEntities/CandidatoEntity';

export interface initialStateSlice {
  data: EditCandidatoEntity | null;
  loading: boolean;
  error: string | null;
}

const initialState: initialStateSlice = {
  data: null,
  error: null,
  loading: false
}

export const getCandidatoSlice = createSlice({
  name: 'GetCandidatoSlice',
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
      .addCase(getCandidatoById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCandidatoById.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getCandidatoById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
})

export default getCandidatoSlice.reducer