import { createAsyncThunk } from '@reduxjs/toolkit';7
import { CreateQuestionEntity, EditQuestionEntity, ShowQuestionEntity } from '../../../api/domain/entities/TypeQuestionEntities/TypeQuestionsEntity'
import TypeQuestionRepositoryImpl from 'app/api/data/TypeQuestionRepositoryImpl/TypeQuestionRepositoryImpl';

const repository = new TypeQuestionRepositoryImpl()


export const createTypeQuestion = createAsyncThunk<boolean, CreateQuestionEntity, { rejectValue: string }>(
  "typeQuestion/createTypeQuestion",
  async (data: CreateQuestionEntity, thunkAPI) => {
    try {
      return await repository.createTypeQuestion(data);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error desconocido";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);


export const deleteTypeQuestion = createAsyncThunk<boolean, number, { rejectValue: string }>(
  "typeQuestion/deleteTypeQuestion",
  async (data: number, thunkAPI) => {
    try {
      return await repository.deleteTypeQuestion(data);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error desconocido";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);