// ContratoCard.js
import React, { useState, useEffect } from "react";

const ContratoCard = ({ contrato, onView, onEdit, onDelete }) => {
  const URI_CONDUCTOR = "http://localhost:8000/conductores";
  const URI_VEHICULO = "http://localhost:8000/vehiculos";
  const URI_PROPIETARIO = "http://localhost:8000/propietarios";

  const [conductor, setConductor] = useState(null);
  const [vehiculo, setVehiculo] = useState(null);
  const [propietario, setPropietario] = useState(null);


  useEffect(() => {
    // Fetch conductor data
    const fetchConductor = async () => {
      try {
        const response = await fetch(`${URI_CONDUCTOR}/${contrato.idConductor}`);
        const data = await response.json();
        setConductor(data);
      } catch (error) {
        console.error("Error fetching conductor:", error);
      }
    };

    // Fetch vehiculo data
    const fetchVehiculo = async () => {
      try {
        const response = await fetch(`${URI_VEHICULO}/${contrato.idVehiculo}`);
        const data = await response.json();
        setVehiculo(data);
      } catch (error) {
        console.error("Error fetching vehiculo:", error);
      }
    };

    // Fetch propietario data
    const fetchPropietario = async () => {
      try {
        const response = await fetch(`${URI_PROPIETARIO}/${contrato.idPropietario}`);
        const data = await response.json();
        setPropietario(data);
      } catch (error) {
        console.error("Error fetching propietario:", error);
      }
    };

    fetchConductor();
    fetchVehiculo();
    fetchPropietario();
  }, [contrato.idConductor, contrato.idVehiculo, contrato.idPropietario]);

  return (
    <div className="border border-gray-300 p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-2">Contrato: {conductor ? conductor.nombre : "Cargando..."}</h2>
      <p><strong>Arrendador:</strong> {propietario ? propietario.nombre : "Cargando..."}</p>
      <p className="text-center"><strong>Fechas</strong></p>
      <div className="flex justify-between">
      
      <p><strong>Inicio:</strong> {contrato.fechaInicio}</p>
      <p><strong>Fin:</strong> {contrato.fechaFin}</p>
      </div>

      <div className="flex justify-between">
      <p><strong>Depósito:</strong> ${contrato.precioDeposito}</p>
      <p><strong>Renta:</strong> ${contrato.precioRenta}</p>
      <p><strong>Pagaré:</strong> ${contrato.precioPagare}</p>
      
      <p><strong>Penalidad:</strong> ${contrato.penalidad}</p>
      </div>
      
      <p>
  <strong>Vehículo:</strong>{" "}
  {vehiculo ? (
    <>
      {vehiculo.marca} {vehiculo.modelo} {vehiculo.color} {vehiculo.anio}{" "}
      <strong>Placas:</strong> {vehiculo.placas}
    </>
  ) : (
    "Cargando..."
  )}
</p>

      
      <div className="mt-4 flex justify-around">
        <button
        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700 font-bold"
        onClick={() => onView(contrato.id)}
        >
          <i className="fa-solid fa-eye"></i> Ver
          </button>

        <button
        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-700 font-bold"
        onClick={() => onEdit(contrato.id)} 
        >
          <i className="fa-solid fa-user-pen"></i> Editar
          </button>

        <button 
          onClick={() => onDelete(contrato.id)} 
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 font-bold"
        >
          <i className="fa-solid fa-trash"></i>
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default ContratoCard;
