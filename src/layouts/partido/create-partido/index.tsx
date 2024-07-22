import { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from "app/redux/hooks";
//Entity
import { CreatePartidoEntity } from 'app/api/domain/entities/PartidoEntities/PartidoEntity';
//Actions
import { createPartido } from 'app/redux/actions/PartidoActions/PartidoActions';
//Slices
import { createPartidoSlice } from 'app/redux/slices/partido/CrearPartidoSlice';



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


export default function CrearPartidoVista() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

    const createPartidoState = useAppSelector(state => state.crearPartido);


  const [dynamicComponent, setDynamicComponent] = useState(buildText());
  const [createPartidoData, setCreatePartidoData] = useState<CreatePartidoEntity>({
    nombrePartido: '',
  });


  useEffect(() => {
    if (createPartidoState.loading) {
      setDynamicComponent(buildLoading);
    } else if (createPartidoState.error) {
      setDynamicComponent(buildText);
      showAlertAsync({
        title: 'Error',
        icon: 'error',
        html: createPartidoState.error,
      });
      dispatch(createPartidoSlice.actions.resetState());
    } else if (createPartidoState.data) {
      showAlertAsync({
        title: 'Éxito',
        icon: 'success',
        html: 'Creación exitosa'
      });
      setDynamicComponent(buildText);
      dispatch(createPartidoSlice.actions.resetState());
      setCreatePartidoData({
        nombrePartido: '',
      }); 
    }
  }, [createPartidoState]);



  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, field: keyof CreatePartidoEntity) => {
    setCreatePartidoData((prevData) => ({
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
    if (createPartidoData.nombrePartido == '') {
      showAlertAsync({
        title: 'Error',
        icon: 'error',
        html: 'Todos los campos son obligatorios',
      });
      return;
    }
    dispatch(createPartido(createPartidoData));
  };

  const handleBackButtonClick = () => {
    navigate('/app/planificacion/lista-planificaciones');
  }

  return (
    <SoftBox>
              <SoftBox sx={{ minHeight: 'calc(100vh - 154px)' }}>
                <SoftBox py={1} display="flex" justifyContent="flex-end">
                  <SoftButton onClick={handleBackButtonClick} color="info" >
                    Ver Partidos
                  </SoftButton>
                </SoftBox>
                <Grid container display="flex" justifyContent="center">
                  <Grid item xs={12} md={7}>
                    <Card sx={{ overflow: "visible", paddingBottom: '20px' }}>
                      <CardHeader variant="h5" fontWeight="bold" gutterBottom
                        title="Nuevo Partido"
                      />
                      <Divider sx={{ borderColor: 'rgba(0, 0, 0, 0.87)', borderWidth: '2px', width: '100%' }} />
                      <CardContent sx={{ padding: '0 16px' }}>
                        <Grid container spacing={3} mb={2}>
                          <Grid item xs={12}>
                            <SoftBox display="flex" flexDirection="column" height="100%">
                              <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                                <SoftTypography variant="subtitle1" fontWeight="bold">
                                  Crear Partido
                                </SoftTypography>
                              </SoftBox>
                              <CustomInput
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event, 'nombrePartido')}
                                type="text"
                                value={createPartidoData.nombrePartido}
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
                                onClick={createPartidoState.loading ? null : createRegister}
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