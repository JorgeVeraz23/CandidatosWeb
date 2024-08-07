import { createSlice } from '@reduxjs/toolkit';
import { getClientsById } from 'app/redux/actions/ClientsActions/ClientsActions';
import { EditClientEntity} from 'app/api/domain/entities/ClientEntities/ClientEntity';

export interface initialStateSlice {
  data: EditClientEntity | null;
  loading: boolean;
  error: string | null;
}

const initialState: initialStateSlice = {
  data: null,
  error: null,
  loading: false
}

export const getInspectionOrderSlice = createSlice({
  name: 'getInspectionOrderSlice',
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
      .addCase(getClientsById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getClientsById.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getClientsById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
})

export default getInspectionOrderSlice.reducer