import { createSlice } from '@reduxjs/toolkit';
import { getAllForms } from 'app/redux/actions/FormsActions/FormsActions';
import { ShowFormEntity } from 'app/api/domain/entities/FormEntities/FormEntity';

export interface initialStateSlice {
  data: ShowFormEntity[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: initialStateSlice = {
  data: null,
  error: null,
  loading: false
}

export const getAllFormSlice = createSlice({
  name: 'GetAllFormSlice',
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
      .addCase(getAllForms.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllForms.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getAllForms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
})

export default getAllFormSlice.reducer