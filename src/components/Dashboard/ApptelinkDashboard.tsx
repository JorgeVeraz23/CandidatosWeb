import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import routes from "routers/components/routesV2";
import routesV3 from "routers/components/routesV3";
import routesV4 from "routers/components/routesV4";

import { Route, Routes, useLocation } from "react-router-dom";
import { getRoutes } from "routers/components/Helpers";
import { useEffect, useMemo, useState } from "react";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import { useSoftUIController, setMiniSidenav, setOpenConfigurator } from "context";
import Answers from "layouts/inspection-form/answers";
import Imagenes from "layouts/inspection-form/images";
import { CacheProvider } from "@emotion/react";
import Sidenav from "examples/Sidenav";
import Default from "layouts/dashboards/default"
import brand from "assets/images/icono-banacheck-01.png";
import ShowCatalogsItems from "layouts/catalogs/get-detail-catalogs";
import ElectoAnalyzer from "assets/images/illustrations/electroAnalyzer.png"

import MostrarCandidatoConDetallei from "layouts/candidato/mostrar-candidato-detalle";
import CandidatoList from "layouts/candidato/mostrar-candidato";

import SignInIllustration from "layouts/authentication/sign-in/illustration";

export const ApptelinkDashboard = () => {
  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav, direction, layout, openConfigurator, sidenavColor } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [rtlCache, setRtlCache] = useState(null);
  const { pathname } = useLocation();
  const isLoggedIn = !!localStorage.getItem("User"); // Check if user is logged in
  // private readonly rol: string;

  const rol = localStorage.getItem('Rol');
  console.log(rol)
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
  return direction === "rtl" ? (

    <CacheProvider value={rtlCache}>
      {layout === "dashboard" &&
          <Sidenav
            color={sidenavColor}
            brand={ElectoAnalyzer}
            brandName="ElectoAnalyzer"
            routes={rol === 'Administrador' ? routes: routesV4}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}/>
      }
    </CacheProvider>
  ) : (
    <DashboardLayout>
          <Sidenav
            color={sidenavColor}
          brand={ElectoAnalyzer}
            brandName="ElectoAnalyzer"
            routes={rol === 'Administrador' ? routes: routesV4}
            onMouseEnter={handleOnMouseEnter} 
            onMouseLeave={handleOnMouseLeave}
          />
          <DashboardNavbar/>
          <Routes>  
            {rol === 'Administrador' ? getRoutes(routes) : getRoutes(routesV4)}
            <Route path="inspecciones-realizadas/respuestas" element={<Answers />} />
            <Route path="/candidatos/mostrar-candidato" element={<CandidatoList/>} />
            <Route path="catalogos/crear-selectores-items" element={<ShowCatalogsItems />} />
           
              <Route path="iniciar-sesion/vista" element={<SignInIllustration />} /> 
            <Route path="candidatos/mostrar-candidato-administrador-con-detalle" element={< MostrarCandidatoConDetallei/>}/>
            <Route path="inspecciones-realizadas/imagenes" element={<Imagenes />} />
            <Route path="inicio/bienvenido" element={<Default />} />
          </Routes>
          <Footer company={{ href: "https://apptelink.com/", name: "MariaSystems" }} />
    
    </DashboardLayout>
  )
}
