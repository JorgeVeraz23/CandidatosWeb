import { createSlice } from '@reduxjs/toolkit';
import { deleteQuestionById } from 'app/redux/actions/QuestionActions/QuestionActions';

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

export const deleteQuestionSlice = createSlice({
  name: 'DeleteQuestionSlice',
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
      .addCase(deleteQuestionById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteQuestionById.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(deleteQuestionById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
})

export default deleteQuestionSlice.reducer