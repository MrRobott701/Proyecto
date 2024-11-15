// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CompSowPropietarios from "./components/CompPropietarios/actions/mostrarPropietarios.jsx";
import CompCreatePropietarios from "./components/CompPropietarios/actions/crearPropietarios.jsx";
import CompEditPropietarios from "./components/CompPropietarios/actions/editarPropietarios.jsx";
import CompShowConductores from "./components/CompConductores/action/mostrarConductor.jsx";
import CompCreateConductores from "./components/CompConductores/action/crearConductor.jsx";
import CompEditConductores from "./components/CompConductores/action/editarConductor.jsx";
import CompShowVehiculos from "./components/CompVehiculos/actions/mostrarVehiculo.jsx";
import CompCreateVehiculos from "./components/CompVehiculos/actions/crearVehiculo.jsx";
import CompEditVehiculos from "./components/CompVehiculos/actions/editarVehiculo.jsx";
import CompContratos from "./components/CompContratos/action/mostrarContratos.jsx";
import CompCobros from "./components/CompCobros/action/mostrarCobros.jsx";
import TablaCobros from "./components/CompCobros/action/tablaCobros.jsx";
import NotFound from "./components/NotFound.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./components/CompHome/actions/Home.jsx";
import Nav from "./components/Nav.jsx";
import Login from "./components/Auth/Login.jsx";
import Register from "./components/Auth/Register.jsx";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from './components/Auth/PrivateRoute.jsx'; // Crear este componente

function App() {
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="flex flex-col h-screen">
          <Nav isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
          <div
            className={`flex-grow transition-all duration-300 ${isCollapsed ? "" : "ml-32"}`}
          >
            <div>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                
                {/* Rutas protegidas */}
                <Route
                  path="/propietarios"
                  element={
                    <PrivateRoute>
                      <CompSowPropietarios isCollapsed={isCollapsed} />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/conductores"
                  element={
                    <PrivateRoute>
                      <CompShowConductores isCollapsed={isCollapsed} />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/vehiculos"
                  element={
                    <PrivateRoute>
                      <CompShowVehiculos isCollapsed={isCollapsed} />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/contratos"
                  element={
                    <PrivateRoute>
                      <CompContratos isCollapsed={isCollapsed} />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/cobros"
                  element={
                    <PrivateRoute>
                      <CompCobros isCollapsed={isCollapsed} />
                    </PrivateRoute>
                  }
                />
                <Route path="/tabla-cobros" element={<TablaCobros isCollapsed={isCollapsed}/>} />
                <Route path="/" element={<Home />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
