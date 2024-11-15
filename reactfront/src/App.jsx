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
import PrivateRoute from './components/Auth/PrivateRoute.jsx'; // Asegúrate de que este componente esté actualizado

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
                {/* Rutas públicas */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Rutas protegidas */}
                <Route element={<PrivateRoute />}>
                  {/* Ruta de Inicio - Home */}
                  <Route path="/" element={<Home />} />
                  
                  {/* Rutas de Propietarios */}
                  <Route path="/propietarios" element={<CompSowPropietarios isCollapsed={isCollapsed} />} />
                  <Route path="/create" element={<CompCreatePropietarios />} />
                  <Route path="/edit/:id" element={<CompEditPropietarios />} />

                  {/* Rutas de Conductores */}
                  <Route path="/conductores" element={<CompShowConductores isCollapsed={isCollapsed} />} />
                  <Route path="/createConductor" element={<CompCreateConductores />} />
                  <Route path="/editConductor/:id" element={<CompEditConductores />} />

                  {/* Rutas de Vehículos */}
                  <Route path="/vehiculos" element={<CompShowVehiculos isCollapsed={isCollapsed} />} />
                  <Route path="/createVehiculo" element={<CompCreateVehiculos />} />
                  <Route path="/editVehiculo/:id" element={<CompEditVehiculos />} />

                  {/* Rutas de Contratos */}
                  <Route path="/contratos" element={<CompContratos isCollapsed={isCollapsed} />} />

                  {/* Rutas de Cobros */}
                  <Route path="/cobros" element={<CompCobros isCollapsed={isCollapsed} />} />
                  <Route path="/tabla-cobros" element={<TablaCobros isCollapsed={isCollapsed}/>} />

                  {/* Ruta 404 */}
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
