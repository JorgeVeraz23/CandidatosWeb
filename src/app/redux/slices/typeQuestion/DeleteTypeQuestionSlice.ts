import { createSlice } from '@reduxjs/toolkit';
import { deleteTypeQuestion } from 'app/redux/actions/TypeQuestionsActions/TypeQuestionsActions';

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

export const deleteTypeQuestionSlice = createSlice({
  name: 'DeleteTypeQuestionSlice',
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
      .addCase(deleteTypeQuestion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTypeQuestion.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(deleteTypeQuestion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
})

export default deleteTypeQuestionSlice.reducer