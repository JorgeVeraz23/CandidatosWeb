import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from "app/redux/hooks";
import { InspectionFormEntity } from "app/api/domain/entities/InspectionFormEntity";
import { Box, Card, CircularProgress, Fab, Grid, Modal, Tooltip } from "@mui/material";
import ArticleIcon from '@mui/icons-material/Article';
import PhotoIcon from '@mui/icons-material/Photo';
import DeleteIcon from '@mui/icons-material/Delete';
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DataTable from "examples/Tables/DataTable";
import { GETEXCEL_REPORT } from "app/api/urls/urls";
import { showAlertAsync } from "layouts/pages/sweet-alerts/components/CustomAlert";
import { deleteInspectionFormSlice } from "app/redux/slices/InspectionForm/DeleteInspectionFormSlice";
import { getAllInspectionForm, deleteInspectionForm } from 'app/redux/actions/InspectionFormActions';
import { InspectionFormProps } from "app/api/domain/repositories/InspectionFormRepository";
import CustomInput from "components/CustomInput";
import { getTodayDateStr } from "app/utils/utils";
import FormSelect from "components/FormularioSelect";


//Progress Bar
import ProgressBar from 'react-progress-bar-plus';
import 'react-progress-bar-plus/lib/progress-bar.css';
import DownloadIcon from '@mui/icons-material/Download';
import CustomButton from "components/CustomButton";

export default function InspectionForms() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tableRef = useRef(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedFormulario, setSelectedFormulario] = useState<string | number> ("");
  const [selectedFormularioForViewInsp, setSelectedFormularioForViewInsp] = useState<number> ();
  const [downloadProgress, setDownloadProgress] = useState(false);
  const [selectedFormularioName, setSelectedFormularioName] = useState<string>("Selecciona un formulario");
  const getAllInspectionFormState = useAppSelector(state => state.getAllInspectionForm);
  const deleteInspectionFormState = useAppSelector(state => state.deleteInspectionForm);
  const [downloadingExcel, setDownloadingExcel] = useState(false);
  const [selectedForm, setSelectedForm] = useState<string | null>(null);
  const [isButtonVisible, setIsButtonVisible] = useState(true); // O cualquier valor booleano inicial que desees


  const rol = localStorage.getItem('Rol');
    const [isRol, setIsRol] = useState('');
  const [filterData, setFilterData] = useState<InspectionFormProps>({
    FromDate: getTodayDateStr(-5),
    ToDate: getTodayDateStr(),
    IdInspectionForm: 0
  });

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const init = async () => {
    await setIsRol(rol)
    
    }
    
  
  useEffect(() => {
    init();
    
  }, []);


 

  

  const [dataTableData, setDataTableData] = useState({
    columns: [
      { Header: "Fecha generación", accessor: "generationDate", width: "20%" },
      { Header: "Código orden", accessor: "codeOrder", width: "22%" },
      { Header: "Cliente", accessor: "client", width: "22%" },
      { Header: "Tipo inspección", accessor: "inspectionType", width: "22%" },
      { Header: "Inspector", accessor: "inspector", width: "25%" },
      { Header: "Etapa", accessor: "stage", width: "25%" },
      { Header: "Acciones", accessor: "actions", width: "25%" },
    ],
    rows: [],
  });


  

  console.log("xd",isRol)

  useEffect(() => {
    if (getAllInspectionFormState.data === null) {
      dispatch(getAllInspectionForm(filterData));
    } else {
      setFilterData({
        FromDate: getAllInspectionFormState.data.startDate,
        ToDate: getAllInspectionFormState.data.endDate,
        IdInspectionForm: getAllInspectionFormState.data.IdInspectionForm
      });
      buildDataTable(getAllInspectionFormState.data);
    }
  }, [getAllInspectionFormState.data]);

  useEffect(() => {
    if (deleteInspectionFormState.error) {
      showAlertAsync({
        title: 'Error',
        icon: 'error',
        html: deleteInspectionFormState.error,
      });
      dispatch(deleteInspectionFormSlice.actions.resetState());
    } else if (deleteInspectionFormState.data) {
      showAlertAsync({
        title: 'Éxito',
        icon: 'success',
        html: 'Registro eliminado con éxito',
      });
      dispatch(deleteInspectionFormSlice.actions.resetState());
      dispatch(getAllInspectionForm());
    }
  }, [deleteInspectionFormState]);

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
    console.log(id);
  }

 

  const deleteRegister = (id: number) => {
    dispatch(deleteInspectionForm(id));
  }
  const handleSelectFormChange = (option: { value: string, label: string }) => {
    setSelectedForm(option.value);
  };

  const handleDownloadExcel = async() => {
    setDownloadProgress(true);
    setDownloadingExcel(true);
      if (!filterData.FromDate || !filterData.ToDate || !selectedFormulario) {
        showAlertAsync({
          title: 'Error', 
          icon: 'error', 
          html: 'Todos los campos son obligatorios',
        });
        return;
      }
    try{
      const url = GETEXCEL_REPORT(filterData.FromDate, filterData.ToDate, selectedFormulario);
      console.log("URL de la petición:", url); // Agregar esta línea para verificar la URL
      const response = await fetch(url);
      if(!response.ok){
        throw new Error('No se pudo descargar el Excel')
      }
      //Obtener el tamaño del archivo para el calculo del progreso
      const contentLength = response.headers.get('content-length');
      const total = contentLength ? parseInt(contentLength, 10) : null;
      let loaded = 0;
      const reader = response.body?.getReader();
      if(!reader){
        throw new Error('No se pudo leer el cuerpo de la respuesta')
      }
      const chunks : Uint8Array[] = [];
      while(true){
        const {done, value} = await reader.read();
        if(done){
          break;
        }
        if(value){
          chunks.push(value);
          loaded += value.length;
          //calcular el porcentaje de progreso y actualizar el estado
          console.log(Math.floor((loaded / total) * 100));
          var progress = Math.floor(Math.floor((loaded / total) * 100));
          console.log(progress)
        }
      }
       // Crear un Blob a partir de los datos recibidos
       const blob = new Blob(chunks)
       // Crear un objeto URL del Blob;
       const blobUrl = URL.createObjectURL(blob);
       // Crear un enlace temporal y descargar el archivo
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'formulario.xlsx'); 
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      // Desactiva el indicador de carga después de la descarga
      setDownloadingExcel(false);
      setDownloadProgress(false);
    }catch(error){
      showAlertAsync({
        title: 'Error', 
        icon: 'error', 
        html: 'No existe Formulario para ese rango de fecha ',
      });
      console.error('Error al descargar el PDF:', error);
      setDownloadingExcel(false);
      setDownloadProgress(false);
    }
  };

  console.log(downloadProgress);


  const buildDataTable = (data: InspectionFormEntity) => {
    const columns = dataTableData.columns;
    const rows = [];
    
    for (const item of data.registers) {
      rows.push({
        generationDate: item.generationDate,
        codeOrder: item.codeOrder,
        client: item.clientName,
        inspectionType: item.inspectionType,
        inspector: item.inspector,
        stage: item.stage,
        actions: 
        <SoftBox display="flex">
        {/* Envuelve el SoftButton con Tooltip */}
        
                 <SoftBox mr={1}>
                 <Tooltip title="Ver Detalle" arrow>
                     <SoftButton
                         variant="contained"
                         color="secondary"
                         size="small"
                         margin="0 2px"
                         iconOnly
                         onClick={() => redirectFormDetails(item.idRegistrationFormInspection)}
                     >
                         <ArticleIcon />
                     </SoftButton>
                 </Tooltip>
                 </SoftBox>
                 <SoftBox mr={1}>
                 <Tooltip title="Ver Imagenes" arrow>
                     <SoftButton
                         variant="contained"
                         color="info"
                         size="small"
                         margin="0 2px"
                         iconOnly
                         onClick={() => redirectImagesView(item.idRegistrationFormInspection)}
                     >
                         <PhotoIcon />
                     </SoftButton>
                 </Tooltip>
                 </SoftBox>
                 <SoftBox >
        <Tooltip title="Eliminar" arrow>
                     <SoftButton
                         
                         variant="contained"
                         color="error"
                         size="small"
                         iconOnly
                        //  sx={{ display: isButtonVisible ? 'inline-block' : 'none' }}
                        sx={{ display: rol === 'Inspector' ? 'none' : 'inline-block' }} // Condición de visibilidad
                         onClick={() => confirmDelete(item.idRegistrationFormInspection)}
                     >
                         <DeleteIcon />
                     </SoftButton>
                 </Tooltip>
                 </SoftBox>
     </SoftBox> 
      });
    }
    setDataTableData({ columns, rows });
  }

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>, field: keyof InspectionFormProps) => {
    setFilterData((prevData) => ({
      ...prevData,
      [field]: event.target.value
    }));
  };
  const handleSelectChange = (option: { value: string, label: string }) => {
    setSelectedFormulario(option.value);
    setSelectedFormularioName(option.label);

    //Incluye el ID del formulario seleccionado en filterData
    setFilterData(prevData => ({
      ...prevData,
      IdInspectionForm: parseInt(option.value) 
    }));
  };
 


  const filter = () => {
    console.log(filterData.FromDate, filterData.ToDate, filterData.IdInspectionForm );
    if (filterData.FromDate === "" || filterData.ToDate === "" || filterData.IdInspectionForm <=0) {
      showAlertAsync({
        title: 'Error',
        icon: 'error',
        html: "Hay valores vacíos o inválidos.",
      });
      return;
    }
    
    dispatch(getAllInspectionForm(filterData));
     // Limpiar los campos de filtro después del filtrado
     setFilterData({
      FromDate: '',
      ToDate: '',
      IdInspectionForm: undefined,
    });
  }
  

  const redirectImagesView = (id: number) => {
    navigate(`/app/inspecciones-realizadas/imagenes`, { state: { id: id } });
  }

  const redirectFormDetails = (id: number) => {
    navigate(`/app/inspecciones-realizadas/respuestas`, { state: { id: id } });
  }

  return (
    <>
    {downloadProgress && <ProgressBar percent={downloadProgress} autoIncrement intervalTime={50} />}
      <SoftBox py={1} display="flex" justifyContent="space-between">
        <SoftBox>
        <Grid container spacing={1}>
  <Grid item xs={12} md={5}>
    <SoftBox>
      <SoftBox ml={0.5} lineHeight={0} display="inline-block" mb={1}>
        <SoftTypography component="label" variant="caption" fontWeight="bold">
          Fecha desde
        </SoftTypography>
      </SoftBox>
      <CustomInput
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleFilterChange(event, 'FromDate')}
        type="date"
        value={filterData.FromDate}
      />
    </SoftBox>
  </Grid>
  <Grid item xs={12} md={5}>
    <SoftBox>
      <SoftBox ml={0.5} lineHeight={0} display="inline-block" mb={1}>
        <SoftTypography component="label" variant="caption" fontWeight="bold">
          Fecha hasta
        </SoftTypography>
      </SoftBox>
      <CustomInput
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleFilterChange(event, 'ToDate')}
        type="date"
        value={filterData.ToDate}
      />
    </SoftBox>
  </Grid>
  <Grid item xs={12} md={5}>
    <SoftBox>
      <SoftBox ml={0.5} lineHeight={0} display="inline-block" mb={1}>
        <SoftTypography component="label" variant="caption" fontWeight="bold">
          Formulario de Inspeccion
        </SoftTypography>
      </SoftBox>
      <FormSelect
        placeholder={selectedFormularioName}
        isRequired={true}
        value={{ value: selectedFormulario, label: selectedFormularioName }}
        onChange={handleSelectChange}
      />
    </SoftBox>
  </Grid>
  <Grid item xs={12} md={2}>
    <SoftBox mt={4} style={{ textAlign: 'right' }}>
      <SoftButton
        onClick={() => getAllInspectionFormState.loading ? null : filter()}
        color="primary"
      >
        Filtrar
      </SoftButton>
    </SoftBox>
  </Grid>
</Grid>


        </SoftBox>
        <SoftBox>
        <Modal
  open={openModal}
  onClose={handleCloseModal}
  aria-labelledby="modal-title"
  aria-describedby="modal-description"
>
  <Box
    sx={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      bgcolor: 'background.paper',
      boxShadow: 24,
      p: 4,
      minWidth: 400,
      maxWidth: 600,
      borderRadius: 8,
    }}
  >
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <SoftTypography variant="h5" component="h2" color="primary" mb={2}>
          Reportes descargables
        </SoftTypography>
        <SoftTypography variant="body1" color="text.secondary" mb={2}>
          Por favor seleccione el formulario de reportes a descargar
        </SoftTypography>
        <FormSelect
          placeholder={selectedFormularioName}
          isRequired={true}
          value={{ value: selectedFormulario, label: selectedFormularioName }}
          onChange={handleSelectChange}
          
        />
      </Grid>
      <Grid item container justifyContent="space-between">
        <Grid item>
          <SoftButton onClick={handleCloseModal} color="secondary">
            Cerrar
          </SoftButton>
        </Grid>
        <Grid item>
          {/* <SoftButton onClick={handleDownloadExcel} color="primary" isDassdaasisabled={downloadingExcel}>
            Descargar Excel
          </SoftButton> */}
          <Fab
                  onClick={handleDownloadExcel}
                  variant="extended"
                  size="small"
                  color="success"
                  aria-label="pdf"
                  disabled={downloadingExcel} // Deshabilita el botón mientras se está descargando
                >
                  <DownloadIcon fontSize="medium" />
                  <SoftTypography fontSize={14} color="white" sx={{ margin: '2px 4px 0 0' }}>
                    Excel
                  </SoftTypography>
                </Fab>
        </Grid>
      </Grid>
    </Grid>
  </Box>
</Modal>
  <SoftButton onClick={handleOpenModal} color="primary">
    Descargar Formulario
  </SoftButton>
</SoftBox>


      </SoftBox>

      {getAllInspectionFormState.loading
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
        : getAllInspectionFormState.error
          ? (
            <SoftBox
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{ height: 'calc(100vh - 154px)' }}
            >
              <SoftTypography component="label">
                {getAllInspectionFormState.error ?? "Error desconocido"}
              </SoftTypography>
            </SoftBox>
          )
          : (
            <SoftBox my={1} sx={{ minHeight: 'calc(100vh - 260px)' }} >
              <Card>
                <DataTable myCustomRef={tableRef} table={dataTableData} canSearch />
              </Card>
            </SoftBox>
          )
      }
    </>
  );
}
