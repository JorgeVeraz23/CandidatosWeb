import { createAsyncThunk } from '@reduxjs/toolkit';
import { CreateCatalogQuestionItemEntity, EditCatalogQuestionItemEntity, ShowCatalogQuestionItemEntity } from '../../../api/domain/entities/CatalogQuestionItemEntity/CatalogQuestionItemEntity'
import { EditCatalogQuestionEntity } from 'app/api/domain/entities/CatalogQuestionEntities/CatalogQuestionEntity';

import CatalogQuestionRepositoryImpl from '../../../api/data/CatalogQuestionItemRepositoryImpl/CatalogQuestionItemRepositoryImpl';

const repository = new CatalogQuestionRepositoryImpl()

export const getCatalogQuestionItemById = createAsyncThunk<EditCatalogQuestionItemEntity, number, { rejectValue: string }>(
  "detailCatalogQuestion/getCatalogQuestionItemById",
  async (data, thunkAPI) => {
    try {
      return await repository.getCatalogQuestionItemById(data);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error desconocido";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const getDetailCatalogQuestionItemById = createAsyncThunk<EditCatalogQuestionEntity, number, { rejectValue: string }>(
    "detailCatalogQuestion/getDetailCatalogQuestionItemById",
    async (data, thunkAPI) => {
      try {
        return await repository.getDetailCatalogQuestionItemById(data);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Error desconocido";
        return thunkAPI.rejectWithValue(errorMessage);
      }
    }
  );

export const createCatalogQuestionItem = createAsyncThunk<boolean, CreateCatalogQuestionItemEntity, { rejectValue: string }>(
  "detailCatalogQuestion/createCatalogQuestionItem",
  async (data: CreateCatalogQuestionItemEntity, thunkAPI) => {
    try {
      return await repository.createCatalogQuestionItem(data);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error desconocido";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);



export const deleteCatalogQuestionItem = createAsyncThunk<boolean, number, { rejectValue: string }>(
  "detailCatalogQuestion/deleteCatalogQuestionItem",
  async (data: number, thunkAPI) => {
    try {
      return await repository.deleteCatalogQuestionItem(data);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error desconocido";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);