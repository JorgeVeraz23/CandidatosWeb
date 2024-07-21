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
import { GroupQuestionsFormEntity } from "app/api/domain/entities/FormEntities/GroupQuestionEntity";
import { getGroupQuestionFormByIdSlice, GroupQuestionChanged } from "app/redux/slices/InspectionForm/groupQuestions/GetGroupQuestionFormByIdSlice";
import { getAllGroupQuestionFormSlice } from "app/redux/slices/InspectionForm/groupQuestions/GetGroupQuestionsFormSlice";
import { editGroupQuestionFormSlice } from "app/redux/slices/InspectionForm/groupQuestions/EditGroupQuestionFormSlice";
import questionTypeSelect from "components/QuestionTypeSelect/questionTypeSelect";
import { GroupFormSelect } from 'components/FormularioSelect/groupFormSelect';
import { EditQuestion } from "app/api/domain/entities/InspectionFormEntity";
import FormSelect, { option } from 'components/FormularioSelect';
import { editQuestion } from "app/redux/actions/QuestionActions/QuestionActions";
import { Divider } from "@mui/material";
import QuestionTypeSelect from "components/QuestionTypeSelect/questionTypeSelect";
import { getAllQuestionSlice } from "app/redux/slices/question/GetQuestionsSlice";
import { updateIdQuestionForm } from "app/redux/slices/question/GetQuestionsById";
import checkboxStyles  from "assets/theme/components/form/checkbox";
import Checkbox from "@mui/material/Checkbox";
import { getQuestionSlice } from 'app/redux/slices/question/GetQuestionsById';
import { editQuestionSlice } from "app/redux/slices/question/EditQuestionSlice";
import { getAllQuestionsForm } from "app/redux/actions/QuestionActions/QuestionActions";
import { showAlertAsync } from "layouts/pages/sweet-alerts/components/CustomAlert";
import CatalogQuestionSelect from "components/CatalogoSelect";

interface EditModalProps{
    openModalEdit:boolean;
    setOpenModalEdit: any
    selectedQuestionFormId: number; // Agrega la propiedad selectedQuestionFormId a la interfaz
}

export const EditModal = ({openModalEdit, setOpenModalEdit, selectedQuestionFormId}:EditModalProps) => {    
    const editQuestionState = useAppSelector(state => state.editQuestion);
    const [isFormSelected, setIsFormSelected] = useState(false); // Estado para controlar si se ha seleccionado un formulario
    const QuestionState = useAppSelector(state => state.getQuestion);
    const [isCatatalogQuestionTypeSelected, setIsCatalogQuestionTypeSelected] = useState(false);

    // const { data } = useAppSelector(state => state.getAllInspectionForm);
    // const [selectedForm, setSelectedForm] = useState<string | null>(null);
    // const [selectedQuestion, setSeletedQuestion] = useState<string | null>(null);
    // const [filteredFormList, setFilteredFormList] = useState<any[]>([]);
    // const [isRequired, setIsRequired] = useState(false); // Estado para controlar si la pregunta es obligatoria
    const dispatch = useDispatch();
    
    const hideModalEdit = () => {
        dispatch(getQuestionSlice.actions.resetState());
        dispatch(getAllQuestionsForm());
        setOpenModalEdit(false);
    }

    useEffect(() => {
      if (editQuestionState.error) {
        showAlertAsync({
          title: 'Error',
          icon: 'error',
          html: editQuestionState.error,
        });
        dispatch(editQuestionSlice.actions.resetState());
      } else if (editQuestionState.data) {
        showAlertAsync({
          title: 'Éxito',
          icon: 'success',
          html: 'Los cambios se guardaron correctamente.',
        });
        dispatch(editQuestionSlice.actions.resetState());
        dispatch(getAllQuestionsForm());
      }
    }, [editQuestionState.data]);

    const handleSelectChange = (option: { value: string, label: string }) => {
      // Crea un nuevo objeto con las propiedades field y value
      const updatedQuestionState = {
          field: 'idGroupQuestionForm',
          value: option.value
      };
      dispatch(getQuestionSlice.actions.modifyStateByInput(updatedQuestionState));
  };
  
  const handleSelectChange2 = (option: { value: string, label: string }) => {
    // value: QuestionState.data.idInspectionForm,
    // label: QuestionState.data.formName
      // Crea un nuevo objeto con las propiedades field y value
      
      const updatedQuestionState = {
          field: 'idInspectionForm',
          value: option.value
      };
      dispatch(getQuestionSlice.actions.modifyStateByInput(updatedQuestionState));
      setIsFormSelected(true);

  };
  
  const handleSelectChange3 = (option: { value: string, label: string }) => {

      // Crea un nuevo objeto con las propiedades field y value
      const updatedQuestionState = {
          field: 'idQuestionType',
          value: option.value
      };
      dispatch(getQuestionSlice.actions.modifyStateByInput(updatedQuestionState));
      console.log(option.value)
      console.log(option.label)
     // Si la opción seleccionada es 'catalogo', setIsCatalogQuestionTypeSelected a true
  if (option.label === 'catalogo') {
    setIsCatalogQuestionTypeSelected(true);
  } else {
    // Si la opción seleccionada no es 'catalogo', setIsCatalogQuestionTypeSelected a false
    setIsCatalogQuestionTypeSelected(false);
  }
    
  };

  const handleSelectChange4 = (option: {value: string; label:string}) => {
    
    const updatedQuestionState = {
      field: "idCatalogQuestion",
      value: option.value,
    };
    dispatch(getQuestionSlice.actions.modifyStateByInput(updatedQuestionState));
  }



  
    function handleInputChange(event: ChangeEvent<HTMLInputElement>, field: string) {
        dispatch(getQuestionSlice.actions.modifyStateByInput({field, value: event.target.value} as GroupQuestionChanged));
    }
    
    const editRegister = () => {
      // Ocultar el modal de edición y otros cambios necesarios
      hideModalEdit();
      dispatch(getQuestionSlice.actions.resetState());
      const sendData = {
        ...QuestionState.data,
        idQuestionForm: selectedQuestionFormId,
        idQuestionType: QuestionState.data.idQuestionType,
        idCatalogQuestion: QuestionState.data.idCatalogQuestion,
        idGroupQuestionForm: QuestionState.data.idGroupQuestionForm,
        order: QuestionState.data.order,
        isRequired: QuestionState.data.isRequired,
      }
      dispatch(editQuestion(sendData));
      dispatch(updateIdQuestionForm(QuestionState.data.idQuestionForm)); // Usar idQuestionForm del estado
      dispatch(getAllQuestionSlice.actions.modifyStateById(QuestionState.data));

      
  }


  
  

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(getQuestionSlice.actions.modifyStateByInput({field:"isRequired", value: event.target.checked} as GroupQuestionChanged));
  };

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
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <SoftTypography variant="subtitle1" fontWeight="bold">
                Seleccionar Formulario
              </SoftTypography>
              <FormSelect
                placeholder="Seleccionar Formulario"
                value={{
                  value: QuestionState.data.idInspectionForm,
                  label: QuestionState.data.formName
                } as option}
                onChange={handleSelectChange2}
                canModifyGroupQuestion={true}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <SoftTypography variant="subtitle1" fontWeight="bold">
                Seleccionar Grupo de Preguntas
              </SoftTypography>
              <GroupFormSelect
                placeholder="Seleccionar Grupo de Preguntas"
                value={{
                  value: QuestionState.data.idGroupQuestionForm,
                  label: QuestionState.data.groupQuestionName
                } as option}
                onChange={handleSelectChange}
                isDisabled={!isFormSelected}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <SoftTypography variant="subtitle1" fontWeight="bold">
                Seleccionar Un Tipo de Pregunta
              </SoftTypography>
              <QuestionTypeSelect
                placeHolder="Seleccione un tipo de pregunta"
                value={{
                  value: QuestionState.data.idQuestionType,
                  label: QuestionState.data.questionTypeName
                } as option}
                onChange={(option: {value: string, label: string}) => handleSelectChange3(option)}
              />
            </Grid> 
            <Grid item xs={12} md={6}>
            <SoftTypography variant="subtitle1" fontWeight="bold">
              Seleccionar un Catalogo de Preguntas
            </SoftTypography>
            <CatalogQuestionSelect 
            placeHolder="Seleccione un tipo de pregunta"
            onChange={(option: { value: string; label: string }) => handleSelectChange4(option)}
            value={{
              value: QuestionState.data.idCatalogQuestion,
              label: QuestionState.data.catalogName
            }}
            isDisabled={!isCatatalogQuestionTypeSelected}
            />
          </Grid>
            <Grid item xs={12} md={6}>
            <SoftTypography variant="subtitle1" fontWeight="bold">
                Nombre ES
              </SoftTypography>
              <SoftInput type="text" placeholder="Nombre ES" label="questionTextES" 
                  value={QuestionState.data?.questionTextES} 
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event, 'questionTextES')} 
              />
            </Grid>
            <Grid item xs={12} md={6}>
            <SoftTypography variant="subtitle1" fontWeight="bold">
                Nombre EN
              </SoftTypography>
              <SoftInput type="text" placeholder="Nombre EN" label="questionTextEN" 
                  value={QuestionState.data?.questionTextEN} 
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event, 'questionTextEN')} 
              />
            </Grid>
            <Grid item xs={12} md={6}>
            <SoftTypography variant="subtitle1" fontWeight="bold">
                Orden
              </SoftTypography>
              <SoftInput type="number" placeholder="Orden" label="order"
               value={QuestionState.data?.order} 
               onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event, 'order')} 
               />
            </Grid>
            <Grid item xs={12} md={6}>
              <SoftTypography variant="subtitle1" fontWeight="bold">
                Obligatorio
              </SoftTypography>
              <Checkbox
                  checked={QuestionState.data.isRequired}
                  onChange={handleCheckboxChange}
                  sx={checkboxStyles.styleOverrides.root}
                  defaultChecked
                  
                  />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <SoftButton onClick={() => hideModalEdit()} color="secondary">
            Cancelar
          </SoftButton>
          <SoftButton 
            onClick={editQuestionState.loading ? null : editRegister} 
            color="primary" 
          >
            Guardar
          </SoftButton>
        </DialogActions>
      </Dialog>
    </SoftBox>
  );
}
