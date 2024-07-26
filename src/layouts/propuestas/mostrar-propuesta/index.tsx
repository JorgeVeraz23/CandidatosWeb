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
import { deletePropuesta, getAllPropuesta, getPropuestaById, editPropuesta } from "app/redux/actions/PropuestaActions/PropuestaActions";
//Slices
import { deletePropuestaSlice } from "app/redux/slices/propuesta/EliminarPropuestaSlice";
import { editPropuestaSlice } from "app/redux/slices/propuesta/ActualizarPropuestaSlice";
import { getAllPropuestaSlice } from "app/redux/slices/propuesta/MostrarPropuestaSlice";
import { getPropuestaSlice } from "app/redux/slices/propuesta/ObtenerPropuestaSlice";


import CustomSelect from "components/CustomSelect";





export default function PropuestaList() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

    const mostrarPropuestaState = useAppSelector(state => state.mostrarPropuesta);
    const obtenerPropuestaState = useAppSelector(state => state.obtenerPorpuesta)
    const actualizarPropuestaState = useAppSelector(state => state.actualizarPropuesta);
    const eliminarPropuestaState = useAppSelector(state => state.eliminarPropuesta);

    const selectorCandidatoState = useAppSelector(state => state.keyValueCandidato);

  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);

  const [optionCandidatoSelected, setOptionCandidatoSelected] = useState<{ value: string, label: string }>({
    value: '', label: ''
  });

  const [editPropuestaData, setEditPropuestaData] = useState<EditarPropuestaEntity>({
    idPropuesta: 0,
    titulo: '',
    descripción: '',
    area: '',
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
      dispatch(deletePropuestaSlice.actions.resetState());
    } else if (eliminarPropuestaState.data) {
      showAlertAsync({
        title: 'Éxito',
        icon: 'success',
        html: 'Registro eliminado con éxito',
      });
      dispatch(deletePropuestaSlice.actions.resetState());
      dispatch(getAllPropuesta());
    }
  }, [eliminarPropuestaState]);

  useEffect(() => {
    if (actualizarPropuestaState.error) {
      showAlertAsync({
        title: 'Error',
        icon: 'error',
        html: actualizarPropuestaState.error,
      });
      dispatch(editPropuestaSlice.actions.resetState());
      setOpenModalEdit(false);
    } else if (actualizarPropuestaState.data) {
      showAlertAsync({
        title: 'Éxito',
        icon: 'success',
        html: 'Cambios guardados correctamente.',
      });
      dispatch(editPropuestaSlice.actions.resetState());
      dispatch(getAllPropuesta());
    }
  }, [actualizarPropuestaState]);

  useEffect(() => {
    if (obtenerPropuestaState.data) {
      setEditPropuestaData(obtenerPropuestaState.data);
      showModalEdit();
      dispatch(getPropuestaSlice.actions.resetState());
    } else if (obtenerPropuestaState.error) {
      showAlertAsync({
        title: 'Error',
        icon: 'error',
        html: obtenerPropuestaState.error,
      });
      dispatch(getPropuestaSlice.actions.resetState());
    }
  }, [obtenerPropuestaState]);

  const init = async () => {
    await handleResetData();
    dispatch(getAllPropuesta());
  }

  const handleCandidatoSelectChange = (option: { value: string, label: string }) => {
    setOptionCandidatoSelected(option);
    handleSetData(option.value, 'idCandidato');
  }

  
  const handleSetData = (value: string, field: keyof EditarPropuestaEntity) => {
    setEditPropuestaData((prevData) => ({
      ...prevData,
      [field]: value
    }));
  };

  const handleResetData = async () => {
    dispatch(getAllPropuestaSlice.actions.resetState());
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, field: keyof EditarPropuestaEntity) => {
    handleSetEditData(event.target.value, field);
  };

  const handleSetEditData = (value: string, field: keyof EditarPropuestaEntity) => {
    setEditPropuestaData((prevData) => ({
      ...prevData,
      [field]: value
    }));
  };

  const buildDataTable = (data: MostrarPropuestaEntity[]) => {
    const columns = dataTableData.columns;
    const rows = [];

    for (const item of data) {
      rows.push({
        titulo: item.titulo,
        descripción: item.descripción,
        area: item.area,
        nombreCandidato: item.nombreCandidato,
        actions: (
          <SoftBox display="flex">
            <SoftBox mr={1}>
              <Tooltip title="Eliminar" arrow>
                <SoftButton
                  variant="contained"
                  color="error"
                  size="small"
                  iconOnly
                  onClick={() => confirmDelete(item.idPropuesta)}
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
                  onClick={() => getPropuesta(item.idPropuesta)}
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
    dispatch(deletePropuesta(id));
  }

  const editRegister = () => {
    if (editPropuestaData.idPropuesta == 0 || editPropuestaData.area === '' || editPropuestaData.descripción == '' || editPropuestaData.titulo == '' || editPropuestaData.idCandidato == 0) {
      showAlertAsync({
        title: 'Error',
        icon: 'error',
        html: 'Hay campos vacíos o no válidos',
      });
      return;
    }
    hideModalEdit();
    dispatch(editPropuesta(editPropuestaData));
  }

  const getPropuesta = (id: number) => {
    dispatch(getPropuestaById(id));
  }

  const handleCheckboxChange = (fieldName: keyof EditarPropuestaEntity) => {
    setEditPropuestaData((prevData) => ({
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
    setEditPropuestaData({
      idPropuesta: 0,
      idCandidato: 0,
      descripción: '',
      titulo: '',
      area: '',
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
                      Titulo
                    </SoftTypography>
                  </SoftBox>
                  <SoftInput
                    value={editPropuestaData.titulo}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event, 'titulo')}
                  />
                </SoftBox>
              </Grid>
              <Grid item xs={12}>
                <SoftBox display="flex" flexDirection="column" height="100%">
                  <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                    <SoftTypography component="label" variant="caption" fontWeight="bold">
                      Area
                    </SoftTypography>
                  </SoftBox>
                  <SoftInput
                    value={editPropuestaData.area}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event, 'area')}
                  />
                </SoftBox>
              </Grid>
              <Grid item xs={12}>
                <SoftBox display="flex" flexDirection="column" height="100%">
                  <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                    <SoftTypography component="label" variant="caption" fontWeight="bold">
                      Descripción
                    </SoftTypography>
                  </SoftBox>
                  <SoftInput
                    value={editPropuestaData.descripción}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event, 'descripción')}
                  />
                </SoftBox>
              </Grid>
              <Grid item xs={12}>
                <SoftBox display="flex" flexDirection="column" height="100%">
                  <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                    <SoftTypography component="label" variant="caption" fontWeight="bold">
                      Candidato
                    </SoftTypography>
                  </SoftBox>
                  <CustomSelect
                                onChange={(option: { value: string, label: string }) => handleCandidatoSelectChange(option)}
                                value={optionCandidatoSelected}
                                placeholder="Candidato"
                                isRequired={true}
                                options={selectorCandidatoState.data}
                              />
                </SoftBox>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <SoftButton color="secondary" onClick={hideModalEdit}>
              Cancelar
            </SoftButton>
            <SoftButton color="primary" onClick={actualizarPropuestaState.loading ? null : editRegister}>
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
        {mostrarPropuestaState.loading ? (
          <SoftBox
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ height: 'calc(100vh - 154px)' }}
          >
            <CircularProgress />
          </SoftBox>
        ) : mostrarPropuestaState.error ? (
          <SoftBox
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ height: 'calc(100vh - 154px)' }}
          >
            <SoftTypography component="label">
              {mostrarPropuestaState.error ?? "Error desconocido"}
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
