import { createSlice } from '@reduxjs/toolkit';

import { createCandidato } from 'app/redux/actions/CandidatoActions/CandidatoActions';

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

export const createCandidatoSlice = createSlice({
  name: 'CreateCandidatoSlice',
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
      .addCase(createCandidato.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCandidato.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(createCandidato.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
})

export default createCandidatoSlice.reducer