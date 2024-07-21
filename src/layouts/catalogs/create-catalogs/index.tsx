import { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from "app/redux/hooks";
import { createCatalogueQuestionSlice } from 'app/redux/slices/catalogQuestion/CreateCatalogueQuestionSlice';
import { CreateCatalogQuestionEntity } from "app/api/domain/entities/CatalogQuestionEntities/CatalogQuestionEntity";
import { 
    getAllCatalogQuestion , 
    createCatalogQuestion , 
} from 'app/redux/actions/CatalogQuestionActions/CatalogQuestionActions';
import { Box, Card, Grid, CircularProgress, Divider } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import SoftInput from "components/SoftInput";
import { showAlertAsync } from "layouts/pages/sweet-alerts/components/CustomAlert";

export default function CreateCatalogQuestion() {
    const createCatalogueQuestionState = useAppSelector(state => state.createCatalogQuestion);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [dynamicComponent, setDynamicComponent] = useState(buildText());
    const [createCatalogueQuestionData, setCreateCatalogueQuestionData] = useState<CreateCatalogQuestionEntity>({
        catalogName: '',
    });

    useEffect(() => {
        if(createCatalogueQuestionState.loading){
            setDynamicComponent(buildLoading);
        } else if(createCatalogueQuestionState.error) {
            setDynamicComponent(buildText);
            showAlertAsync({
                title: 'Error', 
                icon: 'error', 
                html: createCatalogueQuestionState.error,
            });
            dispatch(createCatalogueQuestionSlice.actions.resetState());
        } else if(createCatalogueQuestionState.data) {
            setDynamicComponent(buildText);
            showAlertAsync({
                title: 'Éxito', 
                icon: 'success', 
                html: 'Creación exitosa',
            });
            dispatch(createCatalogueQuestionSlice.actions.resetState());
            dispatch(getAllCatalogQuestion());
            clearForm();
        }
    }, [createCatalogueQuestionState]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, field: keyof CreateCatalogQuestionEntity) => {
        setCreateCatalogueQuestionData((prevData) => ({
            ...prevData,
            [field]: event.target.value
        }));
    };

    const createRegister = () => {
        if(createCatalogueQuestionData.catalogName.trim() === ''){
            showAlertAsync({
                title: 'Error', 
                icon: 'error', 
                html: 'El nombre del catálogo es obligatorio',
            });
            return;
        }
        dispatch(createCatalogQuestion(createCatalogueQuestionData))
    };

    const handleBackButtonClick = () => {
        navigate('/app/catalogos/mostrar-selectores');
    }

    const clearForm = () => {
        setCreateCatalogueQuestionData({
            catalogName: '',
        });
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
                Crear catálogo de preguntas
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
                        Ver Catalogos
                    </SoftButton>
                </SoftBox>
            <Card id="basic-info" sx={{ overflow: "visible", padding: "20px" }}>
                <SoftBox component="form" pb={3} px={3}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <SoftTypography variant="h5" fontWeight="bold" gutterBottom>
                                Crear Catálogo de Preguntas
                            </SoftTypography>
                            <Divider sx={{ borderColor: 'rgba(0, 0, 0, 0.87)', borderWidth: '2px', width: '25%' }} />
                        </Grid>
                        <Grid item xs={12}>
                            <SoftTypography variant="subtitle1" fontWeight="bold">
                                Nombre del Catálogo
                            </SoftTypography>
                            <SoftInput 
                                type="text" 
                                placeholder="Nombre del Catálogo" 
                                value={createCatalogueQuestionData.catalogName} 
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event, 'catalogName')} 
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                    <Grid container justifyContent="flex-end" mt={3}>
                        <Grid item xs={3}>
                            <SoftBox display="flex" justifyContent="flex-end">
                                <SoftButton 
                                    color="primary"
                                    sx={{width: '180px'}}
                                    onClick={createCatalogueQuestionState.loading ? null : createRegister }
                                >
                                    {dynamicComponent}
                                </SoftButton>
                            </SoftBox>
                        </Grid>
                    </Grid>
                </SoftBox>
            </Card>
        </SoftBox>
    );
}
