import { Route, RouteObject } from "react-router-dom";
import { MyRoutes } from "./LoginRoutes";

export const getRoutes = (allRoutes: MyRoutes[]) => {
    return allRoutes.map(route => {
        if(route.collapse){
            return getRoutes(route.collapse);
        }
        if(route.route){
            return (<Route path={route.route} element={route.component} key={route.key} />)
        }
        return null;
    })
}
export const mainRouter = (route: string) => `/app${route}`;
export const getNewReactRoutes = (allRoutes: MyRoutes[]): RouteObject[] => {
    // return allRoutes.map(route => {
    //     if(route.collapse){
    //         getRoutes(route.collapse);
    //     }
    //     if(route.route){
    //         console.log(route)
    //         return {
    //             path: route.route,
    //             element: route.component
    //         }
    //     }
    //     return null;
    // })
    // let i = 0;
    return allRoutes.filter(route => route.type !== "title").map(route => {
        if(route.collapse){
            console.log(route, "collapse")
            getNewReactRoutes(route.collapse);
            // i++;
        }
        if(route.route){
            console.log(route, "route")
            return {
                path: route.route,
                element: route.component
            }
        }
        console.log(route, "all")
        return null;
    })//.filter(item => item !== null)
}
