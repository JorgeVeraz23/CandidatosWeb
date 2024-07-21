import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "app/redux/hooks";
import { useNavigate } from "react-router-dom";
//ACTIONS
import { getInspectors, getInspectorsEdit } from "app/redux/actions/CatalogueActions";
//ENTITIES
import { CatalogueEntityInspector, CatalogueEntityInspectorEditActive } from "app/api/domain/entities/CatalogueEntity";
//SLICES
import { getInspectorsEditSlice } from "app/redux/slices/catalog/CatalogueInspectorEditSlice";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CircularProgress from "@mui/material/CircularProgress";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import Select from "react-select";
import SoftTypography from "components/SoftTypography";
import DataTable from "examples/Tables/DataTable";
import SoftButton from "components/SoftButton";
import { showAlertAsync } from "layouts/pages/sweet-alerts/components/CustomAlert";
export default function ShowInspectors() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const listInspectorState = useAppSelector((state) => state.catalogueInspector);
  //reducer para modificar el estado del usuario
  const listInspectoEditState = useAppSelector((state) => state.getInspectorEdit)

  const [loading, setLoading] = useState(true);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [selectedInspector, setSelectedInspector] = useState<CatalogueEntityInspector | null>(null);

  const [dataTableData, setDataTableData] = useState({
    columns: [
      { Header: "Inspector Nombre", accessor: "inspectorNombre", width: "35%" },
      { Header: "Estado Usuario", accessor: "inspectorEstado", width: "15%" },
      { Header: "Nombre de Usuario", accessor: "username", width: "35%"},
      { Header: "Acciones", accessor: "actions", width: "15%" },
    ],
    rows: [],
  });

  useEffect(() => {
    if (listInspectorState.data === null) {
      dispatch(getInspectors());
    } else if (listInspectorState.error) {
      console.log(listInspectorState.error);
    } else {
      buildDataTable(listInspectorState.data);
      console.log(listInspectorState.data);
    }
  }, [listInspectorState.data]);

  useEffect(() => {
    if (listInspectoEditState.error){
      showAlertAsync({
        title: 'Error', 
        icon: 'error', 
        html: listInspectoEditState.error,
      });
      dispatch(getInspectorsEditSlice.actions.resetState());
    } else if (listInspectoEditState.data) {
      showAlertAsync({
        title: 'Éxito', 
        icon: 'success', 
        html: 'Registro Modificado con éxito',
      });
      dispatch(getInspectorsEditSlice.actions.resetState());
      dispatch(getInspectors());
    }
  }, [listInspectoEditState]);


  const buildDataTable = (data: CatalogueEntityInspector[]) => {
    const columns = dataTableData.columns;
    console.log(data);

    const rows = [];

    for (const inspector of data) {
      rows.push({
        inspectorNombre: inspector.label, // Assuming 'nombre' is the name property
        inspectorEstado: inspector.active ? "activo" : "No activo",
        username: inspector.username,
        actions: (
          <SoftBox display="flex">
            { inspector.active && (
              <SoftButton color="error" onClick={() => handleActive(inspector.username)}>
              Inactivar Usuario
            </SoftButton>
            )}
            {inspector.active === false && (
              <SoftButton color="success" onClick={() => handleActive(inspector.username)}>
              Activar Usuario
            </SoftButton>
            )}
            
          </SoftBox>
        ),
      });
    }

    // const rows = data.map(inspector => ({
    //   inspectorNombre: inspector.label, // Assuming 'nombre' is the name property
    //   inspectorEstado: inspector.active ? "activo": "No activo",
    //   actions: (
    //     <SoftBox display="flex">
    //       <EditIcon onClick={() => handleEdit(inspector)} />
    //       <DeleteIcon onClick={() => handleDelete(inspector.value)} />
    //     </SoftBox>
    //   ),
    // }));

    console.log("resut: ", rows);

    //setDataTableData((prevState) => ({ ...prevState, rows }));
    setDataTableData({columns, rows});
    setLoading(false);
  };

  const handleEdit = (inspector: CatalogueEntityInspector) => {
    setSelectedInspector(inspector);
    setOpenModalEdit(true);
  };

  


  const handleActive = (user: string) => {
    showAlertAsync({
      title: 'Advertencia',
      icon: 'warning',
      html: '¿Estas seguro que quieres realizar esta accion?',
      showCancelButton: true,
      confirmButtonText: 'Sí, seguro',
      cancelButtonText: 'Cancelar',
      onConfirm: () => changueStatus(user)
      });
    }

    const changueStatus = (user: string) => {
      dispatch(getInspectorsEdit(user));
    }



  const handleDelete = (inspectorId: string) => {
    // Placeholder for delete functionality, will be implemented once the endpoint is available
    console.log(`Delete inspector with ID: ${inspectorId}`);
  };

  const handleClick = () => {
    navigate("/app/administrar-cuentas/crear-cuenta");
  };

  const hideModalEdit = () => {
    setOpenModalEdit(false);
    setSelectedInspector(null);
  };

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
                {/* Form fields for editing inspector details */}
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
      </SoftBox>
    );
  };

  return (
    <>
      {buildModalEdit()}
      <SoftBox display="flex" justifyContent="flex-end" mb={2}>
        <SoftButton color="primary" onClick={handleClick}>
          Crear Usuario
        </SoftButton>
      </SoftBox>
      <SoftBox mb={3}>
        {loading ? (
          <SoftBox
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ height: "calc(100vh - 154px)" }}
          >
            <CircularProgress />
          </SoftBox>
        ) : listInspectorState.error ? (
          <SoftBox
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ height: "calc(100vh - 154px)" }}
          >
            <SoftTypography component="label">
              {listInspectorState.error ?? "Error desconocido"}
            </SoftTypography>
          </SoftBox>
        ) : (
          <SoftBox my={1} sx={{ minHeight: "calc(100vh - 260px)" }}>
            <Card>
              <DataTable table={dataTableData} canSearch />
            </Card>
          </SoftBox>
        )}
      </SoftBox>
    </>
  );
}
