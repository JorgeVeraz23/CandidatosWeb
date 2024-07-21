import { createSlice } from '@reduxjs/toolkit';
import { editForm } from 'app/redux/actions/FormsActions/FormsActions';

export interface initialStateSlice {
  data: boolean | null;
  loading: boolean;
  error: string | null;
}

const initialState: initialStateSlice = {
  data: null,
  error: null,
  loading: false
}

export const editFormSlice = createSlice({
  name: 'EditFormSlice',
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
      .addCase(editForm.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editForm.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(editForm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
})

export default editFormSlice.reducer