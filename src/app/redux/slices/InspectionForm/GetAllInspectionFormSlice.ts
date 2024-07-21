import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getAllInspectionForm } from 'app/redux/actions/InspectionFormActions';
import { BaseInspectionFromEntity, InspectionFormEntity } from 'app/api/domain/entities/InspectionFormEntity';

export interface initialStateSlice {
  data? : InspectionFormEntity;
  data2?: BaseInspectionFromEntity[];
  filteredData?: BaseInspectionFromEntity[]; // Agrega filteredData al tipo initialStateSlice
  loading: boolean;
  error: string | null;
  canModifyGroupQuestion?: boolean; // Agrega canModifyGroupQuestion al tipo initialStateSlice
}
interface SpecialProps{
  idInspectionForm: number;
  canModifyGroupQuestion?: boolean;
}
const initialState: initialStateSlice = {
  data: null,
  error: null,
  loading: false,
  filteredData: null, // Inicializa filteredData como null
}

export const getAllInspectionFormSlice = createSlice({
  name: 'GetAllInspectionSlice',
  initialState: initialState,
  reducers: {
    resetState: (state) => {
      state.data = null;
      state.data2 = null;
      state.filteredData = null; // Reinicia filteredData al estado inicial
      state.loading = false;
      state.error = null;
      state.canModifyGroupQuestion = undefined; // Reinicia canModifyGroupQuestion al estado inicial
    },
    filterStateById:(state, action: PayloadAction<SpecialProps>) => {
      state.filteredData = state.data2.filter(item => item.idInspectionForm   === action.payload.idInspectionForm);
      state.canModifyGroupQuestion = action.payload.canModifyGroupQuestion;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllInspectionForm.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      
      .addCase(getAllInspectionForm.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getAllInspectionForm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
})

export default getAllInspectionFormSlice.reducer;
