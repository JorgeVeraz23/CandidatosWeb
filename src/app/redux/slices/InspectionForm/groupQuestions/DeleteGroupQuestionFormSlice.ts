import { createSlice } from '@reduxjs/toolkit';
import { initialStateSlice } from './EditGroupQuestionFormSlice';
import { deleteGroupQuestionsFormById } from 'app/redux/actions/GroupQuestionsFormActions';

const initialState: initialStateSlice = {
  loading: false
}

export const deleteGroupQuestionFormSlice = createSlice({
  name: 'form/deleteGroupQuestionFormSlice',
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
      .addCase(deleteGroupQuestionsFormById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteGroupQuestionsFormById.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(deleteGroupQuestionsFormById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
})

export default deleteGroupQuestionFormSlice.reducer