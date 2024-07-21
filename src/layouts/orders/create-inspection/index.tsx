import { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from "app/redux/hooks";
import { createInspection } from 'app/redux/actions/OrderActions';
import { getClients } from 'app/redux/actions/CatalogueActions';
import { CreateInspectionEntity } from 'app/api/domain/entities/OrderEntity';
import { createInspectionSlice } from 'app/redux/slices/order/CreateInspectionSlice';

// @mui material components
import { Card, CardHeader, CardContent, CardActions, Grid, CircularProgress, Divider } from "@mui/material";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";

// Pages components
import { showAlertAsync } from "layouts/pages/sweet-alerts/components/CustomAlert";

// utils
import { getTodayDateStr } from "app/utils/utils";
import CustomInput from 'components/CustomInput';
import CustomSelect from 'components/CustomSelect';


export default function CreateInspectionOrder() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const createInspectionState = useAppSelector(state => state.createInspection);
  const catalogueClientState = useAppSelector(state => state.catalogueClient);
  const [dynamicComponent, setDynamicComponent] = useState(buildText());
  const [clientSelected, setClientselected] = useState<{value: string, label: string}>({
    value: '', label: ''
  })

  const [createInspectionData, setCreateInspectionData] = useState<CreateInspectionEntity>({
    idClient: 0,
    emissionDate: getTodayDateStr(),
    expiratedDate: getTodayDateStr(),
  });

  useEffect(() => {
    init();
  },[])

  useEffect(() => {
    if (createInspectionState.loading) {
      setDynamicComponent(buildLoading);
    } else if (createInspectionState.error) {
      setDynamicComponent(buildText);
      showAlertAsync({
        title: 'Error',
        icon: 'error',
        html: createInspectionState.error,
      });
      dispatch(createInspectionSlice.actions.resetState());
    } else if (createInspectionState.data) {
      setDynamicComponent(buildText);
      showAlertAsync({
        title: 'Éxito',
        icon: 'success',
        html: 'Creación exitosa',
      });
      dispatch(createInspectionSlice.actions.resetState());
      clearForm(); // Limpia el formulario automáticamente después de guardar con éxito

    }
  }, [createInspectionState]);

  const init = async () => {
    dispatch(getClients());
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, field: keyof CreateInspectionEntity) => {
    setCreateInspectionData((prevData) => ({
      ...prevData,
      [field]: event.target.value
    }));
  };

  const handleSelectChange = (option: { value: string, label: string }) => {
    if (option != null) {
      handleSetInspectionData(option.value, 'idClient')
      setClientselected(option)
    } else {
      handleSetInspectionData("", 'idClient')
      setClientselected({value: '', label: ''})
    }
  };

  const handleSetInspectionData = (value: string, field: keyof CreateInspectionEntity) => {
    setCreateInspectionData((prevData) => ({
      ...prevData,
      [field]: Number(value)
    }));
  };

  const createRegister = () => {
    if (createInspectionData.idClient == 0 || createInspectionData.emissionDate == '' || createInspectionData.expiratedDate == '') {
      showAlertAsync({
        title: 'Error',
        icon: 'error',
        html: 'Hay campos vacíos o inválidos',
      });
      return;
    }
    dispatch(createInspection(createInspectionData))
  };

  const handleBackButtonClick = () => {
    navigate('/app/ordenes/ordenes-inspeccion');
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
      <SoftBox
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress size={20} style={{ color: 'white' }} />
      </SoftBox>
    );
  }

  const clearForm = () => {
    setCreateInspectionData({
      idClient: 0,
      emissionDate: getTodayDateStr(),
      expiratedDate: getTodayDateStr(),
    });
    setClientselected({
      value: '',
      label: '',
    });
  };

  return (
    <SoftBox>
      {catalogueClientState.loading
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
        : catalogueClientState.data
          ? (
            <SoftBox sx={{ minHeight: 'calc(100vh - 154px)' }}>
              <SoftBox py={1} display="flex" justifyContent="flex-end">
                <SoftButton onClick={handleBackButtonClick} color="info">
                  Ver Ordenes
                </SoftButton>
              </SoftBox>
              <SoftBox>
                <Grid container display="flex" justifyContent="center">
                  <Grid item xs={12} md={7}>
                    <Card sx={{ overflow: "visible", paddingBottom: '20px' }}>
                      <CardHeader variant="h5" fontWeight="bold" gutterBottom
                        title="Nueva Orden de Inspección"
                      />
                      <Divider sx={{ borderColor: 'rgba(0, 0, 0, 0.87)', borderWidth: '2px', width: '100%' }} />
                      <CardContent sx={{ padding: '0 16px' }}>
                        <Grid container mb={2}>
                          <Grid item xs={12} >
                            <SoftBox display="flex" flexDirection="column" height="100%">
                              <SoftBox ml={0.5} lineHeight={0} display="inline-block">
                                <SoftTypography variant="subtitle1" fontWeight="bold">
                                Cliente
                                </SoftTypography>
                              </SoftBox>
                              <CustomSelect
                                onChange={(option: { value: string, label: string }) => handleSelectChange(option)}
                                options={catalogueClientState.data}
                                value={clientSelected}
                                placeholder='Seleccione un cliente'
                                isRequired={true}
                                isClearable={true}
                              />
                            </SoftBox>
                          </Grid>
                        </Grid>
                        <Grid container mb={2}>
                          <Grid item xs={12}>
                            <SoftBox display="flex" flexDirection="column" height="100%">
                              <SoftBox ml={0.5} lineHeight={0} display="inline-block">
                              <SoftTypography variant="subtitle1" fontWeight="bold">
                                Fecha de emision
                                </SoftTypography>
                              </SoftBox>
                              <CustomInput
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event, 'emissionDate')}
                                type="date"
                                value={createInspectionData.emissionDate}
                                isRequired={true}
                              />
                            </SoftBox>
                          </Grid>
                        </Grid>
                        <Grid container mb={2}>
                          <Grid item xs={12}>
                            <SoftBox display="flex" flexDirection="column" height="100%">
                              <SoftBox ml={0.5} lineHeight={0} display="inline-block">
                              <SoftTypography variant="subtitle1" fontWeight="bold">
                                Fecha de expiracion
                                </SoftTypography>
                              </SoftBox>
                              <CustomInput
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event, 'expiratedDate')}
                                type="date"
                                value={createInspectionData.expiratedDate}
                                isRequired={true}
                              />
                            </SoftBox>
                          </Grid>
                        </Grid>
                      </CardContent>
                      <CardActions sx={{ padding: "0 16px" }}>
                        <Grid container direction={'row-reverse'}>
                          <Grid item xs={4}>
                            <SoftBox display="flex" justifyContent="flex-end" mt={2}>
                              <SoftButton
                                onClick={createInspectionState.loading ? null : createRegister}
                                color="primary"
                                sx={{ width: "150px" }}
                              >
                                {dynamicComponent}
                              </SoftButton>
                              {/* <SoftButton
                                onClick={clearForm}
                                color="info"
                                sx={{ width: "150px", marginLeft: '10px' }}
                              >
                                Limpiar
                              </SoftButton> */}
                            </SoftBox>
                          </Grid>
                        </Grid>
                      </CardActions>
                    </Card>
                  </Grid>
                </Grid>
              </SoftBox>
            </SoftBox>
          )
          : <SoftBox> </SoftBox>
      }
    </SoftBox>

  );
}