import React, { useState, ChangeEvent, useEffect } from 'react'
import SoftInput from "components/SoftInput";
// @mui material components
// Soft UI Dashboard PRO React components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography"
import { useAppSelector } from 'app/redux/hooks';
import { useDispatch } from 'react-redux';
import { Card, Divider, Grid } from "@mui/material";
import { GroupQuestionChanged, getGroupQuestionFormByIdSlice } from 'app/redux/slices/InspectionForm/groupQuestions/GetGroupQuestionFormByIdSlice';
import { createGroupQuestion } from 'app/redux/actions/GroupQuestionsFormActions';
import SoftButton from "components/SoftButton";
import { getAllInspectionForm } from 'app/redux/actions/InspectionFormActions';
import { useNavigate } from 'react-router-dom';
import { showAlertAsync } from 'layouts/pages/sweet-alerts/components/CustomAlert';
import { editGroupQuestionFormSlice } from 'app/redux/slices/InspectionForm/groupQuestions/EditGroupQuestionFormSlice';
import FormSelect from 'components/FormularioSelect';
const CreateGroupQuestion = () => {
    const groupQuestionState = useAppSelector(state => state.getAllGroupQuestionById.data);   
    const {data:isDone, loading, error} = useAppSelector(state => state.editOrCreateGroupQuestion);  
    const dispatch = useDispatch();
    const navigate = useNavigate();
    console.log(groupQuestionState);
    useEffect(() => {
        dispatch(getAllInspectionForm())
        dispatch(editGroupQuestionFormSlice.actions.resetState());
        dispatch(getGroupQuestionFormByIdSlice.actions.resetState());
      }, [])
      useEffect(() => {
        if(!loading){
            if (error) {
              showAlertAsync({
                title: 'Error',
                icon: 'error',
                html: error,
              });
              
            } else if (isDone) {
              showAlertAsync({
                title: 'Éxito',
                icon: 'success',
                html: 'Creación exitosa',
              });
            }
        }
        dispatch(getGroupQuestionFormByIdSlice.actions.resetState());
        
      }, [loading]);

    const [selectedValue, setSelectedValue] = useState({
        value: '',
        label: "Elija un formulario",
    });
    const handleSelectChange = (option:{value: string, label: string}) => {
        if(option.value && option.label){
            setSelectedValue(option);
            dispatch(getGroupQuestionFormByIdSlice.actions.modifyStateBySelect(Number(option.value)));
        }
    }
    function handleInputChange(event: ChangeEvent<HTMLInputElement>, field: string) {
        dispatch(getGroupQuestionFormByIdSlice.actions
            .modifyStateByInput({field, value: event.target.value} as GroupQuestionChanged));
    }
    const createRegister = () => {
        dispatch(createGroupQuestion(groupQuestionState));
        // dispatch(getAllGroupQuestionFormSlice.actions.addStateByItem(groupQuestionState.data))
      }
    const handleBackButtonClick = () => {
        navigate('/app/grupo-preguntas/grupo-preguntas');
    }
  return (
    
    <SoftBox my={1} sx={{ height: 'calc(100vh - 180px)' }}>
        <SoftBox display="flex" justifyContent="flex-end" mb={2}>
        <SoftButton color="info" onClick={handleBackButtonClick}>
            Ver Grupo preguntas
        </SoftButton>
    </SoftBox>
    <Card id="basic-info" sx={{ overflow: "visible", padding: "20px" }}>
        <SoftBox component="form" pb={3} px={3}>
            <Grid container spacing={3} mb={2} mt={1}>
                <Grid item xs={12}>
                    <SoftTypography variant="h5" fontWeight="bold" gutterBottom>
                        Crear Grupo de Preguntas
                    </SoftTypography>
                    <Divider sx={{ borderColor: 'rgba(0, 0, 0, 0.87)', borderWidth: '2px', width: '20%' }} />
                </Grid>
                <Grid item xs={12}>
                    <SoftTypography variant="subtitle1" fontWeight="bold">
                        Formulario
                    </SoftTypography>
                    <FormSelect
                        placeholder='Filtrar por formulario'
                        onChange={handleSelectChange}
                        value={selectedValue}
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
                        value={groupQuestionState?.nameGroupES}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event, 'nameGroupES')}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <SoftTypography variant="subtitle1" fontWeight="bold">
                        Nombre EN
                    </SoftTypography>
                    <SoftInput
                        type="text"
                        placeholder="Nombre EN"
                        label="Nombre EN"
                        value={groupQuestionState?.nameGroupEN}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event, 'nameGroupEN')}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <SoftTypography variant="subtitle1" fontWeight="bold">
                        Orden
                    </SoftTypography>
                    <SoftInput
                        type="number"
                        placeholder="Orden"
                        label="Order"
                        value={groupQuestionState?.orderGroup}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event, 'orderGroup')}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <SoftButton
                        onClick={createRegister}
                        color="primary"
                        fullWidth
                    >
                        Guardar
                    </SoftButton>
                </Grid>
            </Grid>
        </SoftBox>
    </Card>
</SoftBox>
        
  )
}

export default CreateGroupQuestion