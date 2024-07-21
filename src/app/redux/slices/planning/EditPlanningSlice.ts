import { createSlice } from '@reduxjs/toolkit';
import { editPlanning } from 'app/redux/actions/PlanningActions';

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

export const editPlanningSlice = createSlice({
  name: 'EditPlanningSlice',
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
      .addCase(editPlanning.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editPlanning.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(editPlanning.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
})

export default editPlanningSlice.reducer