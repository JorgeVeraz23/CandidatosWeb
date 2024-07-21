import { createSlice } from '@reduxjs/toolkit';
import { getInspectorsEdit } from 'app/redux/actions/CatalogueActions';


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

export const getInspectorsEditSlice = createSlice({
  name: 'GetInspectorsEditSlice',
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
      .addCase(getInspectorsEdit.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getInspectorsEdit.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getInspectorsEdit.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
})

export default getInspectorsEditSlice.reducer