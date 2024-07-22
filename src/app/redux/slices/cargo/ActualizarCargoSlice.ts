import { createSlice } from '@reduxjs/toolkit';
// import { editForm } from 'app/redux/actions/FormsActions/FormsActions';
import { editCargo } from 'app/redux/actions/CargoActions/CargoActions';

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

export const editCargoSlice = createSlice({
  name: 'EditCargoSlice',
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
      .addCase(editCargo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editCargo.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(editCargo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
})

export default editCargoSlice.reducer