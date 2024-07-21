import { createAsyncThunk } from '@reduxjs/toolkit';
import { 
    PlanningEntity, 
    CreatePlanningEntity, 
    EditPlanningEntity, 
} from '../../api/domain/entities/PlanningEntity';

import PlanningRepositoryImpl from 'app/api/data/PlanningRepositoryImpl';

const repository = new PlanningRepositoryImpl()

export const getAllPlannings = createAsyncThunk<PlanningEntity[], void, { rejectValue: string }>(
  "order/getAllPlanningOrders",
  async (data, thunkAPI) => {
    try {
      return await repository.getAll();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error desconocido";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

// export const getByFilter = createAsyncThunk<PlanningEntity[], void, { rejectValue: string}>(
//   "order/getByFilter",
//   async (FechaDesde, thunkAPI) => {
//      try{
//       return await repository.getByFilter(data);
//      }catch(error){
//       const errorMessage = error instanceof Error ? error.message : "Error desconodido";
//       return thunkAPI.rejectWithValue(errorMessage);
//      }
//   }
// )

export const getByFilter = createAsyncThunk<PlanningEntity[], {FechaDesde: Date, FechaHasta: Date}, {rejectValue : string}>(
  "order/getByFilter",
  async ({ FechaDesde, FechaHasta}, thunkAPI) =>{
    try{
      //llama al metodo getByFilter del repository
      const planningEntities = await repository.getByFilter(FechaDesde, FechaHasta);
      return planningEntities; // devuelve las entidades obtenidas
    }catch(error){
      //maneja cualquier error que ocurra durante la llamada al repository
      const errorMessage = error instanceof Error? error.message : "Error desconocido";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  } 
);

export const getPlanningById = createAsyncThunk<EditPlanningEntity, string, { rejectValue: string }>(
  "order/getPlanningById",
  async (data, thunkAPI) => {
    try {
      return await repository.getById(data);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error desconocido";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const createPlanning = createAsyncThunk<boolean, CreatePlanningEntity, { rejectValue: string }>(
  "order/createPlanning",
  async (data: CreatePlanningEntity, thunkAPI) => {
    try {
      return await repository.create(data);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error desconocido";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const editPlanning = createAsyncThunk<boolean, EditPlanningEntity, { rejectValue: string }>(
  "order/editPlanning",
  async (data: EditPlanningEntity, thunkAPI) => {
    try {
      return await repository.edit(data);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error desconocido";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const deletePlanning = createAsyncThunk<boolean, string, { rejectValue: string }>(
  "order/deletePlanning",
  async (data: string, thunkAPI) => {
    try {
      return await repository.delete(data);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error desconocido";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);