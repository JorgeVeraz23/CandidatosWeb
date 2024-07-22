import { createAsyncThunk } from '@reduxjs/toolkit';
// import { CreateFormEntity, EditFormEntity, ShowFormEntity } from '../../../api/domain/entities/FormEntities/FormEntity'
// import FormRepositoryImpl from 'app/api/data/FormRepositoryImpl/FormRepositoryImpl';

import { CreateCargoEntity, EditCargoEntity, MostrarCargoEntity } from 'app/api/domain/entities/CargoEntities/CargoEntity';
import CargoRepositoryImpl from 'app/api/data/CargoRepositoryImpl/CargoRepositoryImpl';


const repository = new CargoRepositoryImpl()

export const getAllCargo = createAsyncThunk<MostrarCargoEntity[], void, { rejectValue: string }>(
  "cargo/GetAllCargo",
  async (data, thunkAPI) => {
    try {
      return await repository.getAllCargo();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error desconocido";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const getCargoById = createAsyncThunk<EditCargoEntity, number, { rejectValue: string }>(
  "cargo/GetCargoById",
  async (data, thunkAPI) => {
    try {
      return await repository.getCargoById(data);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error desconocido";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const createCargo = createAsyncThunk<boolean, CreateCargoEntity, { rejectValue: string }>(
  "cargo/CreateCargo",
  async (data: CreateCargoEntity, thunkAPI) => {
    try {
      return await repository.createCargo(data);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error desconocido";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const editCargo = createAsyncThunk<boolean, EditCargoEntity, { rejectValue: string }>(
  "cargo/EditCargo",
  async (data: EditCargoEntity, thunkAPI) => {
    try {
      return await repository.editCargo(data);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error desconocido";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const deleteCargo = createAsyncThunk<boolean, number, { rejectValue: string }>(
  "cargo/DeleteCargo",
  async (data: number, thunkAPI) => {
    try {
      return await repository.deleteCargo(data);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error desconocido";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);