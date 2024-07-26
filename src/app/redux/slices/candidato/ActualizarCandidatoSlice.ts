import { createSlice } from '@reduxjs/toolkit';

import { editCandidato } from 'app/redux/actions/CandidatoActions/CandidatoActions';

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

export const editCandidatoSlice = createSlice({
  name: 'EditCandidatoSlice',
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
      .addCase(editCandidato.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editCandidato.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(editCandidato.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
})

export default editCandidatoSlice.reducer