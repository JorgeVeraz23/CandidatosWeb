import { createSlice } from '@reduxjs/toolkit';
import { uploadImageInspection } from 'app/redux/actions/InspectionFormActions';

export interface initialStateSlice {
  data: boolean | null;
  loading: boolean;
  error: string | null;
}

const initialState: initialStateSlice = {
  data: false,
  error: "",
  loading: false
}

export const uploadImageInspectionSlice = createSlice({
  name: 'UploadImageInspectionSlice',
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
      .addCase(uploadImageInspection.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadImageInspection.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(uploadImageInspection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
})

export default uploadImageInspectionSlice.reducer