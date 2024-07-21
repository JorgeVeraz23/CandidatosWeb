import { createSlice } from '@reduxjs/toolkit';
import { getTypeDocuments} from 'app/redux/actions/GetTypeDocumentsCatalogueActions/GetTypeDocumentsCatalogueActions';
import { GetTypeDocumentsCatalogueEntity} from 'app/api/domain/entities/ClientEntities/GetTypeDocumentsCatalogueEntity'

export interface initialStateSlice {
  data: GetTypeDocumentsCatalogueEntity[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: initialStateSlice = {
  data: null,
  error: null,
  loading: false
}

export const catalogClientSlice = createSlice({
  name: 'CatalogClientSlice',
  initialState: initialState,
  reducers: {},
  
  extraReducers: (builder) => {
    builder
      .addCase(getTypeDocuments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTypeDocuments.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getTypeDocuments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      });
  },
})

export default catalogClientSlice.reducer