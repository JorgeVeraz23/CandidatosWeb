import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "app/redux/hooks";
import { useLocation, useNavigate } from "react-router-dom";
import { CircularProgress, Grid, Card, Box, Typography, Button, Collapse, Avatar, CardContent } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import DescriptionIcon from '@mui/icons-material/Description';
import { styled } from '@mui/system';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
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

const ProposalCard = styled(Card)({
  padding: 16,
  borderRadius: 12,
  backgroundColor: '#ffffff',
  boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
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
            <AccessibilityIcon style={{ marginLeft: '8px' }} />
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
                 <b>Edad:</b>  {candidatoData.edad}
                </Typography>
                <Typography variant="body1" gutterBottom>
                 <b>Lugar de Nacimiento:</b>  {candidatoData.lugarDeNacimiento}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <b>Información de Contacto:</b> {candidatoData.informacionDeContacto}
                </Typography>
                <Typography variant="body1" gutterBottom>
                 <b>Partido:</b>  {candidatoData.nombrePartido}
                </Typography>
                <Typography>
                    <b>Cargo al que aspira:</b> {candidatoData.cargo}
                </Typography>
                <Button
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="Ver más detalles"
                  endIcon={expanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                  size="small"
                >
                  {expanded ? 'Ocultar Propuestas' : 'Ver Propuestas'}
                </Button>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                  <Box sx={{ mt: 2, width: '100%' }}>
                    <Typography variant="h2" gutterBottom>
                      Propuestas
                    </Typography>
                    <Grid container spacing={2}>
                      {candidatoData.propuestas.map((propuesta, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                          <ProposalCard>
                            <CardContent>
                              <Typography variant="h6" gutterBottom>
                                <DescriptionIcon style={{ verticalAlign: 'middle', marginRight: 8 }} />
                                {propuesta.titulo}
                              </Typography>
                              <Typography variant="body1">
                                {propuesta.descripción}
                              </Typography>
                            </CardContent>
                          </ProposalCard>
                        </Grid>
                      ))}
                    </Grid>
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
