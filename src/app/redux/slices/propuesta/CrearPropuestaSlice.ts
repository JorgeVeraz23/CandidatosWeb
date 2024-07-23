import { createSlice } from '@reduxjs/toolkit';

// import { createPartido } from 'app/redux/actions/PartidoActions/PartidoActions';
import { crearPropuesta } from 'app/redux/actions/PropuestaActions/PropuestaActions';

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

export const createPropuestaSlice = createSlice({
  name: 'CreatePropuestaSlice',
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
      .addCase(crearPropuesta.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(crearPropuesta.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(crearPropuesta.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
})

export default createPropuestaSlice.reducer