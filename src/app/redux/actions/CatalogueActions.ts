import { createAsyncThunk } from '@reduxjs/toolkit';
import { CatalogueEntity, FormCatalog, QuestionInspectionFormEntity, CatalogueEntityInspector, CatalogueEntityInspectorEditActive } from 'app/api/domain/entities/CatalogueEntity';
import CatalogueRepositoryImpl from '../../api/data/CatalogueRepositoryImpl';

const repository = new CatalogueRepositoryImpl()

export const getInspectionOrders = createAsyncThunk<CatalogueEntity[], void, { rejectValue: string }>(
  "order/getInspectionOrders",
  async (_, thunkAPI) => {
    try {
      return await repository.getInspectionOrders();
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch");
    }
  }
);

export const getClients = createAsyncThunk<CatalogueEntity[], void, { rejectValue: string }>(
  "order/getClients",
  async (_, thunkAPI) => {
    try {
      return await repository.getClients();
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch");
    }
  }
);



export const getRoles = createAsyncThunk<CatalogueEntity[], void, { rejectValue: string }>(
  "roles/getRoles",
  async (_, thunkAPI) => {
    try {
      return await repository.getRoles();
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch");
    }
  }
);

export const getInspectors = createAsyncThunk<CatalogueEntityInspector[], void, { rejectValue: string }>(
  "roles/getInspectors",
  async (_, thunkAPI) => {
    try {
      return await repository.getInspectors();
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch");
    }
  }
);

export const getInspectorsEdit = createAsyncThunk<boolean, string, { rejectValue: string }>(
  "roles/getInspectorsEdit",
  async (data: string, thunkAPI) => {
    try {
      return await repository.getInspectorsEditActive(data);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error desconocido";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const getInspectorsActive = createAsyncThunk<CatalogueEntity[], void, { rejectValue: string }>(
  "roles/getInspectorsActive",
  async (_, thunkAPI) => {
    try {
      return await repository.getInspectorsActive();
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch");
    }
  }
);

export const getAllFormCatalogs = createAsyncThunk<FormCatalog[], void, { rejectValue: string }>(
  "roles/getAllFormCatalogs",
  async (_, thunkAPI) => {
    try {
      return await repository.getAllFormCatalogs();
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch");
    }
  }
);

export const getCatalogQuestionInspection = createAsyncThunk<CatalogueEntity[], QuestionInspectionFormEntity, { rejectValue: string }>(
  "form/getCatalogQuestionInspection", 
  async (data: QuestionInspectionFormEntity, thunkAPI) => {
    try {
      return await repository.getCatalogQuestionInspection(data);
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch");
    }
  }
);
export const getForms = createAsyncThunk<CatalogueEntity[], void, { rejectValue: string }>(
  "form/getForms",
  async (_, thunkAPI) => {
    try {
      return await repository.getForms();
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch");
    }
  }
);