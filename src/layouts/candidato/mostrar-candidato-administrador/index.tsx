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
import { MostrarCandidatoEntity, EditCandidatoEntity } from "app/api/domain/entities/CandidatoEntities/CandidatoEntity";
//Actions
import { deleteCandidato,getAllCandidato, getCandidatoById, editCandidato } from "app/redux/actions/CandidatoActions/CandidatoActions";
//Slices

import { deleteCandidatoSlice } from "app/redux/slices/candidato/EliminarCandidatoSlice";
import { editCandidatoSlice } from "app/redux/slices/candidato/ActualizarCandidatoSlice";
import { getAllCandidatoSlice } from "app/redux/slices/candidato/MostrarCandidatoSlice";
import { getCandidatoSlice } from "app/redux/slices/candidato/ObtenerCandidatoSlice";

import CustomSelect from "components/CustomSelect";
import { getAllCargo } from "app/redux/actions/CargoActions/CargoActions";
import { getAllPartido } from "app/redux/actions/PartidoActions/PartidoActions";



import AccessibilityIcon from '@mui/icons-material/Accessibility';

export default function CandidatoAdministradorList() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

    const MostrarCandidatoState = useAppSelector(state => state.mostrarCandidato);
    const ObtenerCandidatoState = useAppSelector(state => state.obtenerCandidato);
    const actualizarCandidatoState = useAppSelector(state => state.actualizarCandidato);
    const eliminarCandidatoState = useAppSelector(state => state.EliminarCandidato);

    const selectorCargoState = useAppSelector(state => state.keyValueCargo);
    const selectorPartidoState = useAppSelector(state => state.keyValuePartido);


  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);

  const [optionCargoSelected, setOptionCargoSelected] = useState<{ value: string, label: string }>({
    value: '', label: ''
  });

  const [optionPartidoSelected, setOptionPartidoSelected] = useState<{ value: string, label: string }>({
    value: '', label: ''
  });


  const [editCandidatoData, setEditCandidatoData] = useState<EditCandidatoEntity>({
    idCandidato: 0,
    nombreCandidato: '',
    edad: 0,
    fotoUrl: '',
    lugarDeNacimiento: '',
    informacionDeContacto: '',
    idPartido: 0,
    idCargo: 0,
  });

  const [dataTableData, setDataTableData] = useState({
    columns: [
      { Header: "Nombre", accessor: "nombreCandidato", width: "15%" },
      { Header: "Edad", accessor: "edad", width: "15%" },
      { Header: "Foto Url", accessor: "fotoUrl", width: "15%" },
      { Header: "Lugar De Nacimiento", accessor: "lugarDeNacimiento", width: "15%"},
      { Header: "Partido", accessor: "idPartido", width: "15%"},
      { Header: "Lugar De Nacimiento", accessor: "idCargo", width: "15%"},
      { Header: "Acciones", accessor: "actions", width: "10%" },
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
    if (MostrarCandidatoState.data) {
      buildDataTable(MostrarCandidatoState.data);
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

  
  const handleSetData = (value: string, field: keyof EditCandidatoEntity) => {
    setEditCandidatoData((prevData) => ({
      ...prevData,
      [field]: value
    }));
  };

  const handleResetData = async () => {
    dispatch(getAllCandidatoSlice.actions.resetState());
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, field: keyof EditCandidatoEntity) => {
    handleSetEditData(event.target.value, field);
  };

  const handleSetEditData = (value: string, field: keyof EditCandidatoEntity) => {
    setEditCandidatoData((prevData) => ({
      ...prevData,
      [field]: value
    }));
  };

  const buildDataTable = (data: MostrarCandidatoEntity[]) => {
    const columns = dataTableData.columns;
    const rows = [];

    for (const item of data) {
      rows.push({
        nombreCandidato: item.nombreCandidato,
        edad: item.edad,
        fotoUrl: item.fotoUrl,
        lugarDeNacimiento: item.lugarDeNacimiento,
        idPartido: item.nombrePartido,
        idCargo: item.cargo,
        actions: (
          <SoftBox display="flex">
            <SoftBox mr={1}>
              <Tooltip title="Eliminar" arrow>
                <SoftButton
                  variant="contained"
                  color="error"
                  size="small"
                  iconOnly
                  onClick={() => confirmDelete(item.idCandidato)}
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
                  onClick={() => getPropuesta(item.idCandidato)}
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
    dispatch(deleteCandidato(id));
  }

  const editRegister = () => {
    if (editCandidatoData.idCandidato == 0 || editCandidatoData.nombreCandidato === '' || editCandidatoData.edad == 0 || editCandidatoData.fotoUrl == '' || editCandidatoData.informacionDeContacto == '' || editCandidatoData.lugarDeNacimiento == '' || editCandidatoData.idCargo == 0 || editCandidatoData.idPartido == 0) {
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

  

//   const handleCheckboxChange = (fieldName: keyof EditCandidatoEntity) => {
//     setEditPropuestaData((prevData) => ({
//       ...prevData,
//       [fieldName]: !prevData[fieldName] // invertir el estado anterior
//     }));
//   };

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
                    value={editCandidatoData.nombreCandidato}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event, 'nombreCandidato')}
                  />
                </SoftBox>
              </Grid>
              <Grid item xs={12}>
                <SoftBox display="flex" flexDirection="column" height="100%">
                  <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                    <SoftTypography component="label" variant="caption" fontWeight="bold">
                      Edad
                    </SoftTypography>
                  </SoftBox>
                  <SoftInput
                    value={editCandidatoData.edad}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event, 'edad')}
                  />
                </SoftBox>
              </Grid>
              <Grid item xs={12}>
                <SoftBox display="flex" flexDirection="column" height="100%">
                  <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                    <SoftTypography component="label" variant="caption" fontWeight="bold">
                      Foto URL
                    </SoftTypography>
                  </SoftBox>
                  <SoftInput
                    value={editCandidatoData.fotoUrl}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event, 'fotoUrl')}
                  />
                </SoftBox>
              </Grid>
              <Grid item xs={12}>
                <SoftBox display="flex" flexDirection="column" height="100%">
                  <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                    <SoftTypography component="label" variant="caption" fontWeight="bold">
                      Lugar de nacimiento
                    </SoftTypography>
                  </SoftBox>
                  <SoftInput
                    value={editCandidatoData.lugarDeNacimiento}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event, 'lugarDeNacimiento')}
                  />
                </SoftBox>
              </Grid>
              <Grid item xs={12}>
                <SoftBox display="flex" flexDirection="column" height="100%">
                  <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                    <SoftTypography component="label" variant="caption" fontWeight="bold">
                      Cargo
                    </SoftTypography>
                  </SoftBox>
                  <CustomSelect
                                onChange={(option: { value: string, label: string }) => handleCargoSelectChange(option)}
                                value={optionCargoSelected}
                                placeholder="Cargo"
                                isRequired={true}
                                options={selectorCargoState.data}
                              />
                </SoftBox>
              </Grid>
              <Grid item xs={12}>
                <SoftBox display="flex" flexDirection="column" height="100%">
                  <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                    <SoftTypography component="label" variant="caption" fontWeight="bold">
                      Partido Politico
                    </SoftTypography>
                  </SoftBox>
                  <CustomSelect
                                onChange={(option: { value: string, label: string }) => handlePartidoSelectChange(option)}
                                value={optionPartidoSelected}
                                placeholder="Partido"
                                isRequired={true}
                                options={selectorPartidoState.data}
                              />
                </SoftBox>
              </Grid>
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
  }

  const handleBackButtonClick = () => {
    navigate('/app/candidatos/crear-candidato');
  }

  return (
    <>
      {renderModelEdit()}
      
      <SoftBox mb={3}>
        <SoftBox display="flex" justifyContent="flex-end" mb={2}>
          <SoftButton onClick={handleBackButtonClick} color="primary">
            Crear Candidato
            <AccessibilityIcon style={{ marginLeft: '8px' }} />
          </SoftButton>
        </SoftBox>
        {MostrarCandidatoState.loading ? (
          <SoftBox
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ height: 'calc(100vh - 154px)' }}
          >
            <CircularProgress />
          </SoftBox>
        ) : MostrarCandidatoState.error ? (
          <SoftBox
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ height: 'calc(100vh - 154px)' }}
          >
            <SoftTypography component="label">
              {MostrarCandidatoState.error ?? "Error desconocido"}
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