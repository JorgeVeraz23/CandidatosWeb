import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "app/redux/hooks";
import { useNavigate } from 'react-router-dom';
import {
  getAllInspectionOrders,
  getInspectionOrderById,
  deleteInspectionOrder,
  editInspectionOrder
} from 'app/redux/actions/OrderActions';
import { getClients } from 'app/redux/actions/CatalogueActions';
import { InspectionOrderEntity, EditInspectionEntity } from 'app/api/domain/entities/OrderEntity';
import { getAllInspectionSlice } from "app/redux/slices/order/GetAllInspectionOrdersSlice";
import { deleteInspectionSlice } from "app/redux/slices/order/DeleteInspectionOrdersSlice";
import { editInspectionOrderSlice } from "app/redux/slices/order/EditInspectionOrderSlice";

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
import DataTable from "examples/Tables/DataTable";

// Wizard application components
import FormField from "layouts/applications/wizard/components/FormField";

// Pages components
import { showAlertAsync } from "layouts/pages/sweet-alerts/components/CustomAlert";
import CustomButton from "components/CustomButton";
import ClientSelect from "components/ClientSelect";
import CustomInput from "components/CustomInput";
import { CircularProgress, Tooltip } from "@mui/material";
import FiltrarInspeccionesRealizadasPorFormulario from "components/FormularioSelect/FiltrarInspeccionesRealizadasPorFormulario";


export const InspectionOrder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const catalogueClientState = useAppSelector(state => state.catalogueClient);
  const inspectionOrderListState = useAppSelector(state => state.getAllInspection);
  const deleteInspectionState = useAppSelector(state => state.deleteInspection);
  
  const getInspectionOrderState = useAppSelector(state => state.getInspectionOrder);
  const editInspectionOrderState = useAppSelector(state => state.editInspectionOrder);
  const [selectedValue, setSelectedValue] = useState<{ value: string, label: string }>({
    value: '',
    label: ''
  });

  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);

  const [editInspectionData, setEditInspectionData] = useState<EditInspectionEntity>({
    idOrder: 0,
    idClient: 0,
    emissionDate: '',
    expiratedDate: '',
  });

  const [dataTableData, setDataTableData] = useState({
    columns: [
      { Header: "Código", accessor: "code", width: "18%" },
      { Header: "Cliente", accessor: "client" },
      { Header: "Planificada", accessor: "isPlanning", width: "18%" },
      { Header: "F. emisión", accessor: "emissionDate", width: "18%" },
      { Header: "F. expiración", accessor: "expiratedDate", width: "18%" },
      { Header: "Acciones", accessor: "actions" },
    ],
    rows: [],
  });

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    if (catalogueClientState.error) {
      console.log(catalogueClientState.error);
    }
  }, [catalogueClientState.error]);

  useEffect(() => {
    if (inspectionOrderListState.data) {
      buildDataTable(inspectionOrderListState.data);
    } 
  }, [inspectionOrderListState.data]);

  useEffect(() => {
    if (getInspectionOrderState.data) {
      const option = catalogueClientState.data.find(
        (option) => option.value == getInspectionOrderState.data.idClient.toString()
      );
      setSelectedValue(option);
      setEditInspectionData(getInspectionOrderState.data);
    } else if (getInspectionOrderState.error) {
      showAlertAsync({
        title: 'Error',
        icon: 'error',
        html: getInspectionOrderState.error,
      });
    }
  }, [getInspectionOrderState]);

  useEffect(() => {
    if (editInspectionOrderState.error) {
      showAlertAsync({
        title: 'Error',
        icon: 'error',
        html: editInspectionOrderState.error,
      });
      dispatch(editInspectionOrderSlice.actions.resetState());
    } else if (editInspectionOrderState.data) {
      showAlertAsync({
        title: 'Éxito',
        icon: 'success',
        html: 'Cambios guardados correctamente.',
      });
      dispatch(editInspectionOrderSlice.actions.resetState());
      dispatch(getAllInspectionOrders());
    }
  }, [editInspectionOrderState]);

  useEffect(() => {
    if (deleteInspectionState.error) {
      showAlertAsync({
        title: 'Error',
        icon: 'error',
        html: deleteInspectionState.error,
      });
      dispatch(deleteInspectionSlice.actions.resetState());
    } else if (deleteInspectionState.data) {
      showAlertAsync({
        title: 'Éxito',
        icon: 'success',
        html: 'Registro eliminado con éxito',
      });
      dispatch(deleteInspectionSlice.actions.resetState());
      dispatch(getAllInspectionOrders());
    }
  }, [deleteInspectionState]);

  const init = async () => {
    dispatch(getClients());
    await resetData();
    dispatch(getAllInspectionOrders());
  }

  const handleBackButtonClick = () => {
    navigate('/app/ordenes/crear-inspeccion');
  }

  const resetData = async () => {
    dispatch(getAllInspectionSlice.actions.resetState());
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, field: keyof EditInspectionEntity) => {
    setEditInspectionData((prevData) => ({
      ...prevData,
      [field]: event.target.value
    }));
  };

  const handleSelectChange = (option: { value: string, label: string }, field: keyof EditInspectionEntity) => {
    if (option === null) {
      setSelectedValue({ value: '', label: '' });
      setEditInspectionData((prevData) => ({
        ...prevData,
        [field]: 0
      }));
      return;
    };

    setEditInspectionData((prevData) => ({
      ...prevData,
      [field]: option.value
    }));
    setSelectedValue(option);
  };

  const showModalEdit = (id: number) => {
    dispatch(getInspectionOrderById(id));
    setEditInspectionData((prevData) => ({
      ...prevData,
      ['idOrder']: id
    }));
    setOpenModalEdit(true);
  }

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
    dispatch(deleteInspectionOrder(id));
  }

  const buildDataTable = (data: InspectionOrderEntity[]) => {
    const columns = dataTableData.columns;
    const rows = [];

    for (const item of data) {
      rows.push({
        code: item.code,
        client: item.clientName,
        isPlanning: item.isPlanning,
        emissionDate: item.emissionDate,
        expiratedDate: item.expiratedDate,
        actions: <SoftBox display="flex">
        <SoftBox mr={1}>
           
          
          <Tooltip title="Editar">
          <SoftButton
                           variant="contained"
                           color="primary"
                           size="small"
                           margin="0 2px"
                           iconOnly
                           onClick={() => showModalEdit(item.idOrder)}
                           
                       >
                           <EditIcon />
                       </SoftButton>
                       </Tooltip>
                       </SoftBox>
                       <SoftBox >
                      <Tooltip title="Eliminar">
                      <SoftButton
                           variant="contained"
                           color="error"
                           size="small"
                           margin="0 2px"
                           iconOnly
                           onClick={() => confirmDelete(item.idOrder)}
                       >
                           <DeleteIcon />
                       </SoftButton>
          </Tooltip>
          </SoftBox>
        
        </SoftBox>
      });
    }

    setDataTableData({ columns, rows });
  }

 

  const editRegister = () => {
    if (editInspectionData.idClient == 0 ||
      editInspectionData.idOrder == 0 ||
      editInspectionData.emissionDate == '' ||
      editInspectionData.expiratedDate == ''
    ) {
      showAlertAsync({
        title: 'Error',
        icon: 'error',
        html: 'Todos los campos son obligatorios',
      });
      return;
    }
    hideModalEdit();
    dispatch(editInspectionOrder(editInspectionData));
  }

  const renderModalEdit = () => {
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
            <Grid container spacing={3} mb={2}>
              <Grid item xs={12}>
                <SoftBox display="flex" flexDirection="column" height="100%">
                  <SoftBox ml={0.5} lineHeight={0} display="inline-block">
                    <SoftTypography component="label" variant="caption" fontWeight="bold">
                      Cliente
                    </SoftTypography>
                  </SoftBox>
                  <ClientSelect
                    onChange={(option: { value: string, label: string }) => handleSelectChange(option, 'idClient')}
                    value={selectedValue}
                    placeholder="Selecciona un cliente"
                    isRequired={true}
                  />
                </SoftBox>
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <SoftBox display="flex" flexDirection="column" height="100%">
                  <SoftBox ml={0.5} lineHeight={0} display="inline-block">
                    <SoftTypography component="label" variant="caption" fontWeight="bold">
                      Fecha de emisión
                    </SoftTypography>
                  </SoftBox>
                  <CustomInput
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event, 'emissionDate')}
                    value={editInspectionData.emissionDate}
                    type="date"
                  />
                </SoftBox>
              </Grid>
              <Grid item xs={12} md={6}>
                <SoftBox display="flex" flexDirection="column" height="100%">
                  <SoftBox ml={0.5} lineHeight={0} display="inline-block">
                    <SoftTypography component="label" variant="caption" fontWeight="bold">
                      Fecha de expiración
                    </SoftTypography>
                  </SoftBox>
                  <CustomInput
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event, 'expiratedDate')}
                    value={editInspectionData.expiratedDate}
                    type="date"
                  />
                </SoftBox>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <SoftButton onClick={() => hideModalEdit()} color="secondary">
              Cancelar
            </SoftButton>
            <SoftButton onClick={editInspectionOrderState.loading ? null : editRegister} color="primary" >
              Guardar
            </SoftButton>
          </DialogActions>
        </Dialog>
      </SoftBox>
    );
  }

  return (
    <>
      {renderModalEdit()}
      
      <SoftBox mb={3}>
        <SoftBox display="flex" justifyContent="flex-end" mb={2}>
          <SoftButton color="primary" onClick={handleBackButtonClick}>
            Crear orden
          </SoftButton>
         
        </SoftBox>
        {inspectionOrderListState.loading
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
  : inspectionOrderListState.error
    ? (
      <SoftBox
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ height: 'calc(100vh - 154px)' }}
      >
        <SoftTypography component="label">
          {inspectionOrderListState.error ?? "Error desconocido"}
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