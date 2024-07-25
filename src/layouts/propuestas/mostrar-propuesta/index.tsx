import { useState, useEffect } from "react";

import { useAppDispatch, useAppSelector } from "app/redux/hooks";
import { useNavigate } from 'react-router-dom';


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
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard PRO React example components

import DataTable from "examples/Tables/DataTable";

// My Components

import { showAlertAsync } from "layouts/pages/sweet-alerts/components/CustomAlert";
import { Checkbox, CircularProgress, Tooltip } from "@mui/material";



//Entities
import { MostrarPropuestaEntity, EditarPropuestaEntity } from "app/api/domain/entities/PropuestasEntities/PropuestaEntity";
//Actions
import { deleteTransparencia, } from "app/redux/actions/TransparenciaActions/TransparenciaActions";
import { deleteTransparencia, getAllTransparencia, getTrasnparenciaById, editTransparencia } from "app/redux/actions/TransparenciaActions/TransparenciaActions";
//Slices
import { deleteTransparenciaSlice } from "app/redux/slices/Transparencia/EliminarTransparenciaSlice";
import { editTransparenciaSlice } from "app/redux/slices/Transparencia/ActualizarTransparenciaSlice";
import { getAllTransparenciaSlice } from "app/redux/slices/Transparencia/MostrarTransparenciaSlice";
import { getTransparenciaSlice } from "app/redux/slices/Transparencia/ObtenerTransparenciaSlice";
import { EditarPropuestaEntity } from "app/api/domain/entities/PropuestasEntities/PropuestaEntity";




export default function PropuestaList() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

    const mostrarPropuestaState = useAppSelector(state => state.mostrarTransparencia);
    const obtenerPropuestaState = useAppSelector(state => state.obtenerPorpuesta)
    const actualizarPropuestaState = useAppSelector(state => state.actualizarPropuesta);
    const eliminarPropuestaState = useAppSelector(state => state.eliminarPropuesta);


  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [editPropuestaData, setEditPropuestaData] = useState<EditarPropuestaEntity>({
    idPropuesta: 0,
    titulo: '',
    area: '',
    descripción: '',
    idCandidato: 0,
  });

  const [dataTableData, setDataTableData] = useState({
    columns: [
      { Header: "Titutlo", accessor: "titulo", width: "25%" },
      { Header: "Area", accessor: "area", width: "25%" },
      { Header: "Descripcion", accessor: "descripción", width: "25%" },
      { Header: "Candidato", accessor: "idCandidato", width: "25%"},
      { Header: "Acciones", accessor: "actions", width: "25%" },
    ],
    rows: [],
  });

  useEffect(() => {
    init();
    return () => {
      resetModalState();
    };
  }, []);

  useEffect(() => {
    if (mostrarPropuestaState.data) {
      buildDataTable(mostrarPropuestaState.data);
    }
  }, [mostrarPropuestaState.data]);

  useEffect(() => {
    if (eliminarPropuestaState.error) {
      showAlertAsync({
        title: 'Error',
        icon: 'error',
        html: eliminarPropuestaState.error,
      });
      dispatch(deleteTransparenciaSlice.actions.resetState());
    } else if (eliminarTransparenciaState.data) {
      showAlertAsync({
        title: 'Éxito',
        icon: 'success',
        html: 'Registro eliminado con éxito',
      });
      dispatch(deleteTransparenciaSlice.actions.resetState());
      dispatch(getAllTransparencia());
    }
  }, [eliminarTransparenciaState]);

  useEffect(() => {
    if (actualizarTransparenciaState.error) {
      showAlertAsync({
        title: 'Error',
        icon: 'error',
        html: actualizarTransparenciaState.error,
      });
      dispatch(editTransparenciaSlice.actions.resetState());
      setOpenModalEdit(false);
    } else if (actualizarTransparenciaState.data) {
      showAlertAsync({
        title: 'Éxito',
        icon: 'success',
        html: 'Cambios guardados correctamente.',
      });
      dispatch(editTransparenciaSlice.actions.resetState());
      dispatch(getAllTransparencia());
    }
  }, [actualizarTransparenciaState]);

  useEffect(() => {
    if (obtenerTransparenciaState.data) {
      setEditTransparenciaData(obtenerTransparenciaState.data);
      showModalEdit();
      dispatch(getTransparenciaSlice.actions.resetState());
    } else if (obtenerTransparenciaState.error) {
      showAlertAsync({
        title: 'Error',
        icon: 'error',
        html: obtenerTransparenciaState.error,
      });
      dispatch(getTransparenciaSlice.actions.resetState());
    }
  }, [obtenerTransparenciaState]);

  const init = async () => {
    await handleResetData();
    dispatch(getAllTransparencia());
  }

  const handleResetData = async () => {
    dispatch(getAllTransparenciaSlice.actions.resetState());
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, field: keyof EditarTransparienciaEntity) => {
    handleSetEditData(event.target.value, field);
  };

  const handleSetEditData = (value: string, field: keyof EditarTransparienciaEntity) => {
    setEditTransparenciaData((prevData) => ({
      ...prevData,
      [field]: value
    }));
  };

  const buildDataTable = (data: MostrarTransparienciaEntity[]) => {
    const columns = dataTableData.columns;
    const rows = [];

    for (const item of data) {
      rows.push({
        declaracionesDeBienes: item.declaracionesDeBienes,
        involucradoEnEscandalos: item.involucradoEnEscandalos ? 'Sí' : 'No',
        evaluacionesDeEtica: item.evaluacionesDeEtica,
        actions: (
          <SoftBox display="flex">
            <SoftBox mr={1}>
              <Tooltip title="Eliminar" arrow>
                <SoftButton
                  variant="contained"
                  color="error"
                  size="small"
                  iconOnly
                  onClick={() => confirmDelete(item.idTranspariencia)}
                >
                  <DeleteIcon />
                </SoftButton>
              </Tooltip>
            </SoftBox>
            <SoftBox>
              <Tooltip title="Editar" arrow>
                <SoftButton
                  variant="contained"
                  color="primary"
                  size="small"
                  margin="0 2px"
                  iconOnly
                  onClick={() => getTransparencia(item.idTranspariencia)}
                >
                  <EditIcon />
                </SoftButton>
              </Tooltip>
            </SoftBox>
          </SoftBox>
        )
      });
    }
    setDataTableData({ columns, rows });
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
    dispatch(deleteTransparencia(id));
  }

  const editRegister = () => {
    if (editTransparenciaData.idTranspariencia == 0 || editTransparenciaData.declaracionesDeBienes === '' || editTransparenciaData.evaluacionesDeEtica == '') {
      showAlertAsync({
        title: 'Error',
        icon: 'error',
        html: 'Hay campos vacíos o no válidos',
      });
      return;
    }
    hideModalEdit();
    dispatch(editTransparencia(editTransparenciaData));
  }

  const getTransparencia = (id: number) => {
    dispatch(getTrasnparenciaById(id));
  }

  const handleCheckboxChange = (fieldName: keyof EditarTransparienciaEntity) => {
    setEditTransparenciaData((prevData) => ({
      ...prevData,
      [fieldName]: !prevData[fieldName] // invertir el estado anterior
    }));
  };

  const hideModalEdit = () => {
    setOpenModalEdit(false);
    resetModalState();
  }

  const showModalEdit = () => {
    setOpenModalEdit(true);
  }

  const resetModalState = () => {
    setEditTransparenciaData({
      idTranspariencia: 0,
      evaluacionesDeEtica: '',
      involucradoEnEscandalos: false,
      declaracionesDeBienes: '',
    });
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
                  <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                    <SoftTypography component="label" variant="caption" fontWeight="bold">
                      Declaraciones de Bienes
                    </SoftTypography>
                  </SoftBox>
                  <SoftInput
                    value={editTransparenciaData.declaracionesDeBienes}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event, 'declaracionesDeBienes')}
                  />
                </SoftBox>
              </Grid>
              <Grid item xs={12}>
                <SoftBox display="flex" flexDirection="column" height="100%">
                  <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                    <SoftTypography component="label" variant="caption" fontWeight="bold">
                      Involucrado en Escandalos
                    </SoftTypography>
                  </SoftBox>
                  <Checkbox
                                checked={editTransparenciaData.involucradoEnEscandalos}
                                onChange={() => handleCheckboxChange('involucradoEnEscandalos')}
                                />
                </SoftBox>
              </Grid>
              <Grid item xs={12}>
                <SoftBox display="flex" flexDirection="column" height="100%">
                  <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                    <SoftTypography component="label" variant="caption" fontWeight="bold">
                      Evaluaciones de Etica
                    </SoftTypography>
                  </SoftBox>
                  <SoftInput
                    value={editTransparenciaData.evaluacionesDeEtica}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event, 'evaluacionesDeEtica')}
                  />
                </SoftBox>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <SoftButton color="secondary" onClick={hideModalEdit}>
              Cancelar
            </SoftButton>
            <SoftButton color="primary" onClick={actualizarTransparenciaState.loading ? null : editRegister}>
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

  return (
    <>
      {renderModelEdit()}
      
      <SoftBox mb={3}>
        <SoftBox display="flex" justifyContent="flex-end" mb={2}>
          <SoftButton onClick={handleBackButtonClick} color="primary">
            Crear Transparencia
          </SoftButton>
        </SoftBox>
        {mostrarTransparenciaState.loading ? (
          <SoftBox
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ height: 'calc(100vh - 154px)' }}
          >
            <CircularProgress />
          </SoftBox>
        ) : mostrarTransparenciaState.error ? (
          <SoftBox
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ height: 'calc(100vh - 154px)' }}
          >
            <SoftTypography component="label">
              {mostrarTransparenciaState.error ?? "Error desconocido"}
            </SoftTypography>
          </SoftBox>
        ) : (
          <SoftBox my={1} sx={{ minHeight: 'calc(100vh - 260px)' }} >
            <Card>
              <DataTable table={dataTableData} canSearch />
            </Card>
          </SoftBox>
        )}
      </SoftBox>
    </>
  );
}
