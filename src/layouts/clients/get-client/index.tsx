import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "app/redux/hooks";
import { useNavigate } from 'react-router-dom';
import { 
    getAllClientes, 
    getClientsById, 
    createClient,
    editClient,
    deleteClient
} from 'app/redux/actions/ClientsActions/ClientsActions';
import { getTypeDocuments } from "app/redux/actions/GetTypeDocumentsCatalogueActions/GetTypeDocumentsCatalogueActions"; 
import { ShowClientEntity, EditClientEntity } from "app/api/domain/entities/ClientEntities/ClientEntity";
import { deleteClientSlice } from "app/redux/slices/clients/DeleteClientSlice";
import { editClientSlice } from "app/redux/slices/clients/EditClientSlice";
import { EnumTypeDocument, GetTypeDocumentsCatalogueEntity } from "app/api/domain/entities/ClientEntities/GetTypeDocumentsCatalogueEntity";


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
import Select from "react-select";
import SoftTypography from "components/SoftTypography"

// Soft UI Dashboard PRO React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import CustomButton from "components/CustomButton";
// Wizard application components
import FormField from "layouts/applications/wizard/components/FormField";

// Pages components
import { showAlertAsync } from "layouts/pages/sweet-alerts/components/CustomAlert";
import SoftInput from "components/SoftInput";

import ClientSelect from "components/ClientSelect";
import { CircularProgress, Tooltip } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';

export default function ShowClients() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const catalogueGetTypeDocumentsState = useAppSelector(state => state.getTypeDocuments);
  const listClientState = useAppSelector(state => state.getAllClient);
  const deleteClientState = useAppSelector(state => state.deleteClient);
  const getClientState = useAppSelector(state => state.getClient);
  const editClientState = useAppSelector(state => state.EditClient);
  const [loading, setLoading] = useState(true); // Estado de carga

  const [selectedValue, setSelectedValue] = useState<{} | null>(null);

  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);

  const [editClientData, setEditClientData] = useState<EditClientEntity>({
    idClient: 0,
    nameClient: '',
    typeDocument: EnumTypeDocument.DNI,
    textTypeDocument: '',
    dniNumber: '',
  });

  const [dataTableData, setDataTableData] = useState({
    columns: [
      //{ Header: "CLIENTE ID", accessor: "idClient", width: "15%" }, // Ancho ajustado
      { Header: "NOMBRE", accessor: "nameClient", width: "30%" }, // Ancho ajustado
      //{ Header: "tipo de documento", accessor: "typeDocument", width: "20%" }, // Ancho ajustado
      { Header: "Nombre de documento", accessor: "textTypeDocument", width: "20%" }, // Ancho ajustado
      { Header: "DNI NUMERO", accessor: "dniNumber", width: "20%" }, // Ancho ajustado
      { Header: "Acciones", accessor: "actions", width: "15%" }, // Ancho ajustado
    ],
    rows: [],
  });

  useEffect(() => {
    if(catalogueGetTypeDocumentsState.data === null){
      dispatch(getTypeDocuments());
    } else if(catalogueGetTypeDocumentsState.error){
      console.log(catalogueGetTypeDocumentsState.error);
    }
  }, [catalogueGetTypeDocumentsState.data]);

  useEffect(() => {
    if (listClientState.data === null){
      dispatch(getAllClientes());
    } else if(listClientState.error) {
      console.log(listClientState.error);
    } else {
      buildDataTable(listClientState.data);
    }
  }, [listClientState.data]);

  useEffect(() => {
    if (listClientState.data === null) {
      dispatch(getAllClientes());
    } else {
      buildDataTable(listClientState.data);
    }
  }, [listClientState.data]);



  useEffect(() => {
    if (getClientState.data) {
      const option = catalogueGetTypeDocumentsState.data.find(
        (option) => option.value == getClientState.data.typeDocument
      );
      setSelectedValue(option);
      setEditClientData(getClientState.data);
    } else if (getClientState.error) {
      showAlertAsync({
        title: 'Error',
        icon: 'error',
        html: getClientState.error,
      });
    }
  }, [getClientState]);

  useEffect(() => {
    if(editClientState.error) {
      showAlertAsync({
        title: 'Error', 
        icon: 'error', 
        html: editClientState.error,
      });
      dispatch(editClientSlice.actions.resetState());
    } else if(editClientState.data) {
      showAlertAsync({
        title: 'Éxito', 
        icon: 'success', 
        html: 'Cambios guardados correctamente',
      });
      dispatch(editClientSlice.actions.resetState());
      dispatch(getAllClientes());
    }
  }, [editClientState]);

  useEffect(() => {
    if (deleteClientState.error){
      showAlertAsync({
        title: 'Error', 
        icon: 'error', 
        html: deleteClientState.error,
      });
      dispatch(deleteClientSlice.actions.resetState());
    } else if (deleteClientState.data) {
      showAlertAsync({
        title: 'Éxito', 
        icon: 'success', 
        html: 'Registro eliminado con éxito',
      });
      dispatch(deleteClientSlice.actions.resetState());
      dispatch(getAllClientes());
    }
  }, [deleteClientState]);

  const handleClick = () => {
    navigate('/app/catalogos/crear-clientes');
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, field: keyof EditClientEntity) => {
    setEditClientData((prevData) => ({
      ...prevData,
      [field]: event.target.value
    }));
  };

 const handleSelectChange = (option: { value: string, label: string } | null, field: keyof EditClientEntity) => {
    if (option === null) {
        setSelectedValue(null);
        setEditClientData((prevData) => ({
            ...prevData,
            [field]: ''
        }));
        return;
    }

    

    // Verificar si option tiene la propiedad value antes de acceder a ella
    if ('value' in option) {
        setSelectedValue(option);
        setEditClientData((prevData) => ({
            ...prevData,
            [field]: option.value
        }));
    }
};
  const showModalEdit = (id: number) => {
    dispatch(getClientsById(id));
    setEditClientData((prevData) => ({
      ...prevData,
      ['idClient']: id
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
    dispatch(deleteClient(id));
  }

  const buildDataTable = (data: ShowClientEntity[]) => {
    const columns = dataTableData.columns;
    const rows = [];

    for (const item of data) {
      rows.push({
        idClient: item.idClient,
        nameClient: item.nameClient,
        typeDocument: item.typeDocument,
        textTypeDocument: item.textTypeDocument,
        dniNumber: item.dniNumber,
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
                         onClick={() => confirmDelete(item.idClient)}
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
                         onClick={() => showModalEdit(item.idClient)}
                     >
                         <EditIcon />
                     </SoftButton>
                 </Tooltip>
                 </SoftBox>
     </SoftBox> 
      });
    }

    setDataTableData({columns, rows});
  }

 const editRegister = () => {
    if(editClientData.idClient == 0 || 
        editClientData.nameClient == '' || 
        (editClientData.typeDocument !== EnumTypeDocument.RUC && editClientData.dniNumber === '')
    ){
      showAlertAsync({
        title: 'Error', 
        icon: 'error', 
        html: 'Todos los campos son obligatorios',
      });
      return;
    }

    // Agregar console.log para ver los datos antes de enviar la solicitud
  console.log("Datos de la solicitud de edición:", editClientData);
    hideModalEdit();
    dispatch(editClient(editClientData));
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
            <Grid container spacing={3} mb={2}>
              <Grid item xs={12}>
                <SoftBox display="flex" flexDirection="column" height="100%">
                  <SoftBox ml={0.5} lineHeight={0} display="inline-block" mb={1}>
                    <SoftTypography component="label" variant="caption" fontWeight="bold" textTransform="capitalize">
                      Tipo de documento
                    </SoftTypography>
                  </SoftBox>
                  <Select
                    isClearable
                    isSearchable
                    placeholder="Selecciona un tipo de documento"
                    value={selectedValue}
                    options={catalogueGetTypeDocumentsState.data}
                    menuPortalTarget={document.body}
                    onChange={(option: {value: string, label: string}) => handleSelectChange(option, 'typeDocument')}
                    styles={
                      {
                        menuPortal: (base) => ({ 
                          ...base, zIndex: 9999 
                        }),
                        control: (provided, state) => ({
                          ...provided,
                            fontSize: '14px',
                        }),
                        option: (provided, state) => ({
                          ...provided,
                          fontSize: '14px',
                        }),
                      }
                  }
                  />
                </SoftBox>
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <SoftBox
                  display="flex"
                  flexDirection="column"
                  height="100%"
                >
                  <SoftBox ml={0.5} lineHeight={0} display="inline-block" mb={1}>
                  <SoftTypography component="label" variant="caption" fontWeight="bold" textTransform="capitalize">
                    Nombre de cliente
                  </SoftTypography>
                  </SoftBox>
                <SoftInput type="text" placeholder="Nombre de cliente" label="Nombre de cliente" value={editClientData.nameClient} onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event, 'nameClient')} />
                
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
                    DNI
                  </SoftTypography>
                  </SoftBox>
                  <SoftInput type="text" placeholder="NUMERO DNI" label="NUMERO DNI" value={editClientData.dniNumber} onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event, 'dniNumber')} />
                </SoftBox>
              </Grid>
          </Grid>
          </DialogContent>
          <DialogActions>
            <SoftButton color="secondary" onClick={() => hideModalEdit() }>Cancelar</SoftButton>
            <SoftButton 
              color="primary" 
              onClick={editClientState.loading ? null : editRegister}
            >
              Editar
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
          <SoftButton color="primary" onClick={handleClick}>
            Agregar Clientes
          </SoftButton>
        </SoftBox>
        {listClientState.loading
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
  : listClientState.error
    ? (
      <SoftBox
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ height: 'calc(100vh - 154px)' }}
      >
        <SoftTypography component="label">
          {listClientState.error ?? "Error desconocido"}
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