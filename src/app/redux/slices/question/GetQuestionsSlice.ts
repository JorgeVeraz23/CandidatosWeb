import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { QuestionEntity } from 'app/api/domain/entities/QuestionRepository/QuestionEntity';
import { getAllQuestionsForm } from 'app/redux/actions/QuestionActions/QuestionActions';

export interface QuestionInitialStateSlice{
    data?: QuestionEntity[];
    loading: boolean;
    error?: string;
}
const initialState: QuestionInitialStateSlice = {
    data: [],
    error: null,
    loading: false
}
export const getAllQuestionSlice = createSlice({
    name: 'GetAllQuestionSlice',
    initialState: initialState,
    reducers: {
      resetState: (state) => {
        state.data = null;
        state.loading = false;
        state.error = null;
      },
      addStateByItem:(state, action: PayloadAction<QuestionEntity>) => {
        if(state.data){
            state.data = [...state.data, action.payload]
        }
      },
      modifyStateById:(state, action: PayloadAction<QuestionEntity>) => {
        state.data = state.data.map(Question => {
            if(Question.idQuestionForm == action.payload.idQuestionForm){
              Question = {...action.payload}
            }
            return Question;
        })
      },
      deleteStateById:(state, action: PayloadAction<number>) => {
        state.data = state.data.filter(Question => Question.idQuestionForm !== action.payload)
      }
      

    },
    extraReducers: (builder) => {
      builder
        .addCase(getAllQuestionsForm.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(getAllQuestionsForm.fulfilled, (state, action) => {
          state.loading = false;
          state.data = action.payload;
        })
        .addCase(getAllQuestionsForm.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload || 'Something went wrong';
        });


    },
  })

export default getAllQuestionSlice.reducer;