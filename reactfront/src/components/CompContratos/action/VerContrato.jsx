import React, {useState } from "react";
import CompViewConductor from "../../CompConductores/action/viewConductor";
import CompViewVehiculo from "../../CompVehiculos/actions/viewVehiculo";

const VerContrato = ({ contrato, onClose }) => {
  
  const [showConductorModal, setShowConductorModal] = useState(false);
  const [showVehiculoModal, setShowVehiculoModal] = useState(false);
  

  if (!contrato) return null;

  return (
    <div
      className="fixed inset-0 bg-gray-900 bg-opacity-70 flex items-center justify-center z-50"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-lg p-6 w-11/12 md:w-2/3 lg:w-1/2 xl:w-1/2 relative">
        {/* Botón de cierre en la esquina superior derecha */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-red-600 hover:text-red-800"
          aria-label="Cerrar"
        >
          <i className="fa-solid fa-circle-xmark text-3xl"></i>
        </button>

        {/* Icono y título */}
        <div className="flex items-center justify-center space-x-4 mb-4">
          <i className="fa-solid fa-file-waveform text-4xl text-gray-700"></i>
          <h2 className="text-2xl font-bold text-center">Detalles del Contrato</h2>
        </div>

        <hr className="mb-4 border-t-4 border-gray-300" />

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Columna 1: Detalles del Conductor */}
          <div>
            <h3 className="text-xl font-bold text-yellow-800 mb-2">Conductor</h3>
            <p><strong>Nombre:</strong> {contrato.conductor.nombre}</p>
            <p><strong>Dirección:</strong> {contrato.conductor.direccion}</p>
            <p><strong>Teléfono:</strong> {contrato.conductor.telefono}</p>
            {contrato.conductor.avalNombre && (
              <>
                <p className="mt-2"><strong>Aval:</strong> {contrato.conductor.avalNombre}</p>
                <p><strong>Teléfono Aval:</strong> {contrato.conductor.avalTelefono}</p>
              </>
            )}
            {/* Botón para ver el conductor */}
            <div className="mt-4 flex justify-center">
              <button
                onClick={() => setShowConductorModal(true)}
                className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold px-4 py-2 rounded flex items-center"
              >
                <i className="fa-solid fa-eye mr-2"></i>
                Ver Conductor
              </button>
            </div>
          </div>

          {/* Columna 2: Detalles del Vehículo */}
          <div>
            <h3 className="text-xl font-bold text-yellow-800 mb-2">Vehículo</h3>
            <p><strong>Marca:</strong> {contrato.vehiculo.marca}</p>
            <p><strong>Modelo:</strong> {contrato.vehiculo.modelo}</p>
            <p><strong>Color:</strong> {contrato.vehiculo.color}</p>
            <p><strong>Año:</strong> {contrato.vehiculo.anio}</p>
            <p><strong>Placas:</strong> {contrato.vehiculo.placas}</p>
            <p><strong>Número de Serie:</strong> {contrato.vehiculo.numeroSerie}</p>
            {/* Botón para ver el vehículo */}
            <div className="mt-4 flex justify-center">
              <button
                onClick={() => setShowVehiculoModal(true)}
                className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold px-4 py-2 rounded flex items-center"
              >
                <i className="fa-solid fa-eye mr-2"></i>
                Ver Vehículo
              </button>
            </div>
          </div>
        </div>

        <hr className="my-4 border-t-4 border-gray-300" />

        {/* Detalles del contrato y arrendador */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-bold text-yellow-800 mb-2">Contrato</h3>
            <p><strong>Renta Semanal:</strong> ${contrato.precioRenta}.00</p>
            <p><strong>Depósito:</strong> ${contrato.precioDeposito}.00</p>
            <p><strong>Pagaré:</strong> ${contrato.precioPagare}.00</p>
            <p><strong>Fecha de Inicio:</strong> {contrato.fechaInicio}</p>
            <p><strong>Fecha de Fin:</strong> {contrato.fechaFin}</p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-yellow-800 mb-2">Arrendador</h3>
            <p><strong>Nombre:</strong> {contrato.propietario.nombre}</p>
            {contrato.contratoDoc && (
              <div className="mt-4 flex justify-center">
                <a href={contrato.contratoDoc} target="_blank" rel="noopener noreferrer">
                  <button className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold px-4 py-2 rounded flex items-center">
                    <i className="fa-solid fa-eye mr-2"></i>
                    Ver Contrato
                  </button>
                
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Botón de cierre */}
        <div className="flex justify-center mt-6">
          <button
            className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 font-bold"
            onClick={onClose}
          >
            Cerrar
          </button>
        </div>

        {/* Modal para ver el conductor */}
        {showConductorModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60">
            <CompViewConductor id={contrato.conductor.id} onClose={() => setShowConductorModal(false)} />
          
          </div>
        )}

        {/* Modal para ver el vehículo */}
        {showVehiculoModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60">
            <CompViewVehiculo id={contrato.idVehiculo} onClose={() => setShowVehiculoModal(false)} />
          
          </div>
        )}
      </div>
    </div>
  );
};

export default VerContrato;
