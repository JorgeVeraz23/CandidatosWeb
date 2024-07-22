import { createSlice } from '@reduxjs/toolkit';

import { getAllPartido } from 'app/redux/actions/PartidoActions/PartidoActions';
import { MostrarPartidoEntity } from 'app/api/domain/entities/PartidoEntities/PartidoEntity';

export interface initialStateSlice {
  data: MostrarPartidoEntity[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: initialStateSlice = {
  data: null,
  error: null,
  loading: false
}

export const getAllPartidoSlice = createSlice({
  name: 'GetAllPartidoSlice',
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
      .addCase(getAllPartido.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllPartido.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getAllPartido.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
})

export default getAllPartidoSlice.reducer