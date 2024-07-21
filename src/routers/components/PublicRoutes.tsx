import { useAppSelector } from 'app/redux/hooks';
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

export const PublicRoutes = ({ children }: PublicRouteProps) => {
    const {logged} = useAppSelector(state => state.LoggingUser)
    // Make an global state
    return (!logged)
        ? children
        : <Navigate to="/app/inicio/bienvenido" replace/>
}
// export default PublicRoute;
interface PublicRouteProps{
    children: ReactNode;
}