import { createSlice } from '@reduxjs/toolkit';
import { PlanningEntity } from 'app/api/domain/entities/PlanningEntity';
import { getAllPlannings } from 'app/redux/actions/PlanningActions';

export interface initialStateSlice {
  data: PlanningEntity[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: initialStateSlice = {
  data: null,
  error: null,
  loading: false
}

export const getAllPlanningsSlice = createSlice({
  name: 'GetAllPlanningsSlice',
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
      .addCase(getAllPlannings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllPlannings.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getAllPlannings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
})

export default getAllPlanningsSlice.reducer