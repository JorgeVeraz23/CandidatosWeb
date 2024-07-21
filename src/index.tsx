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
import ReactDOM from "react-dom/client";
import { store } from './app/redux/store';
import { Provider } from 'react-redux';
import { BrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "assets/theme";
// import App from "AppV2";
// Soft UI Context Provider
import { SoftUIControllerProvider } from "context";
import AppRouter from "routers/AppRouters";
import { CssBaseline } from "@mui/material";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <SoftUIControllerProvider>

        {/* <RouterProvider router={AppRouter}/> */}
        {/* <App /> */}
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppRouter />
        </ThemeProvider>
      </SoftUIControllerProvider>
    </BrowserRouter>
  </Provider>
);
