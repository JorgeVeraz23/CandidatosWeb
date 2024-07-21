import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from 'app/redux/hooks';
import { createClient, getAllClientes } from 'app/redux/actions/ClientsActions/ClientsActions';
import { CreateClientEntity, EnumTypeDocument } from 'app/api/domain/entities/ClientEntities/ClientEntity';
import { createClientSlice } from 'app/redux/slices/clients/CreateClientSlice';
import { Box, Card, Grid, CircularProgress, Typography, Divider } from '@mui/material';
import TypeDocumentSelect from 'components/TypeDocumentsSelect';
import SoftBox from 'components/SoftBox';
import SoftTypography from 'components/SoftTypography';
import SoftButton from 'components/SoftButton';
import SoftInput from 'components/SoftInput';
import { showAlertAsync } from 'layouts/pages/sweet-alerts/components/CustomAlert';
import { getTodayDateStr } from 'app/utils/utils';

export default function CreateInspectionOrder() {
    const createClientState = useAppSelector(state => state.createClient);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [dynamicComponent, setDynamicComponent] = useState(buildText());
    const [createClientData, setCreateClientData] = useState<CreateClientEntity>({
        nameClient: '',
        typeDocument: EnumTypeDocument.CED,
        dniNumber: '',
        textTypeDocument: ''
    });

    useEffect(() => {
        if(createClientState.loading) {
            setDynamicComponent(buildLoading);
        } else if(createClientState.error) {
            setDynamicComponent(buildText);
            showAlertAsync({
                title: 'Error',
                icon: 'error',
                html: createClientState.error,
            });
            dispatch(createClientSlice.actions.resetState());
        } else if(createClientState.data) {
            setDynamicComponent(buildText);
            showAlertAsync({
                title: 'Éxito',
                icon: 'success',
                html: 'Creación exitosa',
            });
            dispatch(createClientSlice.actions.resetState());
            dispatch(getAllClientes());
            setCreateClientData({
                nameClient: '',
                typeDocument: EnumTypeDocument.CED,
                dniNumber: '',
                textTypeDocument: ''
            });
        }
    }, [createClientState]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, field: keyof CreateClientEntity) => {
        setCreateClientData(prevData => ({
            ...prevData,
            [field]: event.target.value
        }));
    };

    const handleSelectChange = (option: { value: string, label: string }) => {
        handleSetClientData(option.value, 'typeDocument')
    };

    const handleSetClientData = (value: string, field: keyof CreateClientEntity) => {
        setCreateClientData(prevData => ({
            ...prevData,
            [field]: Number(value)
        }));
    };

    const createRegister = () => {
        if(createClientData.dniNumber === '' || createClientData.nameClient === '') {
            showAlertAsync({
                title: 'Error',
                icon: 'error',
                html: 'Todos los campos son obligatorios',
            });
            return;
        }
        dispatch(createClient(createClientData));
    };

    const handleBackButtonClick = () => {
        navigate('/app/catalogos/mostrar-clientes');
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
                Crear un nuevo cliente
            </SoftTypography>
        );
    }

    function buildLoading() {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
            >
                <CircularProgress size={20} style={{ color: 'white' }}/>
            </Box>
        );
    }

    return (
        <SoftBox my={2} mx={3}>
            <SoftBox display="flex" justifyContent="flex-end" mb={2}>
                    <SoftButton color="info" onClick={handleBackButtonClick}>
                        Ver Clientes
                    </SoftButton>
                </SoftBox>
            <Card id="basic-info" sx={{ overflow: 'visible', padding: '20px' }}>
                <Box component="form" pb={3} px={3}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography variant="h5" fontWeight="bold" gutterBottom>
                                Crear Clientes
                            </Typography>
                            <Divider sx={{ borderColor: 'rgba(0, 0, 0, 0.87)', borderWidth: '2px', width: '20%' }} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Box mt={2}>
                                <SoftTypography variant="subtitle1" fontWeight="bold">
                                    Tipo de Documento
                                </SoftTypography>
                                <TypeDocumentSelect 
                                    placeHolder="Seleccione un cliente"
                                    onChange={(option: {value: string, label: string}) => handleSelectChange(option)}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Box mt={2}>
                                <SoftTypography variant="subtitle1" fontWeight="bold">
                                    DNI
                                </SoftTypography>
                                <SoftInput 
                                    type="text" 
                                    placeholder="DNI" 
                                    value={createClientData.dniNumber} 
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event, 'dniNumber')} 
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Box mt={2}>
                                <SoftTypography variant="subtitle1" fontWeight="bold">
                                    Nombre de Cliente
                                </SoftTypography>
                                <SoftInput 
                                    type="text" 
                                    placeholder="Nombre" 
                                    value={createClientData.nameClient} 
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event, 'nameClient')} 
                                />
                            </Box>
                        </Grid>
                    </Grid>
                    <Box mt={3}>
                        <SoftButton 
                            color="primary"
                            onClick={createClientState.loading ? null : createRegister }
                            variant="contained"
                            fullWidth
                        >
                            {dynamicComponent}
                        </SoftButton>
                    </Box>
                </Box>
            </Card>
        </SoftBox>
    );
}
