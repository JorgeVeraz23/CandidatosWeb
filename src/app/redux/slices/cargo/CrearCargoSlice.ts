import { createSlice } from '@reduxjs/toolkit';
// import { createForm } from 'app/redux/actions/FormsActions/FormsActions';
import { createCargo } from 'app/redux/actions/CargoActions/CargoActions';

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

export const createCargoSlice = createSlice({
  name: 'CreateCargoSlice',
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
      .addCase(createCargo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCargo.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(createCargo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
})

export default createCargoSlice.reducer