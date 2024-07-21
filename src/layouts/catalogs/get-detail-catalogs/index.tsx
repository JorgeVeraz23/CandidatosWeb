import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "app/redux/hooks";
import { useLocation, useNavigate } from "react-router-dom";

import { createCatalogQuestionItemSlice } from "app/redux/slices/CatalogQuestionItem/CreateCatalogQuestionItemSlice";
import {
  createCatalogQuestionItem,
  getCatalogQuestionItemById,
  getDetailCatalogQuestionItemById,
  deleteCatalogQuestionItem,
} from "app/redux/actions/CatalogQuestionItemActions/CatalogQuestionItemActions";
import { getDetailCatalogQuestionById } from "app/redux/actions/DetailCatalogQuestionActions/DetailCatalogQuestionActions";
import {
  CatalogItem,
  CreateDetailCatalogQuestionEntity,
  EditDetailCatalogQuestionEntity,
  ShowDetailCatalogQuestionEntity,
} from "app/api/domain/entities/DetailCatalogQuestion/DetailCatalogQuestionEntity";
import {
  CreateCatalogQuestionItemEntity,
  EditCatalogQuestionItemEntity,
  ShowCatalogQuestionItemEntity,
} from "app/api/domain/entities/CatalogQuestionItemEntity/CatalogQuestionItemEntity";
// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import Select from "react-select";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard PRO React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import CustomButton from "components/CustomButton";


// Pages components
import { showAlertAsync } from "layouts/pages/sweet-alerts/components/CustomAlert";
import SoftInput from "components/SoftInput";
import { Modal, Typography, TextField, Button, Box, IconButton, Tooltip } from "@mui/material";
import { CircularProgress } from "@mui/material";
import { getDetailCatalogQuestionItemByIdSlice } from "app/redux/slices/CatalogQuestionItem/GetDetailCatalogQuestionItemByIdSlice";
import { deleteCatalogQuestionItemSlice } from "app/redux/slices/CatalogQuestionItem/DeleteCatalogQuestionItemSlice";
export default function ShowCatalogsItems() {
  const location = useLocation();
  const { state } = location;
  const id = state?.id;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const listCatalogState = useAppSelector((state) => state.getAllCatalogQuestion);
  const deleteCatalogQuestionItemState = useAppSelector((state) => state.deleteCatalogQuestionItem);
  const getDetailCatalogState = useAppSelector((state) => state.getDetailCatalogQuestion);
  const createItemCatalogueState = useAppSelector((state) => state.createCatalogQuestionItem);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  const [selectedCatalog, setSelectedCatalog] = useState<ShowDetailCatalogQuestionEntity | null>(
    null
  );

  const [dynamicComponent, setDynamicComponent] = useState(buildText());
 
  const [newItemData, setNewItemData] = useState({
    idCatalogQuestion: 0, // Valor inicial por defecto
    itemName: "",
    description: "",
    order: 0,
  });

  const [dataTableData, setDataTableData] = useState({
    columns: [
      // { Header: "ID", accessor: "idCatalogQuestion", width: "30%" }, // Ancho ajustado
      { Header: "Nombre de item", accessor: "itemName", width: "20%" }, // Ancho ajustado
      { Header: "Descripcion", accessor: "description", width: "20%" }, // Ancho ajustado
      { Header: "Orden #", accessor: "order", width: "20%" }, // Ancho ajustado
      { Header: "Acciones", accessor: "actions", width: "10%" }, // Ancho ajustado
    ],
    rows: [],
  });

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    if (getDetailCatalogState.data) {
      console.log("con data");
      buildDataTable(getDetailCatalogState.data);
    } else {
      console.log("sin data");
    }
  }, [getDetailCatalogState.data]);

  useEffect(() => {
    if (createItemCatalogueState.loading) {
      setDynamicComponent(buildLoading);
    } else if (createItemCatalogueState.error) {
      setDynamicComponent(buildText);
      showAlertAsync({
        title: "Error",
        icon: "error",
        html: createItemCatalogueState.error,
      });
      dispatch(createCatalogQuestionItemSlice.actions.resetState());
    } else if (createItemCatalogueState.data) {
      setDynamicComponent(buildText);
      showAlertAsync({
        title: "Éxito",
        icon: "success",
        html: "Creación exitosa",
      });
      dispatch(createCatalogQuestionItemSlice.actions.resetState());
      //dispatch(getAllClientes());
    }
  }, [createItemCatalogueState]);

  useEffect(() => {
    if (createItemCatalogueState.loading) {
      setDynamicComponent(buildLoading);
    } else if (createItemCatalogueState.error) {
      setDynamicComponent(buildText);
      showAlertAsync({
        title: "Error",
        icon: "error",
        html: createItemCatalogueState.error,
      });
      dispatch(createCatalogQuestionItemSlice.actions.resetState());
    } else if (createItemCatalogueState.data) {
      setDynamicComponent(buildText);
      showAlertAsync({
        title: "Éxito",
        icon: "success",
        html: "Creación exitosa",
      });
      dispatch(createCatalogQuestionItemSlice.actions.resetState());
      dispatch(getDetailCatalogQuestionById(id));
    }
  }, [createItemCatalogueState]);

  useEffect(() => {
    if (deleteCatalogQuestionItemState.data) {
      dispatch(getDetailCatalogQuestionItemById(id));
    }
  }, [deleteCatalogQuestionItemState.data]);

  const handleCloseModal = () => {
    setOpenModal(false);
  };



  function buildText() {
    return (
      <SoftTypography
        component="label"
        variant="caption"
        fontWeight="bold"
        textTransform="uppercase"
        color="white"
      >
        Crear un nuevo Item de Catalogo de preguntas
      </SoftTypography>
    );
  }

  function buildLoading() {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress size={20} style={{ color: "white" }} />
      </Box>
    );
  }

  const init = async () => {
    await resetInitialData();
    dispatch(getDetailCatalogQuestionById(id));
  };

  const resetInitialData = async () => {
    dispatch(getDetailCatalogQuestionItemByIdSlice.actions.resetState());
  };

  useEffect(() => {
    if (deleteCatalogQuestionItemState.error) {
      showAlertAsync({
        title: "Error",
        icon: "error",
        html: deleteCatalogQuestionItemState.error,
      });
      dispatch(deleteCatalogQuestionItemSlice.actions.resetState());
    } else if (deleteCatalogQuestionItemState.data) {
      showAlertAsync({
        title: "Éxito",
        icon: "success",
        html: "Registro eliminado con éxito",
      });
      dispatch(deleteCatalogQuestionItemSlice.actions.resetState());
      dispatch(getDetailCatalogQuestionById(id));
    }
  }, [deleteCatalogQuestionItemState]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: keyof CreateCatalogQuestionItemEntity
  ) => {
    setNewItemData((prevData) => ({
      ...prevData,
      [field]: event.target.value,
    }));
  };


  const confirmDelete = (id) => {
    showAlertAsync({
      title: "Advertencia",
      icon: "warning",
      html: "¿Estás seguro que quieres eliminar este registro?",
      showCancelButton: true,
      confirmButtonText: "Sí, seguro",
      cancelButtonText: "Cancelar",
      onConfirm: () => deleteRegister(id),
    });
  };

  const deleteRegister = async (id) => {
    try {
      const actionResult = await dispatch(deleteCatalogQuestionItem(id));
      if (getDetailCatalogQuestionById.fulfilled.match(actionResult)) {
        setSelectedCatalog(actionResult.payload);
        // Aquí podrías hacer algo con los detalles del catálogo, como mostrarlos en un modal
        // o navegar a otra página para mostrar los detalles en detalle
      } else {
        // Manejar el caso en que la acción haya fallado
        // Puedes mostrar una alerta o un mensaje de error
        console.error("Error al obtener los detalles del catálogo");
      }
    } catch (error) {
      console.error("Error al eliminar el registro:", error);
      showAlertAsync({
        title: "Error",
        icon: "error",
        html: error.message,
      });
    }
  };
  const clearInputs = () => {
    setNewItemData({
      idCatalogQuestion: newItemData.idCatalogQuestion, // Valor inicial por defecto
      itemName: "",
      description: "",
      order: 0,
    });
  };

  const createRegister = () => {
    if (newItemData.itemName == "" || newItemData.description == "" || newItemData.order == 0) {
      showAlertAsync({
        title: "Error",
        icon: "error",
        html: "Todos los campos son obligatorios",
      });
      return;
    }
    dispatch(createCatalogQuestionItem(newItemData));
    clearInputs()
  };
  

  const buildDataTable = (data) => {
    const columns = dataTableData.columns;
    const rows = data.itemCatalogs.map((item) => ({
      idCatalogQuestionItem: item.idCatalogQuestionItem,
      idCatalogQuestion: item.idCatalogQuestion,
      itemName: item.itemName,
      description: item.description,
      order: item.order,
      actions: (
        
         <SoftBox mr={1}>
         <Tooltip title="Eliminar" arrow>
                      <SoftButton
                          variant="contained"
                          color="error"
                          size="small"
                          iconOnly
                          onClick={() => confirmDelete(item.idCatalogQuestionItem)}
                      >
                          <DeleteIcon />
                      </SoftButton>
                  </Tooltip>
                  </SoftBox>
                  
      ),
    }));
    setDataTableData({ columns, rows });
  };

  const showModalEdit = (id: number) => {
    setOpenModal(true);
    setNewItemData((prevData) => ({
      ...prevData,
      idCatalogQuestion: id,
    }));
  };

  return (
    <>
      <SoftBox mb={3}>
        <SoftBox display="flex" justifyContent="flex-end" mb={2}>
          <SoftButton color="primary" onClick={() => showModalEdit(id)}>
            Agregar item
          </SoftButton>
        </SoftBox>
        <Modal
  open={openModal}
  onClose={handleCloseModal}
  aria-labelledby="modal-title"
  aria-describedby="modal-description"
>
  <Box
    sx={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      bgcolor: "background.paper",
      boxShadow: 24,
      p: 4,
      minWidth: 400,
      maxWidth: 600,
      borderRadius: 8,
    }}
  >
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <SoftTypography color="primary" mb={2} variant="h4" fontWeight="bold" gutterBottom>
          Agregar ítem al catálogo de preguntas
        </SoftTypography>
        <Grid container mb={2}>
          <Grid item xs={12}>
            <SoftBox display="flex" flexDirection="column" height="100%">
              <SoftBox mb={1}>
                <SoftTypography variant="h5" fontWeight="bold" gutterBottom>
                  Nombre de ítem
                </SoftTypography>
                <SoftInput
                  type="text"
                  placeholder="Nombre de ítem"
                  label="Nombre de ítem"
                  value={newItemData.itemName}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    handleInputChange(event, "itemName")
                  }
                />
              </SoftBox>
              <SoftBox mb={1}>
                <SoftTypography variant="h5" fontWeight="bold" gutterBottom>
                  Descripción
                </SoftTypography>
                <SoftInput
                  type="text"
                  placeholder="Descripción"
                  label="Descripción"
                  value={newItemData.description}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    handleInputChange(event, "description")
                  }
                />
              </SoftBox>
              <SoftBox>
                <SoftTypography variant="h5" fontWeight="bold" gutterBottom>
                  Orden #
                </SoftTypography>
                <SoftInput
                  type="text"
                  placeholder="Orden"
                  label="Orden"
                  value={newItemData.order}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    handleInputChange(event, "order")
                  }
                />
              </SoftBox>
            </SoftBox>
          </Grid>
        </Grid>
      </Grid>
      <Grid item container justifyContent="space-between">
        <Grid item>
          <SoftButton onClick={handleCloseModal} color="secondary">
            Cerrar
          </SoftButton>
        </Grid>
        <Grid item>
          <SoftButton
            onClick={createItemCatalogueState.loading ? null : createRegister}
            color="primary"
          >
            Agregar ítem
          </SoftButton>
        </Grid>
      </Grid>
    </Grid>
  </Box>
</Modal>

        {listCatalogState.loading ? (
          <SoftBox
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ height: "calc(100vh - 154px)" }}
          >
            <CircularProgress />
          </SoftBox>
        ) : listCatalogState.error ? (
          <SoftBox
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ height: "calc(100vh - 154px)" }}
          >
            <SoftTypography component="label">
              {listCatalogState.error ?? "Error desconocido"}
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
