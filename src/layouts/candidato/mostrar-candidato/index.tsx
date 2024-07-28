import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'app/redux/hooks';
import { useNavigate } from 'react-router-dom';
import { Grid, Card, CardContent, CardMedia, Typography, CircularProgress, Box, Tooltip, Button } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
// Soft UI Dashboard PRO React components
import SoftBox from 'components/SoftBox';
import SoftTypography from 'components/SoftTypography';

// Actions
import { getAllCandidato, getCandidatoConDetalleById } from 'app/redux/actions/CandidatoActions/CandidatoActions';

// Slices
import { getAllCandidatoSlice } from 'app/redux/slices/candidato/MostrarCandidatoSlice';
import { getCandidatoSlice } from 'app/redux/slices/candidato/ObtenerCandidatoSlice';
import { showAlertAsync } from 'layouts/pages/sweet-alerts/components/CustomAlert';
import { EditCandidatoConDetalleEntity } from 'app/api/domain/entities/CandidatoEntities/CandidatoEntity';

export default function CandidatoList() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const MostrarCandidatoState = useAppSelector(state => state.mostrarCandidato);

  const [selectedCandidatoDetail, setSelectedCandidatoDetail] = useState<EditCandidatoConDetalleEntity | null>(null);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    await handleResetData();
    dispatch(getAllCandidato());
  }

  const handleResetData = async () => {
    dispatch(getAllCandidatoSlice.actions.resetState());
  }

  const handleViewCandidatoDetail = async (id: number) => {
    try {
      const actionResult = await dispatch(getCandidatoConDetalleById(id));
      if (getCandidatoConDetalleById.fulfilled.match(actionResult)) {
        setSelectedCandidatoDetail(actionResult.payload);
        navigate(`/app/candidatos/mostrar-candidato-administrador-con-detalle`, { state: { idCandidato: id } });
      } else {
        console.error("No se pudo obtener la información del candidato");
      }
    } catch (error) {
      console.error("Error al obtener la información del candidato:", error);
    }
  };

  const renderList = () => {
    return (
      <Grid container spacing={4}>
        {MostrarCandidatoState.loading ? (
          <Grid item xs={12} sx={{ textAlign: 'center' }}>
            <CircularProgress />
          </Grid>
        ) : (
          MostrarCandidatoState.data?.map((candidato, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ maxWidth: 400, borderRadius: '15px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={candidato.fotoUrl}
                  alt={candidato.nombreCandidato}
                  sx={{ objectFit: 'contain' }}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {candidato.nombreCandidato}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {`Edad: ${candidato.edad}`}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {`Lugar de Nacimiento: ${candidato.lugarDeNacimiento}`}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {`Información de Contacto: ${candidato.informacionDeContacto}`}
                  </Typography>
                </CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                  <Tooltip title="Ver detalle">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleViewCandidatoDetail(candidato.idCandidato)}
                      startIcon={<Visibility />}
                    >
                      Ver
                    </Button>
                  </Tooltip>
                </Box>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    );
  };

  return (
    <SoftBox>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
        <SoftTypography variant="h1">Lista de Candidatos</SoftTypography>
      </Box>
      {renderList()}
    </SoftBox>
  );
}
