import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "app/redux/hooks";
import { useNavigate } from 'react-router-dom';


import { deletePlanningSlice } from "app/redux/slices/planning/DeletePlanningSlice";
import { editPlanningSlice } from "app/redux/slices/planning/EditPlanningSlice";
import { getPlanningSlice } from "app/redux/slices/planning/GetPlanningSlice";
import { getAllPlanningsSlice } from "app/redux/slices/planning/GetAllPlanningsSlice";
import { getPlanningByFilterSlice } from "app/redux/slices/planning/GetPlanningByFilterSlice";
import { EditPlanningEntity, PlanningEntity } from "app/api/domain/entities/PlanningEntity";

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
import SoftInput from "components/SoftInput";
import SoftTypography from "components/SoftTypography"

// Soft UI Dashboard PRO React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

import FormField from "layouts/applications/wizard/components/FormField";

// My Components
import CustomButton from "components/CustomButton";
import { showAlertAsync } from "layouts/pages/sweet-alerts/components/CustomAlert";
import { CircularProgress, Tooltip } from "@mui/material";
import InspectorSelect from "components/InspectorSelect";
import { getInspectors } from "app/redux/actions/CatalogueActions"
import {
  getAllPlannings,
  getPlanningById,
  editPlanning,
  deletePlanning,
  getByFilter,
} from 'app/redux/actions/PlanningActions';
import CustomInput from "components/CustomInput";
import CustomDatePicker from "components/CustomDatePicker";

import { Dayjs } from 'dayjs'; // Asegúrate de importar correctamente el tipo Dayjs si lo necesitas
import DateFilterForm from "components/DateFilterForm";
import { DatePicker } from "@mui/x-date-pickers";



export default function PlanningList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const planningListState = useAppSelector(state => state.getAllPlannings);
  const filterPlanningListState = useAppSelector(state => state.getPlanningByFilter);
  const getPlanningState = useAppSelector(state => state.getPlanning);
  const editPlanningState = useAppSelector(state => state.editPlanning);
  const deletePlanningState = useAppSelector(state => state.deletePlanning);
  const catalogueInspectorState = useAppSelector(state => state.catalogueInspector);

  const [optionInspectorSelected, setOptionInspectorSelected] = useState<{ value: string, label: string }>(null);
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  
  // const [fechaDesde, setFechaDesde] = useState<string>(""); // Estado para almacenar la fecha seleccionada
  // const [fechaHasta, setFechaHasta] = useState<string>("");
  const [editPlanningData, setEditPlanningData] = useState<EditPlanningEntity>({
    idPlanning: '',
    idOrder: '',
    inspectionOrder: '',
    idInspector: '',
    planningDate: '',
    observation: '',
  });

  const [dataTableData, setDataTableData] = useState({
    columns: [
      { Header: "Fecha planificación", accessor: "planningDate", width: "18%" },
      { Header: "Código", accessor: "code" },
      { Header: "Cliente", accessor: "client", width: "18%" },
      { Header: "Inspector", accessor: "inspector", width: "18%" },
      { Header: "Observación", accessor: "observation", width: "25%" },
      { Header: "Acciones", accessor: "actions", width: "25%" },
    ],
    rows: [],
  });

  useEffect(() => {
    init();
  }, []);

  if(filterPlanningListState != null){
    useEffect(() => {
      if (planningListState.data) {
        buildDataTable(planningListState.data);
      } 
    }, [planningListState.data]);
  }else{
    useEffect(() => {
      if(filterPlanningListState.data){
        buildDataTable(filterPlanningListState.data);
      }
    }, [filterPlanningListState.data])
  }

  useEffect(() => {
    if (deletePlanningState.error) {
      showAlertAsync({
        title: 'Error',
        icon: 'error',
        html: deletePlanningState.error,
      });
      dispatch(deletePlanningSlice.actions.resetState());
    } else if (deletePlanningState.data) {
      showAlertAsync({
        title: 'Éxito',
        icon: 'success',
        html: 'Registro eliminado con éxito',
      });
      dispatch(deletePlanningSlice.actions.resetState());
      dispatch(getAllPlannings());
    }
  }, [deletePlanningState]);
  

  useEffect(() => {
    if (editPlanningState.error) {
      showAlertAsync({
        title: 'Error',
        icon: 'error',
        html: editPlanningState.error,
      });
      dispatch(editPlanningSlice.actions.resetState());
    } else if (editPlanningState.data) {
      showAlertAsync({
        title: 'Éxito',
        icon: 'success',
        html: 'Cambios guardados correctamente.',
      });
      dispatch(editPlanningSlice.actions.resetState());
      dispatch(getAllPlannings());
    }
  }, [editPlanningState]);

  

  useEffect(() => {
    if (getPlanningState.data) {
      showModalEdit();

      if (catalogueInspectorState.data) {
        const option = catalogueInspectorState.data.find(
          (option) => option.value == getPlanningState.data.idInspector.toString()
        );
        setOptionInspectorSelected(option);
      }

      setEditPlanningData(getPlanningState.data);
    } else if (getPlanningState.error) {
      showAlertAsync({
        title: 'Error',
        icon: 'error',
        html: getPlanningState.error,
      });
      dispatch(getPlanningSlice.actions.resetState());
    }
  }, [getPlanningState.data]);

// En el useEffect que maneja los cambios en filterPlanningListState.data, actualiza los datos de la tabla
useEffect(() => {
  if (filterPlanningListState.data) {
    buildDataTable(filterPlanningListState.data); // Actualiza los datos de la tabla con los datos filtrados
  }
}, [filterPlanningListState.data]);

  const init = async () => {
    dispatch(getInspectors());
    await handleResetData();
    dispatch(getAllPlannings());
  }

  const handleResetData = async () => {
    dispatch(getAllPlanningsSlice.actions.resetState());
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, field: keyof EditPlanningEntity) => {
    handleSetEditData(event.target.value, field);
  };


  const handleInspectorSelectChange = (option: { value: string, label: string }) => {
    if (option === null) {
      setOptionInspectorSelected({ value: '', label: '' });
      handleSetEditData('', 'idInspector');
      return;
    };
    setOptionInspectorSelected(option);
    handleSetEditData(option.value, 'idInspector');
  }

  const handleSetEditData = (value: string, field: keyof EditPlanningEntity) => {
    setEditPlanningData((prevData) => ({
      ...prevData,
      [field]: value
    }));
  };

  // const handleClearFilter = () => {
  //   dispatch(getAllPlannings()); // Solicita todos los datos nuevamente al backend
  // };

  const buildDataTable = (data: PlanningEntity[]) => {
    const columns = dataTableData.columns;
    const rows = [];

    for (const item of data) {
      rows.push({
        planningDate: item.planningDate,
        code: item.code,
        client: item.clientName,
        inspector: item.inspectorName,
        observation: item.observation,
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
                         onClick={() => confirmDelete(item.idPlanning)}
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
                         onClick={() => getPlanning(item.idPlanning)}
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

  const confirmDelete = (id: string) => {
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

  const deleteRegister = (id: string) => {
    dispatch(deletePlanning(id));
  }

  const editRegister = () => {
    if (editPlanningData.idPlanning == '' ||
      editPlanningData.idInspector == '' ||
      editPlanningData.planningDate == ''
    ) {
      showAlertAsync({
        title: 'Error',
        icon: 'error',
        html: 'Hay campos vacíos o no válidos',
      });
      return;
    }
    hideModalEdit();
    dispatch(editPlanning(editPlanningData));
  }

  const getPlanning = (id: string) => {
    dispatch(getPlanningById(id));
  }

  const hideModalEdit = () => {
    setOpenModalEdit(false);
    dispatch(getPlanningSlice.actions.resetState());
  }

  const showModalEdit = () => {
    setOpenModalEdit(true);
  }

  const renderModelEdit = () => {
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
                  <SoftBox ml={0.5} lineHeight={0} display="inline-block" mb={1}>
                    <SoftTypography component="label" variant="caption" fontWeight="bold" textTransform="capitalize">
                      Orden de inspección
                    </SoftTypography>
                  </SoftBox>
                  <CustomInput
                    onChange={() => { }}
                    isDisabled={true}
                    value={editPlanningData.inspectionOrder}
                  />
                </SoftBox>
              </Grid>
            </Grid>
            <Grid container spacing={3} mb={2}>
              <Grid item xs={12}>
                <SoftBox display="flex" flexDirection="column" height="100%">
                  <SoftBox ml={0.5} lineHeight={0} display="inline-block" mb={1}>
                    <SoftTypography component="label" variant="caption" fontWeight="bold" textTransform="capitalize">
                      Inspector
                    </SoftTypography>
                  </SoftBox>
                  <InspectorSelect
                    onChange={(option: { value: string, label: string }) => handleInspectorSelectChange(option)}
                    value={optionInspectorSelected}
                    placeholder="Selecciona un inspector"
                    isClearable={true}
                    isSearchable={true}
                    isRequired={true}
                  />
                </SoftBox>
              </Grid>
            </Grid>
            <Grid container spacing={3} mb={2}>
              <Grid item xs={12}>
                <SoftBox display="flex" flexDirection="column" height="100%">
                  <SoftBox ml={0.5} lineHeight={0} display="inline-block" mb={1}>
                    <SoftTypography component="label" variant="caption" fontWeight="bold" textTransform="capitalize">
                      Fecha de planificación
                    </SoftTypography>
                  </SoftBox>
                  <CustomInput
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event, 'planningDate')}
                    value={editPlanningData.planningDate}
                    type="date"
                    isRequired={true}
                  />
                </SoftBox>
              </Grid>
            </Grid>
            <Grid container spacing={3} mb={2}>
              <Grid item xs={12}>
                <SoftBox display="flex" flexDirection="column" height="100%">
                  <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                    <SoftTypography component="label" variant="caption" fontWeight="bold">
                      Observación
                    </SoftTypography>
                  </SoftBox>
                  <SoftInput
                    multiline rows={5}
                    value={editPlanningData.observation}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event, 'observation')}
                  />
                </SoftBox>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <SoftButton color="secondary" onClick={() => hideModalEdit()}>
              Cancelar
            </SoftButton>
            <SoftButton color="primary" onClick={editPlanningState.loading ? null : editRegister}>
              Guardar
            </SoftButton>
          </DialogActions>
        </Dialog>
      </SoftBox>
    );
  }

  const handleBackButtonClick = () => {
    navigate('/app/planificacion/crear-planificacion');
  }


 const handleFilterSubmit = (filterData) => {
    dispatch(getByFilter(filterData));
  };

  return (
    <>
      {renderModelEdit()}
      
      <SoftBox mb={3}>
      
        <SoftBox display="flex" justifyContent="flex-end" mb={2}>
          <SoftButton onClick={handleBackButtonClick} color="primary">
            Crear Planificación
          </SoftButton>
        </SoftBox>
        {planningListState.loading
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
  : planningListState.error
    ? (
      <SoftBox
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ height: 'calc(100vh - 154px)' }}
      >
        <SoftTypography component="label">
          {planningListState.error ?? "Error desconocido"}
        </SoftTypography>
      </SoftBox>
    )
    : (
      <SoftBox my={1} sx={{ minHeight: 'calc(100vh - 260px)' }} >
        <DateFilterForm onSubmit={handleFilterSubmit}  />
        <Card>
          <DataTable table={dataTableData} canSearch />
        </Card>
      </SoftBox>
    )
}

        
      </SoftBox>
      </>
  );
}