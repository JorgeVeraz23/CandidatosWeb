import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { QuestionAnswerInspectionFormEntity } from 'app/api/domain/entities/InspectionFormEntity';
import { getQuestionAnswerInspection } from 'app/redux/actions/InspectionFormActions';

export interface initialStateSlice {
  data: QuestionAnswerInspectionFormEntity | null;
  loading: boolean;
  error: string | null;
}

const initialState: initialStateSlice = {
  data: null,
  error: null,
  loading: false
}

export const getQuestionAnswerInspectionSlice = createSlice({
  name: 'GetQuestionAnswerInspectionSlice',
  initialState: initialState,
  reducers: {
    resetState: (state) => {
      state.data = null;
      state.loading = false;
      state.error = null;
    },
    setData: (state, action: PayloadAction<QuestionAnswerInspectionFormEntity>) => {
      state.data = action.payload;
    },
    setError: (state, action: PayloadAction<string> ) => {
      state.error = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getQuestionAnswerInspection.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getQuestionAnswerInspection.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getQuestionAnswerInspection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
})

export default getQuestionAnswerInspectionSlice.reducer