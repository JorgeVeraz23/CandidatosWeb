import { createSlice } from '@reduxjs/toolkit';
import { getFormById } from 'app/redux/actions/FormsActions/FormsActions';
import { EditFormEntity} from 'app/api/domain/entities/FormEntities/FormEntity';

export interface initialStateSlice {
  data: EditFormEntity | null;
  loading: boolean;
  error: string | null;
}

const initialState: initialStateSlice = {
  data: null,
  error: null,
  loading: false
}

export const getFormSlice = createSlice({
  name: 'getFormSlice',
  initialState: initialState,
  reducers: {
    resetState: (state) => {
      state.data = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFormById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFormById.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getFormById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
})

export default getFormSlice.reducer