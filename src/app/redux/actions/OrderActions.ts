import { createAsyncThunk } from '@reduxjs/toolkit';
import { CreateInspectionEntity, EditInspectionEntity, InspectionOrderEntity } from '../../api/domain/entities/OrderEntity';
import OrderRepositoryImpl from '../../api/data/OrderRepositoryImpl';

const repository = new OrderRepositoryImpl()

export const getAllInspectionOrders = createAsyncThunk<InspectionOrderEntity[], void, { rejectValue: string }>(
  "order/getAllInspectionOrders",
  async (data, thunkAPI) => {
    try {
      return await repository.getAllInspectionOrders();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error desconocido";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const getInspectionOrderById = createAsyncThunk<EditInspectionEntity, number, { rejectValue: string }>(
  "order/getInspectionOrderById",
  async (data, thunkAPI) => {
    try {
      return await repository.getInspectionOrderById(data);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error desconocido";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const createInspection = createAsyncThunk<boolean, CreateInspectionEntity, { rejectValue: string }>(
  "order/createInspection",
  async (data: CreateInspectionEntity, thunkAPI) => {
    try {
      return await repository.createInspectionOrder(data);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error desconocido";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const editInspectionOrder = createAsyncThunk<boolean, EditInspectionEntity, { rejectValue: string }>(
  "order/editInspection",
  async (data: EditInspectionEntity, thunkAPI) => {
    try {
      return await repository.editInspectionOrder(data);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error desconocido";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const deleteInspectionOrder = createAsyncThunk<boolean, number, { rejectValue: string }>(
  "order/deleteInspectionOrder",
  async (data: number, thunkAPI) => {
    try {
      return await repository.deleteInspectionOrder(data);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error desconocido";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);