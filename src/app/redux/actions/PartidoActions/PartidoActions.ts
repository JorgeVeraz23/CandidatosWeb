import { createAsyncThunk } from '@reduxjs/toolkit';

//Entity
import { CreatePartidoEntity, EditPartidoEntity, MostrarPartidoEntity } from 'app/api/domain/entities/PartidoEntities/PartidoEntity';
//Repository IMPL
import PartidoRepositoryImpl from 'app/api/data/PartidoRepositoryImpl/PartidoRepositoryImpl';


const repository = new PartidoRepositoryImpl()

export const getAllPartido = createAsyncThunk<MostrarPartidoEntity[], void, { rejectValue: string }>(
  "partido/GetAllPartido",
  async (data, thunkAPI) => {
    try {
      return await repository.getAllPartido();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error desconocido";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const getPartidoById = createAsyncThunk<EditPartidoEntity, number, { rejectValue: string }>(
  "partido/GetPartidoById",
  async (data, thunkAPI) => {
    try {
      return await repository.getPartidoById(data);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error desconocido";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const createPartido = createAsyncThunk<boolean, CreatePartidoEntity, { rejectValue: string }>(
  "partido/CreatePartido",
  async (data: CreatePartidoEntity, thunkAPI) => {
    try {
      return await repository.createPartido(data);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error desconocido";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const editPartido = createAsyncThunk<boolean, EditPartidoEntity, { rejectValue: string }>(
  "partido/EditPartido",
  async (data: EditPartidoEntity, thunkAPI) => {
    try {
      return await repository.editPartido(data);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error desconocido";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const deletePartido = createAsyncThunk<boolean, number, { rejectValue: string }>(
  "partido/DeleteCargo",
  async (data: number, thunkAPI) => {
    try {
      return await repository.deletePartido(data);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error desconocido";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);