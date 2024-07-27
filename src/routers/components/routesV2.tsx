/**
=========================================================
* Soft UI Dashboard PRO React - v4.0.2
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-pro-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/** 
  All of the routes for the Soft UI Dashboard PRO React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that contains other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Soft UI Dashboard PRO React layouts
import PeopleIcon from '@mui/icons-material/People';
import DescriptionIcon from '@mui/icons-material/Description';
// ORDERS
import CreateInspectionOrder from "layouts/orders/create-inspection";
import { InspectionOrder } from "layouts/orders/inspection-order";
// PLANNINGS
import CreatePlanning from "layouts/planning/create-planning";
import PlanningList from "layouts/planning/planning-list";
// INSPECTION FORM
import InspectionForms from "layouts/inspection-form/entries";
import GroupQuestions from "layouts/inspection-form/group-questions";
import CreateGroupQuestions from "layouts/inspection-form/group-questions/create";
// CLIENT
import CreateClient from "layouts/clients/create-client";
import ShowClient from "layouts/clients/get-client";
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

import ShowForms from "layouts/forms/get-form";
import CreateForms from "layouts/forms/create-form"
import AssignmentIcon from '@mui/icons-material/Assignment';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ListAltIcon from '@mui/icons-material/ListAlt';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import SignUpIllustration from "layouts/authentication/sign-up/illustration";
import ResetIllustration from "layouts/authentication/reset-password/illustration";
import ShowCatalogs from "layouts/catalogs/get-catalogs"
import CreateCatalogQuestion from "layouts/catalogs/create-catalogs"
import ShowCatalogsItems from "layouts/catalogs/get-detail-catalogs"
import Questions from "layouts/pregunta/preguntas"
import CreateQuestion from "layouts/pregunta/crear"
import QuizIcon from '@mui/icons-material/Quiz';
import ShowInspectors from 'layouts/Inspector/mostrar-inspectores';
import GroupsIcon from '@mui/icons-material/Groups';
import HubIcon from '@mui/icons-material/Hub';
//Cargo
import CrearCargoVista from 'layouts/cargo/create-cargo';
import CargoList from 'layouts/cargo/mostrar-cargo';
//Partido
import CrearPartidoVista from 'layouts/partido/create-partido';
import PartidoList from 'layouts/partido/mostrar-partido';
//Transparencia
import CrearTransparenciaVista from 'layouts/transparencia/create-transparencia';
import TransparenciaList from 'layouts/transparencia/mostrar-transparencia';
import { components } from 'react-select';
import CrearPropuestaVista from 'layouts/propuestas/crear-propuesta';
import PropuestaList from 'layouts/propuestas/mostrar-propuesta';
import CrearCandidatoVista from 'layouts/candidato/create-candidato';
import CandidatoList from 'layouts/candidato/mostrar-candidato';

const routesV2 = [
  { type: "title", title: "Catalogos", key: "title-catalogos" },
  {
    type: "collapse",
    name: "Catalogos",
    key: "catalogos",
    icon: <MenuBookIcon />,
    collapse: [
      {
        name: "Crear Cargo",
        key: "crear-cargo",
        route: "/catalogs/crear-cargo",
        component: <CrearCargoVista />
      },
      {
        name: "Mostrar Cargo",
        key: "mostrar-cargo",
        route: "/cargo/mostrar-cargo",
        component: <CargoList />
      },
      {
        name: "Crear Partido",
        key: "crear-partido",
        route: "/catalogs/crear-partido",
        component: <CrearPartidoVista />
      },
      {
        name: "Mostrar Partido",
        key: "mostrar-partido",
        route: "/catalogs/mostrar-partido",
        component: <PartidoList />
      },
      {
        name: "Crear Transparencia",
        key: "crear-transparencia",
        route: "/catalogs/crear-transparencia",
        component: <CrearTransparenciaVista />
      },
      {
        name: "Mostrar Transparencia",
        key: "mostrar-transparencia",
        route: "/catalogs/mostrar-transparencia",
        component: <TransparenciaList />
      },
      {
        name: "Crear Propuesta",
        key: "crear-propuesta",
        route: "/catalogs/crear-propuesta",
        component: <CrearPropuestaVista />
      },
      {
        name: "Mostrar Propuesta",
        key: "mostrar-propuesta",
        route: "/catalogs/mostrar-propuesta",
        component: <PropuestaList />
      }


    ],
  },
  { type: "title", title: "Candidatos", key: "title-candidatos" },
  {
    type: "collapse",
    name: "Candidatos",
    key: "candidatos",
    icon: <GroupsIcon />,
    collapse: [
      {
        name: "CrearCandidato",
        key: "crear-candidato",
        route: "/candidatos/crear-candidato",
        component: <CrearCandidatoVista />
      },
      {
        name: "MostrarCandidato",
        key: "mostrar-candidato",
        route: "/candidatos/mostrar-candidato",
        component: <CandidatoList />
      },
    ],
  },
 
];






export default routesV2;
