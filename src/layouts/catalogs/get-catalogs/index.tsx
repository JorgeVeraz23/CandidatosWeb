import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "app/redux/hooks";
import { useNavigate } from 'react-router-dom';
import { 
    getAllCatalogQuestion , 
    createCatalogQuestion , 
    deleteCatalogQuestion ,
} from 'app/redux/actions/CatalogQuestionActions/CatalogQuestionActions';
import { createCatalogQuestionItemSlice } from 'app/redux/slices/CatalogQuestionItem/CreateCatalogQuestionItemSlice';
import { CreateCatalogQuestionEntity,  EditCatalogQuestionEntity, ShowCatalogQuestionEntity} from "app/api/domain/entities/CatalogQuestionEntities/CatalogQuestionEntity";
import { createCatalogQuestionItem, getCatalogQuestionItemById, getDetailCatalogQuestionItemById } from "app/redux/actions/CatalogQuestionItemActions/CatalogQuestionItemActions";
import { deleteCatalogQuestionSlice } from "app/redux/slices/catalogQuestion/DeleteCatalogueQuestionSlice";
import { getDetailCatalogQuestionById } from "app/redux/actions/DetailCatalogQuestionActions/DetailCatalogQuestionActions";
import { CatalogItem,  CreateDetailCatalogQuestionEntity, EditDetailCatalogQuestionEntity, ShowDetailCatalogQuestionEntity } from "app/api/domain/entities/DetailCatalogQuestion/DetailCatalogQuestionEntity";
import { CreateCatalogQuestionItemEntity, EditCatalogQuestionItemEntity, ShowCatalogQuestionItemEntity } from "app/api/domain/entities/CatalogQuestionItemEntity/CatalogQuestionItemEntity";
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
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddBoxIcon from '@mui/icons-material/AddBox';


// Pages components
import { showAlertAsync } from "layouts/pages/sweet-alerts/components/CustomAlert";
import SoftInput from "components/SoftInput";

import ClientSelect from "components/ClientSelect";
import { Box, CircularProgress, Icon, Modal } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import Basket from "examples/Icons/Basket";



export default function ShowCatalogs() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const listCatalogState = useAppSelector(state => state.getAllCatalogQuestion);
  const deleteCatalogState = useAppSelector(state => state.deleteCatalogQuestion);
  const getDetailCatalogState = useAppSelector(state => state.getDetailCatalogQuestion);
  const createItemCatalogueState = useAppSelector(state => state.createCatalogQuestionItem)
  const [loading, setLoading] = useState(true); // Estado de carga

  const [selectedValue, setSelectedValue] = useState<{} | null>(null);

  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [selectedCatalog, setSelectedCatalog] = useState<ShowDetailCatalogQuestionEntity | null>(null);

  const [editClientData, setEditClientData] = useState<EditCatalogQuestionEntity>({
    idCatalogQuestion: 0,
    catalogName: '',
  });

  const [dynamicComponent, setDynamicComponent] = useState(buildText());
    const [createCatalogQuetionItemData, setCreateCatalogQuestinItemData] = useState<CreateCatalogQuestionItemEntity>({
      idCatalogQuestion: 0,
      itemName: '',
      description: '',
      order: 0,
});
 


  const [dataTableData, setDataTableData] = useState({
    columns: [
      
      { Header: "Catalogo", accessor: "catalogName", width: "85%" }, // Ancho ajustado
      { Header: "Acciones", accessor: "actions", width: "15%" }, // Ancho ajustado
    ],
    rows: [],
  });

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
      <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
      >
          <CircularProgress size={20} style={{ color: 'white' }}/>
      </Box>
  );
}

useEffect(() => {
  if(createItemCatalogueState.loading){
      setDynamicComponent(buildLoading);
  } else if(createItemCatalogueState.error) {
      setDynamicComponent(buildText);
      showAlertAsync({
          title: 'Error', 
          icon: 'error', 
          html: createItemCatalogueState.error,
      });
      dispatch(createCatalogQuestionItemSlice.actions.resetState());
  } else if(createItemCatalogueState.data) {
      setDynamicComponent(buildText);
      showAlertAsync({
          title: 'Éxito', 
          icon: 'success', 
          html: 'Creación exitosa',
      });
      dispatch(createCatalogQuestionItemSlice.actions.resetState());
      //dispatch(getAllClientes());
  }
}, [createItemCatalogueState]);


  
  const handleCloseModal = () => {
    setSelectedCatalog(null);
  };
  
  useEffect(() => {
    if (listCatalogState.data === null) {
      dispatch(getAllCatalogQuestion());
    } else {
      buildDataTable(listCatalogState.data);
    }
  }, [listCatalogState.data]);



  useEffect(() => {
    if (deleteCatalogState.error){
      showAlertAsync({
        title: 'Error', 
        icon: 'error', 
        html: deleteCatalogState.error,
      });
      dispatch(deleteCatalogQuestionSlice.actions.resetState());
    } else if (deleteCatalogState.data) {
      showAlertAsync({
        title: 'Éxito', 
        icon: 'success', 
        html: 'Registro eliminado con éxito',
      });
      dispatch(deleteCatalogQuestionSlice.actions.resetState());
      dispatch(getAllCatalogQuestion());
    }
  }, [deleteCatalogState]);

  const handleClick = () => {
    navigate('/app/catalogos/crear-selectores');
  }

  const handleAddItem = async (id : number) => {
  try {

  }catch(error){
    console.log("Error al agregar los detalles", error)
  }
  }


  
  const handleViewDetail = async (id: number) => {
    try {

      // Dispatch de la acción para obtener los detalles del catálogo por su ID
      const actionResult = await dispatch(getDetailCatalogQuestionById(id));
      
      // Verifica si la acción fue exitosa y establece los detalles del catálogo seleccionado
      if (getDetailCatalogQuestionById.fulfilled.match(actionResult)) {
        setSelectedCatalog(actionResult.payload);
        navigate(`/app/catalogos/crear-selectores-items`, { state: { id: id } });
      } else {
        // Manejar el caso en que la acción haya fallado
        // Puedes mostrar una alerta o un mensaje de error
        console.error('Error al obtener los detalles del catálogo');
      }
    } catch (error) {
      // Manejar errores generales
      console.error('Error al obtener los detalles del catálogo:', error);
    }
  };


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
    console.log("ID a eliminar:", id); // Agregar console.log para verificar el ID que se está intentando eliminar
    dispatch(deleteCatalogQuestion(id));
  }
  

  const buildDataTable = (data: ShowCatalogQuestionEntity[]) => {
    const columns = dataTableData.columns;
    const rows = [];

    for (const item of data) {
      rows.push({
        idCatalogQuestion: item.idCatalogQuestion,
        catalogName:  item.catalogName,
      actions: <SoftBox display="flex">
           {/* Envuelve el SoftButton con Tooltip */}
           <SoftBox mr={1}>
           <Tooltip title="Eliminar" arrow>
                        <SoftButton
                            variant="contained"
                            color="error"
                            size="small"
                            iconOnly
                            onClick={() => confirmDelete(item.idCatalogQuestion)}
                        >
                            <DeleteIcon />
                        </SoftButton>
                    </Tooltip>
                    </SoftBox>
                    <SoftBox >
                    <Tooltip title="Ver Detalle" arrow>
                        <SoftButton
                            variant="contained"
                            color="primary"
                            size="small"
                            margin="0 2px"
                            iconOnly
                            onClick={() => handleViewDetail(item.idCatalogQuestion)}
                        >
                            <VisibilityIcon />
                        </SoftButton>
                    </Tooltip>
                    </SoftBox>
        </SoftBox> 
      });
    }

    setDataTableData({columns, rows});
  }


  return (
    <>    
      <SoftBox mb={3}>
        <SoftBox display="flex" justifyContent="flex-end" mb={2}>
          <SoftButton color="primary" onClick={handleClick}>
            Agregar Catalogos
          </SoftButton>
        </SoftBox>
        {listCatalogState.loading
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
  : listCatalogState.error
    ? (
      <SoftBox
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ height: 'calc(100vh - 154px)' }}
      >
        <SoftTypography component="label">
          {listCatalogState.error ?? "Error desconocido"}
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
