import { createSlice } from '@reduxjs/toolkit';

// import { editCargo } from 'app/redux/actions/CargoActions/CargoActions';
import { editPartido } from 'app/redux/actions/PartidoActions/PartidoActions';

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

export const editPartidoSlice = createSlice({
  name: 'EditPartidoSlice',
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
      .addCase(editPartido.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editPartido.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(editPartido.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
})

export default editPartidoSlice.reducer