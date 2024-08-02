import { useState, useEffect, useMemo } from "react";

// react-router components
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";

// Soft UI Dashboard PRO React example components
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";

// Soft UI Dashboard PRO React themes
import theme from "assets/theme";
import themeRTL from "assets/theme/theme-rtl";

// RTL plugins
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import login from "LoginRoutes"
// Soft UI Dashboard PRO React routes
import routes from "routes";

// Soft UI Dashboard PRO React contexts
import { useSoftUIController, setMiniSidenav, setOpenConfigurator } from "context";

import Answers from "layouts/inspection-form/answers/index.tsx";
import Imagenes from "layouts/inspection-form/images/index.tsx";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ShowCatalogsItems from "layouts/catalogs/get-detail-catalogs/index.tsx"

// Images
import brand from "assets/images/icono-banacheck-01.png";

export default function App() {
  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav, direction, layout, openConfigurator, sidenavColor } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [rtlCache, setRtlCache] = useState(null);
  const { pathname } = useLocation();

  // Cache for the rtl
  useMemo(() => {
    const cacheRtl = createCache({
      key: "rtl",
      stylisPlugins: [rtlPlugin],
    });

    setRtlCache(cacheRtl);
  }, []);

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Change the openConfigurator state
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) => {
    return allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        // Verificar si el token está presente en el localStorage
        const token = localStorage.getItem('token');

        // Si hay token y la ruta es la de sign-in, redirigir a la ruta de dashboards/default
        if (token && route.route === "app/inicio/bienvenido") {
          return <Route exact path={route.route} element={<Navigate to="/app/inicio/bienvenida" replace />} key={route.key} />;
        }

        if(token && route.route === "/app/inicio"){
          return <Route exact path={route.route} element={<Navigate to="/app/inicio/bienvenida" replace />} key={route.key} />;
        }
        if(token && route.route === "/app/clientes"){
          return <Route exact path={route.route} element={<Navigate to="/app/clientes/mostrar-clientes" replace />} key={route.key} />;
        }
        if(token && route.route === "/app/formulario"){
          return <Route exact path={route.route} element={<Navigate to="/app/formulario/mostrar-formulario" replace />} key={route.key} />;
        }
        if(token && route.route === "/app/ordenes"){
          return <Route exact path={route.route} element={<Navigate to="/app/ordenes/crear-inspeccion" replace />} key={route.key} />;
        }
        if(token && route.route === "/app/planificacion"){
          return <Route exact path={route.route} element={<Navigate to="/app/planificacion/lista-planificaciones" replace />} key={route.key} />;
        }
        if(token && route.route === "/app/pregunta"){
          return <Route exact path={route.route} element={<Navigate to="/app/pregunta/grupo-preguntas" replace />} key={route.key} />;
        }
        if(token && route.route === "/app/inspecciones-realizadas"){
          return <Route exact path={route.route} element={<Navigate to="/app/inspecciones-realizadas/ingresos" replace />} key={route.key} />;
        }
        
        // Si no hay token y la ruta no es la de sign-in o recuperar contraseña, redirigir a la ruta de sign-in
        if (!token && route.route !== "/iniciar-sesion/vista" && route.route !== "/cuenta/recuperar-contraseña") {
          return <Route exact path={route.route} element={<Navigate to="/iniciar-sesion/vista" />} key={route.key} />;
        }

        // Permitir el acceso normalmente a las rutas que no sean de sign-in o recuperar contraseña
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }

      return null;
    });
  };


  const configsButton = (
    <SoftBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.5rem"
      height="3.5rem"
      bgColor="white"
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      color="dark"
      sx={{ cursor: "pointer" }}
      onClick={handleConfiguratorOpen}
    >
      <Icon fontSize="default" color="inherit">
        settings
      </Icon>
    </SoftBox>
  );

  // console.log("direction tiene: ",direction);
  // console.log("layout tiene: ",layout);

  return direction === "rtl" ? (

    <CacheProvider value={rtlCache}>
      <ThemeProvider theme={themeRTL}>
        <CssBaseline />

        {layout === "dashboard" &&
          (
            <>
              <Sidenav
                color={sidenavColor}
                brand={brand}
                brandName="BanaCheck"
                routes={routes}
                onMouseEnter={handleOnMouseEnter}
                onMouseLeave={handleOnMouseLeave}
              />
            </>
          )}

      </ThemeProvider>
    </CacheProvider>
  ) : (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {layout === "dashboard" && (
        <>
          <Sidenav
            color={sidenavColor}
            brand={brand}
            brandName="BanaCheck"
            routes={routes}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
        </>
      )}
      <Routes>
        {getRoutes(login)}
       
        
        <Route path="" element={<Navigate to="/inicio/bienvenido" />} />
        {<Route path="*" element={<Navigate to="/error/404" />} />}
        {getRoutes(routes)}
      </Routes>
    </ThemeProvider>
  );
}
