import { createSlice } from '@reduxjs/toolkit';
import { getAllCargo } from 'app/redux/actions/CargoActions/CargoActions';
import { MostrarCargoEntity } from 'app/api/domain/entities/CargoEntities/CargoEntity';

export interface initialStateSlice {
  data: MostrarCargoEntity[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: initialStateSlice = {
  data: null,
  error: null,
  loading: false
}

export const getAllCargoSlice = createSlice({
  name: 'GetAllCargoSlice',
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
      .addCase(getAllCargo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllCargo.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getAllCargo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
})

export default getAllCargoSlice.reducer