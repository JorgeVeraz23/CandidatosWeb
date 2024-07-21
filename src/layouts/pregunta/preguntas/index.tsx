import React, { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'app/redux/hooks';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Card, Tooltip, Typography } from '@mui/material';
import { showAlertAsync } from 'layouts/pages/sweet-alerts/components/CustomAlert';
import { deleteQuestionById, getAllQuestionsForm, getQuestionById } from 'app/redux/actions/QuestionActions/QuestionActions';
import GetQuestionsSlice, { getAllQuestionSlice } from 'app/redux/slices/question/GetQuestionsSlice';
import CustomButton from 'components/CustomButton';
import DataTable from 'examples/Tables/DataTable';
import { EditModal } from './components/editModal';
import AddRedirectButton from './components/addRedirectButton';
// import FiltersTable from './components/filtersTable';
import { GroupFormSelect } from 'components/FormularioSelect/groupFormSelect';
import FormSelect from 'components/FormularioSelect';
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import checkbox from "assets/theme/components/form/checkbox";
import checkboxStyles  from "assets/theme/components/form/checkbox";
import { deleteQuestionSlice } from 'app/redux/slices/question/DeleteQuestionSlice';
import SoftTypography from "components/SoftTypography"
import GetQuestionsById, { getQuestionSlice } from 'app/redux/slices/question/GetQuestionsById';
const Index = () => {
  const [isFormSelected, setIsFormSelected] = useState(false); // Estado para controlar si se ha seleccionado un formulario

  const questionListState = useAppSelector(state => state.getAllQuestion.data);
  const deleteQuestioState = useAppSelector(state => state.deleteQuestion)
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [selectedGroupQuestionForm, setGroupQuestionForm] = useState<string | null>(null);
  const [selectedForm, setSelectedForm] = useState<string | null>(null);
  const [newSelectedGroupQuestionFrom, newSetSelectedGroupQuestionForm] = useState<string | null>(null);
  const [newSelectedForm, setNewSelectedForm] = useState<string | null> (null);
  const [filteredFormList, setFilteredFormList] = useState<any[]>([]);
  const [isDisponible , setIsDisponible] = useState<boolean>(false);
  const dispatch = useDispatch();
  const tableRef = useRef(null); // Crear la referencia
  const [selectedQuestionFormId, setSelectedQuestionFormId] = useState<number | null>(null);
  
  const [filterData, setFilterData] = useState<any>({
    // Aquí puedes definir el estado de los filtros
  });
  

  useEffect(() => {
    dispatch(getAllQuestionsForm());
    setFilteredFormList(questionListState)
    // Limpiar filtros y datos al desmontar el componente
    return () => {
      setGroupQuestionForm(null);
      setSelectedForm(null);
      setFilteredFormList([]);
    };
  }, []);
  


  // Filtrar los datos de formulario cuando cambie el formulario seleccionado
  useEffect(() => {
    if(selectedForm !== null){
      const filteredForms = questionListState.filter(form => form.idInspectionForm === (selectedForm as unknown as number));
      setFilteredFormList(filteredForms);
      setNewSelectedForm(selectedForm);
    }
    if (selectedGroupQuestionForm !== null) {
      const filteredForms = questionListState.filter(form => form.idGroupQuestionForm === (selectedGroupQuestionForm as unknown as number));
      setFilteredFormList(filteredForms);
    }
    if(newSelectedForm != selectedForm){
      const filteredForms = questionListState.filter(form => form.idInspectionForm === (selectedForm as unknown as number));
      setFilteredFormList(filteredForms);
      setGroupQuestionForm(null);
    }
  }, [selectedGroupQuestionForm, selectedForm, questionListState]);



  // const showModalEdit = (id: number) => {
  //   dispatch(getQuestionById(id));
  //   setOpenModalEdit(true);
  // };
  const showModalEdit = (id: number) => {
    dispatch(getQuestionById(id));
    setSelectedQuestionFormId(id); // Establecer idQuestionForm en el estado
    setOpenModalEdit(true);
  };
  const confirmDelete = (id: number) => {
    showAlertAsync({
      title: 'Advertencia',
      icon: 'warning',
      html: '¿Estás seguro que quieres eliminar este registro?',
      showCancelButton: true,
      confirmButtonText: 'Sí, seguro',
      cancelButtonText: 'Cancelar',
      onConfirm: () => deleteRegister(id),
    });
  };

  useEffect(() => {
    if (deleteQuestioState.error) {
      showAlertAsync({
        title: 'Error',
        icon: 'error',
        html: deleteQuestioState.error,
      });
      dispatch(deleteQuestionSlice.actions.resetState());
    } else if (deleteQuestioState.data) {
      showAlertAsync({
        title: 'Éxito',
        icon: 'success',
        html: 'Registro eliminado con éxito',
      });
      dispatch(deleteQuestionSlice.actions.resetState());
      dispatch(getAllQuestionsForm());
    }
  }, [deleteQuestioState]);

  const handleSelectChange = (option: { value: string, label: string }) => {
    setGroupQuestionForm(option.value);
  };

  const onchageHandeSelectChage2 = async() => {
    
  } 
  const handleSelectChange2 = (option: { value: string, label: string }) => {
    setSelectedForm(option.value);
    setIsFormSelected(true);

  };


  const deleteRegister = (id: number) => {
    dispatch(deleteQuestionById(id));
    dispatch(getAllQuestionSlice.actions.deleteStateById(id));
  };

  return (
    <>
      <EditModal openModalEdit={openModalEdit} setOpenModalEdit={setOpenModalEdit} selectedQuestionFormId={selectedQuestionFormId} // Pasa el idQuestionForm al modal
/>
      <Box mb={3}>
        <Box display="flex" justifyContent="space-between" mb={2}>
          {/* <FiltersTable /> */}
          <AddRedirectButton />
        </Box>
        <Box mb={3}>
          <Card>
            <Box display="flex" justifyContent="flex-end" px={2} py={1}>
            <Box mr={2}>
            <SoftTypography>
              Filtrar Elementos a mostrar:
              </SoftTypography>
            </Box>
              <Box mr={2}>
              <FormSelect
                placeholder='Filtrar por formulario'
                onChange={handleSelectChange2}
                canModifyGroupQuestion={true}
              />
              </Box>
              <Box mr={2}>
              <GroupFormSelect
                placeholder='Filtrar por grupo pregunta'
                onChange={handleSelectChange}
                isDisabled={!isFormSelected}
              />
              </Box>
              
            </Box>
            
            <DataTable
              isSearchable={true}
              table={{
                columns: [
                  { Header: 'Texto ES', accessor: 'questionTextES', width: '30%' },
                  // { Header: 'Texto EN', accessor: 'questionTextEN', width: '20%' },
                  { Header: 'Requerido', accessor: 'isRequired', width: '30%' },
                  { Header: 'Order', accessor: 'order', width: '10%' },
                  { Header: 'Grupo pregunta', accessor: 'groupQuestionName', width: '10%' },
                  { Header: 'Formulario', accessor: 'formName', width: '10%' },
                  { Header: 'Tipo de Pregunta', accessor: 'questionTypeName', width: '10%' },
                  { Header: 'Catalogo', accessor: 'catalogName', width: '10%' },
                  // { Header: 'IsMultiple', accessor: 'isMultipleSelect', width: '10%' },
                  // { Header: 'InReportPDF', accessor: 'inReportPDF', width: '10%' },
                  { Header: 'Acciones', accessor: 'actions', width: '15%' },
                ],
                rows: filteredFormList.map(item => ({
                  id: item.idQuestionForm,
                  questionTextES: item.questionTextES,
                  // questionTextEN: item.questionTextEN,
                  order: item.order,
                  isRequired: item.isRequiredDesc,
                  groupQuestionName: item.groupQuestionName,
                  questionTypeName: item.questionTypeName,
                  formName: item.formName,
                  catalogName: item.catalogName,
                  // inReportPDF: item.inReportPDFDesc,
                  // isMultipleSelect: item.isMultipleSelectDesc,
                  actions: (
                    <SoftBox display="flex">
                    {/* Envuelve el SoftButton con Tooltip */}
                    
                             <SoftBox mr={1}>
                             <Tooltip title="Editar" arrow>
                                 <SoftButton
                                     variant="contained"
                                     color="primary"
                                     size="small"
                                     margin="0 2px"
                                     iconOnly
                                     onClick={() => showModalEdit(item.idQuestionForm)}
                                 >
                                     <EditIcon />
                                 </SoftButton>
                             </Tooltip>
                             </SoftBox>
                             <SoftBox >
                    <Tooltip title="Eliminar" arrow>
                                 <SoftButton
                                     variant="contained"
                                     color="error"
                                     size="small"
                                     iconOnly
                                     onClick={() => confirmDelete(item.idQuestionForm)}
                                 >
                                     <DeleteIcon />
                                 </SoftButton>
                             </Tooltip>
                             </SoftBox>
                 </SoftBox> 
                  ),
                })),
              }}
              myCustomRef={tableRef}
            />
        
          </Card>
        </Box>
      </Box>
    </>
  );
};

export default Index;
