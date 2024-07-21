import { createAsyncThunk } from '@reduxjs/toolkit';
import { QuestionTypeEntity } from 'app/api/domain/entities/QuestionTypeEntities/QuestionTypeEntities';
import getQuestionTypeRepositoryImpl from 'app/api/data/QuestionTypeRepositoryImpl/QuestionTypeRepositoryImpl';
const repository = new getQuestionTypeRepositoryImpl()

export const getQuestionType = createAsyncThunk<QuestionTypeEntity[], void, { rejectValue: string }>(
  "questionType/getQuestionType",
  async (_, thunkAPI) => {
    try {
      return await repository.getQuestionTypeRepository();
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch");
    }
  }
);
