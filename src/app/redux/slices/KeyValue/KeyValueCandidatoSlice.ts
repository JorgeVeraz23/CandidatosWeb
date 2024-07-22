import { createSlice } from '@reduxjs/toolkit';
// import { getAllClientes } from 'app/redux/actions/ClientsActions/ClientsActions';
// import { ShowClientEntity } from 'app/api/domain/entities/ClientEntities/ClientEntity';

import { KeyValueEntity } from 'app/api/domain/entities/KeyValueEntities/KeyValueEntity';
import { keyValueCandidato } from 'app/redux/actions/KeyValueActions/KeyValueActions';

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

export const keyValueCandidatoSlice = createSlice({
  name: 'KeyValueCandidatoSlice',
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
      .addCase(keyValueCandidato.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(keyValueCandidato.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(keyValueCandidato.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
})

export default keyValueCandidatoSlice.reducer