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
import { CircularProgress, Tooltip } from "@mui/material";



//Entities
import { MostrarCargoEntity, EditCargoEntity } from "app/api/domain/entities/CargoEntities/CargoEntity";
//Actions
import { deleteCargo, getAllCargo, getCargoById, editCargo } from "app/redux/actions/CargoActions/CargoActions";
//Slices
import { deleteCargoSlice } from "app/redux/slices/cargo/EliminarCargoSlice";
import { editCargoSlice } from "app/redux/slices/cargo/ActualizarCargoSlice";
import { getAllCargoSlice } from "app/redux/slices/cargo/MostrarCargoSlice";
import { getCargoSlice } from "app/redux/slices/cargo/ObtenerCargoPorIdSlice";
export default function CargoList() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const mostrarCargoState = useAppSelector(state => state.mostrarCargo);
  const obtenerCargoPorIdState = useAppSelector(state => state.mostrarCargoPorId);
  const actualizarCargoState = useAppSelector(state => state.actualizarCargo);
  const eliminarCargoState = useAppSelector(state => state.eliminarCargo);

  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [editCargoData, setEditCargoData] = useState<EditCargoEntity>({
    idCargo: 0,
    nombre: '',
  });

  const [dataTableData, setDataTableData] = useState({
    columns: [
      { Header: "Nombre", accessor: "nombre", width: "75%" },
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
    if (mostrarCargoState.data) {
      buildDataTable(mostrarCargoState.data);
    }
  }, [mostrarCargoState.data]);

  useEffect(() => {
    if (eliminarCargoState.error) {
      showAlertAsync({
        title: 'Error',
        icon: 'error',
        html: eliminarCargoState.error,
      });
      dispatch(deleteCargoSlice.actions.resetState());
    } else if (eliminarCargoState.data) {
      showAlertAsync({
        title: 'Éxito',
        icon: 'success',
        html: 'Registro eliminado con éxito',
      });
      dispatch(deleteCargoSlice.actions.resetState());
      dispatch(getAllCargo());
    }
  }, [eliminarCargoState]);

  useEffect(() => {
    if (actualizarCargoState.error) {
      showAlertAsync({
        title: 'Error',
        icon: 'error',
        html: actualizarCargoState.error,
      });
      dispatch(editCargoSlice.actions.resetState());
      setOpenModalEdit(false);
    } else if (actualizarCargoState.data) {
      showAlertAsync({
        title: 'Éxito',
        icon: 'success',
        html: 'Cambios guardados correctamente.',
      });
      dispatch(editCargoSlice.actions.resetState());
      dispatch(getAllCargo());
    }
  }, [actualizarCargoState]);

  useEffect(() => {
    if (obtenerCargoPorIdState.data) {
      setEditCargoData(obtenerCargoPorIdState.data);
      showModalEdit();
      dispatch(getCargoSlice.actions.resetState());
    } else if (obtenerCargoPorIdState.error) {
      showAlertAsync({
        title: 'Error',
        icon: 'error',
        html: obtenerCargoPorIdState.error,
      });
      dispatch(getCargoSlice.actions.resetState());
    }
  }, [obtenerCargoPorIdState]);

  const init = async () => {
    await handleResetData();
    dispatch(getAllCargo());
  }

  const handleResetData = async () => {
    dispatch(getAllCargoSlice.actions.resetState());
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, field: keyof EditCargoEntity) => {
    handleSetEditData(event.target.value, field);
  };

  const handleSetEditData = (value: string, field: keyof EditCargoEntity) => {
    setEditCargoData((prevData) => ({
      ...prevData,
      [field]: value
    }));
  };

  const buildDataTable = (data: MostrarCargoEntity[]) => {
    const columns = dataTableData.columns;
    const rows = [];

    for (const item of data) {
      rows.push({
        nombre: item.nombre,
        actions: (
          <SoftBox display="flex">
            <SoftBox mr={1}>
              <Tooltip title="Eliminar" arrow>
                <SoftButton
                  variant="contained"
                  color="error"
                  size="small"
                  iconOnly
                  onClick={() => confirmDelete(item.idCargo)}
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
                  onClick={() => getCargo(item.idCargo)}
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
    dispatch(deleteCargo(id));
  }

  const editRegister = () => {
    if (editCargoData.idCargo === 0 || editCargoData.nombre === '') {
      showAlertAsync({
        title: 'Error',
        icon: 'error',
        html: 'Hay campos vacíos o no válidos',
      });
      return;
    }
    hideModalEdit();
    dispatch(editCargo(editCargoData));
  }

  const getCargo = (id: number) => {
    dispatch(getCargoById(id));
  }

  const hideModalEdit = () => {
    setOpenModalEdit(false);
    resetModalState();
  }

  const showModalEdit = () => {
    setOpenModalEdit(true);
  }

  const resetModalState = () => {
    setEditCargoData({
      idCargo: 0,
      nombre: '',
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
                      Nombre
                    </SoftTypography>
                  </SoftBox>
                  <SoftInput
                    multiline
                    rows={5}
                    value={editCargoData.nombre}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event, 'nombre')}
                  />
                </SoftBox>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <SoftButton color="secondary" onClick={hideModalEdit}>
              Cancelar
            </SoftButton>
            <SoftButton color="primary" onClick={actualizarCargoState.loading ? null : editRegister}>
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
            Crear Cargo
          </SoftButton>
        </SoftBox>
        {mostrarCargoState.loading ? (
          <SoftBox
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ height: 'calc(100vh - 154px)' }}
          >
            <CircularProgress />
          </SoftBox>
        ) : mostrarCargoState.error ? (
          <SoftBox
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ height: 'calc(100vh - 154px)' }}
          >
            <SoftTypography component="label">
              {mostrarCargoState.error ?? "Error desconocido"}
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
