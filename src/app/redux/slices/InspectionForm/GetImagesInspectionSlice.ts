import { createSlice } from '@reduxjs/toolkit';
import { getImagesInspection } from 'app/redux/actions/InspectionFormActions';
import { ImageInspectionEntity } from 'app/api/domain/entities/InspectionFormEntity';


export interface initialStateSlice {
  data: ImageInspectionEntity[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: initialStateSlice = {
  data: [],
  error: null,
  loading: false
}

export const getImagesFormSlice = createSlice({
  name: 'GetImagesFormSlice',
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
      .addCase(getImagesInspection.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getImagesInspection.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getImagesInspection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
})

export default getImagesFormSlice.reducer