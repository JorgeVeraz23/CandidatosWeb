import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserEntity } from "app/api/domain/entities/AuthEntities/UserEntity";
import { useBaseStorage } from "app/hooks/useBaseStorage";
const { GetData, SaveData,RemoveData } = useBaseStorage();
export interface UiInitialStateSlice{
    logged: boolean;
    data?: string;
    // requestState?: "pending" | "fulfilled" | "rejected" | "default";
    // error?: string;
}
const user = GetData<string>("token");
const initialState: UiInitialStateSlice = {
    data: user,
    logged: !!user
}
export const loggingUserSlice = createSlice({
    name: 'LoggingUser',
    initialState: initialState,
    reducers: {
      logoutUser: (state) => {
        RemoveData("token");
        state.data = initialState.data;
        state.logged = false;
      },
      loggingUser:(state, action:PayloadAction<UserEntity>) => {
        SaveData(action.payload.token, "token");
        state.data = action.payload.token;
        state.logged = !!action.payload;
      },
    },
});

export default loggingUserSlice.reducer;