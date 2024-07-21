import React, { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'app/redux/hooks';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Card, CircularProgress, Tooltip } from '@mui/material'; // Agregar CircularProgress
import { showAlertAsync } from 'layouts/pages/sweet-alerts/components/CustomAlert';
import { deleteGroupQuestionsFormById, getAllGroupQuestionsForm, getGroupQuestionsFormById } from 'app/redux/actions/GroupQuestionsFormActions';
import { getAllGroupQuestionFormSlice } from 'app/redux/slices/InspectionForm/groupQuestions/GetGroupQuestionsFormSlice';
import CustomButton from 'components/CustomButton';
import DataTable from 'examples/Tables/DataTable';
import { EditModal } from './components/editModal';
import AddRedirectButton from './components/addRedirectButton';
import FiltersTable from './components/filtersTable';
import { DownloadTableExcel } from "react-export-table-to-excel";
import FormSelect from 'components/FormularioSelect';
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";

const Index = () => {
  const formListState = useAppSelector(state => state.getAllGroupQuestion.data);
  const inspectionFormList = useAppSelector(state => state.getAllForm.data) ?? [];
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [selectedForm, setSelectedForm] = useState<string | null>(null);
  const [filteredFormList, setFilteredFormList] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false); // Estado para el CircularProgress
  const dispatch = useDispatch();
  const tableRef = useRef(null);
  
  const [filterData, setFilterData] = useState<any>({});

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Comienza la carga
      await dispatch(getAllGroupQuestionsForm());
      setLoading(false); // Finaliza la carga
    };
    fetchData();
  }, []);
  

  useEffect(() => {
    if (selectedForm !== null) {
      const filteredForms = formListState.filter(form => form.idInspectForm === (selectedForm as unknown as number));
      setFilteredFormList(filteredForms);
    } else {
      setFilteredFormList(formListState);
    }
  }, [selectedForm, formListState]);

  const showModalEdit = (id: number) => {
    dispatch(getGroupQuestionsFormById(id));
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

  const handleSelectChange = (option: { value: string, label: string }) => {
    setSelectedForm(option.value);
  };

  const deleteRegister = (id: number) => {
    dispatch(deleteGroupQuestionsFormById(id));
    dispatch(getAllGroupQuestionFormSlice.actions.deleteStateById(id));
  };

  return (
    <>
      <EditModal openModalEdit={openModalEdit} setOpenModalEdit={setOpenModalEdit} />
      <Box mb={3}>
        <Box display="flex" justifyContent="flex-end" mb={2}>
          {/* <FiltersTable /> */}
          <AddRedirectButton />
        </Box>
        <Box mb={3}>
          <Card>
            <Box display="flex" justifyContent="flex-end" px={2} py={1}>
              <FormSelect
                placeholder='Filtrar por formulario'
                onChange={handleSelectChange}
              />
              
            </Box>
            {loading ? ( // Mostrar CircularProgress mientras se carga
              <Box display="flex" justifyContent="center" alignItems="center" height={200}>
                <CircularProgress />
              </Box>
            ) : (
              <DataTable
                table={{
                  columns: [
                    // { Header: 'ID', accessor: 'id', width: '15%' },
                    { Header: 'Nombre ES', accessor: 'nameES', width: '30%' },
                    { Header: 'Nombre EN', accessor: 'nameEN', width: '20%' },
                    { Header: 'Formulario', accessor: 'inspectionFormName', width: '30%' },
                    { Header: 'Orden', accessor: 'order', width: '10%' },
                    { Header: 'Acciones', accessor: 'actions', width: '15%' },
                  ],
                  rows: filteredFormList.map(item => ({
                    id: item.idGroupQuestionForm,
                    nameEN: item.nameGroupEN,
                    nameES: item.nameGroupES,
                    inspectionFormName: item.nameInspectionForm,
                    order: item.orderGroup,
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
                                       onClick={() => showModalEdit(item.idGroupQuestionForm)}
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
                                       onClick={() => confirmDelete(item.idGroupQuestionForm)}
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
            )}
          </Card>
        </Box>
      </Box>
    </>
  );
};

export default Index;
