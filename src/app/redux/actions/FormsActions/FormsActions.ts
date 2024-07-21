import { createAsyncThunk } from '@reduxjs/toolkit';
import { CreateFormEntity, EditFormEntity, ShowFormEntity } from '../../../api/domain/entities/FormEntities/FormEntity'
import FormRepositoryImpl from 'app/api/data/FormRepositoryImpl/FormRepositoryImpl';

const repository = new FormRepositoryImpl()

export const getAllForms = createAsyncThunk<ShowFormEntity[], void, { rejectValue: string }>(
  "form/getAllForms",
  async (data, thunkAPI) => {
    try {
      return await repository.getAllForms();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error desconocido";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const getFormById = createAsyncThunk<EditFormEntity, number, { rejectValue: string }>(
  "form/getFormById",
  async (data, thunkAPI) => {
    try {
      return await repository.getFormById(data);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error desconocido";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const createForm = createAsyncThunk<boolean, CreateFormEntity, { rejectValue: string }>(
  "form/createForm",
  async (data: CreateFormEntity, thunkAPI) => {
    try {
      return await repository.createForm(data);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error desconocido";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const editForm = createAsyncThunk<boolean, EditFormEntity, { rejectValue: string }>(
  "form/editForm",
  async (data: EditFormEntity, thunkAPI) => {
    try {
      return await repository.editForm(data);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error desconocido";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const deleteForm = createAsyncThunk<boolean, number, { rejectValue: string }>(
  "form/deleteForm",
  async (data: number, thunkAPI) => {
    try {
      return await repository.deleteForm(data);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error desconocido";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);