import { createSlice } from '@reduxjs/toolkit';

// import { deletePartido } from 'app/redux/actions/PartidoActions/PartidoActions';
import { deletePropuesta } from 'app/redux/actions/PropuestaActions/PropuestaActions';

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

export const deletePropuestaSlice = createSlice({
  name: 'DeletePropuestaSlice',
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
      .addCase(deletePropuesta.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePropuesta.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(deletePropuesta.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
})

export default deletePropuestaSlice.reducer