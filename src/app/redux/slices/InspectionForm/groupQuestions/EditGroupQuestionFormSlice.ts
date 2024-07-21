import { createSlice } from '@reduxjs/toolkit';
import { createGroupQuestion, editGroupQuestion } from 'app/redux/actions/GroupQuestionsFormActions';
export interface initialStateSlice {
  data?: boolean;
  loading: boolean;
  error?: string;
}

const initialState: initialStateSlice = {
  data:false,
  loading: false
}

export const editGroupQuestionFormSlice = createSlice({
  name: 'form/editGroupQuestionFormSlice',
  initialState: initialState,
  reducers: {
    resetState: (state) => {
      state.data = false;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(editGroupQuestion.pending, (state) => {
        state.loading = true;
        state.data = false;
        state.error = null;
      })
      .addCase(editGroupQuestion.fulfilled, (state, action) => {
        state.loading = false;
        state.data = false;
        state.error = null;
      })
      .addCase(editGroupQuestion.rejected, (state, action) => {
        state.loading = false;
        state.data = false;
        state.error = action.payload || 'Something went wrong';
      })
      .addCase(createGroupQuestion.pending, (state) => {
        state.loading = true;
        state.data = false;
        state.error = null;
      })
      .addCase(createGroupQuestion.fulfilled, (state, action) => {
        state.loading = false;
        state.data = true;
        state.error = null;
      })
      .addCase(createGroupQuestion.rejected, (state, action) => {
        state.loading = false;
        state.data = false;
        state.error = action.payload || 'Something went wrong';
      });

  },
})

export default editGroupQuestionFormSlice.reducer