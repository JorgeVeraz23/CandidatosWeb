import { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from "app/redux/hooks";
//Entity
import { CreateCargoEntity } from 'app/api/domain/entities/CargoEntities/CargoEntity';
//Actions
import { createCargo } from 'app/redux/actions/CargoActions/CargoActions';
//Slices
import { createCargoSlice } from 'app/redux/slices/cargo/CrearCargoSlice';

//Selector
import { keyValueCandidatoSlice } from 'app/redux/slices/KeyValue/KeyValueCandidatoSlice';
import { keyValueCandidato } from 'app/redux/actions/KeyValueActions/KeyValueActions';
import { KeyValueEntity } from 'app/api/domain/entities/KeyValueEntities/KeyValueEntity';

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


export default function CrearCargoVista() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const createCargoState = useAppSelector(state => state.crearCargo);


  const [dynamicComponent, setDynamicComponent] = useState(buildText());
  const [createCargoData, setCreateCargoData] = useState<CreateCargoEntity>({
    nombre: '',
  });


  useEffect(() => {
    if (createCargoState.loading) {
      setDynamicComponent(buildLoading);
    } else if (createCargoState.error) {
      setDynamicComponent(buildText);
      showAlertAsync({
        title: 'Error',
        icon: 'error',
        html: createCargoState.error,
      });
      dispatch(createCargoSlice.actions.resetState());
    } else if (createCargoState.data) {
      showAlertAsync({
        title: 'Éxito',
        icon: 'success',
        html: 'Creación exitosa'
      });
      setDynamicComponent(buildText);
      dispatch(createCargoSlice.actions.resetState());
      setCreateCargoData({
        nombre: '',
      }); 
    }
  }, [createCargoState]);



  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, field: keyof CreateCargoEntity) => {
    setCreateCargoData((prevData) => ({
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
    if (createCargoData.nombre == '') {
      showAlertAsync({
        title: 'Error',
        icon: 'error',
        html: 'Todos los campos son obligatorios',
      });
      return;
    }
    dispatch(createCargo(createCargoData));
  };

  const handleBackButtonClick = () => {
    navigate('/app/planificacion/lista-planificaciones');
  }

  return (
    <SoftBox>
              <SoftBox sx={{ minHeight: 'calc(100vh - 154px)' }}>
                <SoftBox py={1} display="flex" justifyContent="flex-end">
                  <SoftButton onClick={handleBackButtonClick} color="info" >
                    Ver Cargos
                  </SoftButton>
                </SoftBox>
                <Grid container display="flex" justifyContent="center">
                  <Grid item xs={12} md={7}>
                    <Card sx={{ overflow: "visible", paddingBottom: '20px' }}>
                      <CardHeader variant="h5" fontWeight="bold" gutterBottom
                        title="Nuevo Cargo"
                      />
                      <Divider sx={{ borderColor: 'rgba(0, 0, 0, 0.87)', borderWidth: '2px', width: '100%' }} />
                      <CardContent sx={{ padding: '0 16px' }}>
                        <Grid container spacing={3} mb={2}>
                          <Grid item xs={12}>
                            <SoftBox display="flex" flexDirection="column" height="100%">
                              <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                                <SoftTypography variant="subtitle1" fontWeight="bold">
                                  Crear Cargo
                                </SoftTypography>
                              </SoftBox>
                              <CustomInput
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event, 'nombre')}
                                type="text"
                                value={createCargoData.nombre}
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
                                onClick={createCargoState.loading ? null : createRegister}
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