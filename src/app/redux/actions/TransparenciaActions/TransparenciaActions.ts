import { createAsyncThunk } from '@reduxjs/toolkit';


import { CrearTransparienciaEntity, EditarTransparienciaEntity, MostrarTransparienciaEntity } from 'app/api/domain/entities/TransparienciaEntities/TransparienciaEntity';
import TransparenciaRepositoryImpl from 'app/api/data/TransparenciaRepositoryImpl/TransparenciaRepositoryImpl';

const repository = new TransparenciaRepositoryImpl()

export const getAllTransparencia = createAsyncThunk<MostrarTransparienciaEntity[], void, { rejectValue: string }>(
  "transparencia/GetAllTransparencia",
  async (data, thunkAPI) => {
    try {
      return await repository.getAllTransparencia();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error desconocido";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const getTrasnparenciaById = createAsyncThunk<EditarTransparienciaEntity, number, { rejectValue: string }>(
  "transparencia/GetTrasnparenciaById",
  async (data, thunkAPI) => {
    try {
      return await repository.getTransparenciaById(data);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error desconocido";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const createTransparencia = createAsyncThunk<boolean, CrearTransparienciaEntity, { rejectValue: string }>(
  "transparencia/CreateTransparencia",
  async (data: CrearTransparienciaEntity, thunkAPI) => {
    try {
      return await repository.createTransparencia(data);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error desconocido";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const editTransparencia = createAsyncThunk<boolean, EditarTransparienciaEntity, { rejectValue: string }>(
  "transparencia/EditTransparencia",
  async (data: EditarTransparienciaEntity, thunkAPI) => {
    try {
      return await repository.editTransparencia(data);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error desconocido";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const deleteTransparencia = createAsyncThunk<boolean, number, { rejectValue: string }>(
  "transparencia/DeleteTransparencia",
  async (data: number, thunkAPI) => {
    try {
      return await repository.deleteTransparencia(data);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error desconocido";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);