import PeopleIcon from '@mui/icons-material/People';
import DescriptionIcon from '@mui/icons-material/Description';
// ORDERS
import CreateInspectionOrder from "layouts/orders/create-inspection";
import { InspectionOrder } from "layouts/orders/inspection-order/index";
// PLANNINGS
import CreatePlanning from "layouts/planning/create-planning";

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

import QuizIcon from '@mui/icons-material/Quiz';



const routesV3 = [
    {type: "title", title: "Inspecciones", key: "title-inspection" },
    {
      type: "collapse",
      name: "Inspecciones Realizadas",
      key: "inspecciones-realizadas",
      icon: <AssignmentIcon  />,
      collapse: [
        {
          name: "Ingresos",
          key: "ingresos",
          route: "/inspecciones-realizadas/ingresos",
          component: <InspectionForms />
        },
      ],
    },
    { type: "title", title: "Administrador", key: "administrador" },
  {
    type: "collapse",
    name: "Administrar Cuentas",
    key: "administrar-cuentas",
    icon: <ManageAccountsIcon />,
    collapse: [
    {
        name: "Cambiar Clave",
        key: "cambiar-clave",
        route: "/administrar-cuentas/cambiar-clave",
        component: <ResetIllustration />,
      },
    ],
  },
  
  ];

export default routesV3;