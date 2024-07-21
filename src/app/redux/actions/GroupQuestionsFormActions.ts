import { createAsyncThunk } from '@reduxjs/toolkit';
import GroupQuestionsFormRepositoryImpl from 'app/api/data/FormRepositoryImpl/GroupQuestionsFormRepositoryImpl';
import { GroupQuestionsFormEntity } from 'app/api/domain/entities/FormEntities/GroupQuestionEntity';
import GroupQuestionsFormRepository from 'app/api/domain/repositories/FormRepository/GroupQuestionsFormRepository';
const repository:GroupQuestionsFormRepository = new GroupQuestionsFormRepositoryImpl();
  export const getAllGroupQuestionsForm = createAsyncThunk<GroupQuestionsFormEntity[], void, { rejectValue: string }>(
    "form/getAllGroupQuestionForm",
    async (_, thunkAPI) => {
      try {
        return await repository.getAllGroupQuestionsForms();
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Error desconocido";
        return thunkAPI.rejectWithValue(errorMessage);
      }
    }
  );
  export const getGroupQuestionsFormById = createAsyncThunk<GroupQuestionsFormEntity, number, { rejectValue: string }>(
    "form/getGroupQuestionsFormById",
    async (data, thunkAPI) => {
      try {
        return await repository.getGroupQuestionsFormById(data);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Error desconocido";
        return thunkAPI.rejectWithValue(errorMessage);
      }
    }
  );

  export const editGroupQuestion = createAsyncThunk<boolean, GroupQuestionsFormEntity, { rejectValue: string }>(
    "form/editGroupQuestionForm",
    async (data: GroupQuestionsFormEntity, thunkAPI) => {
      try {
        return await repository.editGroupQuestionsForm(data);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Error desconocido";
        return thunkAPI.rejectWithValue(errorMessage);
      }
    }
  );
  export const createGroupQuestion = createAsyncThunk<boolean, GroupQuestionsFormEntity, { rejectValue: string }>(
    "form/createGroupQuestionForm",
    async (data: GroupQuestionsFormEntity, thunkAPI) => {
      try {
        return await repository.createGroupQuestionsForm(data);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Error desconocido";
        return thunkAPI.rejectWithValue(errorMessage);
      }
    }
  );
  export const deleteGroupQuestionsFormById = createAsyncThunk<boolean, number, { rejectValue: string }>(
    "form/deleteGroupQuestionsFormById",
    async (data, thunkAPI) => {
      try {
        return await repository.deleteGroupQuestionsForm(data);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Error desconocido";
        return thunkAPI.rejectWithValue(errorMessage);
      }
    }
  );


