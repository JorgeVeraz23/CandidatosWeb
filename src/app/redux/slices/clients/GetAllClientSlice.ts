import { createSlice } from '@reduxjs/toolkit';
import { getAllClientes } from 'app/redux/actions/ClientsActions/ClientsActions';
import { ShowClientEntity } from 'app/api/domain/entities/ClientEntities/ClientEntity';

export interface initialStateSlice {
  data: ShowClientEntity[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: initialStateSlice = {
  data: null,
  error: null,
  loading: false
}

export const getAllClientSlice = createSlice({
  name: 'GetAllClientSlice',
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
      .addCase(getAllClientes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllClientes.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getAllClientes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
})

export default getAllClientSlice.reducer