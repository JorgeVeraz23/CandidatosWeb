import { createSlice } from '@reduxjs/toolkit';
import { editQuestionAnswerInspection } from 'app/redux/actions/InspectionFormActions';

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

export const editQuestionAnswerInspectionSlice = createSlice({
  name: 'EditQuestionAnswerInspectionSlice',
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
      .addCase(editQuestionAnswerInspection.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editQuestionAnswerInspection.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(editQuestionAnswerInspection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
})

export default editQuestionAnswerInspectionSlice.reducer