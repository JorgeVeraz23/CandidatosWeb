import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { QuestionEntity, ResponseApi } from 'app/api/domain/entities/QuestionRepository/QuestionEntity';
import { createQuestion, editQuestion, getQuestionById } from 'app/redux/actions/QuestionActions/QuestionActions';
import { GroupQuestionChanged } from '../InspectionForm/groupQuestions/GetGroupQuestionFormByIdSlice';

export interface QuestionInitialStateSlice{
    data?: QuestionEntity;
    response?: ResponseApi;
    isLoading?:{
        create: boolean,
        edit: boolean,
        get:boolean
    }
}

const initialState: QuestionInitialStateSlice = {
    response: {
        message: "",
        success: true,
    },
    data: {
        idQuestionForm: 0,
        idQuestionType: 0,
        idCatalogQuestion:0,
        idInspectionForm:0,
        idQuestionValidation:0,
        questionTextES: "",
        questionTextEN: "",
        isRequiredDesc: "",
        isMultipleSelectDesc: "",
        inReportPDFDesc: "",
        isRequired: false,
        isMultipleSelect: false,
        inReportPDF: false,
        groupQuestionName: '',
        questionTypeName: '',
        formName: '',
        order: 0,
        catalogName: ''
    },
    isLoading:{
        create: false,
        edit: false,
        get: false
    },
}

export const getQuestionSlice = createSlice({
    name: 'getQuestionSlice',
    initialState: initialState,
    reducers: {
      resetState: (state) => {
        state.data = {...initialState.data};
        state.response = {...initialState.response};
        state.isLoading = {...initialState.isLoading};
      },
      resetStateInput: (state) => {
        state.data = {
          ...state.data,
          ['questionTextES']: '',
          ['questionTextEN']: '',
          ['order']: 0,
          ['isRequired']: false,
        }
      },
      modifyStateEdit: (state, action:PayloadAction<QuestionEntity>)=>{
        state.data = {...action.payload}
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
            idQuestionForm: action.payload
        }
      },
      // Nuevo reducer para actualizar idQuestionForm
      updateIdQuestionForm: (state, action: PayloadAction<number>) => {
        state.data = {
          ...state.data,
          idQuestionForm: action.payload
        }
      }
    },
    extraReducers: (builder) => {
      builder
        .addCase(createQuestion.pending, (state) => {
          state.response.message = null;
          state.isLoading.create = true;
        })
        .addCase(createQuestion.fulfilled, (state, action) => {
          state.response = {...action.payload}
          state.isLoading.create = false;
        })
        .addCase(createQuestion.rejected, (state, action) => {
          state.isLoading.create = false;
          state.response.success = false;
          state.response.message = action.payload || 'Something went wrong';
        })
        // EDIT
        .addCase(editQuestion.pending, (state) => {
          state.response.message = null;
          state.isLoading.edit = true;
        })
        .addCase(editQuestion.fulfilled, (state, action) => {
          state.response.success = action.payload
          state.isLoading.edit = false;
        })
        .addCase(editQuestion.rejected, (state, action) => {
          state.isLoading.edit = false;
          state.response.success = false;
          state.response.message = action.payload || 'Something went wrong';
        })
        // GET BY ID
        .addCase(getQuestionById.pending, (state) => {
          state.response.message = null;
          state.isLoading.get = true;
        })
        .addCase(getQuestionById.fulfilled, (state, action) => {
          state.data = action.payload
          state.isLoading.get = false;
        })
        .addCase(getQuestionById.rejected, (state, action) => {
          state.isLoading.get = false;
          state.response.success = false;
          state.response.message = action.payload || 'Something went wrong';
        });

    },
})

export const { updateIdQuestionForm } = getQuestionSlice.actions;

export default getQuestionSlice.reducer;
