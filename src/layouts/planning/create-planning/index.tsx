import { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from "app/redux/hooks";

import { CreatePlanningEntity } from 'app/api/domain/entities/PlanningEntity';
import { createPlanningSlice } from 'app/redux/slices/planning/CreatePlanningSlice';
import { createPlanning, getAllPlannings } from 'app/redux/actions/PlanningActions';
import { getInspectionOrders, getInspectorsActive } from 'app/redux/actions/CatalogueActions';

// @mui material components
import { Card, CardHeader, CardContent, CardActions, Grid, CircularProgress, Typography, Divider } from "@mui/material";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import SoftInput from "components/SoftInput";

// My customs components
import { showAlertAsync } from "layouts/pages/sweet-alerts/components/CustomAlert";
import InspectorSelect from "components/InspectorSelect";
import CustomInput from 'components/CustomInput';
import CustomSelect from 'components/CustomSelect';


export default function CreatePlanning() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const createPlanningState = useAppSelector(state => state.createPlanning);
  const catalogInspectionOrderState = useAppSelector(state => state.catalogueInspectionOrder);
  //const getInspectorsState = useAppSelector(state => state.catalogueInspector);
  const getInspectorActiveState = useAppSelector(state => state.getInspectorActive)
  const [optionOrderSelected, setOptionOrderSelected] = useState<{ value: string, label: string }>({
    value: '', label: ''
  });
  const [optionInspectorSelected, setOptionInspectorSelected] = useState<{ value: string, label: string }>({
    value: '', label: ''
  });
  const [dynamicComponent, setDynamicComponent] = useState(buildText());
  const [createPlanningData, setCreateInspectionData] = useState<CreatePlanningEntity>({
    idOrder: '',
    idInspector: '',
    planningDate: '',
    observation: '',
  });

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    if (createPlanningState.loading) {
      setDynamicComponent(buildLoading);
    } else if (createPlanningState.error) {
      setDynamicComponent(buildText);
      showAlertAsync({
        title: 'Error',
        icon: 'error',
        html: createPlanningState.error,
      });
      dispatch(createPlanningSlice.actions.resetState());
    } else if (createPlanningState.data) {
      showAlertAsync({
        title: 'Éxito',
        icon: 'success',
        html: 'Creación exitosa'
      });

      setOptionOrderSelected({value: '', label: ''});
      setOptionInspectorSelected({value: '', label: ''});
      setDynamicComponent(buildText);
      dispatch(getInspectionOrders());
      dispatch(createPlanningSlice.actions.resetState());
      //dispatch(getAllPlannings());
    }
  }, [createPlanningState]);

  useEffect(() => {
    if(catalogInspectionOrderState.data){
      console.log("Aqui inicia ordenes de inspeccion", catalogInspectionOrderState)
    }
  }, [catalogInspectionOrderState]);


  useEffect(() => {
    if(getInspectorActiveState.data){
      console.log("Aqui inicia", getInspectorActiveState)
    }
  }, [getInspectorActiveState]);

  const init = async () => {
    await handleInspectorOrderActive();
    await handleInspectorActive();
    
  }

  const handleInspectorActive = () => {
    dispatch(getInspectorsActive())
  }

  const handleInspectorOrderActive = () => {
    dispatch(getInspectionOrders())
  }


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, field: keyof CreatePlanningEntity) => {
    setCreateInspectionData((prevData) => ({
      ...prevData,
      [field]: event.target.value
    }));
  };

  const handleOrderSelectChange = (option: { value: string, label: string }) => {
    setOptionOrderSelected(option);
    handleSetData(option.value, 'idOrder');
  }

  const handleInspectorSelectChange = (option: { value: string, label: string }) => {
    setOptionInspectorSelected(option);
    handleSetData(option.value, 'idInspector');
  }

  const handleSetData = (value: string, field: keyof CreatePlanningEntity) => {
    setCreateInspectionData((prevData) => ({
      ...prevData,
      [field]: value
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
    if (createPlanningData.idOrder == '' || createPlanningData.idInspector == '' || createPlanningData.planningDate == '') {
      showAlertAsync({
        title: 'Error',
        icon: 'error',
        html: 'Todos los campos son obligatorios',
      });
      return;
    }
    dispatch(createPlanning(createPlanningData));
  };

  const handleBackButtonClick = () => {
    navigate('/app/planificacion/lista-planificaciones');
  }
  console.log(optionInspectorSelected)
  console.log(getInspectorActiveState.data)
  return (
    <SoftBox>
      {
        catalogInspectionOrderState.loading || getInspectorActiveState.loading
          ? (
            <SoftBox
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{ height: 'calc(100vh - 155px)' }}
            >
              <CircularProgress />
            </SoftBox>
          )
          : catalogInspectionOrderState.data && getInspectorActiveState.data
            ? (
              <SoftBox sx={{ minHeight: 'calc(100vh - 154px)' }}>
                <SoftBox py={1} display="flex" justifyContent="flex-end">
                  <SoftButton onClick={handleBackButtonClick} color="info" >
                    Ver planificaciones
                  </SoftButton>
                </SoftBox>
                <Grid container display="flex" justifyContent="center">
                  <Grid item xs={12} md={7}>
                    <Card sx={{ overflow: "visible", paddingBottom: '20px' }}>
                      <CardHeader variant="h5" fontWeight="bold" gutterBottom
                        title="Nueva Planificación"
                      />
                      <Divider sx={{ borderColor: 'rgba(0, 0, 0, 0.87)', borderWidth: '2px', width: '100%' }} />
                      <CardContent sx={{ padding: '0 16px' }}>
                        <Grid container spacing={3} mb={2}>
                          <Grid item xs={12}>
                            <SoftBox display="flex" flexDirection="column" height="100%">
                              <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                                <SoftTypography variant="subtitle1" fontWeight="bold">
                                  Orden de inspección
                                </SoftTypography>
                              </SoftBox>
                              <CustomSelect
                                onChange={(option: { value: string, label: string }) => handleOrderSelectChange(option)}
                                value={optionOrderSelected}
                                placeholder="Orden de inspección"
                                isRequired={true}
                                options={catalogInspectionOrderState.data}
                              />
                            </SoftBox>
                          </Grid>
                        </Grid>
                        <Grid container spacing={3} mb={2}>
                          <Grid item xs={12}>
                            <SoftBox display="flex" flexDirection="column" height="100%">
                              <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                                <SoftTypography variant="subtitle1" fontWeight="bold">
                                  Inspector
                                </SoftTypography>
                              </SoftBox>
                              <CustomSelect
                                onChange={(option: { value: string, label: string }) => handleInspectorSelectChange(option)}
                                
                                value={optionInspectorSelected}
                                placeholder='Seleccione un inspector'
                                isRequired={true}
                                options={getInspectorActiveState.data}
                              />
                            </SoftBox>
                          </Grid>

                        </Grid>
                        <Grid container spacing={3} mb={2}>
                          <Grid item xs={12}>
                            <SoftBox display="flex" flexDirection="column" height="100%">
                              <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                                <SoftTypography variant="subtitle1" fontWeight="bold">
                                  Fecha de planificación
                                </SoftTypography>
                              </SoftBox>
                              <CustomInput
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event, 'planningDate')}
                                type="date"
                                value={createPlanningData.planningDate}
                                isRequired={true}
                              />
                            </SoftBox>
                          </Grid>
                        </Grid>
                        <Grid container spacing={3} mb={2}>
                          <Grid item xs={12}>
                            <SoftBox display="flex" flexDirection="column" height="100%">
                              <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                                <SoftTypography variant="subtitle1" fontWeight="bold">
                                  Observación
                                </SoftTypography>
                              </SoftBox>
                              <SoftInput
                                multiline rows={5}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event, 'observation')}
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
                                onClick={createPlanningState.loading ? null : createRegister}
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
            )
            : catalogInspectionOrderState.data == null && getInspectorActiveState.data == null && (
              <SoftBox>
                <SoftTypography>No se pudo cargar la información necesaria para mostrar este formulario.</SoftTypography>
              </SoftBox>
            )
      }
    </SoftBox>


  );
}