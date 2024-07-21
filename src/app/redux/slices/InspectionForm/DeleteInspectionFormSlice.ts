import { createSlice } from '@reduxjs/toolkit';
import { deleteInspectionForm } from 'app/redux/actions/InspectionFormActions';


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

export const deleteInspectionFormSlice = createSlice({
  name: 'DeleteInspectionFormSlice',
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
      .addCase(deleteInspectionForm.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteInspectionForm.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(deleteInspectionForm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
})

export default deleteInspectionFormSlice.reducer