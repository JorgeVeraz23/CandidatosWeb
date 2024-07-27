import { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from "app/redux/hooks";
//Entity
import { CreateCandidatoEntity } from 'app/api/domain/entities/CandidatoEntities/CandidatoEntity';
//Actions
import { createCandidato } from 'app/redux/actions/CandidatoActions/CandidatoActions';
//Slices
import { createCandidatoSlice } from 'app/redux/slices/candidato/CreateCandidatoSlice';



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
import { keyValueCandidato, keyValueCargo, keyValuePartido, keyValueTransparencia } from 'app/redux/actions/KeyValueActions/KeyValueActions';


export default function CrearCandidatoVista() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

    


    const [optionPartidoSelected, setOptionPartidoSelected] = useState<{ value: string, label: string }>({
        value: '', label: ''
      });

      const [optionCargoSelected, setOptionCargoSelected] = useState<{ value: string, label: string }>({
        value: '', label: ''
      });

      const [optionTransparenciaSelected, setOptionTransparenciaSelected] = useState<{ value: string, label: string }>({
        value: '', label: ''
      });


      //Selectores States
    const createCandidatoState = useAppSelector(state => state.crearCandidato);
    const selectorPartidoState = useAppSelector(state => state.keyValuePartido);
    const selectorCargoState = useAppSelector(state => state.keyValueCargo);
    const selectorTransparenciaState = useAppSelector(state => state.keyValueTransparencia);
    
    

  const [dynamicComponent, setDynamicComponent] = useState(buildText());
  const [createCandidatoData, setCreateCandidatoData] = useState<CreateCandidatoEntity>({
    nombreCandidato: '',
    edad: 0,
    fotoUrl:'',
    lugarDeNacimiento: '',
    informacionDeContacto: '',
    idPartido: 0,
    idCargo: 0,
    idTranspariencia: 0,
  });

  
  const handleSetData = (value: string, field: keyof CreateCandidatoEntity) => {
    setCreateCandidatoData((prevData) => ({
      ...prevData,
      [field]: value
    }));
  };

  useEffect(() => {
    init();
  }, []);




  const init = async () => {
    await handleSelectoresActions();
  }

  const handleSelectoresActions = ()=> {
    dispatch(keyValueCandidato());
    dispatch(keyValueCargo());
    dispatch(keyValuePartido());
    dispatch(keyValueTransparencia());
  }


  const handlePartidoSelectChange = (option: { value: string, label: string }) => {
    setOptionPartidoSelected(option);
    handleSetData(option.value, 'idPartido');
  }


  const handleCargoSelectChange = (option: { value: string, label: string }) => {
    setOptionCargoSelected(option);
    handleSetData(option.value, 'idCargo');
  }

  const handleTransparenciaSelectChange = (option: { value: string, label: string }) => {
    setOptionTransparenciaSelected(option);
    handleSetData(option.value, 'idTranspariencia');
  }

  useEffect(() => {
    if (createCandidatoState.loading) {
      setDynamicComponent(buildLoading);
    } else if (createCandidatoState.error) {
      setDynamicComponent(buildText);
      showAlertAsync({
        title: 'Error',
        icon: 'error',
        html: createCandidatoState.error,
      });
      dispatch(createCandidatoSlice.actions.resetState());
    } else if (createCandidatoState.data) {
      showAlertAsync({
        title: 'Éxito',
        icon: 'success',
        html: 'Creación exitosa'
      });
      setOptionPartidoSelected({value: '', label: ''});
      setOptionCargoSelected({value: '', label: ''});
      setOptionTransparenciaSelected({value: '', label: ''});
      setDynamicComponent(buildText);
      dispatch(createCandidatoSlice.actions.resetState());
      setCreateCandidatoData({
        nombreCandidato: '',
        edad: 0,
        fotoUrl: '',
        lugarDeNacimiento: '',
        informacionDeContacto: '',
        idPartido: 0,
        idCargo: 0,
        idTranspariencia: 0,
      }); 
    }
  }, [createCandidatoState]);



  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, field: keyof CreateCandidatoEntity) => {
    setCreateCandidatoData((prevData) => ({
      ...prevData,
      [field]: event.target.value
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
    if (createCandidatoData.nombreCandidato == '' || createCandidatoData.edad == 0 || createCandidatoData.fotoUrl == '' || createCandidatoData.lugarDeNacimiento == '' || createCandidatoData.informacionDeContacto == '' || createCandidatoData.idPartido == 0 || createCandidatoData.idCargo == 0 || createCandidatoData.idTranspariencia == 0 ) {
      showAlertAsync({
        title: 'Error',
        icon: 'error',
        html: 'Todos los campos son obligatorios',
      });
      return;
    }
    console.log(createCandidatoData);
    dispatch(createCandidato(createCandidatoData));
  };

  const handleBackButtonClick = () => {
    navigate('/app/planificacion/lista-planificaciones');
  }

  return (
    <SoftBox>
              <SoftBox sx={{ minHeight: 'calc(100vh - 154px)' }}>
                <SoftBox py={1} display="flex" justifyContent="flex-end">
                  <SoftButton onClick={handleBackButtonClick} color="info" >
                    Ver Candidatos
                  </SoftButton>
                </SoftBox>
                <Grid container display="flex" justifyContent="center">
                  <Grid item xs={12} md={7}>
                    <Card sx={{ overflow: "visible", paddingBottom: '20px' }}>
                      <CardHeader variant="h5" fontWeight="bold" gutterBottom
                        title="Nuevo Candidato"
                      />
                      <Divider sx={{ borderColor: 'rgba(0, 0, 0, 0.87)', borderWidth: '2px', width: '100%' }} />
                      <CardContent sx={{ padding: '0 16px' }}>
                        <Grid container spacing={3} mb={2}>
                          <Grid item xs={12}>
                            <SoftBox display="flex" flexDirection="column" height="100%">
                              <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                                <SoftTypography variant="subtitle1" fontWeight="bold">
                                  Candidato
                                </SoftTypography>
                              </SoftBox>
                              <CustomInput
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event, 'nombreCandidato')}
                                type="text"
                                value={createCandidatoData.nombreCandidato}
                                isRequired={true}
                              />
                            </SoftBox>
                          </Grid>
                          <Grid item xs={12}>
                            <SoftBox display="flex" flexDirection="column" height="100%">
                              <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                                <SoftTypography variant="subtitle1" fontWeight="bold">
                                    Edad
                                </SoftTypography>
                              </SoftBox>
                              <CustomInput
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event, 'edad')}
                                type="number"
                                value={createCandidatoData.edad}
                                isRequired={true}
                              />
                            </SoftBox>
                          </Grid>
                          <Grid item xs={12}>
                            <SoftBox display="flex" flexDirection="column" height="100%">
                              <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                                <SoftTypography variant="subtitle1" fontWeight="bold">
                                    Foto URL
                                </SoftTypography>
                              </SoftBox>
                              <CustomInput
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event, 'fotoUrl')}
                                type="url"
                                value={createCandidatoData.fotoUrl}
                                isRequired={true}
                              />
                            </SoftBox>
                          </Grid>
                          <Grid item xs={12}>
                            <SoftBox display="flex" flexDirection="column" height="100%">
                              <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                                <SoftTypography variant="subtitle1" fontWeight="bold">
                                    Lugar De Nacimiento
                                </SoftTypography>
                              </SoftBox>
                              <CustomInput
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event, 'lugarDeNacimiento')}
                                type="url"
                                value={createCandidatoData.lugarDeNacimiento}
                                isRequired={true}
                              />
                            </SoftBox>
                          </Grid>
                          <Grid item xs={12}>
                            <SoftBox display="flex" flexDirection="column" height="100%">
                              <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                                <SoftTypography variant="subtitle1" fontWeight="bold">
                                    Informacion de Contacto
                                </SoftTypography>
                              </SoftBox>
                              <CustomInput
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event, 'informacionDeContacto')}
                                type="url"
                                value={createCandidatoData.informacionDeContacto}
                                isRequired={true}
                              />
                            </SoftBox>
                          </Grid>
                          <Grid item xs={12}>
                            <SoftBox display="flex" flexDirection="column" height="100%">
                              <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                                <SoftTypography variant="subtitle1" fontWeight="bold">
                                    Partido
                                </SoftTypography>
                              </SoftBox>
                              <CustomSelect
                                onChange={(option: { value: string, label: string }) => handlePartidoSelectChange(option)}
                                value={optionPartidoSelected}
                                placeholder="Candidato"
                                isRequired={true}
                                options={selectorPartidoState.data}
                              />
                            </SoftBox>
                          </Grid>
                          <Grid item xs={12}>
                            <SoftBox display="flex" flexDirection="column" height="100%">
                              <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                                <SoftTypography variant="subtitle1" fontWeight="bold">
                                    Cargo
                                </SoftTypography>
                              </SoftBox>
                              <CustomSelect
                                onChange={(option: { value: string, label: string }) => handleCargoSelectChange(option)}
                                value={optionCargoSelected}
                                placeholder="Candidato"
                                isRequired={true}
                                options={selectorCargoState.data}
                              />
                            </SoftBox>
                          </Grid>
                          <Grid item xs={12}>
                            <SoftBox display="flex" flexDirection="column" height="100%">
                              <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                                <SoftTypography variant="subtitle1" fontWeight="bold">
                                    Transparencia
                                </SoftTypography>
                              </SoftBox>
                              <CustomSelect
                                onChange={(option: { value: string, label: string }) => handleTransparenciaSelectChange(option)}
                                value={optionTransparenciaSelected}
                                placeholder="Candidato"
                                isRequired={true}
                                options={selectorTransparenciaState.data}
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
                                onClick={createCandidatoState.loading ? null : createRegister}
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