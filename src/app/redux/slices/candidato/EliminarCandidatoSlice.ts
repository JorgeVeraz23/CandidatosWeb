import { createSlice } from '@reduxjs/toolkit';

import { deleteCandidato } from 'app/redux/actions/CandidatoActions/CandidatoActions';


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

export const deleteCandidatoSlice = createSlice({
  name: 'DeleteCandidatoSlice',
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
      .addCase(deleteCandidato.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCandidato.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(deleteCandidato.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
})

export default deleteCandidatoSlice.reducer