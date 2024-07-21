
import SignInIllustration from "layouts/authentication/sign-in/illustration";
import LockIllustration from "layouts/authentication/lock/illustration";
import VerificationIllustration from "layouts/authentication/2-step-verification/illustration";
import Error404 from "layouts/authentication/error/404";
import Error500 from "layouts/authentication/error/500";
import HomeIcon from '@mui/icons-material/Home';
import ShowCatalogsItems from "layouts/catalogs/get-detail-catalogs";
import Default from "layouts/dashboards/default";
export interface MyRoutes{
  type?: string;
  name?: string;
  key?: string;
  route?: string;
  component?: JSX.Element;
  icon?: JSX.Element;
  collapse?: MyRoutes[];
}
// const login:MyRoutes[] = [
//       {
//         name: "Iniciar Sesion",
//         key: "iniciar-sesion",
//         collapse: [
//           {
//             name: "Vista",
//             key: "vista",
//             route: "/iniciar-sesion/vista",
//             component: <SignInIllustration />,
//           },
//         ],
//       },
//       {
//         name: "Cuenta",
//         key: "cuenta",
//         collapse: [
//           {
//             name: "Recuperar Contraseña",
//             key: "recuperar-contraseña",
//             route: "/cuenta/recuperar-contraseña",
//             component: <LockIllustration />,
//           },
//         ],
//       },
//       {
//         name: "2-Step Verification",
//         key: "2-step-verification",
//         collapse: [
//           {
//             name: "Illustration",
//             key: "illustration",
//             route: "/verification/illustration",
//             component: <VerificationIllustration />,
//           },
//         ],
//       },
//       {
//         name: "Error",
//         key: "error",
//         collapse: [
//           {
//             name: "Error 404",
//             key: "error-404",
//             route: "/error/404",
//             component: <Error404 />,
//           },
//           {
//             name: "Error 500",
//             key: "error-500",
//             route: "/error/500",
//             component: <Error500 />,
//           },
//         ],
//       },
//       {
//         type: "collapse",
//         name: "Inicio",
//         key: "inicio",
//         icon: <HomeIcon fontSize="small" />,
//         collapse: [
//           {
//             name: "Inicio",
//             key: "inicio",
//             route: "/inicio"
//           },
//           {
//             name: "Bienvenida",
//             key: "bienvenida",
//             route: "/inicio/bienvenida",
//             component: <Default />,
//           },
//           {
//             route: "/formulario"
//           },
//           {
//             route: "/clientes"
//           },
//           {
//             route: "/ordenes"
//           },
//           {
//             route: "/planificacion"
//           },
//           {
//             route: "/pregunta"
//           }
//         ],
//       },
      
// ]
const login:MyRoutes[] = [
  {
    name: "Iniciar Sesion",
    key: "iniciar-sesion",
    collapse: [
      {
        name: "Vista",
        key: "vista",
        route: "/iniciar-sesion/vista",
        component: <SignInIllustration />,
      },
    ],
  },
  {
    name: "Iniciar Sesion",
    key: "iniciar-sesion",
    collapse: [
      {
        name: "Vista",
        key: "vista",
        route: "/iniciar-sesion/vista",
        component: <SignInIllustration />,
      },
    ],
  },
  {
    name: "Cuenta",
    key: "cuenta",
    collapse: [
      {
        name: "Recuperar Contraseña",
        key: "recuperar-contraseña",
        route: "/cuenta/recuperar-contraseña",
        component: <LockIllustration />,
      },
    ],
  },

 
  
  
]

export default login;