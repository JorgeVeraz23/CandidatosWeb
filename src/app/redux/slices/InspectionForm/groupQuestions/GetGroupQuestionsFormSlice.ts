import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GroupQuestionsFormEntity } from "app/api/domain/entities/FormEntities/GroupQuestionEntity";
import { getAllGroupQuestionsForm } from "app/redux/actions/GroupQuestionsFormActions";

export interface GroupQuestionInitialStateSlice{
    data?: GroupQuestionsFormEntity[];
    filteredData?: GroupQuestionsFormEntity[];
    loading: boolean;
    error?: string;
    canModifyGroupQuestion?: boolean;
}
const initialState: GroupQuestionInitialStateSlice = {
    data: [],
    filteredData:[],
    canModifyGroupQuestion: false,
    error: null,
    loading: false
}
interface SpecialProps{
  inspectForm: number;
  canModifyGroupQuestion?: boolean;
}
export const getAllGroupQuestionFormSlice = createSlice({
    name: 'getAllGroupQuestionFormSlice',
    initialState: initialState,
    reducers: {
      resetState: (state) => {
        state.data = null;
        state.loading = false;
        state.error = null;
      },
      addStateByItem:(state, action: PayloadAction<GroupQuestionsFormEntity>) => {
        if(state.data){
            state.data = [...state.data, action.payload]
        }
      },
      filterStateById:(state, action: PayloadAction<SpecialProps>) => {
        state.filteredData = state.data.filter(item => item.idInspectForm === action.payload.inspectForm);
        state.canModifyGroupQuestion = action.payload.canModifyGroupQuestion;
      },
      modifyStateById:(state, action: PayloadAction<GroupQuestionsFormEntity>) => {
        state.data = state.data.map(groupQuestion => {
            if(groupQuestion.idGroupQuestionForm == action.payload.idGroupQuestionForm){
                groupQuestion = {...action.payload}
            }
            return groupQuestion;
        })
      },
      deleteStateById:(state, action: PayloadAction<number>) => {
        state.data = state.data.filter(groupQuestion => groupQuestion.idGroupQuestionForm !== action.payload)
      }

    },
    extraReducers: (builder) => {
      builder
        .addCase(getAllGroupQuestionsForm.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(getAllGroupQuestionsForm.fulfilled, (state, action) => {
          state.loading = false;
          state.data = action.payload;
        })
        .addCase(getAllGroupQuestionsForm.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload || 'Something went wrong';
        });
    },
  })

export default getAllGroupQuestionFormSlice.reducer;