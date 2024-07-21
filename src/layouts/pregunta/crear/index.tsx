import React, { useState, ChangeEvent, useEffect } from "react";
import SoftInput from "components/SoftInput";
// @mui material components
// Soft UI Dashboard PRO React components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import { useAppSelector } from "app/redux/hooks";
import { useDispatch } from "react-redux";
import { Box, Card, Checkbox, Divider, Grid } from "@mui/material";
import { GroupQuestionChanged } from "app/redux/slices/InspectionForm/groupQuestions/GetGroupQuestionFormByIdSlice";
import Select from "react-select";
import { getAllGroupQuestionsForm } from "app/redux/actions/GroupQuestionsFormActions";
import SoftButton from "components/SoftButton";
import { useNavigate } from "react-router-dom";
import { showAlertAsync } from "layouts/pages/sweet-alerts/components/CustomAlert";
import { QuestionEntity } from "app/api/domain/entities/QuestionRepository/QuestionEntity";
import { getQuestionSlice } from "app/redux/slices/question/GetQuestionsById";
import { createQuestion } from "app/redux/actions/QuestionActions/QuestionActions";
import { GroupFormSelect } from "components/FormularioSelect/groupFormSelect";
import FormSelect, { option } from "components/FormularioSelect";
import QuestionTypeSelect from "components/QuestionTypeSelect/questionTypeSelect";
import checkboxStyles from "assets/theme/components/form/checkbox";
import { getAllQuestionsForm } from "app/redux/actions/QuestionActions/QuestionActions";
import CatalogQuestionSelect from "components/CatalogoSelect";



const CreateQuestion = () => {
  const [isFormSelected, setIsFormSelected] = useState(false); // Estado para controlar si se ha seleccionado un formulario
  const { data: questionState, isLoading, response } = useAppSelector((state) => state.getQuestion);
  const isLoaded = isLoading.create;
  const { data } = useAppSelector((state) => state.getAllGroupQuestion);
  const questionListState = useAppSelector((state) => state.getAllQuestion.data);
  const [isCatatalogQuestionTypeSelected, setIsCatalogQuestionTypeSelected] = useState(false);

  const [createQuestionData, setCreateQuestionData] = useState<QuestionEntity>({
    idQuestionForm: 0,
    idInspectionForm: 0,
    idGroupQuestionForm: 0,
    idQuestionType: 0,
    idQuestionValidation: 0, 
    idCatalogQuestion: 0,
    questionTextES: '',
    questionTextEN: '',
    isRequiredDesc: '',
    isMultipleSelectDesc: '',
    inReportPDFDesc: '',
    isRequired: false,
    isMultipleSelect: false,
    inReportPDF: false,
    groupQuestionName: '',
    formName: '',
    order: 0,
    questionTypeName: '',
    catalogName: '',

});

  const [selectedGroupQuestionForm, setGroupQuestionForm] = useState<option | null>({
    value: "",
    label: "",
  });
  const [selectedForm, setSelectedForm] = useState<option | null>({
    value: "",
    label: "",
  });
  const [selectedQuestion, setSeletedQuestion] = useState<option | null>({
    value: "",
    label: "",
  });

  const [selectedCatalog, setSelectedCatalog] = useState<option | null>({
    value: "",
    label: "",
  })

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setLoading(true); // Comienza la carga
  //     await dispatch(getAllGroupQuestionsForm());
  //     setLoading(false); // Finaliza la carga
  //   };
  //   fetchData();
  // }, []);

  const [filteredFormList, setFilteredFormList] = useState<any[]>([]);
  const [isRequired, setIsRequired] = useState(false); // Estado para controlar si la pregunta es obligatoria

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  useEffect(() => {
    dispatch(getQuestionSlice.actions.resetState());
    setFilteredFormList(questionListState);
  }, []);
  
  useEffect(() => {
    dispatch(getAllQuestionsForm());
  }, []);
  
  useEffect(() => {
    if (!isLoaded) {
      if (!response.success && !isLoaded) {
        showAlertAsync({
          title: "Error",
          icon: "error",
          html: response.message,
        }).then(() => {
          
        });
      } else if (response.message) {
        showAlertAsync({
          title: "Éxito",
          icon: "success",
          html: response.message,
        }).then(() => {
          dispatch(getQuestionSlice.actions.resetStateInput());
        });
      }
    }
  }, [isLoaded, response]);

  const [selectedValue, setSelectedValue] = useState({
    value: 0,
    label: "Elija un grupo pregunta",
  });
  /*  const handleSelectChange = (value: number, label: string) => {

        if(value && label){
            setSelectedValue({value,label});
            dispatch(getQuestionSlice.actions.modifyStateBySelect(value));
        }
    }*/
  // Filtrar los datos de formulario cuando cambie el formulario seleccionado
  useEffect(() => {
    if (selectedForm !== null) {
      const filteredForms = questionListState.filter(
        (form) => form.idInspectionForm === (selectedForm.value as number)
      );
      setFilteredFormList(filteredForms);
    }
    if (selectedGroupQuestionForm !== null) {
      const filteredForms = questionListState.filter(
        (form) => form.idGroupQuestionForm === (selectedGroupQuestionForm as unknown as number)
      );
      setFilteredFormList(filteredForms);
    }
  }, [selectedGroupQuestionForm, selectedForm, questionListState]);
  //--------------

  const handleSelectChange = (option: { value: string; label: string }) => {
    setGroupQuestionForm(option);
    // Crea un nuevo objeto con las propiedades field y value
    const updatedQuestionState = {
      field: "idGroupQuestionForm",
      value: option.value,
    };
    dispatch(getQuestionSlice.actions.modifyStateByInput(updatedQuestionState));
  };

  const handleSelectChange2 = (option: { value: string; label: string }) => {
    setSelectedForm(option);
    // Crea un nuevo objeto con las propiedades field y value
    const updatedQuestionState = {
      field: "idInspectionForm",
      value: option.value,
    };
    dispatch(getQuestionSlice.actions.modifyStateByInput(updatedQuestionState));
    setIsFormSelected(true);
  };

  const handleSelectChange3 = (option: { value: string; label: string }) => {
    setSeletedQuestion(option);
    // Crea un nuevo objeto con las propiedades field y value
    const updatedQuestionState = {
      field: "idQuestionType",
      value: option.value,
    };
    dispatch(getQuestionSlice.actions.modifyStateByInput(updatedQuestionState));
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
    setSeletedQuestion(option);
    const updatedQuestionState = {
      field: "idCatalogQuestion",
      value: option.value,
    };
    dispatch(getQuestionSlice.actions.modifyStateByInput(updatedQuestionState));
  }

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsRequired(event.target.checked); // Actualiza el estado de isRequired al marcar o desmarcar el checkbox
  };

  function handleInputChange(event: ChangeEvent<HTMLInputElement>, field: string) {
    dispatch(
      getQuestionSlice.actions.modifyStateByInput({
        field,
        value: event.target.value,
      } as GroupQuestionChanged)
    );
  }

  // Función para limpiar los campos
  const clearFields = () => {
    // setGroupQuestionForm(null);
    // setSelectedForm({
    //   value: "",
    //   label: "",
    // });
    // setSeletedQuestion(null);

    //setIsRequired(false);
    //dispatch(getQuestionSlice.actions.resetState());
  };



  const createRegister = () => {
    // Antes de enviar la solicitud, incluye el estado isRequired actualizado en los datos de la pregunta
    const requestData = {
      ...questionState,
      isRequired: isRequired,
    };
    try {
      dispatch(createQuestion(requestData));
      //dispatch(getQuestionSlice.actions.resetState());
      //clearFields(); // Limpia los campos después de agregar la pregunta
    } catch (ex) {
      console.log(ex);
    }
    // dispatch(getAllGroupQuestionFormSlice.actions.addStateByItem(groupQuestionState.data))
  };
  const handleBackButtonClick = () => {
    navigate("/app/pregunta/preguntas");
  };
  return (
    <SoftBox my={3}>
      <SoftBox display="flex" justifyContent="flex-end" mb={2}>
        <SoftButton color="info" onClick={handleBackButtonClick}>
          Ver Pregunta
        </SoftButton>
      </SoftBox>
      <Card sx={{ padding: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <SoftTypography variant="h5" fontWeight="bold" gutterBottom>
              Crear Pregunta
            </SoftTypography>
            <Divider
              sx={{ borderColor: "rgba(0, 0, 0, 0.87)", borderWidth: "2px", width: "20%" }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <SoftTypography variant="subtitle1" fontWeight="bold">
              Seleccionar Formulario
            </SoftTypography>
            <FormSelect
              id="formSelect"
              placeholder="Seleccionar Formulario"
              value={selectedForm}
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
              value={selectedGroupQuestionForm}
              onChange={handleSelectChange}
              isDisabled={!isFormSelected}
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <SoftTypography variant="subtitle1" fontWeight="bold">
              Seleccionar un Tipo de Preguntas
            </SoftTypography>
            <QuestionTypeSelect
              placeHolder="Seleccione una pregunta"
              onChange={(option: { value: string; label: string }) => handleSelectChange3(option)}
              value={selectedQuestion}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <SoftTypography variant="subtitle1" fontWeight="bold">
              Seleccionar un Catalogo de Preguntas
            </SoftTypography>
            <CatalogQuestionSelect 
            placeHolder="Seleccione un tipo de pregunta"
            onChange={(option: { value: string; label: string }) => handleSelectChange4(option)}
            value={selectedQuestion}
            isDisabled={!isCatatalogQuestionTypeSelected}
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <SoftTypography variant="subtitle1" fontWeight="bold">
              Texto ES
            </SoftTypography>
            <SoftInput
              type="text"
              placeholder="Texto ES"
              label="Texto ES"
              value={questionState?.questionTextES}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                handleInputChange(event, "questionTextES")
              }
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <SoftTypography variant="subtitle1" fontWeight="bold">
              Texto EN
            </SoftTypography>
            <SoftInput
              type="text"
              placeholder="Texto EN"
              label="Texto EN"
              value={questionState?.questionTextEN}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                handleInputChange(event, "questionTextEN")
              }
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <SoftTypography variant="subtitle1" fontWeight="bold">
              Orden
            </SoftTypography>
            <SoftInput
              type="number"
              placeholder="Orden"
              label="Orden"
              value={questionState?.order}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                handleInputChange(event, "order")
              }
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <SoftTypography variant="subtitle1" fontWeight="bold">
              Obligatorio
            </SoftTypography>
            <Checkbox
              checked={isRequired}
              onChange={handleCheckboxChange}
              sx={checkboxStyles.styleOverrides.root}
              // defaultChecked
            />
          </Grid>

          <Grid item xs={12}>
            <SoftButton onClick={createRegister} color="primary">
              Guardar
            </SoftButton>
          </Grid>
        </Grid>
      </Card>
    </SoftBox>
  );
};

export default CreateQuestion;
