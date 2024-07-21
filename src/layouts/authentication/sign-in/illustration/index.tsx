import  { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import Switch from "@mui/material/Switch";
import CircularProgress from "@mui/material/CircularProgress"; // Importa CircularProgress
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import IllustrationLayout from "layouts/authentication/components/IllustrationLayout";
import SoftAlert from "components/SoftAlert";
import IconButton from "@mui/material/IconButton"; // Agrega la importación de IconButton
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff"; // Agrega la importación de VisibilityOffIcon
import VisibilityIcon from "@mui/icons-material/Visibility"; // Agrega la importación de VisibilityIcon
import { URL_API } from 'app/api/urls/urls'
import logobanacheck from "assets/images/illustrations/logo-banacheck.png";
import logobanacheckwhite from "assets/images/illustrations/logobanacheckwhite.png";
import { loggingUserSlice } from "app/redux/slices/ui/uiSlices";
import { UserEntity } from "app/api/domain/entities/AuthEntities/UserEntity";
import { useAppSelector } from "app/redux/hooks";
import { useDispatch } from "react-redux";
import { SignInEntity } from "app/api/domain/entities/SignInEntities/SigInEntity";

function Illustration() {
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRolName, setIsRolName] = useState<UserEntity>();
  const [showPassword, setShowPassword] = useState(false); // Agrega el estado para mostrar u ocultar la contraseña
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const handleSignIn = async () => {
    setIsLoading(true);
    setShowErrorAlert(false);

    try {
      const url = `${URL_API}Security/login`;
      const requestData = {
        UserName: email,
        Password: password,
      };
      const response = await axios.post(url, requestData);
      const token: string = response.data.token;
      const role: string = response.data.role;
      localStorage.setItem("Rol", role);
      const userName: string = response.data.userName;
      localStorage.setItem("User", userName);
      const data = {
        token: token,
        role: role,
        userName: userName,
        firstName: response.data?.firstName,
        lastName: response.data?.lastName,
      } as UserEntity;
      dispatch(loggingUserSlice.actions.loggingUser(data));
      setShowSuccessAlert(true);
      setIsLoggedIn(true);
    } catch (error: any) {
      console.error("Error al iniciar sesión:", error);
      setShowErrorAlert(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Define la función para cambiar la visibilidad de la contraseña
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Define la función para validar la contraseña
  const validatePassword = (value: string) => {
    // Aquí puedes agregar la lógica de validación de la contraseña si es necesario
    setPassword(value);
  };

  return (
    <IllustrationLayout
      title="Iniciar Sesión"
      color="secondary"
      description="Ingresa tu correo electrónico y contraseña para iniciar sesión."
      illustration={{
        image: logobanacheckwhite,
        title: "",
        description: "",
      }}
    >
      <SoftBox component="form" role="form">
        <SoftBox mb={2}>
          <SoftInput
            type="email"
            placeholder="Email"
            size="large"
            onChange={(e) => setEmail(e.target.value)}
          />
        </SoftBox>
        <SoftBox mb={2}>
          <SoftInput
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            size="large"
            onChange={(e) => setPassword(e.target.value)}
            endAdornment={
              <IconButton
                onClick={handleTogglePasswordVisibility}
                sx={{
                  position: "absolute",
                  right: "8px",
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              >
                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </IconButton>
            }
          />
        </SoftBox>
        <SoftBox mt={4} mb={1}>
          <SoftButton variant="gradient" color="primary" size="large" fullWidth onClick={handleSignIn}>
            {isLoading ? <CircularProgress size={24} color="inherit" /> : "Iniciar Sesión"} {/* Mostrar indicador de carga si isLoading es true */}
          </SoftButton>
        </SoftBox>
        <SoftBox mt={3} textAlign="center">
          <SoftTypography variant="button" color="text" fontWeight="regular">
            ¿Olvidaste tu contraseña?{" "}
            <SoftTypography
              component={Link}
              to="/auth/cuenta/recuperar-contraseña"
              variant="button"
              color="info"
              fontWeight="medium"
              textGradient
            >
              Recuperar Contraseña
            </SoftTypography>
          </SoftTypography>
        </SoftBox>

        {showErrorAlert && (
          <SoftAlert color="error" dismissible onClose={() => setShowErrorAlert(false)}>
            Error al iniciar sesión. Por favor, verifica tu correo electrónico y contraseña.
          </SoftAlert>
        )}
      </SoftBox>
    </IllustrationLayout>
  );
}

export default Illustration;
