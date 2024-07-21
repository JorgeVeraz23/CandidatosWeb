import { createAsyncThunk } from '@reduxjs/toolkit';
import { CreateClientEntity, EditClientEntity, ShowClientEntity } from '../../../api/domain/entities/ClientEntities/ClientEntity'
import ClientRepositoryImpl from '../../../api/data/ClientRepositoryImpl/ClientRepositoryImpl';

const repository = new ClientRepositoryImpl()

export const getAllClientes = createAsyncThunk<ShowClientEntity[], void, { rejectValue: string }>(
  "client/getAllClientes",
  async (data, thunkAPI) => {
    try {
      return await repository.getAllClients();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error desconocido";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const getClientsById = createAsyncThunk<EditClientEntity, number, { rejectValue: string }>(
  "client/getClientsById",
  async (data, thunkAPI) => {
    try {
      return await repository.getClientById(data);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error desconocido";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const createClient = createAsyncThunk<boolean, CreateClientEntity, { rejectValue: string }>(
  "client/createClient",
  async (data: CreateClientEntity, thunkAPI) => {
    try {
      return await repository.createClient(data);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error desconocido";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const editClient = createAsyncThunk<boolean, CreateClientEntity, { rejectValue: string }>(
  "client/editClient",
  async (data: CreateClientEntity, thunkAPI) => {
    try {
      return await repository.createClient(data);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error desconocido";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const deleteClient = createAsyncThunk<boolean, number, { rejectValue: string }>(
  "client/deleteInspectionOrder",
  async (data: number, thunkAPI) => {
    try {
      return await repository.deleteClient(data);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error desconocido";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);