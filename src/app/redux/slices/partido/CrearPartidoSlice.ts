import { createSlice } from '@reduxjs/toolkit';

import { createPartido } from 'app/redux/actions/PartidoActions/PartidoActions';

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

export const createPartidoSlice = createSlice({
  name: 'CreatePartidoSlice',
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
      .addCase(createPartido.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPartido.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(createPartido.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
})

export default createPartidoSlice.reducer