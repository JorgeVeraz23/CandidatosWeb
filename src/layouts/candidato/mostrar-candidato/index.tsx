import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'app/redux/hooks';
import { useNavigate } from 'react-router-dom';
import { Grid, Card, CardContent, CardMedia, Typography, Button, CircularProgress, Box, Tooltip, DialogTitle, DialogContent, DialogActions, Dialog } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

// Soft UI Dashboard PRO React components
import SoftBox from 'components/SoftBox';
import SoftButton from 'components/SoftButton';
import SoftInput from 'components/SoftInput';
import SoftTypography from 'components/SoftTypography';
import CustomSelect from 'components/CustomSelect';

// Actions
import { deleteCandidato, getAllCandidato, getCandidatoById, editCandidato } from 'app/redux/actions/CandidatoActions/CandidatoActions';
import { getAllCargo } from 'app/redux/actions/CargoActions/CargoActions';
import { getAllPartido } from 'app/redux/actions/PartidoActions/PartidoActions';

// Slices
import { deleteCandidatoSlice } from 'app/redux/slices/candidato/EliminarCandidatoSlice';
import { editCandidatoSlice } from 'app/redux/slices/candidato/ActualizarCandidatoSlice';
import { getAllCandidatoSlice } from 'app/redux/slices/candidato/MostrarCandidatoSlice';
import { getCandidatoSlice } from 'app/redux/slices/candidato/ObtenerCandidatoSlice';
import { showAlertAsync } from 'layouts/pages/sweet-alerts/components/CustomAlert';

export default function CandidatoList() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const MostrarCandidatoState = useAppSelector(state => state.mostrarCandidato);
  const ObtenerCandidatoState = useAppSelector(state => state.obtenerCandidato);
  const actualizarCandidatoState = useAppSelector(state => state.actualizarCandidato);
  const eliminarCandidatoState = useAppSelector(state => state.EliminarCandidato);

  const selectorCargoState = useAppSelector(state => state.keyValueCargo);
  const selectorPartidoState = useAppSelector(state => state.keyValuePartido);

  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [optionCargoSelected, setOptionCargoSelected] = useState<{ value: string, label: string }>({ value: '', label: '' });
  const [optionPartidoSelected, setOptionPartidoSelected] = useState<{ value: string, label: string }>({ value: '', label: '' });
  const [editCandidatoData, setEditCandidatoData] = useState({
    idCandidato: 0,
    nombreCandidato: '',
    edad: 0,
    fotoUrl: '',
    lugarDeNacimiento: '',
    informacionDeContacto: '',
    idPartido: 0,
    idCargo: 0,
  });

  useEffect(() => {
    init();
    return () => {
      resetModalState();
    };
  }, []);

  useEffect(() => {
    if (MostrarCandidatoState.data) {
      // Rebuild DataTable if necessary (not used in the card view)
    }
  }, [MostrarCandidatoState.data]);

  useEffect(() => {
    if (eliminarCandidatoState.error) {
      showAlertAsync({
        title: 'Error',
        icon: 'error',
        html: eliminarCandidatoState.error,
      });
      dispatch(deleteCandidatoSlice.actions.resetState());
    } else if (eliminarCandidatoState.data) {
      showAlertAsync({
        title: 'Éxito',
        icon: 'success',
        html: 'Registro eliminado con éxito',
      });
      dispatch(deleteCandidatoSlice.actions.resetState());
      dispatch(getAllCandidato());
    }
  }, [eliminarCandidatoState]);

  useEffect(() => {
    if (actualizarCandidatoState.error) {
      showAlertAsync({
        title: 'Error',
        icon: 'error',
        html: actualizarCandidatoState.error,
      });
      dispatch(editCandidatoSlice.actions.resetState());
      setOpenModalEdit(false);
    } else if (actualizarCandidatoState.data) {
      showAlertAsync({
        title: 'Éxito',
        icon: 'success',
        html: 'Cambios guardados correctamente.',
      });
      dispatch(editCandidatoSlice.actions.resetState());
      dispatch(getAllCandidato());
    }
  }, [actualizarCandidatoState]);

  useEffect(() => {
    if (ObtenerCandidatoState.data) {
      setEditCandidatoData(ObtenerCandidatoState.data);
      showModalEdit();
      dispatch(getCandidatoSlice.actions.resetState());
    } else if (ObtenerCandidatoState.error) {
      showAlertAsync({
        title: 'Error',
        icon: 'error',
        html: ObtenerCandidatoState.error,
      });
      dispatch(getCandidatoSlice.actions.resetState());
    }
  }, [ObtenerCandidatoState]);

  const init = async () => {
    await handleResetData();
    await handleSelectoresActions();
    dispatch(getAllCandidato());
  }

  const handleSelectoresActions = () => {
    dispatch(getAllCargo());
    dispatch(getAllPartido());
  }

  const handleCargoSelectChange = (option: { value: string, label: string }) => {
    setOptionCargoSelected(option);
    handleSetData(option.value, 'idCargo');
  }

  const handlePartidoSelectChange = (option: { value: string, label: string }) => {
    setOptionPartidoSelected(option);
    handleSetData(option.value, 'idPartido');
  }

  const handleSetData = (value: string, field: keyof typeof editCandidatoData) => {
    setEditCandidatoData((prevData) => ({
      ...prevData,
      [field]: value
    }));
  };

  const handleResetData = async () => {
    dispatch(getAllCandidatoSlice.actions.resetState());
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, field: keyof typeof editCandidatoData) => {
    handleSetEditData(event.target.value, field);
  };

  const handleSetEditData = (value: string, field: keyof typeof editCandidatoData) => {
    setEditCandidatoData((prevData) => ({
      ...prevData,
      [field]: value
    }));
  };

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
    dispatch(deleteCandidato(id));
  }

  const editRegister = () => {
    if (editCandidatoData.idCandidato === 0 || editCandidatoData.nombreCandidato === '' || editCandidatoData.edad === 0 || editCandidatoData.fotoUrl === '' || editCandidatoData.informacionDeContacto === '' || editCandidatoData.lugarDeNacimiento === '' || editCandidatoData.idCargo === 0 || editCandidatoData.idPartido === 0) {
      showAlertAsync({
        title: 'Error',
        icon: 'error',
        html: 'Hay campos vacíos o no válidos',
      });
      return;
    }
    hideModalEdit();
    dispatch(editCandidato(editCandidatoData));
  }

  const getPropuesta = (id: number) => {
    dispatch(getCandidatoById(id));
  }

  const hideModalEdit = () => {
    setOpenModalEdit(false);
    resetModalState();
  }

  const showModalEdit = () => {
    setOpenModalEdit(true);
  }

  const resetModalState = () => {
    setEditCandidatoData({
      idCandidato: 0,
      nombreCandidato: '',
      edad: 0,
      fotoUrl: '',
      lugarDeNacimiento: '',
      informacionDeContacto: '',
      idPartido: 0,
      idCargo: 0,
    });
  }

  const renderModalEdit = () => (
    <SoftBox>
      <Dialog
        fullWidth
        maxWidth="sm"
        open={openModalEdit}
        onClose={hideModalEdit}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Editar</DialogTitle>
        <DialogContent>
          <Grid container spacing={3} mb={2}>
            {/* Tu código de campos del formulario */}
          </Grid>
        </DialogContent>
        <DialogActions>
          <SoftButton color="secondary" onClick={hideModalEdit}>
            Cancelar
          </SoftButton>
          <SoftButton color="primary" onClick={actualizarCandidatoState.loading ? null : editRegister}>
            Guardar
          </SoftButton>
        </DialogActions>
      </Dialog>
    </SoftBox>
  );

  const handleBackButtonClick = () => {
    navigate('/app/planificacion/crear-planificacion');
  }

  return (
    <>
      {renderModalEdit()}

      <SoftBox mb={3}>
        <SoftBox display="flex" justifyContent="flex-end" mb={2}>
          <SoftButton variant="contained" color="primary" onClick={handleBackButtonClick}>
            Agregar Candidato
          </SoftButton>
        </SoftBox>

        {MostrarCandidatoState.loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" sx={{ height: 'calc(100vh - 154px)' }}>
            <CircularProgress />
          </Box>
        ) : MostrarCandidatoState.error ? (
          <Box display="flex" justifyContent="center" alignItems="center" sx={{ height: 'calc(100vh - 154px)' }}>
            <Typography component="label">
              {MostrarCandidatoState.error ?? "Error desconocido"}
            </Typography>
          </Box>
        ) : (
          <Box my={1} sx={{ minHeight: 'calc(100vh - 260px)' }}>
            <Grid container spacing={2}>
              {MostrarCandidatoState.data?.map((candidato) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={candidato.idCandidato}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="140"
                      image={candidato.fotoUrl}
                      alt={`${candidato.nombreCandidato} Foto`}
                      style={{ objectFit: 'cover' }}
                    />
                    <CardContent>
                      <Typography variant="h6" component="div">
                        {candidato.nombreCandidato}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Edad: {candidato.edad}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Lugar de Nacimiento: {candidato.lugarDeNacimiento}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Partido: {candidato.nombrePartido}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Cargo: {candidato.cargo}
                      </Typography>
                      <SoftBox display="flex" justifyContent="flex-end" mt={2}>
                        <Tooltip title="Editar">
                          <Button variant="contained" color="primary" onClick={() => getPropuesta(candidato.idCandidato)} style={{ marginRight: 8 }}>
                            <EditIcon />
                          </Button>
                        </Tooltip>
                        <Tooltip title="Eliminar">
                          <Button variant="contained" color="error" onClick={() => confirmDelete(candidato.idCandidato)}>
                            <DeleteIcon />
                          </Button>
                        </Tooltip>
                      </SoftBox>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </SoftBox>
    </>
  );
}
