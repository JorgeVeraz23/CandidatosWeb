import { createSlice } from '@reduxjs/toolkit';


import { editTransparencia } from 'app/redux/actions/TransparenciaActions/TransparenciaActions';

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

export const editTransparenciaSlice = createSlice({
  name: 'EditTransparenciaSlice',
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
      .addCase(editTransparencia.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editTransparencia.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(editTransparencia.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
})

export default editTransparenciaSlice.reducer