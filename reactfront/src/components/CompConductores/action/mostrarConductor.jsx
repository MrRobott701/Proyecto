import axios from 'axios';
import { useState, useEffect } from 'react';
import CompCreateConductores from './crearConductor.jsx';
import CompEditConductores from './editarConductor.jsx';
import CompViewConductor from './viewConductor.jsx'; // Importa el nuevo componente de vista
import EliminarConductor from './eliminarConductor.jsx';
import Encabezado from '../others/Encabezado.jsx';
import Switch from '../others/Switch.jsx';
const URI = 'http://localhost:8000/conductores';

const CompSowConductores = ({ isCollapsed }) => {
  const [Conductores, setConductores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedConductorId, setSelectedConductorId] = useState(null);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false); // Controla la visibilidad del modal de creación
  const [isViewModalOpen, setIsViewModalOpen] = useState(false); // Controla la visibilidad del modal de vista

  useEffect(() => {
    getConductores();
  }, []);

  const getConductores = async () => {
    setLoading(true);
    try {
      const response = await axios.get(URI);
      setConductores(response.data);
    } catch (error) {
      console.error("Error fetching Conductores:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredConductores = Conductores.filter(conductor =>
    conductor.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <p>Cargando...</p>;
  }


  const actualizarActivo = async (id, nuevoValor) => {
    try {
      await axios.put(`${URI}/${id}`, { activo: nuevoValor });
      console.log(`Conductor ${id} actualizado a activo: ${nuevoValor}`);
    } catch (error) {
      console.error('Error actualizando el valor de activo:', error);
    }
  };
  

  const toggleActivo = (conductor) => {
    const nuevoValor = conductor.activo === 1 ? 0 : 1;
    // Actualizar el estado localmente
    setConductores((prevConductores) =>
      prevConductores.map((c) =>
        c.id === conductor.id ? { ...c, activo: nuevoValor } : c
      )
    );

    // Llamada a la API para actualizar el valor de 'activo' en la base de datos
    actualizarActivo(conductor.id, nuevoValor);
  };

  return (
    <>
      <Encabezado />
      <div className=''>
        
        <div className='pt-24 mr-12 ml-20'>
          <div className="flex justify-between items-center mb-14">
            <button
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-800 inline-block font-bold"
              onClick={() => setIsCreateModalOpen(true)}
            >
              <i className="fa-solid fa-user-plus"></i> Crear Conductor
            </button>
            <div className="relative">
              <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none">
                <i className="fas fa-search text-gray-400"></i>
              </div>
              <input
                id='search'
                type="text"
                placeholder="Buscar"
                className="rounded border-2 border-black pl-10 pr-10 py-2 font-bold  focus:ring-4 focus:ring-blue-600"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-live="polite"
              />
            </div>
          </div>

          <table className="shadow-2xl rounded-b-3xl font-bold table-fixed w-full border-2 mb-8">
            <thead className="bg-gray-800 text-white text-lg">
              <tr>
                <th className="w-10 border-2 text-center">No</th>
                <th className="w-48 border-2">Nombre</th>
                <th className="w-60 border-2">Dirección</th>
                <th className="w-28 border-2 text-center">Teléfono</th>
                <th className="w-10 border-2 text-center">Activo</th>
                <th className="w-32 border-2 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className='text-lg'>
              {filteredConductores.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center border-2 text-2xl ">
                    No Hay Registros
                  </td>
                </tr>
              ) : (
                filteredConductores.map((conductor, index) => (
                  <tr key={conductor.id}>
                    <td className=" py-2 text-center border-2">{index + 1}</td>
                    <td className="border-2 text-center truncate">
                      {conductor.nombre}
                    </td>
                    <td className="border-2 text-center truncate">
                      {conductor.direccion}
                    </td>
                    <td className="border-2 text-center truncate">
                      {conductor.telefono}
                    </td>




<td className="border-2 text-center truncate">
              <Switch
                isActive={conductor.activo === 1}
                onToggle={() => toggleActivo(conductor)}
              />
            </td>









                    <td className="border-2 py-2 text-center">
                    <button
                        className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-800 text-lg ml-1 mr-1 font-bold"
                        onClick={() => {
                          setSelectedConductorId(conductor.id);
                          setIsEditModalOpen(true);
                        }}
                      >
                        <i className="fa-solid fa-user-pen"></i>
                      </button>
                                            <button
                        className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-800 font-bold text-lg ml-1 mr-2"
                        onClick={() => {
                          setSelectedConductorId(conductor.id);
                          setIsViewModalOpen(true);
                        }}
                      >
                        <i className="fa-solid fa-eye"></i>
                      </button>


                      <EliminarConductor
                        id={conductor.id}
                        getConductores={getConductores}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

        


          {/* Modal de vista */}
          {isViewModalOpen && (
            <CompViewConductor
              id={selectedConductorId}
              onClose={() => setIsViewModalOpen(false)}
            />
          )}

          {/* Modal de edición */}
          {isEditModalOpen && (
            <CompEditConductores
              onClose={() => setIsEditModalOpen(false)}
              getConductores={getConductores}
              id={selectedConductorId}
            />
          )}

          {/* Modal de creación */}
          {isCreateModalOpen && (
            <CompCreateConductores
              onClose={() => setIsCreateModalOpen(false)}
              getConductores={getConductores}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default CompSowConductores;
