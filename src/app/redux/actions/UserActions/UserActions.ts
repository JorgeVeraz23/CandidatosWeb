import { createAsyncThunk } from '@reduxjs/toolkit';

import UserRepositoryImpl from 'app/api/data/UserRepositoryImpl/UserRepositoryImpl';
import { LoginUserEntity } from 'app/api/domain/entities/userEntity';
import { ResponseLoginUserEntity } from 'app/api/domain/entities/userEntity';
const repository = new UserRepositoryImpl()

export const loginUser = createAsyncThunk<boolean, { userName: string, password: string }, { rejectValue: string }>(
    "user/LoginUser",
    async ({ userName, password }, thunkAPI) => {
      try {
        return await repository.LoginUser(userName, password);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Error desconocido";
        return thunkAPI.rejectWithValue(errorMessage);
      }
    }
  );

// export const loginUser = createAsyncThunk<boolean, userName: string, password: string, { rejectValue: string }>(
//   "user/LoginUser",
//   async (userName: string, password: string, thunkAPI) => {
//     try {
//       return await repository.LoginUser(userName, password);
//     } catch (error) {
//       const errorMessage = error instanceof Error ? error.message : "Error desconocido";
//       return thunkAPI.rejectWithValue(errorMessage);
//     }
//   }
// );

