import { createSlice } from '@reduxjs/toolkit';
import { deleteImageInspection } from 'app/redux/actions/InspectionFormActions';


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

export const deleteimageInspectionSlice = createSlice({
  name: 'DeleteimageInspectionSlice',
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
      .addCase(deleteImageInspection.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteImageInspection.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(deleteImageInspection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
})

export default deleteimageInspectionSlice.reducer