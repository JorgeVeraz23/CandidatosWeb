import { createAsyncThunk } from '@reduxjs/toolkit';
import { CreateCatalogQuestionEntity, EditCatalogQuestionEntity, ShowCatalogQuestionEntity } from '../../../api/domain/entities/CatalogQuestionEntities/CatalogQuestionEntity'

import CatalogQuestionRepositoryImpl from 'app/api/data/CatalogQuestionRepositoryImpl/CatalogQuestionRepositoryImpl';

const repository = new CatalogQuestionRepositoryImpl()

export const getAllCatalogQuestion = createAsyncThunk<ShowCatalogQuestionEntity[], void, { rejectValue: string }>(
  "catalogQuestion/getAllCatalogQuestion",
  async (data, thunkAPI) => {
    try {
      return await repository.getAllCatalogQuestion();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error desconocido";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);


export const createCatalogQuestion = createAsyncThunk<boolean, CreateCatalogQuestionEntity, { rejectValue: string }>(
  "catalogQuestion/createCatalogQuestion",
  async (data: CreateCatalogQuestionEntity, thunkAPI) => {
    try {
      return await repository.createCatalogQuestion(data);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error desconocido";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const deleteCatalogQuestion = createAsyncThunk<boolean, number, { rejectValue: string }>(
  "catalogQuestion/deleteCatalogQuestion",
  async (data: number, thunkAPI) => {
    try {
      return await repository.deleteCatalogQuestion(data);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error desconocido";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);