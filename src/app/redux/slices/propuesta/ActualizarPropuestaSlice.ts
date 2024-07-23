import { createSlice } from '@reduxjs/toolkit';

import { editPropuesta } from 'app/redux/actions/PropuestaActions/PropuestaActions';

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

export const editPropuestaSlice = createSlice({
  name: 'EditPropuestaSlice',
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
      .addCase(editPropuesta.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editPropuesta.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(editPropuesta.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
})

export default editPropuestaSlice.reducer