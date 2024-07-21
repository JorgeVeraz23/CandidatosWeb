import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppSelector } from "app/redux/hooks";

// @mui material components
import {
  Grid, Card, CircularProgress, CardHeader,
  CardContent, Dialog,
  DialogTitle, DialogActions, DialogContent, CardMedia
} from "@mui/material";

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard PRO React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// My Components
import { showAlertAsync } from "layouts/pages/sweet-alerts/components/CustomAlert";
import ImageCard from "./components/ImageCard";
import CustomInput from "components/CustomInput";
import QuestionOfInspectionSelect from "components/QuestionOfInspectionSelect";

// Slices
import { deleteimageInspectionSlice } from 'app/redux/slices/InspectionForm/DeleteImageInspectionSlice';
import { uploadImageInspectionSlice } from 'app/redux/slices/InspectionForm/UploadImageInspectionSlice';
import { getImagesFormSlice } from 'app/redux/slices/InspectionForm/GetImagesInspectionSlice';

// Actions
import {
  deleteImageInspection,
  getImagesInspection,
  uploadImageInspection
} from 'app/redux/actions/InspectionFormActions';
import { delay } from "app/utils/utils";

export default function ImagesForm() {
  const location = useLocation();
  const { state } = location;
  const id = state?.id;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getImagesInspectionState = useAppSelector(state => state.getImagesInspection);
  const deleteImageInspectionState = useAppSelector(state => state.deleteImageInspection);
  const uploadImageInspectionState = useAppSelector(state => state.uploadImageInspection);

  const [selectedFile, setSelectedFile] = useState(null);
  const [questionSelected, setQuestionSelected] = useState<{ value: string, label: string }>({
    value: '',
    label: '',
  });

  const [openModaImage, setOpenModaImage] = useState<boolean>(false);
  const rol = localStorage.getItem('Rol');
  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    if (deleteImageInspectionState.error) {
      showAlertAsync({
        title: 'Error',
        icon: 'error',
        html: deleteImageInspectionState.error,
      });
      dispatch(deleteimageInspectionSlice.actions.resetState());
    } else if (deleteImageInspectionState.data) {
      showAlertAsync({
        title: 'Éxito',
        icon: 'success',
        html: 'Los cambios se guardaron correctamente.',
      });
      dispatch(deleteimageInspectionSlice.actions.resetState());
      dispatch(getImagesFormSlice.actions.resetState())
      dispatch(getImagesInspection(id));
    }
  }, [deleteImageInspectionState.data]);

  useEffect(() => {
    if (uploadImageInspectionState.error) {
      showAlertAsync({
        title: 'Error',
        icon: 'error',
        html: uploadImageInspectionState.error,
      });
      dispatch(uploadImageInspectionSlice.actions.resetState());
    } else if (uploadImageInspectionState.data) {
      showAlertAsync({
        title: 'Éxito',
        icon: 'success',
        html: 'Los cambios se guardaron correctamente.',
      });
      dispatch(uploadImageInspectionSlice.actions.resetState());
      dispatch(getImagesFormSlice.actions.resetState())
      dispatch(getImagesInspection(id));
    }
  }, [uploadImageInspectionState.data]);

  const init = async () => {
    await resetImages();
    await getImages();
  }

  const resetImages = async () => {
    dispatch(getImagesFormSlice.actions.resetState());
  }

  const getImages = async () => {
    dispatch(getImagesInspection(id));
  }

  const handleBackButtonClick = () => {
    navigate('/app/inspecciones-realizadas/ingresos');
  }

  const handleQuestionChange = (option: { value: string, label: string }) => {
    setQuestionSelected(option);
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleOpenModalImage = (id: number) => {
    setOpenModaImage(true);
  }

  const hanldeCloseModalImage = () => {
    setOpenModaImage(false);
    setSelectedFile(null);
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
    const element = getImagesInspectionState.data.find(
      (item) => item.idRegistrationFormFile === id
    );

    if (element) {
      dispatch(deleteImageInspection(element));
    }
  }

  const uploadImage = () => {
    if (selectedFile == null || id == null || questionSelected.value == '') {
      showAlertAsync({
        title: 'Error',
        icon: 'error',
        html: "Hay campos vacíos o inválidos",
      });
      return;
    }
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('idRegistrationFormInspection', id);
    formData.append('idQuestionForm', questionSelected.value)
    dispatch(uploadImageInspection(formData));
  };

  const renderModalImage = () => {
    return (
      <SoftBox>
        <Dialog
          fullWidth
          maxWidth="sm"
          open={openModaImage}
          onClose={hanldeCloseModalImage}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Subir imágenes"}</DialogTitle>
          <DialogContent>
            <Grid container spacing={3} mb={2}>
              <Grid item xs={12}>
                <SoftBox display="flex" flexDirection="column" height="100%">
                  <SoftBox ml={0.5} lineHeight={0} display="inline-block" mb={1}>
                    <SoftTypography component="label" variant="caption" fontWeight="bold">
                      Seleccionar una pregunta
                    </SoftTypography>
                  </SoftBox>
                  <QuestionOfInspectionSelect
                    onChange={(option: { value: string, label: string }) => handleQuestionChange(option)}
                    value={questionSelected}
                    idRegistrationInspection={id}
                    typeText="imagenesgaleria"
                  />
                </SoftBox>
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <SoftBox display="flex" flexDirection="column" height="100%">
                  <SoftBox ml={0.5} lineHeight={0} display="inline-block" mb={1}>
                    <SoftTypography component="label" variant="caption" fontWeight="bold">
                      Elige una imagen
                    </SoftTypography>
                  </SoftBox>
                  <CustomInput
                    onChange={handleFileChange}
                    type="file"
                    accept="image/png, image/jpg, image/jpeg"
                  />
                </SoftBox>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <SoftButton
              onClick={() => hanldeCloseModalImage()}
              color="secondary"
            >
              Cancelar
            </SoftButton>
            <SoftButton
              onClick={uploadImageInspectionState.loading ? null : uploadImage}
              color="primary"
              isDisabled={true}
            >
              Guardar
            </SoftButton>
          </DialogActions>
        </Dialog>
      </SoftBox>
    );
  }

  const renderImages = () => {
    return (
      <Grid
        container
        spacing={2}
        sx={{ padding: '16px' }}
      >
        {getImagesInspectionState.data.map((item, index) => {
          return (
            <Grid key={index} item xs={6} sm={6} md={3}>
              {/* Condición para mostrar el botón de eliminar */}
            {rol !== 'Inspector' && (
              <ImageCard
                onPressedDelete={() => confirmDelete(item.idRegistrationFormFile)}
                url={item.urlAccess}
              />
            )}
            {/* Condición para mostrar la imagen */}
            {rol === 'Inspector' && (
               <Card>
               <CardMedia
                 component="img"
                 height="200"
                 image={item.urlAccess}
                 alt="Uploaded Image"
               />
             </Card>
            )}
            </Grid>
          )
        })}
      </Grid>
    );
  }

  return (
   

    <>
     {rol !== 'Inspector' && ( // Condición para verificar el rol
      <>
      {renderModalImage()}
      <SoftBox py={1} display="flex" justifyContent="space-between">
        <SoftButton onClick={handleBackButtonClick} color="dark">
          <ArrowBackIosIcon /> Volver
        </SoftButton>
        <SoftButton onClick={handleOpenModalImage} color="info">
          <CloudUploadIcon sx={{ mr: 1 }} /> Subir imágenes
        </SoftButton>
      </SoftBox>
      </>
      )}

      {getImagesInspectionState.loading
        ? (
          <SoftBox
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ height: 'calc(100vh - 212px)' }}
          >
            <CircularProgress />
          </SoftBox>
        )
        : getImagesInspectionState.data
          ? (
            <SoftBox sx={{ minHeight: 'calc(100vh - 212px)' }}>
              <Grid container display="flex" justifyContent="center">
                <Grid item xs={12}>
                  <Card sx={{ overflow: "visible", paddingBottom: '20px' }}>
                    <CardHeader
                      title="Imágenes del formulario"
                    />
                    <CardContent sx={{ padding: '0 16px' }}>
                      {renderImages()}
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </SoftBox>
          )
          : (
            <SoftBox
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{ height: 'calc(100vh - 212px)' }}
            >
              <SoftTypography component="label">
                {getImagesInspectionState.error ?? "Error desconocido"}
              </SoftTypography>
            </SoftBox>
          )
      }

    </>
  );
}