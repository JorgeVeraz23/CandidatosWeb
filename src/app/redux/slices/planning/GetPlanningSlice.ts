import { createSlice } from '@reduxjs/toolkit';
import { EditPlanningEntity } from 'app/api/domain/entities/PlanningEntity';
import { getPlanningById } from 'app/redux/actions/PlanningActions';

export interface initialStateSlice {
  data: EditPlanningEntity | null;
  loading: boolean;
  error: string | null;
}

const initialState: initialStateSlice = {
  data: null,
  error: null,
  loading: false
}

export const getPlanningSlice = createSlice({
  name: 'GetPlanningSlice',
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
      .addCase(getPlanningById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPlanningById.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getPlanningById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
})

export default getPlanningSlice.reducer