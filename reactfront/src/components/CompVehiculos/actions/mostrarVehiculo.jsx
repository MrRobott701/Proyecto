import axios from 'axios';
import { useState, useEffect, useMemo } from 'react';
import CompCreateVehiculos from './crearVehiculo.jsx'; // Componente del formulario
import Encabezado from '../others/Encabezado.jsx';
import AsignarChofer from './asignarChofer.jsx';

const URI = 'http://localhost:8000/vehiculos';

const CompSowVehiculos = ({ isCollapsed }) => {
  const [Vehiculos, setVehiculos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Estado para controlar la carga

  

  useEffect(() => {
    getVehiculos();
  }, []);

  const getVehiculos = async () => {
    setLoading(true);
    try {
      const response = await axios.get(URI);
      setVehiculos(response.data);
    } catch (error) {
      console.error("Error fetching Vehiculos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAsignacionExitosa = () => {
    // Aquí puedes actualizar el estado de los vehículos o hacer una recarga de datos
    Swal.fire({
      icon: 'success',
      title: 'Asignación completada',
      text: 'El chofer ha sido asignado correctamente al vehículo.',
    });
  };
  
  const filteredVehiculos = useMemo(() => {
    return Vehiculos.filter(vehiculo =>
      (vehiculo.marca && vehiculo.marca.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (vehiculo.modelo && vehiculo.modelo.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (vehiculo.placas && vehiculo.placas.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (vehiculo.color && vehiculo.color.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (vehiculo.anio && vehiculo.anio.toString().includes(searchTerm))
    );
  }, [Vehiculos, searchTerm]);

  // Función para extraer el FILE_ID de la URL de Google Drive
  const extractFileId = (url) => {
    const regex = /\/d\/(.*?)\//;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  if (loading) {
    return <p className="text-center text-xl mt-10">Cargando...</p>;
  }

  return (
    <>
      <Encabezado />
      <div className='pt-24 ml-20 mr-12 mb-12'>
        {!isCreateModalOpen ? (
          <>
            <div className=' flex flex-col md:flex-row justify-between items-start'>
              <button
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-800 font-bold mb-4 md:mb-0"
                onClick={() => setIsCreateModalOpen(true)} 
              >
                <i className="fa-solid fa-user-plus"></i> Crear Vehiculo
              </button>
              <div className="relative w-full md:w-3/6 ">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-search text-gray-400"></i>
                </div>
                <input
                  id='search'
                  type="text"
                  placeholder="MARCA / MODELO / PLACAS / COLOR / AÑO" 
                  className="w-full rounded border-2 border-black pl-10 pr-4 py-2 font-bold focus:ring-4 focus:ring-blue-600"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  aria-live="polite"
                />
              </div>
            </div>

            {filteredVehiculos.length === 0 ? (
              <p className="text-center text-2xl mt-10">No Hay Registros</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                {filteredVehiculos.map((vehiculo) => {
                  const fileId = extractFileId(vehiculo.fotoCarro);
                  return (
                    <div key={vehiculo.id} className="bg-white shadow p-6 rounded-lg border mt-4 transform transition-transform hover:scale-105 hover:shadow-lg">
                      <h3 className="text-xl font-bold mb-2">{vehiculo.marca}</h3>
                      <p><span className="font-semibold">Modelo:</span> {vehiculo.modelo}</p>
                      <p><span className="font-semibold">Color:</span> {vehiculo.color}</p>
                      <p><span className="font-semibold">Año:</span> {vehiculo.anio}</p>
                      <p><span className="font-semibold">Placas:</span> {vehiculo.placas}</p>

                      <div className="border-2 border-gray-200 shadow-lg mt-4 w-full h-48 flex justify-center items-center relative overflow-hidden rounded-lg hover:scale-105 hover:shadow-lg">
      {fileId ? (
        <>
          {/* Mostrar spinner mientras se carga */}
          {isLoading && (
            <div className="absolute inset-0 flex justify-center items-center bg-white z-10">
              <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 border-gray-300 border-t-blue-600 rounded-full" role="status">
                <span className="visually-hidden">Cargando...</span>
              </div>
            </div>
          )}

          <iframe
            src={`https://drive.google.com/file/d/${fileId}/preview?disablezoom=true`} // Deshabilita el zoom
            className="object-cover h-full w-full pointer-events-none" // Deshabilita la interacción
            title="Car Image"
            onLoad={() => setIsLoading(false)} // Cuando el iframe termina de cargar, oculta el spinner
          />

          {/* Overlay para desactivar interacción con el iframe */}
          <div className="absolute inset-0 bg-transparent pointer-events-none"></div>
        </>
      ) : (
        <span>Sin imagen</span>
      )}
    </div>
        
      <AsignarChofer idVehiculo={vehiculo.id} onAsignacionExitosa={getVehiculos}/>              
                      <div className="mt-4 flex justify-between">
                        <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700 font-bold">
                          <i className="fa-solid fa-eye"></i> Ver
                        </button>
                        <button className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-700 font-bold">
                          <i className="fa-solid fa-user-pen"></i> Editar
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        ) : (
          <CompCreateVehiculos
            onClose={() => setIsCreateModalOpen(false)} 
            getVehiculos={getVehiculos} 
          />
        )}
      </div>
    </>
  );

};

export default CompSowVehiculos;
