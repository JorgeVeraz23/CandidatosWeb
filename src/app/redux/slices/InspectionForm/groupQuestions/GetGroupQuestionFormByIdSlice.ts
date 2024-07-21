import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { GroupQuestionsFormEntity } from "app/api/domain/entities/FormEntities/GroupQuestionEntity";
import { getGroupQuestionsFormById } from "app/redux/actions/GroupQuestionsFormActions";

export interface GroupQuestionInitialStateSlice{
    data?: GroupQuestionsFormEntity;
    loading: boolean;
    requestState?: "pending" | "fulfilled" | "rejected" | "default";
    error?: string;
}
const initialState: GroupQuestionInitialStateSlice = {
    data:{
        idGroupQuestionForm: 0,
        nameGroupES: '',
        nameGroupEN: '',
        orderGroup: 0,
        idInspectForm: 0
    },
    loading: false,
    requestState: "default"
}
export interface GroupQuestionChanged{
    field: string;
    value: string | boolean;
}
export const getGroupQuestionFormByIdSlice = createSlice({
    name: 'getGroupQuestionFormByIdSlice',
    initialState: initialState,
    reducers: {
      resetState: (state) => {
        //state.data = initialState.data;
        state.data = {
          ...state.data,
          ['nameGroupES']: '',
          ['nameGroupEN']: '',
          ['orderGroup']: 0,
        }
      },
      modifyStateByInput:(state, action:PayloadAction<GroupQuestionChanged>) => {
        state.data = {
                ...state.data,
                [action.payload.field]: action.payload.value
            }
      },
      modifyStateBySelect:(state, action:PayloadAction<number>) => {
        state.data = {
            ...state.data,
            idInspectForm: action.payload
        }
      }
    },
    extraReducers: (builder) => {
      builder
        .addCase(getGroupQuestionsFormById.pending, (state) => {
          state.data = initialState.data;
          state.loading = true;
          state.error = null;
          state.requestState = "pending";
        })
        .addCase(getGroupQuestionsFormById.fulfilled, (state, action) => {
          state.loading = false;
          state.data = action.payload;
          state.requestState = "fulfilled";
        })
        .addCase(getGroupQuestionsFormById.rejected, (state, action) => {
          state.loading = false;
          state.data = initialState.data;
          state.error = action.payload || 'Something went wrong';
          state.requestState = "rejected";
        });
    },
})
  export default getGroupQuestionFormByIdSlice.reducer;