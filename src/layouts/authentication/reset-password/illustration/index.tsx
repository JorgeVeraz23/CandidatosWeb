import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SoftBox from "components/SoftBox";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import SoftTypography from "components/SoftTypography";
import SoftAlert from "components/SoftAlert";
import Divider from "@mui/material/Divider";
import axios from "axios";
import logobanacheck from "assets/images/illustrations/logo-banacheck.png";
import { CircularProgress, IconButton } from "@mui/material";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

function IllustrationV2() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false
  });
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [isChange, setIsChange] = useState(false);
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(false);
  const [rolsito, setRolsito] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState<boolean>(false);
  const [passwordTouched, setPasswordTouched] = useState<boolean>(false);
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState<boolean>(false);
  const rol = localStorage.getItem("Rol");
  const [isLoading, setIsLoading] = useState(false); // Nuevo estado para el indicador de carga

  const [email, setEmail] = useState(rol === "Inspector" ? "" : null);

  useEffect(() => {
    if (rol === "Inspector") {
      setIsDisabled(true);
      const user = localStorage.getItem("User");
      setRolsito(user);
    }
  }, [rol]);

  useEffect(() => {
    if (rolsito != null && rol === "Inspector") {
      setEmail(rolsito);
    }
  });

  useEffect(() => {
    if (showSuccessAlert || showErrorAlert) {
      const timer = setTimeout(() => {
        setShowSuccessAlert(false);
        setShowErrorAlert(false);
      }, 5000); // 5 segundos

      return () => clearTimeout(timer);
    }
  }, [showSuccessAlert, showErrorAlert]);

  const validatePassword = (value: string) => {
    const regex = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    setPassword(value);
    setPasswordTouched(true);
    setPasswordIsValid(regex.test(value) && value === confirmPassword);
  };

  const validateConfirmPassword = (value: string) => {
    setConfirmPassword(value);
    setConfirmPasswordTouched(true);
    setPasswordIsValid(value === password && passwordTouched);
  };

  const handleTogglePasswordVisibility = (field: string) => {
    setShowPassword((prevState) => ({ ...prevState, [field]: !prevState[field] }));
  };

  const handleChangePassword = async () => {
    try {
      setIsLoading(true); // Marcar como cargando al iniciar sesión
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
        Password: password
      };

      const url = `https://qa.banacheck.api.apptelink.tech/api/Security/ChangePassword`;

      const response = await axios.put(url, requestData, config);
      setShowSuccessAlert(true);
      setIsChange(true);
    } catch (error) {
      console.error("Error al cambiar la contraseña:", error);
      setShowErrorAlert(true);
    } finally {
      setIsLoading(false); // Marcar como no cargando después de que se complete la solicitud
    }
  };

  return (
    <SoftBox display="flex" justifyContent="center" alignItems="center" minHeight="100vh" backgroundColor="#f0f2f5">
      <SoftBox maxWidth="400px" width="100%" padding="20px" boxShadow="0px 4px 10px rgba(0, 0, 0, 0.1)" borderRadius="8px">
        <SoftBox display="flex" justifyContent="center" marginBottom="20px">
          <img src={logobanacheck} alt="Logo" style={{ width: "200px", height: "auto" }} />
        </SoftBox>
        <SoftTypography variant="h4" fontWeight="bold" mb={2} textAlign="center">
          Cambiar Clave
        </SoftTypography>
        <Divider sx={{ borderColor: 'rgba(0, 0, 0, 0.87)', borderWidth: '2px' }} />
        <SoftBox component="form" role="form">
          <SoftBox mb={2} style={{ display: isDisabled ? "none" : "block" }}>
            <SoftInput type="email" placeholder="Email" size="large" value={isDisabled ? rolsito : email} onChange={(e) => setEmail(e.target.value)} />
          </SoftBox>
          <SoftBox mb={2} >
            <SoftInput
              type={showPassword.password ? "text" : "password"}
              placeholder="Contraseña"
              size="medium"
              onChange={(e) => validatePassword(e.target.value)}
              sx={{
                position: 'relative',
                paddingRight: '40px',
              }}
              endAdornment={
                <IconButton
                  onClick={() => handleTogglePasswordVisibility("password")}
                  sx={{
                    position: 'absolute',
                    right: '8px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                  }}
                >
                  {showPassword.password ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              }
            />
            {passwordTouched && (
              <SoftTypography variant="caption" sx={{ color: passwordIsValid ? 'green' : 'error.main' }}>
                {passwordIsValid ? 'La contraseña cumple con los requisitos.' : 'La contraseña debe contener al menos un número, una letra y un símbolo.'}
              </SoftTypography>
            )}
          </SoftBox>
          <SoftBox mb={2}>
            <SoftInput
              type={showPassword.confirmPassword ? "text" : "password"}
              placeholder="Confirmar Contraseña"
              size="medium"
              onChange={(e) => validateConfirmPassword(e.target.value)}
              sx={{
                position: 'relative',
                paddingRight: '40px',
              }}
              endAdornment={
                <IconButton
                  onClick={() => handleTogglePasswordVisibility("confirmPassword")}
                  sx={{
                    position: 'absolute',
                    right: '8px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                  }}
                >
                  {showPassword.confirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              }
            />
            {confirmPasswordTouched && (
              <SoftTypography variant="caption" sx={{ color: passwordIsValid ? 'green' : 'error.main' }}>
                {passwordIsValid ? 'Las contraseñas coinciden.' : 'Las contraseñas no coinciden.'}
              </SoftTypography>
            )}
          </SoftBox>
          <SoftBox mt={4} mb={1}>
            <SoftButton variant="gradient" color="primary" size="large" disabled={!passwordIsValid || isLoading} fullWidth onClick={handleChangePassword}>
              {isLoading ? <CircularProgress size={24} /> : "Cambiar Clave"}
            </SoftButton>
          </SoftBox>
          {showSuccessAlert && isLoading === false && (
            <SoftAlert color="success" dismissible onClose={() => setShowSuccessAlert(false)}>
              Se ha cambiado la clave con éxito.
            </SoftAlert>
          )}
          {showErrorAlert && isLoading === false && (
            <SoftAlert color="error" dismissible onClose={() => setShowErrorAlert(false)}>
              Error al cambiar la contraseña. Por favor, revise los datos ingresados e inténtelo de nuevo.
            </SoftAlert>
          )}
        </SoftBox>
      </SoftBox>
    </SoftBox>
  );
}

export default IllustrationV2;
