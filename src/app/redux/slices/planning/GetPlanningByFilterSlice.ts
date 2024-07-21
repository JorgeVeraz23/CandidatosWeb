import { createSlice } from '@reduxjs/toolkit';
import { PlanningEntity } from 'app/api/domain/entities/PlanningEntity';
import { getByFilter } from 'app/redux/actions/PlanningActions';

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

export const getPlanningByFilterSlice = createSlice({
  name: 'GetPlanningByFilterSlice',
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
      .addCase(getByFilter.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getByFilter.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getByFilter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
})

export default getPlanningByFilterSlice.reducer