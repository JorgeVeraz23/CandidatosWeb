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
import { MostrarPartidoEntity, EditPartidoEntity } from "app/api/domain/entities/PartidoEntities/PartidoEntity";
//Actions
import { deletePartido, getAllPartido, getPartidoById, editPartido } from "app/redux/actions/PartidoActions/PartidoActions";
//Slices
import { deletePartidoSlice } from "app/redux/slices/partido/EliminarPartidoSlice";
import { editPartidoSlice } from "app/redux/slices/partido/ActualizarPartidoSlice";
import { getAllPartidoSlice } from "app/redux/slices/partido/MostrarPartidoSlice";
import { getPartidoSlice } from "app/redux/slices/partido/ObtenerPartidoPorIdSlice";


export default function PartidoList() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

    const mostrarPartidoState = useAppSelector(state => state.mostrarPartido);
    const obtenerPartidoState = useAppSelector(state => state.obtenerPartido);
    const actualizarPartidoState = useAppSelector(state => state.actualizarPartido);
    const eliminarPartidoState = useAppSelector(state => state.eliminarPartido);

  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [editPartidoData, setEditPartidoData] = useState<EditPartidoEntity>({
    idPartido: 0,
    nombrePartido: '',
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
    if (mostrarPartidoState.data) {
      buildDataTable(mostrarPartidoState.data);
    }
  }, [mostrarPartidoState.data]);

  useEffect(() => {
    if (eliminarPartidoState.error) {
      showAlertAsync({
        title: 'Error',
        icon: 'error',
        html: eliminarPartidoState.error,
      });
      dispatch(deletePartidoSlice.actions.resetState());
    } else if (eliminarPartidoState.data) {
      showAlertAsync({
        title: 'Éxito',
        icon: 'success',
        html: 'Registro eliminado con éxito',
      });
      dispatch(deletePartidoSlice.actions.resetState());
      dispatch(getAllPartido());
    }
  }, [eliminarPartidoState]);

  useEffect(() => {
    if (actualizarPartidoState.error) {
      showAlertAsync({
        title: 'Error',
        icon: 'error',
        html: actualizarPartidoState.error,
      });
      dispatch(editPartidoSlice.actions.resetState());
      setOpenModalEdit(false);
    } else if (actualizarPartidoState.data) {
      showAlertAsync({
        title: 'Éxito',
        icon: 'success',
        html: 'Cambios guardados correctamente.',
      });
      dispatch(editPartidoSlice.actions.resetState());
      dispatch(getAllPartido());
    }
  }, [actualizarPartidoState]);

  useEffect(() => {
    if (obtenerPartidoState.data) {
      setEditPartidoData(obtenerPartidoState.data);
      showModalEdit();
      dispatch(getPartidoSlice.actions.resetState());
    } else if (obtenerPartidoState.error) {
      showAlertAsync({
        title: 'Error',
        icon: 'error',
        html: obtenerPartidoState.error,
      });
      dispatch(getPartidoSlice.actions.resetState());
    }
  }, [obtenerPartidoState]);

  const init = async () => {
    await handleResetData();
    dispatch(getAllPartido());
  }

  const handleResetData = async () => {
    dispatch(getAllPartidoSlice.actions.resetState());
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, field: keyof EditPartidoEntity) => {
    handleSetEditData(event.target.value, field);
  };

  const handleSetEditData = (value: string, field: keyof EditPartidoEntity) => {
    setEditPartidoData((prevData) => ({
      ...prevData,
      [field]: value
    }));
  };

  const buildDataTable = (data: MostrarPartidoEntity[]) => {
    const columns = dataTableData.columns;
    const rows = [];

    for (const item of data) {
      rows.push({
        nombre: item.nombrePartido,
        actions: (
          <SoftBox display="flex">
            <SoftBox mr={1}>
              <Tooltip title="Eliminar" arrow>
                <SoftButton
                  variant="contained"
                  color="error"
                  size="small"
                  iconOnly
                  onClick={() => confirmDelete(item.idPartido)}
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
                  onClick={() => getPartido(item.idPartido)}
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
    dispatch(deletePartido(id));
  }

  const editRegister = () => {
    if (editPartidoData.idPartido === 0 || editPartidoData.nombrePartido === '') {
      showAlertAsync({
        title: 'Error',
        icon: 'error',
        html: 'Hay campos vacíos o no válidos',
      });
      return;
    }
    hideModalEdit();
    dispatch(editPartido(editPartidoData));
  }

  const getPartido = (id: number) => {
    dispatch(getPartidoById(id));
  }

  const hideModalEdit = () => {
    setOpenModalEdit(false);
    resetModalState();
  }

  const showModalEdit = () => {
    setOpenModalEdit(true);
  }

  const resetModalState = () => {
    setEditPartidoData({
      idPartido: 0,
      nombrePartido: '',
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
                    value={editPartidoData.nombrePartido}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event, 'nombrePartido')}
                  />
                </SoftBox>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <SoftButton color="secondary" onClick={hideModalEdit}>
              Cancelar
            </SoftButton>
            <SoftButton color="primary" onClick={actualizarPartidoState.loading ? null : editRegister}>
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
        {mostrarPartidoState.loading ? (
          <SoftBox
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ height: 'calc(100vh - 154px)' }}
          >
            <CircularProgress />
          </SoftBox>
        ) : mostrarPartidoState.error ? (
          <SoftBox
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ height: 'calc(100vh - 154px)' }}
          >
            <SoftTypography component="label">
              {mostrarPartidoState.error ?? "Error desconocido"}
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
