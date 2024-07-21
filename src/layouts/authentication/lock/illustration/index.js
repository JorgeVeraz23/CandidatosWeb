import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SoftBox from "components/SoftBox";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import SoftTypography from "components/SoftTypography";
import SoftAlert from "components/SoftAlert";
import IllustrationLayout from "layouts/authentication/components/IllustrationLayout";
import axios from "axios";
import logobanacheckwhite from "assets/images/illustrations/logobanacheckwhite.png";

function Illustration() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false); // Estado para controlar si se está cargando
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const handleForgotPassword = async () => {
    try {
      setLoading(true); // Establecer el estado de carga a true
      const url = `https://qa.banacheck.api.apptelink.tech/api/Security/ForgotPassword`;
      const requestData = {
        userName: email,
      };

      const response = await axios.put(url, requestData);
      console.log("Envío Exitoso:", response.data);

      setShowAlert(true);
      setTimeout(() => {
        navigate('/iniciar-sesion/vista');
      }, 2000);
    } catch (error) {
      console.error("Error al enviar el correo:", error);
      console.log(response.data);
    } finally {
      setLoading(false); // Establecer el estado de carga a false después de completar la solicitud
    }
  };

  return (
    <IllustrationLayout
      color="dark"
      header={
        <SoftBox textAlign="center">
          <SoftTypography variant="h4" fontWeight="bold">
            Recuperar Contraseña
          </SoftTypography>
          <SoftTypography variant="body2" color="text">
            Ingrese su correo electrónico para recuperar la cuenta
          </SoftTypography>
        </SoftBox>
      }
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
        <SoftButton
          variant="gradient"
          color="dark"
          size="large"
          fullWidth
          onClick={handleForgotPassword}
          disabled={loading} // Deshabilitar el botón mientras se carga
        >
          {loading ? "Cargando..." : "Enviar Correo"}
        </SoftButton>
        <SoftBox mt={3} textAlign="center">
          <SoftTypography variant="button" color="text" fontWeight="regular">
            ¿Ya tienes una cuenta?{" "}
            <SoftTypography
              component={Link}
              to="/iniciar-sesion/vista"
              variant="button"
              color="info"
              fontWeight="medium"
              textGradient
              style={{ fontSize: "14px", textAlign: "center", marginTop: "10px" }}
            >
              Iniciar Sesión
            </SoftTypography>
          </SoftTypography>
        </SoftBox>
        {showAlert && (
          <SoftAlert color="success" dismissible>
            Se ha enviado un Email con la nueva contraseña
          </SoftAlert>
        )}
      </SoftBox>
    </IllustrationLayout>
  );
}

export default Illustration;
