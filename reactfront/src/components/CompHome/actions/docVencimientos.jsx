import React, { useState } from "react";
import CompViewVehiculo from "../../CompVehiculos/actions/viewVehiculo";

// Función para comparar las fechas
const compareDates = (dateStr) => {
  const today = new Date();
  const expirationDate = new Date(dateStr);
  const oneMonthLater = new Date(today);
  oneMonthLater.setMonth(today.getMonth() + 1);

  expirationDate.setHours(0, 0, 0, 0);  // Eliminar las horas/minutos/segundos

  if (expirationDate < today) return "vencido";
  if (expirationDate <= oneMonthLater) return "pronto";
  return "ok";
};

const DocVencimientos = ({ vehiculos }) => {
  const [selectedVehiculoId, setSelectedVehiculoId] = useState(null);  // Guardamos el ID del vehículo seleccionado

  const processDocuments = (vehiculo) => {
    const documentos = [
      { name: "Imos Permiso", expiration: vehiculo.imosVencimiento, url: vehiculo.imosPermiso },
      { name: "Placas", expiration: vehiculo.placasVencimiento, url: vehiculo.placasDoc },
      { name: "Póliza de Seguro", expiration: vehiculo.polizaSeguroVencimiento, url: vehiculo.polizaSeguro },
      { name: "Revisión Mecánica", expiration: vehiculo.revisionMecanicaVencimiento, url: vehiculo.revisionMecanica },
      { name: "Tarjeta de Circulación", expiration: vehiculo.tarjetaCirculacionVencimiento, url: vehiculo.tarjetaCirculacion },
    ];

    return documentos.map((doc) => ({
      ...doc,
      marca: vehiculo.marca,
      modelo: vehiculo.modelo,
      color: vehiculo.color,
      placas: vehiculo.placas,
      status: compareDates(doc.expiration),
      vehiculoId: vehiculo.id,  // Incluimos el ID en cada documento, aunque no es estrictamente necesario
    }));
  };

  const documentosVencidosYProntosAVencer = vehiculos.flatMap(processDocuments).filter(doc => doc.status !== "ok");

  const handleRowClick = (vehiculoId) => {
    setSelectedVehiculoId(vehiculoId);  // Guardamos el ID del vehículo seleccionado
  };

  const handleClose = () => {
    setSelectedVehiculoId(null);  // Restablecemos el estado cuando se cierra el componente
  };

  return (
    <div className="container">
      <h1 className="text-3xl font-bold mb-4 text-center">Documentos Prontos a Vencer</h1>
      <table className="font-bold w-full overflow-visible text-2xl border-collapse "
        style={{ boxShadow: "0px 1px 12px rgba(11, 212, 240)" }}>
        <thead className="text-xl sticky -top-7 bg-black text-white z-10">
          <tr className="bg-black text-white">
            <th className="px-6 py-3 border text-center">Marca</th>
            <th className="px-6 py-3 border text-center">Modelo</th>
            <th className="px-6 py-3 border text-center">Color</th>
            <th className="px-6 py-3 border text-center">Placas</th>
            <th className="px-6 py-3 border text-center">Documento a Vencer</th>
            <th className="px-6 py-3 border text-center">Fecha de Vencimiento</th>
          </tr>
        </thead>
        <tbody className="text-xl text-white cursor-pointer"
          style={{ textShadow: "1px 1px 5px rgba(0, 0, 0)" }}>
          {documentosVencidosYProntosAVencer.map((doc, index) => {
            const rowClass = doc.status === "vencido" ? "bg-red-600 hover:bg-red-700" : doc.status === "pronto" ? "bg-orange-500 hover:bg-orange-600" : "";
            return (
              <tr key={index} className={rowClass} onClick={() => handleRowClick(doc.vehiculoId)}>
                <td className="px-6 py-3 border text-center">{doc.marca}</td>
                <td className="px-6 py-3 border text-center">{doc.modelo}</td>
                <td className="px-6 py-3 border text-center">{doc.color}</td>
                <td className="px-6 py-3 border text-center">{doc.placas}</td>
                <td className="px-6 py-3 border text-center">{doc.name}</td>
                <td className="px-6 py-3 border text-center">{new Date(doc.expiration).toLocaleDateString()}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {selectedVehiculoId && (
        <CompViewVehiculo id={selectedVehiculoId} onClose={handleClose} />  
        
      )}
    </div>
  );
};

export default DocVencimientos;
