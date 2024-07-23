import { createAsyncThunk } from '@reduxjs/toolkit';

//Entity
import { CrearPropuestaEntity, EditarPropuestaEntity, MostrarPropuestaEntity } from 'app/api/domain/entities/PropuestasEntities/PropuestaEntity';
//Repository IMPL
import PropuestaRepositoryImpl from 'app/api/data/PropuestaRepositoryImpl/PropuestaRepositoryImpl';

const repository = new PropuestaRepositoryImpl()

export const getAllPropuesta = createAsyncThunk<MostrarPropuestaEntity[], void, { rejectValue: string }>(
  "propuesta/GetAllPropuesta",
  async (data, thunkAPI) => {
    try {
      return await repository.getAllPropuesta();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error desconocido";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const getPropuestaById = createAsyncThunk<EditarPropuestaEntity, number, { rejectValue: string }>(
  "propuesta/GetPropuestaById",
  async (data, thunkAPI) => {
    try {
      return await repository.getPropuestaById(data);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error desconocido";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const crearPropuesta = createAsyncThunk<boolean, CrearPropuestaEntity, { rejectValue: string }>(
  "propuesta/CrearPropuesta",
  async (data: CrearPropuestaEntity, thunkAPI) => {
    try {
      return await repository.createPropuesta(data);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error desconocido";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const editPropuesta = createAsyncThunk<boolean, EditarPropuestaEntity, { rejectValue: string }>(
  "propuesta/EditPropuesta",
  async (data: EditarPropuestaEntity, thunkAPI) => {
    try {
      return await repository.editPropuesta(data);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error desconocido";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const deletePropuesta = createAsyncThunk<boolean, number, { rejectValue: string }>(
  "propuesta/DeletePropuesta",
  async (data: number, thunkAPI) => {
    try {
      return await repository.deletePropuesta(data);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error desconocido";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);