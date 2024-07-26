import { createSlice } from '@reduxjs/toolkit';


import { getAllCandidato } from 'app/redux/actions/CandidatoActions/CandidatoActions';
import { MostrarCandidatoEntity } from 'app/api/domain/entities/CandidatoEntities/CandidatoEntity';

export interface initialStateSlice {
  data: MostrarCandidatoEntity[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: initialStateSlice = {
  data: null,
  error: null,
  loading: false
}

export const getAllCandidatoSlice = createSlice({
  name: 'GetAllCandidatoSlice',
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
      .addCase(getAllCandidato.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllCandidato.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getAllCandidato.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
})

export default getAllCandidatoSlice.reducer