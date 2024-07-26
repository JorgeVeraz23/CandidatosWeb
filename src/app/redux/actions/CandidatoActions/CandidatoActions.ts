import { createAsyncThunk } from '@reduxjs/toolkit';



import { CreateCandidatoEntity, EditCandidatoEntity,MostrarCandidatoEntity } from 'app/api/domain/entities/CandidatoEntities/CandidatoEntity';
import CandidatoRepositoryImpl from 'app/api/data/CandidatoRepositoryImpl/CandidatoRepositoryImpl';

const repository = new CandidatoRepositoryImpl()

export const getAllCandidato = createAsyncThunk<MostrarCandidatoEntity[], void, { rejectValue: string }>(
  "candidato/GetAllCandidato",
  async (data, thunkAPI) => {
    try {
      return await repository.getAllCandidato();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error desconocido";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const getCandidatoById = createAsyncThunk<EditCandidatoEntity, number, { rejectValue: string }>(
  "candidato/GetCandidatoById",
  async (data, thunkAPI) => {
    try {
      return await repository.getCandidatoById(data);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error desconocido";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const createCandidato = createAsyncThunk<boolean, CreateCandidatoEntity, { rejectValue: string }>(
  "candidato/CreateCandidato",
  async (data: CreateCandidatoEntity, thunkAPI) => {
    try {
      return await repository.createCandidato(data);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error desconocido";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const editCandidato = createAsyncThunk<boolean, EditCandidatoEntity, { rejectValue: string }>(
  "candidato/EditCandidato",
  async (data: EditCandidatoEntity, thunkAPI) => {
    try {
      return await repository.editCandidato(data);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error desconocido";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const deleteCandidato = createAsyncThunk<boolean, number, { rejectValue: string }>(
  "candidato/DeleteCandidato",
  async (data: number, thunkAPI) => {
    try {
      return await repository.deleteCandidato(data);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error desconocido";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);