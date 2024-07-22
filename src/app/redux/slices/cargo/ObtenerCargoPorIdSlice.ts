import { createSlice } from '@reduxjs/toolkit';
// import { getFormById } from 'app/redux/actions/FormsActions/FormsActions';
// import { EditFormEntity} from 'app/api/domain/entities/FormEntities/FormEntity';

import { getCargoById } from 'app/redux/actions/CargoActions/CargoActions';
import { EditCargoEntity } from 'app/api/domain/entities/CargoEntities/CargoEntity';

export interface initialStateSlice {
  data: EditCargoEntity | null;
  loading: boolean;
  error: string | null;
}

const initialState: initialStateSlice = {
  data: null,
  error: null,
  loading: false
}

export const getCargoSlice = createSlice({
  name: 'GetCargoSlice',
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
      .addCase(getCargoById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCargoById.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getCargoById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
})

export default getCargoSlice.reducer