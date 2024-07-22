import { createSlice } from '@reduxjs/toolkit';
// import { deleteForm } from 'app/redux/actions/FormsActions/FormsActions';
import { deleteCargo } from 'app/redux/actions/CargoActions/CargoActions';


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

export const deleteCargoSlice = createSlice({
  name: 'DeleteCargoSlice',
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
      .addCase(deleteCargo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCargo.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(deleteCargo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
})

export default deleteCargoSlice.reducer