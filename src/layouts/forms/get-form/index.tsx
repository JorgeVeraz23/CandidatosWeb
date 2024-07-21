import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "app/redux/hooks";
import { useNavigate } from 'react-router-dom';
import {
    getAllForms,
    getFormById,
    deleteForm,
    editForm 
  } from 'app/redux/actions/FormsActions/FormsActions';
import { ShowFormEntity , EditFormEntity,  } from 'app/api/domain/entities/FormEntities/FormEntity';
import { deleteInspectionSlice } from "app/redux/slices/order/DeleteInspectionOrdersSlice";
import { deleteFormSlice } from "app/redux/slices/form/DeleteFormSlice";
import { editFormSlice } from "app/redux/slices/form/EditFormSlice";
import Tooltip from '@mui/material/Tooltip';


// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftTypography from "components/SoftTypography"

// Soft UI Dashboard PRO React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import SoftInput from "components/SoftInput";

// Pages components
import { showAlertAsync } from "layouts/pages/sweet-alerts/components/CustomAlert";
import CustomButton from "components/CustomButton";
import { CircularProgress } from "@mui/material";


export const ShowForms = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const formListState = useAppSelector(state => state.getAllForm);
    const deleteFormState = useAppSelector(state => state.deleteForm);
    const getFormState = useAppSelector(state => state.getForm);
    const editFormState = useAppSelector(state => state.editForm);
  
    const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  
    const [editFormData, setEditFormData] = useState<EditFormEntity>({
        idInspectionForm: 0,
        nameES:  '',
        nameEN:  '',
        description: '',
    });
  
    const [dataTableData, setDataTableData] = useState({
      columns: [
        { Header: "Nombre ES", accessor: "nameES", width: "20%" },
        { Header: "Nombre En", accessor: "nameEN", width: "20%" },
        { Header: "Descripcion", accessor: "description", width: "20%" },
        { Header: "Acciones", accessor: "actions", width: "10%" },
      ],
      rows: [],
    });
  
    useEffect(() => {
      if (formListState.data === null) {
        dispatch(getAllForms());
      } else {
        buildDataTable(formListState.data);
      }
    }, [formListState.data]);
    useEffect(() => {
      if (openModalEdit) {
        dispatch(getFormById(editFormData.idInspectionForm));
      }
    }, [openModalEdit]);
    
  
    useEffect(() => {
      if (editFormState.error) {
        showAlertAsync({
          title: 'Error',
          icon: 'error',
          html: editFormState.error,
        });
        dispatch(editFormSlice.actions.resetState());
      } else if (editFormState.data) {
        showAlertAsync({
          title: 'Éxito',
          icon: 'success',
          html: 'Cambios guardados correctamente.',
        });
        dispatch(editFormSlice.actions.resetState());
        dispatch(getAllForms());
      }
    }, [editFormState]);
  
    useEffect(() => {
      if (deleteFormState.error) {
        showAlertAsync({
          title: 'Error',
          icon: 'error',
          html: deleteFormState.error,
        });
        dispatch(deleteInspectionSlice.actions.resetState());
      } else if (deleteFormState.data) {
        showAlertAsync({
          title: 'Éxito',
          icon: 'success',
          html: 'Registro eliminado con éxito',
        });
        dispatch(deleteFormSlice.actions.resetState());
        dispatch(getAllForms());
      }
    }, [deleteFormState]);
  
    const handleBackButtonClick = () => {
      navigate('/app/formulario/crear-formulario');
    }
  
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, field: keyof EditFormEntity) => {
      setEditFormData((prevData) => ({
        ...prevData,
        [field]: event.target.value
      }));
    };
  
    const showModalEdit = (id: number) => {
      dispatch(getFormById(id));
      setEditFormData((prevData) => ({
        ...prevData,
        ['idInspectionForm']: id
      }));
      setOpenModalEdit(true);
    }

    useEffect(() => {
      if (getFormState.data) {
        setEditFormData(getFormState.data);
      } else if (getFormState.error) {
        showAlertAsync({
          title: 'Error',
          icon: 'error',
          html: getFormState.error,
        });
      }
    }, [getFormState]);
    
  
    const hideModalEdit = () => {
      setOpenModalEdit(false);
    }
  
    const confirmDelete = (id: number) => {
      showAlertAsync({
        title: 'Advertencia',
        icon: 'warning',
        html: '¿Estás seguro que quieres eliminar este registro?',
        showCancelButton: true,
        confirmButtonText: 'Sí, seguro',
        cancelButtonText: 'Cancelar',
        onConfirm: () => deleteRegister(id)
      });
    }
  
    const deleteRegister = (id: number) => {
      dispatch(deleteForm(id));
    }
  
    const buildDataTable = (data: ShowFormEntity[]) => {
      const columns = dataTableData.columns;
      const rows = [];
  
      for (const item of data) {
        rows.push({
          idInspectionForm: item.idInspectionForm,
          nameES: item.nameES,
          nameEN: item.nameEN,
          description: item.description,
          actions: 
          <SoftBox display="flex">
          {/* Envuelve el SoftButton con Tooltip */}
          <SoftBox mr={1}>
          <Tooltip title="Eliminar" arrow>
                       <SoftButton
                           variant="contained"
                           color="error"
                           size="small"
                           iconOnly
                           onClick={() => confirmDelete(item.idInspectionForm)}
                       >
                           <DeleteIcon />
                       </SoftButton>
                   </Tooltip>
                   </SoftBox>
                   <SoftBox >
                   <Tooltip title="Editar" arrow>
                       <SoftButton
                           variant="contained"
                           color="primary"
                           size="small"
                           margin="0 2px"
                           iconOnly
                           onClick={() => showModalEdit(item.idInspectionForm)}
                       >
                           <EditIcon />
                       </SoftButton>
                   </Tooltip>
                   </SoftBox>
       </SoftBox> 
        });
      }
  
      setDataTableData({ columns, rows });
    }
  
    const editRegister = () => {
      if (editFormData.idInspectionForm == 0 ||
        editFormData.nameES == '' ||
        editFormData.nameEN == '' ||
        editFormData.description == ''
      ) {
        showAlertAsync({
          title: 'Error',
          icon: 'error',
          html: 'Todos los campos son obligatorios',
        });
        return;
      }
      hideModalEdit();
      dispatch(editForm(editFormData));
    }
  
    const buildModalEdit = () => {
      return (
        <SoftBox>
          <Dialog
            fullWidth
            maxWidth="sm"
            open={openModalEdit}
            onClose={hideModalEdit}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Editar"}</DialogTitle>
            <DialogContent>
              
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <SoftBox
                  display="flex"
                  flexDirection="column"
                  height="100%"
                >
                  <SoftBox ml={0.5} lineHeight={0} display="inline-block" mb={1}>
                  <SoftTypography component="label" variant="caption" fontWeight="bold" textTransform="capitalize">
                    Nombre ES
                  </SoftTypography>
                  </SoftBox>
                <SoftInput type="text" placeholder="Nombre ES" label="Nombre ES" value={editFormData.nameES} onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event, 'nameES')} />
                
                </SoftBox>
              </Grid>
              <Grid item xs={12} md={6}>
                <SoftBox
                  display="flex"
                  flexDirection="column"
                  height="100%"
                >
                  <SoftBox ml={0.5} lineHeight={0} display="inline-block" mb={1}>
                  <SoftTypography component="label" variant="caption" fontWeight="bold" textTransform="capitalize">
                    Nombre EN
                  </SoftTypography>
                  </SoftBox>
                  <SoftInput type="text" placeholder="Nombre EN" label="Nombre EN" value={editFormData.nameEN} onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event, 'nameEN')} />
                </SoftBox>
              </Grid>
              <Grid item xs={12} md={6}>
                <SoftBox
                  display="flex"
                  flexDirection="column"
                  height="100%"
                >
                  <SoftBox ml={0.5} lineHeight={0} display="inline-block" mb={1}>
                  <SoftTypography component="label" variant="caption" fontWeight="bold" textTransform="capitalize">
                    Descripcion
                  </SoftTypography>
                  </SoftBox>
                  <SoftInput type="text" placeholder="Descripcion" label="Descripcion" value={editFormData.description} onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event, 'description')} />
                </SoftBox>
              </Grid>
          </Grid>
            </DialogContent>
            <DialogActions>
              <SoftButton onClick={() => hideModalEdit()} color="secondary">
                Cancelar
              </SoftButton>
              <SoftButton onClick={editFormState.loading ? null : editRegister} color="primary" >
                Guardar
              </SoftButton>
            </DialogActions>
          </Dialog>
        </SoftBox>
      );
    }
  
    return (
<>
        {buildModalEdit()}
        <SoftBox mb={3}>
          <SoftBox display="flex" justifyContent="flex-end" mb={2}>
            <SoftButton color="info" onClick={handleBackButtonClick}>
              Crear orden
            </SoftButton>
          </SoftBox>
          {formListState.loading
  ? (
    <SoftBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{ height: 'calc(100vh - 154px)' }}
    >
      <CircularProgress />
    </SoftBox>
  )
  : formListState.error
    ? (
      <SoftBox
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ height: 'calc(100vh - 154px)' }}
      >
        <SoftTypography component="label">
          {formListState.error ?? "Error desconocido"}
        </SoftTypography>
      </SoftBox>
    )
    : (
      <SoftBox my={1} sx={{ minHeight: 'calc(100vh - 260px)' }} >
        <Card>
          <DataTable  table={dataTableData} canSearch />
        </Card>
      </SoftBox>
    )
}
          
        </SoftBox>
        </>
    );
}

export default ShowForms;
