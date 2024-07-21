import { createAsyncThunk, unwrapResult } from '@reduxjs/toolkit';
import InspectionFormRepositoryImpl from 'app/api/data/InspectionFormRepositoryImpl';
import { 
  InspectionFormEntity, 
  QuestionAnswerInspectionFormEntity,
  EditQuestionInspectionInspectionEntity,
  ImageInspectionEntity,
  GetAllInspectionFormByIdEntity
} from 'app/api/domain/entities/InspectionFormEntity';

import { FilterDateEntity } from 'app/api/domain/entities/FilterEntity';

import { InspectionFormProps } from 'app/api/domain/repositories/InspectionFormRepository';
  

const repository = new InspectionFormRepositoryImpl() 

export const getAllInspectioFormHack = createAsyncThunk<InspectionFormEntity, InspectionFormProps, { rejectValue: string }>(
  "order/getAllInpectionForm",
  async (filterData, thunkAPI) => {
    try {
      return await repository.getAllInspectionForm(filterData);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error desconocido";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const getAllInspectionForm = createAsyncThunk<InspectionFormEntity, InspectionFormProps | void, { rejectValue: string }>(
  "inspection-form/getAllInpectionForm",
  async (filterData, thunkAPI) => {
    try {
      return await repository.getAllInspectionForm(filterData);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error desconocido";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);




export const getAllInspectionFormById = createAsyncThunk<GetAllInspectionFormByIdEntity, number, { rejectValue: string }>(
  "inspection-form/getAllInspectionFormById",
  async (id: number, thunkAPI) => {
    try {
      return await repository.getAllInspectionFormById(id);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error desconocido";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);


export const getQuestionAnswerInspection = createAsyncThunk<QuestionAnswerInspectionFormEntity, number, { rejectValue: string }>(
  "inspection-form/getQuestionAnswerInspection",
  async (id: number, thunkAPI) => {
    try {
      return await repository.getQuestionAnswerInspection(id);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error desconocido";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);



export const editQuestionAnswerInspection = createAsyncThunk<boolean, EditQuestionInspectionInspectionEntity, { rejectValue: string }>(
  "inspection-form/editQuestionAnswerForm",
  async (data: EditQuestionInspectionInspectionEntity, thunkAPI) => {
    try {
      return await repository.editQuestionAnswerInspection(data);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error desconocido";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const deleteInspectionForm = createAsyncThunk<boolean, number, { rejectValue: string }>(
  "order/deleteInspectionForm",
  async (id: number, thunkAPI) => {
    try {
      return await repository.deleteInspectionForm(id);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error desconocido";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const getImagesInspection = createAsyncThunk<ImageInspectionEntity[], number, { rejectValue: string }>(
  "images/getImagesForm",
  async (id: number, thunkAPI) => {
    try {
      return await repository.getImagesInspection(id);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error desconocido";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const deleteImageInspection = createAsyncThunk<boolean, ImageInspectionEntity, { rejectValue: string }>(
  "images/deleteImageInspection",
  async (data: ImageInspectionEntity, thunkAPI) => {
    try {
      return await repository.deleteImageInspection(data);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error desconocido";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const uploadImageInspection = createAsyncThunk<boolean, FormData, { rejectValue: string }>(
  "images/uploadImageInspection",
  async (data: FormData, thunkAPI) => {
    try {
      return await repository.uploadImageInspection(data);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error desconocido";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);