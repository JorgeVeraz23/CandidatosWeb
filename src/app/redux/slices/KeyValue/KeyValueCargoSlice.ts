import { createSlice } from '@reduxjs/toolkit';


import { KeyValueEntity } from 'app/api/domain/entities/KeyValueEntities/KeyValueEntity';
import { keyValueCargo } from 'app/redux/actions/KeyValueActions/KeyValueActions';

export interface initialStateSlice {
  data: KeyValueEntity[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: initialStateSlice = {
  data: null,
  error: null,
  loading: false
}

export const keyValueCargoSlice = createSlice({
  name: 'KeyValueCargoSlice',
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
      .addCase(keyValueCargo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(keyValueCargo.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(keyValueCargo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
})

export default keyValueCargoSlice.reducer