import { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from "app/redux/hooks";
import {
    getAllForms,
    createForm,
  } from 'app/redux/actions/FormsActions/FormsActions';
import { CreateFormEntity  } from 'app/api/domain/entities/FormEntities/FormEntity';
import { createFormSlice } from 'app/redux/slices/form/CreateFormSlice';

// @mui material components
import { Card, CardHeader, CardContent, CardActions, Grid, CircularProgress, Divider } from "@mui/material";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";

// Soft UI Dashboard PRO React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Pages components
import { showAlertAsync } from "layouts/pages/sweet-alerts/components/CustomAlert";

// My Customs Components
import CustomButton from 'components/CustomButton';

import SoftInput from "components/SoftInput";

export default function CreateForms() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const createFormState = useAppSelector(state => state.createForm);
  const [dynamicComponent, setDynamicComponent] = useState(buildText());
  const [createFormData, setCreateFormData] = useState<CreateFormEntity>({
        nameES:  '',
        nameEN:  '',
        description: '',
  });

  useEffect(() => {
    if (createFormState.loading) {
      setDynamicComponent(buildLoading);
    } else if (createFormState.error) {
      setDynamicComponent(buildText);
      showAlertAsync({
        title: 'Error',
        icon: 'error',
        html: createFormState.error,
      });
      dispatch(createFormSlice.actions.resetState());
    } else if (createFormState.data) {
      setDynamicComponent(buildText);
      showAlertAsync({
        title: 'Éxito',
        icon: 'success',
        html: 'Creación exitosa',
      });
      dispatch(createFormSlice.actions.resetState());
      dispatch(getAllForms());
      clearForm();
    }
  }, [createFormState]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, field: keyof CreateFormEntity) => {
    setCreateFormData((prevData) => ({
      ...prevData,
      [field]: event.target.value
    }));
  };

  const createRegister = () => {
    if (createFormData.nameEN == '' || createFormData.description == '' || createFormData.description == '') {
      showAlertAsync({
        title: 'Error',
        icon: 'error',
        html: 'Todos los campos son obligatorios',
      });
      return;
    }
    dispatch(createForm(createFormData))
  };

  const handleBackButtonClick = () => {
    navigate('/app/formulario/mostrar-formulario');
  }

  const clearForm = () => {
    setCreateFormData({
      nameES: '',
      nameEN: '',
      description: '',
    });
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
        Guardar
      </SoftTypography>
    );
  }

  function buildLoading() {
    return (
      <SoftBox
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress size={20} style={{ color: 'white' }} />
      </SoftBox>
    );
  }

  return (
    <SoftBox my={1} sx={{height: 'calc(100vh - 180px)'}}>
      <SoftBox display="flex" justifyContent="flex-end" mb={2}>
        <SoftButton color="info" onClick={handleBackButtonClick}>
          Ver Formularios
        </SoftButton>
      </SoftBox>
      <Card sx={{ overflow: "visible", paddingTop: "20px", padding: "20px" }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <SoftTypography variant="h5" fontWeight="bold" gutterBottom>
              Crear Formulario
            </SoftTypography>
            <Divider sx={{ borderColor: 'rgba(0, 0, 0, 0.87)', borderWidth: '2px', width: '20%' }} />
          </Grid>
          <Grid item xs={12} md={6}>
            <SoftTypography variant="subtitle1" fontWeight="bold">
              Nombre EN
            </SoftTypography>
            <SoftInput
              type="text"
              placeholder="Nombre EN"
              label="Nombre EN"
              value={createFormData.nameEN}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event, 'nameEN')}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <SoftTypography variant="subtitle1" fontWeight="bold">
              Nombre ES
            </SoftTypography>
            <SoftInput
              type="text"
              placeholder="Nombre ES"
              label="Nombre ES"
              value={createFormData.nameES}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event, 'nameES')}
            />
          </Grid>
          <Grid item xs={12}>
            <SoftTypography variant="subtitle1" fontWeight="bold">
              Descripcion
            </SoftTypography>
            <SoftInput
              type="text"
              placeholder="Descripcion"
              label="Descripcion"
              value={createFormData.description}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event, 'description')}
            />
          </Grid>
          <Grid item xs={12}>
            <SoftBox display="flex" justifyContent="flex-end" mt={2}>
              <SoftButton 
                color="primary"
                sx={{width: '180px'}}
                onClick={createFormState.loading ? null : createRegister }
              >
                {dynamicComponent}
              </SoftButton>
            </SoftBox>
          </Grid>
        </Grid>
      </Card>
    </SoftBox>
  );
}
