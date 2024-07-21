import { useState, useEffect, ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "app/redux/hooks";
import SoftInput from "components/SoftInput";
// @mui material components
import Grid from "@mui/material/Grid";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import Select from "react-select";
import SoftTypography from "components/SoftTypography"
import { editGroupQuestion } from "app/redux/actions/GroupQuestionsFormActions";
import { getGroupQuestionFormByIdSlice, GroupQuestionChanged } from "app/redux/slices/InspectionForm/groupQuestions/GetGroupQuestionFormByIdSlice";
import { getAllGroupQuestionFormSlice } from "app/redux/slices/InspectionForm/groupQuestions/GetGroupQuestionsFormSlice";
import FormSelect from "components/FormularioSelect";
interface EditModalProps{
    openModalEdit:boolean;
    setOpenModalEdit: any
}
export const EditModal = ({openModalEdit, setOpenModalEdit}:EditModalProps) => {    
    const editGroupQuestionState = useAppSelector(state => state.editOrCreateGroupQuestion);
    const groupQuestionState = useAppSelector(state => state.getAllGroupQuestionById);
    const [selectedValue, setSelectedValue] = useState({
        value: groupQuestionState.data.idInspectForm.toString(),
        label:''
    });
    const dispatch = useDispatch();
    const hideModalEdit = () => {
        dispatch(getGroupQuestionFormByIdSlice.actions.resetState());
        setOpenModalEdit(false);
    }
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
    const editRegister = () => {
        hideModalEdit();
        dispatch(getGroupQuestionFormByIdSlice.actions.resetState());
        dispatch(editGroupQuestion(groupQuestionState.data));
        dispatch(getAllGroupQuestionFormSlice.actions.modifyStateById(groupQuestionState.data))
      }

    return (
      <SoftBox>
        <Dialog
          fullWidth
          maxWidth="sm"
          open={openModalEdit}
          onClose={hideModalEdit}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Editar"}</DialogTitle>
          <DialogContent>
            <Grid container spacing={3} mb={2}>
              <Grid item xs={12}>
                <SoftBox display="flex" flexDirection="column" height="100%">
                  <SoftBox ml={0.5} lineHeight={0} display="inline-block" mb={1}>
                    <SoftTypography component="label" variant="caption" fontWeight="bold">
                      Formulario
                    </SoftTypography>
                  </SoftBox>
                  <FormSelect
                      placeholder='Filtrar por formulario'
                      onChange={handleSelectChange}
                      value={selectedValue}
                  />
                </SoftBox>
              </Grid>
              <Grid item xs={12} md={6}>
                <SoftBox
                  display="flex"
                  flexDirection="column"
                  height="100%"
                >
                  <SoftBox ml={0.5} lineHeight={0} display="inline-block" mb={1}>
                  <SoftTypography component="label" variant="caption" fontWeight="bold" textTransform="capitalize">
                    Nombre ES
                  </SoftTypography>
                  </SoftBox>
                <SoftInput type="text" placeholder="Nombre ES" label="Nombre ES" 
                    value={groupQuestionState.data?.nameGroupES} 
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event, 'nameGroupES')} 
                />
                
                </SoftBox>
              </Grid>
              <Grid item xs={12} md={6}>
                <SoftBox
                  display="flex"
                  flexDirection="column"
                  height="100%"
                >
                  <SoftBox ml={0.5} lineHeight={0} display="inline-block" mb={1}>
                  <SoftTypography component="label" variant="caption" fontWeight="bold" textTransform="capitalize">
                    Nombre EN
                  </SoftTypography>
                  </SoftBox>
                  <SoftInput type="text" placeholder="Nombre EN" label="Nombre EN" 
                      value={groupQuestionState.data?.nameGroupEN} 
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event, 'nameGroupEN')} 
                  />
                </SoftBox>
              </Grid>
              <Grid item xs={12} md={6}>
                <SoftBox
                  display="flex"
                  flexDirection="column"
                  height="100%"
                >
                  <SoftBox ml={0.5} lineHeight={0} display="inline-block" mb={1}>
                  <SoftTypography component="label" variant="caption" fontWeight="bold" textTransform="capitalize">
                    Orden
                  </SoftTypography>
                  </SoftBox>
                  <SoftInput type="number" placeholder="Orden" label="Order"
                   value={groupQuestionState.data?.orderGroup} 
                   onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event, 'orderGroup')} 
                   />
                </SoftBox>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <SoftButton onClick={() => hideModalEdit()} color="secondary">
              Cancelar
            </SoftButton>
            <SoftButton 
            onClick={editGroupQuestionState.loading ? null : editRegister} 
            color="primary" 
            >
              Guardar
            </SoftButton>
          </DialogActions>
        </Dialog>
      </SoftBox>
    );
  }