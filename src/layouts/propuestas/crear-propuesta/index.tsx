import { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from "app/redux/hooks";
//Entity
import { CrearPropuestaEntity } from 'app/api/domain/entities/PropuestasEntities/PropuestaEntity';
//Actions
import { crearPropuesta } from 'app/redux/actions/PropuestaActions/PropuestaActions';
//Slices
import { createPropuestaSlice } from 'app/redux/slices/propuesta/CrearPropuestaSlice';


// @mui material components
import { Card, CardHeader, CardContent, CardActions, Grid, CircularProgress, Typography, Divider } from "@mui/material";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import SoftInput from "components/SoftInput";

// My customs components
import { showAlertAsync } from "layouts/pages/sweet-alerts/components/CustomAlert";
import CustomInput from 'components/CustomInput';
import CustomSelect from 'components/CustomSelect';
import { keyValueCandidato } from 'app/redux/actions/KeyValueActions/KeyValueActions';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';

export default function CrearPropuestaVista() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [optionCandidatoSelected, setOptionCandidatoSelected] = useState<{ value: string, label: string }>({
    value: '', label: ''
  });


    const createPropuestaState = useAppSelector(state => state.crearPropuesta);
    const selectorCandidatoState = useAppSelector(state => state.keyValueCandidato);

  const [dynamicComponent, setDynamicComponent] = useState(buildText());
  const [createPropuestaData, setCreatePropuestaData] = useState<CrearPropuestaEntity>({
    titulo: '',
    descripción: '',
    area: '',
    idCandidato: 0,
  });

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    if (createPropuestaState.loading) {
      setDynamicComponent(buildLoading);
    } else if (createPropuestaState.error) {
      setDynamicComponent(buildText);
      showAlertAsync({
        title: 'Error',
        icon: 'error',
        html: createPropuestaState.error,
      });
      dispatch(createPropuestaSlice.actions.resetState());
    } else if (createPropuestaState.data) {
      showAlertAsync({
        title: 'Éxito',
        icon: 'success',
        html: 'Creación exitosa'
      });
      setOptionCandidatoSelected({value: '', label: ''});
      setDynamicComponent(buildText);
      dispatch(createPropuestaSlice.actions.resetState());
      setCreatePropuestaData({
        titulo: '',
        descripción: '',
        area: '',
        idCandidato: 0,
      }); 
    }
  }, [createPropuestaState]);

  const handleSetData = (value: string, field: keyof CrearPropuestaEntity) => {
    setCreatePropuestaData((prevData) => ({
      ...prevData,
      [field]: value
    }));
  };

  const init = async () => {
    await handleSelectorCandidatoDispatch();
  }

  const handleSelectorCandidatoDispatch = () => {
    dispatch(keyValueCandidato())
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, field: keyof CrearPropuestaEntity) => {
    setCreatePropuestaData((prevData) => ({
      ...prevData,
      [field]: event.target.value
    }));
  };

  const handleCandidatoSelectChange = (option: { value: string, label: string }) => {
    setOptionCandidatoSelected(option);
    handleSetData(option.value, 'idCandidato');
  }




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
    if (createPropuestaData.titulo == '' || createPropuestaData.descripción == '' || createPropuestaData.area == '') {
      showAlertAsync({
        title: 'Error',
        icon: 'error',
        html: 'Todos los campos son obligatorios',
      });
      return;
    }
    dispatch(crearPropuesta(createPropuestaData));
  };

  const handleBackButtonClick = () => {
    navigate('/app/catalogs/mostrar-propuesta');
  }

  return (
    <SoftBox>
              <SoftBox sx={{ minHeight: 'calc(100vh - 154px)' }}>
                <SoftBox py={1} display="flex" justifyContent="flex-end">
                  <SoftButton onClick={handleBackButtonClick} color="info" >
                    Ver Propuesta
                    <EmojiEmotionsIcon style={{ marginLeft: '8px' }} />
                  </SoftButton>
                </SoftBox>
                <Grid container display="flex" justifyContent="center">
                  <Grid item xs={12} md={7}>
                    <Card sx={{ overflow: "visible", paddingBottom: '20px' }}>
                      <CardHeader variant="h5" fontWeight="bold" gutterBottom
                        title="Nueva Propuesta"
                      />
                      <Divider sx={{ borderColor: 'rgba(0, 0, 0, 0.87)', borderWidth: '2px', width: '100%' }} />
                      <CardContent sx={{ padding: '0 16px' }}>
                        <Grid container spacing={3} mb={2}>
                          <Grid item xs={12}>
                            <SoftBox display="flex" flexDirection="column" height="100%">
                              <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                                <SoftTypography variant="subtitle1" fontWeight="bold">
                                  Titulo
                                </SoftTypography>
                              </SoftBox>
                              <CustomInput
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event, 'titulo')}
                                type="text"
                                value={createPropuestaData.titulo}
                                isRequired={true}
                              />
                            </SoftBox>
                          </Grid>
                          <Grid item xs={12}>
                            <SoftBox display="flex" flexDirection="column" height="100%">
                              <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                                <SoftTypography variant="subtitle1" fontWeight="bold">
                                  Area
                                </SoftTypography>
                              </SoftBox>
                              <CustomInput
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event, 'area')}
                                type="text"
                                value={createPropuestaData.area}
                                isRequired={true}
                              />
                            </SoftBox>
                          </Grid>
                          <Grid item xs={12}>
                            <SoftBox display="flex" flexDirection="column" height="100%">
                              <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                                <SoftTypography variant="subtitle1" fontWeight="bold">
                                  Descripcion
                                </SoftTypography>
                              </SoftBox>
                              <CustomInput
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event, 'descripción')}
                                type="text"
                                value={createPropuestaData.descripción}
                                isRequired={true}
                              />
                            </SoftBox>
                          </Grid>
                          <Grid item xs={12}>
                            <SoftBox display="flex" flexDirection="column" height="100%">
                              <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                                <SoftTypography variant="subtitle1" fontWeight="bold">
                                  Candidato
                                </SoftTypography>
                              </SoftBox>
                              <CustomSelect
                                onChange={(option: { value: string, label: string }) => handleCandidatoSelectChange(option)}
                                value={optionCandidatoSelected}
                                placeholder="Candidato"
                                isRequired={false}
                                options={selectorCandidatoState.data}
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
                                onClick={createPropuestaState.loading ? null : createRegister}
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