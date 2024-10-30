// MostrarContratos.jsx
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Encabezado from "../others/Encabezado";
import ContratoCard from "./ContratoCard";
import CrearContrato from "./CrearContrato";
import Swal from "sweetalert2";
import PlantillaContrato from "./PlantillaContrato";

const MostrarContratos = () => {
  const [contratos, setContratos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const URI_CONTRATOS = "http://localhost:8000/contratos";
  const URI_CONDUCTORES = "http://localhost:8000/conductores";
  const URI_VEHICULOS = "http://localhost:8000/vehiculos";
  const URI_PROPIETARIOS = "http://localhost:8000/propietarios";

  // Función para obtener los contratos con detalles
  const fetchContracts = useCallback(async () => {
    setIsLoading(true);
    try {
      const [contractsRes, conductorsRes, vehiclesRes, ownersRes] = await Promise.all([
        axios.get(URI_CONTRATOS),
        axios.get(URI_CONDUCTORES),
        axios.get(URI_VEHICULOS),
        axios.get(URI_PROPIETARIOS),
      ]);

      const conductors = conductorsRes.data;
      const vehicles = vehiclesRes.data;
      const owners = ownersRes.data;

      const contractsWithDetails = contractsRes.data.map(contract => ({
        ...contract,
        conductor: conductors.find(c => c.id === contract.idConductor) || {},
        vehiculo: vehicles.find(v => v.id === contract.idVehiculo) || {},
        propietario: owners.find(o => o.id === contract.idPropietario) || {},
      }));

      setContratos(contractsWithDetails);
    } catch (error) {
      console.error("Error fetching data:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error al obtener contratos',
        text: 'No se pudieron obtener los contratos. Por favor, intenta nuevamente más tarde.',
      });
    } finally {
      setIsLoading(false);
    }
    
  }, [URI_CONTRATOS, URI_CONDUCTORES, URI_VEHICULOS, URI_PROPIETARIOS]);

  useEffect(() => {
    fetchContracts();
  }, [fetchContracts]);

  // Funciones manejadoras para acciones sobre contratos
  const handleView = useCallback((id) => {
    console.log("Ver contrato con ID:", id);
    // Implementar la lógica para ver detalles del contrato
  }, []);

  const handleEdit = useCallback((id) => {
    console.log("Editar contrato con ID:", id);
    // Implementar la lógica para editar el contrato
  }, []);

  const handleDelete = useCallback(async (id) => {
    try {
      const result = await Swal.fire({
        title: '¿Estás seguro?',
        text: "¡No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
      });

      if (result.isConfirmed) {
        await axios.delete(`${URI_CONTRATOS}/${id}`);
        Swal.fire(
          'Eliminado!',
          'El contrato ha sido eliminado.',
          'success'
        );
        fetchContracts();
      }
    } catch (error) {
      console.error("Error eliminando contrato:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error al eliminar contrato',
        text: error.response?.data?.error || 'No se pudo eliminar el contrato.',
      });
    }
  }, [fetchContracts, URI_CONTRATOS]);

  // Funciones para manejar el modal de creación de contratos
  const openCreateModal = useCallback(() => setIsCreateModalOpen(true), []);
  const closeCreateModal = useCallback(() => setIsCreateModalOpen(false), []);

  // Función para refrescar la lista de contratos después de crear uno nuevo
  const handleCreateSuccess = useCallback(() => {
    fetchContracts();
    closeCreateModal();
  }, [fetchContracts, closeCreateModal]);

  // Función para manejar la búsqueda
  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  // Función para filtrar los contratos basados en el término de búsqueda
  const filteredContratos = contratos.filter(contrato => {
    const term = searchTerm.toLowerCase();
    return (
      contrato.conductor.nombre?.toLowerCase().includes(term) ||
      contrato.vehiculo.marca?.toLowerCase().includes(term) ||
      contrato.vehiculo.modelo?.toLowerCase().includes(term) ||
      contrato.vehiculo.color?.toLowerCase().includes(term) ||
      contrato.vehiculo.anio?.toString().includes(term) ||
      contrato.vehiculo.placas?.toLowerCase().includes(term) ||
      contrato.propietario.nombre?.toLowerCase().includes(term)
    );
  });

  return (
    <div>
      <Encabezado />
      <div className="pt-24 ml-20 mr-12 mb-12">
        <div className="flex flex-col md:flex-row justify-between items-start mb-6">
          <button
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-800 font-bold flex items-center mb-4 md:mb-0"
            onClick={openCreateModal}
            aria-label="Crear Contrato"
          >
            <i className="fa-solid fa-user-plus mr-2"></i> Crear Contrato
          </button>
          <div className="relative w-full md:w-3/6">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i className="fas fa-search text-gray-400"></i>
            </div>
            <input
              id="search"
              type="text"
              placeholder="Buscar Conductor / Vehículo / Propietario..." 
              className="w-full rounded border-2 border-black pl-10 pr-4 py-2 font-bold focus:ring-4 focus:ring-blue-600"
              value={searchTerm}
              onChange={handleSearchChange}
              aria-label="Buscar Contratos"
              aria-live="polite"
            />
          </div>
        </div>
        <h1 className="text-2xl font-bold mb-4">Contratos</h1>

        {isLoading ? (
          <div className="flex justify-center items-center">
            <i className="fas fa-spinner fa-spin fa-3x text-blue-600"></i>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredContratos.length > 0 ? (
              filteredContratos.map(contrato => (
                <ContratoCard
                  key={contrato.id}
                  contrato={contrato}
                  onView={handleView}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))
            ) : (
              <p className="text-gray-700">No se encontraron contratos que coincidan con la búsqueda.</p>
            )}
          </div>
        )}
      </div>

      {/* Renderizar el Modal para Crear Contrato */}
      {isCreateModalOpen && (
        <CrearContrato 
          onClose={closeCreateModal} 
          onSubmitSuccess={handleCreateSuccess} 
        />
      )}

      {/* Renderizar el Modal para Ver Plantilla de Contrato */}
      <PlantillaContrato />
    </div>
  );
};

export default MostrarContratos;
