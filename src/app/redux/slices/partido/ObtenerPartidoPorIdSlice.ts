import { createSlice } from '@reduxjs/toolkit';

import { getPartidoById } from 'app/redux/actions/PartidoActions/PartidoActions';
import { EditPartidoEntity } from 'app/api/domain/entities/PartidoEntities/PartidoEntity';

export interface initialStateSlice {
  data: EditPartidoEntity | null;
  loading: boolean;
  error: string | null;
}

const initialState: initialStateSlice = {
  data: null,
  error: null,
  loading: false
}

export const getPartidoSlice = createSlice({
  name: 'GetPartidoSlice',
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
      .addCase(getPartidoById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPartidoById.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getPartidoById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
})

export default getPartidoSlice.reducer