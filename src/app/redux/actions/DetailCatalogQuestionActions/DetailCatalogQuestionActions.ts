import { createAsyncThunk } from '@reduxjs/toolkit';
import { CreateDetailCatalogQuestionEntity, EditDetailCatalogQuestionEntity, ShowDetailCatalogQuestionEntity } from '../../../api/domain/entities/DetailCatalogQuestion/DetailCatalogQuestionEntity'
import DetailCatalogQuestionRepositoryImpl from '../../../api/data/DetailCatalogQuestionRepositoryImpl/DetailCatalogQuestionRepositoryImpl';

const repository = new DetailCatalogQuestionRepositoryImpl()


export const getDetailCatalogQuestionById = createAsyncThunk<EditDetailCatalogQuestionEntity, number, { rejectValue: string }>(
  "detailCatalogQuestion/getDetailCatalogQuestionById",
  async (data, thunkAPI) => {
    try {
      return await repository.getDetailCatalogQuestionById(data);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error desconocido";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

