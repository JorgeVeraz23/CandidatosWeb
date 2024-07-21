import { createAsyncThunk } from '@reduxjs/toolkit';
import QuestionsFormRepositoryImpl from 'app/api/data/QuestionRepositoryImpl/QuestionFormRepositoryImpl';
import { QuestionEntity, ResponseApi } from 'app/api/domain/entities/QuestionRepository/QuestionEntity';
const repository = new QuestionsFormRepositoryImpl();
  export const getAllQuestionsForm = createAsyncThunk<QuestionEntity[], void, { rejectValue: string }>(
    "form/getAllQuestion",
    async (_, thunkAPI) => {
      try {
        return await repository.getAllQuestions();
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Error desconocido";
        return thunkAPI.rejectWithValue(errorMessage);
      }
    }
  );
  export const getQuestionById = createAsyncThunk<QuestionEntity, number, { rejectValue: string }>(
    "form/getQuestionsById",
    async (data, thunkAPI) => {
      try {
        return await repository.getQuestionsFormById(data);
      } catch (error) {
        console.log(data)
        const errorMessage = error instanceof Error ? error.message : "Error desconocido";
        return thunkAPI.rejectWithValue(errorMessage);
      }
    }
  );

  export const editQuestion = createAsyncThunk<boolean, QuestionEntity, { rejectValue: string }>(
    "form/editQuestion",
    async (data: QuestionEntity, thunkAPI) => {
      try {
        return await repository.editQuestionForm(data);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Error desconocido";
        return thunkAPI.rejectWithValue(errorMessage);
      }
    }
  );
  export const createQuestion = createAsyncThunk<ResponseApi, QuestionEntity, { rejectValue: string }>(
    "form/createQuestion",
    async (data: QuestionEntity, thunkAPI) => {
      try {
        return await repository.createQuestionForm(data);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Error desconocido";
        return thunkAPI.rejectWithValue(errorMessage);
      }
    }
  );
  export const deleteQuestionById = createAsyncThunk<boolean, number, { rejectValue: string }>(
    "form/deleteQuestionById",
    async (data, thunkAPI) => {
      try {
        return await repository.deleteQuestionForm(data);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Error desconocido";
        return thunkAPI.rejectWithValue(errorMessage);
      }
    }
  );