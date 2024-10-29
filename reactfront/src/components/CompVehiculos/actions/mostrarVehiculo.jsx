// mostrarVehiculo.jsx

import axios from 'axios';
import { useState, useEffect, useMemo } from 'react';
import CompCreateVehiculos from './crearVehiculo.jsx'; // Componente del formulario
import Encabezado from '../others/Encabezado.jsx';
import AsignarChofer from './asignarChofer.jsx';
import CompViewVehiculo from './viewVehiculo.jsx'; // Asegúrate de que la ruta sea correcta
import CompEditVehiculo from './editarVehiculo.jsx'; // Asegúrate de que la ruta sea correcta
import Swal from 'sweetalert2'; // Asegúrate de importar Swal si no lo has hecho
import 'sweetalert2/dist/sweetalert2.min.css'; // Importa el CSS de SweetAlert2
import EliminarVehiculo from './eliminarVehiculo.jsx';

const URI = 'http://localhost:8000/vehiculos';

const CompSowVehiculos = ({ isCollapsed }) => {
  const [Vehiculos, setVehiculos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Nuevo estado para manejar el modal de "Ver Vehículo"
  const [showViewModalver, setShowViewModalver] = useState(false);
  
  // Nuevo estado para manejar el tipo de modal abierto: null, 'create', 'edit', 'view'
  const [modalType, setModalType] = useState(null);
  const [selectedVehiculoId, setSelectedVehiculoId] = useState(null);

  // Función para abrir el modal de creación
  const openCreateModal = () => {
    setModalType('create');
    setSelectedVehiculoId(null); // Asegura que no haya vehículo seleccionado para edición
  };

  // Función para abrir el modal de edición
  const openEditModal = (id) => {
    setSelectedVehiculoId(id);
    setModalType('edit');
  };


    // Función para manejar cuando se hace clic en "Ver"
    const handleViewVehiculo = (id) => {
      setSelectedVehiculoId(id);
      setShowViewModalver(true);
    };

    const handleViewModalClose = () => {
      setShowViewModalver(false);
    };
  

  // Función para abrir el modal de vista
  const openViewModal = (id) => {
    setSelectedVehiculoId(id);
    setModalType('view');
  };

  // Función para cerrar cualquier modal
  const closeModal = () => {
    setModalType(null);
    setSelectedVehiculoId(null);
  };

  useEffect(() => {
    getVehiculos();
  }, []);

  const getVehiculos = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${URI}/activos`);
      setVehiculos(response.data);
    } catch (error) {
      console.error("Error fetching Vehiculos:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error al Obtener Vehículos',
        text: 'No se pudieron obtener los vehículos, por favor intenta nuevamente.',
      });
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
    getVehiculos(); // Refresca la lista de vehículos
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
    if (!url) return null;
    const regex = /\/d\/(.*?)\//;
    const match = url.match(regex);
    return match ? match[1] : null;
  };


  return (
    <>
      <Encabezado />
      <div className='pt-24 ml-20 mr-12 mb-12'>
        {!modalType ? (
          <>
            <div className='flex flex-col md:flex-row justify-between items-start'>
              <button
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-800 font-bold mb-4 md:mb-0"
                onClick={openCreateModal} 
              >
                <i className="fa-solid fa-user-plus"></i> Crear Vehículo
              </button>
              <div className="relative w-full md:w-3/6">
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
                      <EliminarVehiculo id={vehiculo.id} idConductor={vehiculo.idConductor} getVehiculos={getVehiculos} />
                      <h3 className="text-xl font-bold mb-2">{vehiculo.marca}</h3>
                      <p><span className="font-semibold">Modelo:</span> {vehiculo.modelo}</p>
                      <p><span className="font-semibold">Color:</span> {vehiculo.color}</p>
                      <p><span className="font-semibold">Año:</span> {vehiculo.anio}</p>
                      <p><span className="font-semibold">Placas:</span> {vehiculo.placas}</p>
                      <div className='relative mt-2'>
                      <div className="flex">
          <div className="flex">
            <button onClick={() =>
              Swal.fire({
                title: "Asignación de Conductores",
                html: `<p>Seleccione un <strong>conductor</strong> para asignar al vehículo.</p>
                   <p>Solo se puede asignar <strong>un conductor</strong> a la vez.</p>
                   <p>Si selecciona un <strong>conductor</strong> con un vehículo, el vehículo anterior quedará sin conductor.</p>
                   <p>Si selecciona <strong>'Sin Conductor'</strong>, se <strong>desasignará</strong> el conductor actual.</p>`,
                icon: "info",
                confirmButtonText: "Entendido",
                width: '800px',
                padding: '1.5rem',
                backdrop: true,
              })
            }
            className="fa-solid fa-info-circle text-2xl mr-2 hover:scale-125 hover:shadow-xl"
            style={{ "color": "#0000ff" }}></button>
            <label className="block font-bold pt-0.5">Conductor Asignado</label>
          </div>
        </div>
                        <AsignarChofer 
                          idVehiculo={vehiculo.id} 
                          onAsignacionExitosa={handleAsignacionExitosa}  
                          className="absolute z-10 bg-white shadow-lg p-4 rounded"
                        />
                      </div>

                      <div className="border-2 border-gray-200 shadow-lg mt-4 w-full h-48 flex justify-center items-center relative overflow-hidden rounded-lg hover:scale-105 hover:shadow-lg">
                        {fileId ? (
                          <iframe
                            src={`https://drive.google.com/file/d/${fileId}/preview?disablezoom=true`}
                            className="object-cover h-full w-full pointer-events-none"
                            title="Car Image"
                            onLoad={() => setLoading(false)} 
                          />
                        ) : (
                          <span>Sin imagen</span>
                        )}
                      </div>
  
                      <div className="mt-4 flex justify-between">
                      <button
                          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700 font-bold"
                          onClick={() => handleViewVehiculo(vehiculo.id)} // Abrir modal al hacer clic
                        >
                          <i className="fa-solid fa-eye"></i> Ver
                        </button>
                        <button
                          className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-700 font-bold"
                          onClick={() => openEditModal(vehiculo.id)}
                        >
                          <i className="fa-solid fa-user-pen"></i> Editar
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        ) : null}

        {/* Renderizar el Modal correspondiente basado en modalType */}
        {modalType === 'create' && (
          <CompCreateVehiculos
            onClose={closeModal} 
            getVehiculos={getVehiculos} 
          />
        )}

        {modalType === 'edit' && selectedVehiculoId && (
          <CompEditVehiculo
            onClose={closeModal}
            getVehiculos={getVehiculos}
            vehiculoId={selectedVehiculoId}
          />
        )}

        {showViewModalver === true && selectedVehiculoId && (
          <CompViewVehiculo 
            id={selectedVehiculoId} 
            onClose={handleViewModalClose} 
          />
        )}
      </div>
    </>
  );
};

export default CompSowVehiculos;
