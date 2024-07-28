import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "app/redux/hooks";
import { useLocation, useNavigate } from "react-router-dom";
import { CircularProgress, Grid, Card, Box, Typography, Button, Collapse, Avatar } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { styled } from '@mui/system';

import { getCandidatoConDetalleById } from "app/redux/actions/CandidatoActions/CandidatoActions";
import { EditCandidatoConDetalleEntity } from "app/api/domain/entities/CandidatoEntities/CandidatoEntity";

interface MostrarTaskDetailProps {
  // Define las props necesarias aquí, si es necesario
}

const StyledCard = styled(Card)({
  padding: 24,
  borderRadius: 16,
  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: '#f5f5f5',
});

const CandidateImage = styled(Avatar)({
  width: 200,
  height: 200,
  borderRadius: '50%',
  boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
  marginBottom: 16,
});

const MostrarCandidatoConDetalle: React.FC<MostrarTaskDetailProps> = (props) => {
  const location = useLocation();
  const { state } = location;
  const id = state?.id;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const getCandidatoConDetalleState = useAppSelector(state => state.obtenerCandidatoConDetalle);

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    if (getCandidatoConDetalleState) {
      setLoading(false);
    }
  }, [getCandidatoConDetalleState]);

  const handleBackButtonClick = () => {
    navigate('/app/candidatos/mostrar-candidato');
  }

  const init = () => {
    setLoading(true);
    if (id) {
      dispatch(getCandidatoConDetalleById(id));
    } else {
      setLoading(false);
    }
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // Verificación de tipo y acceso a datos
  let candidatoData: EditCandidatoConDetalleEntity | undefined;
  if (getCandidatoConDetalleState.data) {
    candidatoData = getCandidatoConDetalleState.data;
  }

  return (
    <SoftBox mb={3}>
      {loading ? (
        <Grid container justifyContent="center" alignItems="center" sx={{ height: "calc(100vh - 154px)" }}>
          <CircularProgress size={20} style={{ color: "white" }} />
        </Grid>
      ) : (
        <SoftBox my={1} sx={{ minHeight: "calc(100vh - 260px)" }}>
          <SoftBox display="flex" justifyContent="flex-end" mb={2}>
            <SoftButton onClick={handleBackButtonClick} color="primary">
              <WorkspacesIcon />
              Ver Candidatos
            </SoftButton>
          </SoftBox>
          <StyledCard>
            {candidatoData && (
              <>
                <CandidateImage src={candidatoData.fotoUrl} alt={candidatoData.nombreCandidato} />
                <Typography variant="h5" gutterBottom>
                  {candidatoData.nombreCandidato}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {candidatoData.cargo}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Edad: {candidatoData.edad}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Lugar de Nacimiento: {candidatoData.lugarDeNacimiento}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Información de Contacto: {candidatoData.informacionDeContacto}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Partido: {candidatoData.nombrePartido}
                </Typography>
                <Button
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="Ver más detalles"
                  endIcon={expanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                  size="small"
                >
                  {expanded ? 'Ocultar Detalles' : 'Ver Detalles'}
                </Button>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                  <Box sx={{ mt: 2, width: '100%' }}>
                    <Typography variant="h6" gutterBottom>
                      Propuestas
                    </Typography>
                    {candidatoData.propuestas.map((propuesta, index) => (
                      <Box key={index} sx={{ mb: 2 }}>
                        <Typography variant="body1"><strong>Título:</strong> {propuesta.titulo}</Typography>
                        <Typography variant="body1"><strong>Descripción:</strong> {propuesta.descripcion}</Typography>
                      </Box>
                    ))}
                  </Box>
                </Collapse>
              </>
            )}
          </StyledCard>
        </SoftBox>
      )}
    </SoftBox>
  );
}

export default MostrarCandidatoConDetalle;
