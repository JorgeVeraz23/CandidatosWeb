import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from "app/redux/hooks";
export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const {logged} = useAppSelector(state => state.LoggingUser)
    
    const { pathname, search } = useLocation();
    const lastPath = pathname + search;
    localStorage.setItem('lastPath', lastPath );
    return (logged)
        ? children
        : <Navigate to="/auth/iniciar-sesion/vista" replace/>
}

interface PrivateRouteProps{
    children: ReactNode;
}