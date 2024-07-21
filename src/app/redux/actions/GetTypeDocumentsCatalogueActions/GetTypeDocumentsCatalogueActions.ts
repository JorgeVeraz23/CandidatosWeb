import { createAsyncThunk } from '@reduxjs/toolkit';
import { GetTypeDocumentsCatalogueEntity } from 'app/api/domain/entities/ClientEntities/GetTypeDocumentsCatalogueEntity';
import getTypeDocumentsCatalogueImpl from 'app/api/data/ClientRepositoryImpl/getTypeDocumentsCatalogueImpl';


const repository = new getTypeDocumentsCatalogueImpl()

export const getTypeDocuments = createAsyncThunk<GetTypeDocumentsCatalogueEntity[], void, { rejectValue: string }>(
  "typeDocuments/getTypeDocuments",
  async (_, thunkAPI) => {
    try {
      return await repository.getTypeDocumentsCatalogueRepository();
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch");
    }
  }
);
