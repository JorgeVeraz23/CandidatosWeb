import { createSlice } from '@reduxjs/toolkit';

import { deletePartido } from 'app/redux/actions/PartidoActions/PartidoActions';


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

export const deletePartidoSlice = createSlice({
  name: 'DeletePartidoSlice',
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
      .addCase(deletePartido.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePartido.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(deletePartido.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
})

export default deletePartidoSlice.reducer