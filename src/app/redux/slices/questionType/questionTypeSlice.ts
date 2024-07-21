import { createSlice } from '@reduxjs/toolkit';
import { getQuestionType } from 'app/redux/actions/QuestionTypeActions/QuestionTypeActions';
import { QuestionTypeEntity } from 'app/api/domain/entities/QuestionTypeEntities/QuestionTypeEntities';
export interface initialStateSlice {
  data: QuestionTypeEntity[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: initialStateSlice = {
  data: null,
  error: null,
  loading: false
}

export const questionTypeSlice = createSlice({
  name: 'QuestionTypeSlice',
  initialState: initialState,
  reducers: {},
  
  extraReducers: (builder) => {
    builder
      .addCase(getQuestionType.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getQuestionType.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getQuestionType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      });
  },
})

export default questionTypeSlice.reducer