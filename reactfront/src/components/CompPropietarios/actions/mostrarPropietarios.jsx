import axios from 'axios';
import { useState, useEffect } from 'react';
import CompCreatePropietarios from './crearPropietarios.jsx';
import CompEditPropietarios from './editarPropietarios.jsx';
import CompViewPropietario from './viewPropietario.jsx';
import EliminarPropietario from './eliminarPropietario.jsx';
import Encabezado from '../others/Encabezado.jsx';


const URI = 'http://localhost:8000/propietarios';

const CompSowPropietarios = ({ isCollapsed }) => {
  const [propietarios, setPropietarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedPropietarioId, setSelectedPropietarioId] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false); // Controla la visibilidad del modal de vista
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false); // Controla la visibilidad del modal de creación


  useEffect(() => {
    getPropietarios();
  }, []);

  const getPropietarios = async () => {
    setLoading(true);
    try {
      const response = await axios.get(URI);
      setPropietarios(response.data);
    } catch (error) {
      console.error("Error fetching propietarios:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredPropietarios = propietarios.filter(propietario =>
    propietario.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <p>Cargando...</p>;
  }

  return (
    <>
    {isCollapsed && <Encabezado 
    isCollapsed={isCollapsed}
     />}
    {!isCollapsed && <div className='mr-96'><Encabezado /></div>}
      <div className=''>
        <div className='pt-24 mr-12 ml-20'>
          <div className="flex justify-between items-center mb-4">
            <button
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-800 inline-block font-bold"
              onClick={() => setIsCreateModalOpen(true)}
            >
              <i className="fa-solid fa-user-plus"></i> Crear Propietario
            </button>
            <div className="relative">
              <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none">
                <i className="fas fa-search text-gray-400"></i>
              </div>
              <input
                type="text"
                placeholder="Buscar"
                className="rounded border-2 border-black pl-10 pr-10 py-2 font-bold  focus:ring-4 focus:ring-blue-600"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-live="polite"
              />
            </div>
          </div>

          <table className="shadow-2xl rounded-b-3xl font-bold table-fixed w-full border-2">
            <thead className="bg-gray-800 text-white text-lg">
              <tr>
                <th className="w-10 border-2 text-center ">No</th>
                <th className="w-60 border-2">Nombre</th>
                <th className="w-64 border-2">Dirección</th>
                <th className="w-28 border-2 text-center">Teléfono</th>
                <th className="w-32 border-2 text-center">Documento</th>
                <th className="w-40 border-2 text-center">No Documento</th>
                <th className="w-32 border-2 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className='text-lg'>
              {filteredPropietarios.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center border-2 text-2xl ">
                    No Hay Registros
                  </td>
                </tr>
              ) : (
                filteredPropietarios.map((propietario, index) => (
                  <tr key={propietario.id}>
                    <td className=" py-2 text-center border-2">{index + 1}</td>
                    <td className="border-2 text-center truncate">
                      {propietario.nombre}
                    </td>
                    <td className="border-2 text-center truncate">
                      {propietario.direccion}
                    </td>
                    <td className="border-2 text-center truncate">
                      {propietario.telefono}
                    </td>
                    <td className="border-2 text-center truncate">
                      {propietario.nombreDocumento}
                    </td>
                    <td className="border-2 text-center truncate">
                      {propietario.nroDocumento}
                    </td>
                    <td className="border-2 py-2 text-center">
                      <button
                        className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-800 mr-2 font-bold text-lg"
                        onClick={() => {
                          setSelectedPropietarioId(propietario.id);
                          setIsEditModalOpen(true);
                        }}
                      >
                        <i className="fa-solid fa-user-pen"></i>
                      </button>

                      <button
                        className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-800 font-bold text-lg ml-1 mr-2"
                        onClick={() => {
                          setSelectedPropietarioId(propietario.id);
                          setIsViewModalOpen(true);
                        }}
                      >
                        <i className="fa-solid fa-eye"></i>
                      </button>


                      <EliminarPropietario
                        id={propietario.id}
                        getPropietarios={getPropietarios}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Modal de edición */}
          {isEditModalOpen && (
            <CompEditPropietarios
              onClose={() => setIsEditModalOpen(false)}
              getPropietarios={getPropietarios}
              id={selectedPropietarioId}
            />
          )}


          {isCreateModalOpen && (
            <CompCreatePropietarios
              onClose={() => setIsCreateModalOpen(false)} // Cierra el modal
              getPropietarios={getPropietarios} // Actualiza la lista de propietarios
            />
          )}

                    {/* Modal de vista */}
                    {isViewModalOpen && (
            <CompViewPropietario
              id={selectedPropietarioId}
              onClose={() => setIsViewModalOpen(false)}
            />
          )}


        </div>
        
        </div>
    </>
  );
};

export default CompSowPropietarios;
