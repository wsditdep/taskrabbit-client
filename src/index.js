import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route, Routes, BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./assets/styles/styles.scss";
import '../node_modules/slick-carousel/slick/slick.css';
import '../node_modules/slick-carousel/slick/slick-theme.css';
import '../node_modules/slick-carousel/slick/slick-theme.css';
import { Provider } from "react-redux"
import { store, persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App";
import ProtectedRoutes from "./components/protectedRoutes/ProtectedRoutes";
import Dashboard from './adminDashboard/Dashboard';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import UserLanding from './mobile/UserLading';
import ScrollToTop from './components/scroll/Scroll';

const options = {
  position: positions.TOP_CENTER,
  timeout: 5000,
  offset: '30px',
  transition: transitions.SCALE,
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ScrollToTop />
          <AlertProvider template={AlertTemplate} {...options}>
            <Routes>
              <Route path="/*" element={<App />} />

              <Route element={<ProtectedRoutes isAdmin={true} />}>
                <Route path="/dashboard/*" element={<Dashboard />} />
              </Route>

              <Route element={<ProtectedRoutes isAdmin={false}></ProtectedRoutes>}>
                <Route path="/userDashboard/*" element={<UserLanding />} exact />
              </Route>

            </Routes>
          </AlertProvider>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </>
);

