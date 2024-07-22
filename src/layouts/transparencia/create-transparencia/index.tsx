import { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from "app/redux/hooks";
//Entity
import { CrearTransparienciaEntity } from 'app/api/domain/entities/TransparienciaEntities/TransparienciaEntity';
//Actions
import { createTransparencia } from 'app/redux/actions/TransparenciaActions/TransparenciaActions';
//Slices
import { crearTransparenciaSlice } from 'app/redux/slices/Transparencia/CrearTransparenciaSlice';



// @mui material components
import { Card, CardHeader, CardContent, CardActions, Grid, CircularProgress, Typography, Divider, Checkbox } from "@mui/material";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import SoftInput from "components/SoftInput";

// My customs components
import { showAlertAsync } from "layouts/pages/sweet-alerts/components/CustomAlert";
import CustomInput from 'components/CustomInput';
import CustomSelect from 'components/CustomSelect';


export default function CrearTransparenciaVista() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

    const crearTransparenciaState = useAppSelector(state => state.crearTransparencia);


  const [dynamicComponent, setDynamicComponent] = useState(buildText());
  const [createTransparenciaData, setCreateTransparenciaData] = useState<CrearTransparienciaEntity>({
    declaracionesDeBienes: '',
    involucradoEnEscandalos: false,
    evaluacionesDeEtica: '',
  });


  useEffect(() => {
    if (crearTransparenciaState.loading) {
      setDynamicComponent(buildLoading);
    } else if (crearTransparenciaState.error) {
      setDynamicComponent(buildText);
      showAlertAsync({
        title: 'Error',
        icon: 'error',
        html: crearTransparenciaState.error,
      });
      dispatch(crearTransparenciaSlice.actions.resetState());
    } else if (crearTransparenciaState.data) {
      showAlertAsync({
        title: 'Éxito',
        icon: 'success',
        html: 'Creación exitosa'
      });
      setDynamicComponent(buildText);
      dispatch(crearTransparenciaSlice.actions.resetState());
      setCreateTransparenciaData({
        declaracionesDeBienes: '',
        involucradoEnEscandalos: false,
        evaluacionesDeEtica: '',
      }); 
    }
  }, [crearTransparenciaState]);



  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, field: keyof CrearTransparienciaEntity) => {
    setCreateTransparenciaData((prevData) => ({
      ...prevData,
      [field]: event.target.value
    }));
  };

  const handleCheckboxChange = (fieldName: keyof CrearTransparienciaEntity) => {
    setCreateTransparenciaData((prevData) => ({
      ...prevData,
      [fieldName]: !prevData[fieldName] // invertir el estado anterior
    }));
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
      <SoftBox display="flex" justifyContent="center" alignItems="center">
        <CircularProgress size={20} style={{ color: 'white' }} />
      </SoftBox>
    );
  }

  const createRegister = () => {
    console.log(createTransparenciaData)
    if (createTransparenciaData.declaracionesDeBienes == '' || createTransparenciaData.evaluacionesDeEtica == '' ) {
      showAlertAsync({
        title: 'Error',
        icon: 'error',
        html: 'Todos los campos son obligatorios',
      });
      return;
    }
    dispatch(createTransparencia(createTransparenciaData));
  };

  const handleBackButtonClick = () => {
    navigate('/app/planificacion/lista-planificaciones');
  }

  return (
    <SoftBox>
              <SoftBox sx={{ minHeight: 'calc(100vh - 154px)' }}>
                <SoftBox py={1} display="flex" justifyContent="flex-end">
                  <SoftButton onClick={handleBackButtonClick} color="info" >
                    Ver Transparencia
                  </SoftButton>
                </SoftBox>
                <Grid container display="flex" justifyContent="center">
                  <Grid item xs={12} md={7}>
                    <Card sx={{ overflow: "visible", paddingBottom: '20px' }}>
                      <CardHeader variant="h5" fontWeight="bold" gutterBottom
                        title="Nueva Transparencia"
                      />
                      <Divider sx={{ borderColor: 'rgba(0, 0, 0, 0.87)', borderWidth: '2px', width: '100%' }} />
                      <CardContent sx={{ padding: '0 16px' }}>
                        <Grid container spacing={3} mb={2}>
                          <Grid item xs={12}>
                            <SoftBox display="flex" flexDirection="column" height="100%">
                              <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                                <SoftTypography variant="subtitle1" fontWeight="bold">
                                  Declaraciones de Bienes
                                </SoftTypography>
                              </SoftBox>
                              <CustomInput
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event, 'declaracionesDeBienes')}
                                type="text"
                                value={createTransparenciaData.declaracionesDeBienes}
                                isRequired={true}
                              />
                            </SoftBox>
                          </Grid>
                          <Grid item xs={12}>
                            <SoftBox display="flex" flexDirection="column" height="100%">
                              <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                                <SoftTypography variant="subtitle1" fontWeight="bold">
                                  Involucrado en Escandalos
                                </SoftTypography>
                              </SoftBox>
                              <Checkbox
                                checked={createTransparenciaData.involucradoEnEscandalos}
                                onChange={() => handleCheckboxChange('involucradoEnEscandalos')}
                                />
                            </SoftBox>
                          </Grid>
                          <Grid item xs={12}>
                            <SoftBox display="flex" flexDirection="column" height="100%">
                              <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                                <SoftTypography variant="subtitle1" fontWeight="bold">
                                  Evaluaciones de Etica
                                </SoftTypography>
                              </SoftBox>
                              <CustomInput
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event, 'evaluacionesDeEtica')}
                                type="text"
                                value={createTransparenciaData.evaluacionesDeEtica}
                                isRequired={true}
                              />
                            </SoftBox>
                          </Grid>
                        </Grid>
                      </CardContent>
                      <CardActions sx={{ padding: "0 16px" }}>
                        <Grid container direction={'row-reverse'}>
                          <Grid item xs={3}>
                            <SoftBox display="flex" justifyContent="flex-end" mt={2}>
                              <SoftButton
                                onClick={crearTransparenciaState.loading ? null : createRegister}
                                color="primary"
                                sx={{ width: "150px" }}
                              >
                                {dynamicComponent}
                              </SoftButton>
                            </SoftBox>
                          </Grid>
                        </Grid>
                      </CardActions>
                    </Card>
                  </Grid>
                </Grid>
              </SoftBox>
            
    </SoftBox>


  );
}