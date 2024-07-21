import { createSlice } from '@reduxjs/toolkit';

import { deleteCatalogQuestion } from 'app/redux/actions/CatalogQuestionActions/CatalogQuestionActions';


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

export const deleteCatalogQuestionSlice = createSlice({
  name: 'DeleteCatalogQuestionSlice',
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
      .addCase(deleteCatalogQuestion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCatalogQuestion.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        console.log("Eliminación exitosa"); // Agregar console.log para verificar si la eliminación fue exitosa
      })
      .addCase(deleteCatalogQuestion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
        console.log("Error al eliminar:", action.payload); // Agregar console.log para verificar si hay algún error al eliminar
      });
  },
})

export default deleteCatalogQuestionSlice.reducer