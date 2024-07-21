import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import { useDispatch } from "react-redux";
import { useAppSelector } from "app/redux/hooks";
import { getRoles } from "app/redux/actions/CatalogueActions";
import { Divider, Grid, IconButton } from "@mui/material";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import axios from "axios"; 
import SoftAlert from "components/SoftAlert";
import SoftSelect from "components/SoftSelect";
import { URL_API } from 'app/api/urls/urls';
import image2 from "assets/images/ecommerce/chair-pink.jpeg";
import logobanacheck from "assets/images/illustrations/logo-banacheck.png";

function Illustration() {
  const [agreement, setAgreement] = useState<boolean>(true);
  const [email, setEmail] = useState<string>("");
  const [firstname, setFirstName] = useState<string>("");
  const [lastname, setLastName] = useState<string>("");
  const [rolName, setRolName] = useState<string>("");
  const [identificacion, setIdentificacion] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState<boolean>(false);
  const [showErrorAlert, setShowErrorAlert] = useState<boolean>(false);
  const [messageApi, setMessageApi] = useState<string>("");
  const [passwordIsValid, setPasswordIsValid] = useState<boolean>(true);
  const [passwordTouched, setPasswordTouched] = useState<boolean>(false);
  const catalogueRoleState = useAppSelector(state => state.catalogueRol);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [currentImage, setCurrentImage] = useState(image2);
  const [imgsViewer, setImgsViewer] = useState(false);
  const [imgsViewerCurrent, setImgsViewerCurrent] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSetCurrentImage = ({ currentTarget }) => {
    setCurrentImage(currentTarget.src);
    setImgsViewerCurrent(Number(currentTarget.id));
  };

  useEffect(() => {
    if(!catalogueRoleState.loading && catalogueRoleState.data === null){
      dispatch(getRoles());
    } else if(catalogueRoleState.error){
      console.log(catalogueRoleState.error);
    }
  }, [catalogueRoleState]);

  const handleSelectChange = (option: { label: string, value: string }) => {
    setRolName(option.label);
  };

  const handleSignUp = async () => {
    setShowErrorAlert(false);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No se encontró el token en el almacenamiento local.");
        return;
      }
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      const requestData = {
        UserName: email,
        FirstName: firstname,
        LastName: lastname,
        RolName: rolName, 
        Identificacion: identificacion,
        PhoneNumber: phoneNumber,
        Password: password
      }
      const url = `${URL_API}Security/RegisterByAdmin`;
      const response = await axios.post(url, requestData, config);
      console.log(response);
      setIsRegistered(true);
      setMessageApi
      setShowSuccessAlert(true);
    }
    catch (error) {
      console.error("Error al registrar usuario:", error);
      console.log(error.response?.data?.message);
      setShowErrorAlert(true);
      setMessageApi(error.response?.data?.message ?? "Error al registrar usuario. Por favor, revise los datos ingresados e inténtelo de nuevo.");
    }
  }

  // if (isRegistered) {
  //   setTimeout(() => {
  //     navigate('/inicio/bienvenida');
  //   }, 2000);
  // }

  const handleSetAgreement = () => setAgreement(!agreement);

  const validatePassword = (value: string) => {
    const regex = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    setPassword(value);
    setPasswordTouched(true);
    setPasswordIsValid(regex.test(value));
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <SoftBox display="flex" justifyContent="center" alignItems="center" minHeight="100vh" backgroundColor="#f0f2f5">
      <SoftBox maxWidth="800px" width="100%" padding="20px" boxShadow="0px 4px 10px rgba(0, 0, 0, 0.1)" borderRadius="8px">
        <SoftBox display="flex" justifyContent="center" marginBottom="20px">
          <img src={logobanacheck} alt="Logo" style={{ width: "200px", height: "auto" }} />
        </SoftBox>
        <SoftBox component="form" role="form">
  <SoftTypography variant="h4" fontWeight="bold" mb={2} textAlign="center">
    Crear cuenta
    <Divider sx={{ borderColor: 'rgba(0, 0, 0, 0.87)', borderWidth: '2px' }} />
  </SoftTypography>

  <Grid container spacing={2} justifyContent="center">
    <Grid item xs={6}>
      <SoftBox mb={2}>
      <SoftInput type="email" placeholder="Email" size="large" onChange={(e) => setEmail(e.target.value)} />
      </SoftBox>
    </Grid>
    <Grid item xs={6}>
    <SoftBox mb={2}>
      <SoftInput placeholder="Nombres" size="large" onChange={(e) => setFirstName(e.target.value)} />
      </SoftBox>
    </Grid>
  </Grid>
  <Grid container spacing={2} justifyContent="center">
    <Grid item xs={6}>
    <SoftBox mb={2}>
      <SoftInput placeholder="Apellidos" size="large" onChange={(e) => setLastName(e.target.value)} />
      </SoftBox>
    </Grid>
    <Grid item xs={6}>
    <SoftBox mb={2}>
      <SoftSelect 
        placeholder="Selecciona un Rol"
        options={catalogueRoleState.data} 
        onChange={(option: {label: string, value: string}) => handleSelectChange(option)}
      />
      </SoftBox>
    </Grid>
  </Grid>

  <Grid container spacing={2} justifyContent="center">
    <Grid item xs={6}>
    <SoftBox mb={2}>
      <SoftInput placeholder="Identificacion" size="large" onChange={(e) => setIdentificacion(e.target.value)} />
      </SoftBox>
    </Grid>
    <Grid item xs={6}>
    <SoftBox mb={2}>
      <SoftInput
        type={showPassword ? "text" : "password"}
        placeholder="Contraseña"
        size="medium"
        onChange={(e) => validatePassword(e.target.value)}
        sx={{
          position: 'relative',
          paddingRight: '40px',
        }}
        endAdornment={
          <IconButton
            onClick={handleTogglePasswordVisibility}
            sx={{
              position: 'absolute',
              right: '8px',
              top: '50%',
              transform: 'translateY(-50%)',
            }}
          >
            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </IconButton>
        }
      />
      </SoftBox>
    </Grid>
  </Grid>

  {passwordTouched && (
    <SoftTypography variant="caption" sx={{ color: passwordIsValid ? 'green' : 'error.main' }}>
      {passwordIsValid ? 'La contraseña cumple con los requisitos.' : 'La contraseña debe contener al menos un número, una letra y un símbolo.'}
    </SoftTypography>
  )}

  <SoftBox mb={2}>
    <SoftButton variant="gradient" color="primary" size="large" disabled={!passwordIsValid} fullWidth onClick={handleSignUp}>
      Crear cuenta
    </SoftButton>
  </SoftBox>

  {showSuccessAlert && (
    <SoftAlert color="success" dismissible onClose={() => setShowSuccessAlert(false)} sx={{ mt: 3 }}>
      Registro exitoso. 
    </SoftAlert>
  )}

  {showErrorAlert && (
    <SoftAlert color="error" dismissible onClose={() => setShowErrorAlert(false)} sx={{ mt: 3 }}>
      {messageApi}
    </SoftAlert>
  )}
</SoftBox>

      </SoftBox>
    </SoftBox>
  );
}

export default Illustration;
