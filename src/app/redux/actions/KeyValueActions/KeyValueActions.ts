import { createAsyncThunk } from '@reduxjs/toolkit';
// import { CreateFormEntity, EditFormEntity, ShowFormEntity } from '../../../api/domain/entities/FormEntities/FormEntity'
// import FormRepositoryImpl from 'app/api/data/FormRepositoryImpl/FormRepositoryImpl';
import { KeyValueEntity } from 'app/api/domain/entities/KeyValueEntities/KeyValueEntity';
import KeyValueRepositoryImpl from 'app/api/data/KeyValueRepositoryImpl/KeyValueRepositoryImpl';

const repository = new KeyValueRepositoryImpl()

export const keyValueCandidato = createAsyncThunk<KeyValueEntity[], void, { rejectValue: string }>(
  "KeyValue/KeyValueCandidato",
  async (data, thunkAPI) => {
    try {
      return await repository.KeyValueCandidato();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error desconocido";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const keyValueTransparencia = createAsyncThunk<KeyValueEntity[], void, { rejectValue: string }>(
  "KeyValue/KeyValueTransparencia",
  async (data, thunkAPI) => {
    try {
      return await repository.KeyValueTransparencia();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error desconocido";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const keyValueCargo = createAsyncThunk<KeyValueEntity[], void, { rejectValue: string }>(
  "KeyValue/KeyValueCargo",
  async (data, thunkAPI) => {
    try {
      return await repository.KeyValueCargo();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error desconocido";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const keyValuePartido = createAsyncThunk<KeyValueEntity[], void, { rejectValue: string }>(
  "KeyValue/KeyValuePartido",
  async (data, thunkAPI) => {
    try {
      return await repository.KeyValuePartido();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error desconocido";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);