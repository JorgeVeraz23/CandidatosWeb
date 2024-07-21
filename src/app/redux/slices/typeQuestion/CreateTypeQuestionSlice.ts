import { createSlice } from '@reduxjs/toolkit';
import { createTypeQuestion } from 'app/redux/actions/TypeQuestionsActions/TypeQuestionsActions';

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

export const createTypeQuestionSlice = createSlice({
  name: 'CreateTypeQuestionSlice',
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
      .addCase(createTypeQuestion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTypeQuestion.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(createTypeQuestion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
})

export default createTypeQuestionSlice.reducer