import { Navigate, Route, Routes, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { PrivateRoute } from './components/PrivateRoutes'
import { PublicRoutes } from 'routers/components/PublicRoutes'
import { ApptelinkDashboard } from 'components/Dashboard/ApptelinkDashboard'

import Answers from "layouts/inspection-form/answers";
import Imagenes from "layouts/inspection-form/images";
import authRoutes from './components/LoginRoutes'
import { getRoutes } from './components/Helpers'
const AppRouter = () => {
    return (

        <Routes>
            <Route path="/app/*" element={
                <PrivateRoute>
                    <ApptelinkDashboard />
                </PrivateRoute>
            } />
            <Route path="/auth/*" element={
                <PublicRoutes>
                    <Routes>
                        {getRoutes(authRoutes)}
                    </Routes>
                </PublicRoutes>
            } />
            <Route path="*" element={<Navigate to="app/inicio/bienvenido" replace />} />
            {/* <Route path="*" element={<Navigate to="/app/error/404" />} /> */}
            
            {/* <Route path="" element={<Navigate to="/iniciar-sesion/vista" replace />} /> */}
            {<Route path="*" element={<Navigate to="/error/404" />} />}
        </Routes>

    )
}
// console.log(getNewReactRoutes(routesV2))
// const a = [
//     {
//         path: "/",
//         element: <h1>fdwe</h1>
//     }
// ]
// const AppRouter = createBrowserRouter(getNewReactRoutes(routesV2));


export default AppRouter

