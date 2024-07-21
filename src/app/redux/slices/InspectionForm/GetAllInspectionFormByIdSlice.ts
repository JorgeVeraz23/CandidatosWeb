import { createSlice } from '@reduxjs/toolkit';


import { getAllInspectionFormById } from 'app/redux/actions/InspectionFormActions';
import { GetAllInspectionFormByIdEntity } from 'app/api/domain/entities/InspectionFormEntity';

export interface initialStateSlice {
  data: GetAllInspectionFormByIdEntity | null;
  loading: boolean;
  error: string | null;
}

const initialState: initialStateSlice = {
  data: null,
  error: null,
  loading: false
}

export const getAllInspectionFormByIdSlice = createSlice({
  name: 'getAllInspectionFormByIdSlice',
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
      .addCase(getAllInspectionFormById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllInspectionFormById.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getAllInspectionFormById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
})

export default getAllInspectionFormByIdSlice.reducer