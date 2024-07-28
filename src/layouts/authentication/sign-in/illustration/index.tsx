import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Grid, Header, Image, Form, Segment, Button, Message, Icon } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { URL_API } from 'app/api/urls/urls';
import ElectroAnalyzer from "assets/images/illustrations/electroAnalyzer.png";
import { useDispatch } from "react-redux";
import { loggingUserSlice } from "app/redux/slices/ui/uiSlices";
import { UserEntity } from "app/api/domain/entities/AuthEntities/UserEntity";

function Illustration() {
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // Código en el useEffect que no se debe eliminar
  }, []);

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
      const token = response.data.token;
      const role = response.data.role;
      localStorage.setItem("Rol", role);
      const userName = response.data.userName;
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
      navigate("inicio/bienvenido");
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setShowErrorAlert(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="blue" textAlign="center">
          <Image src={ElectroAnalyzer} /> Inicia sesión en Electro Analyzer
        </Header>
        <Form size="large" onSubmit={handleSignIn}>
          <Segment stacked>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="Correo electrónico"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Input
              fluid
              iconPosition="left"
              placeholder="Contraseña"
              type={showPassword ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
              icon={
                <Icon
                  name={showPassword ? "eye slash" : "eye"}
                  link
                  onClick={handleTogglePasswordVisibility}
                />
              }
            />
            <Form.Checkbox
              label="Recuérdame"
              checked={rememberMe}
              onChange={handleSetRememberMe}
            />
            <Button color="blue" fluid size="large" loading={isLoading} disabled={isLoading}>
              Iniciar sesión
            </Button>
          </Segment>
        </Form>
        {showErrorAlert && (
          <Message negative>
            <Message.Header>Error al iniciar sesión</Message.Header>
            <p>Por favor, verifica tu correo electrónico y contraseña.</p>
          </Message>
        )}
        <Message>
          ¿Olvidaste tu contraseña? <Link to="/auth/cuenta/recuperar-contraseña">Recuperar Contraseña</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
}

export default Illustration;
