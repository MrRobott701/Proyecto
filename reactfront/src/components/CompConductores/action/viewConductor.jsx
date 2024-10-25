import axios from 'axios';
import { useEffect, useState } from 'react';

const URI = 'http://localhost:8000/conductores';

const CompViewConductor = ({ id, onClose }) => {
  const [conductor, setConductor] = useState(null);

  const fetchConductor = async (id) => {
    try {
      const response = await axios.get(`${URI}/${id}`);
      setConductor(response.data);
      document.body.style.overflow = 'hidden';
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchConductor(id);
  }, [id]);

  if (!conductor) {
    return <div>Cargando...</div>; 
  }

  return (
    <div className="fixed text-xl inset-0 bg-gray-900 bg-opacity-70 flex justify-center items-start z-50 max-h-screen overflow-y-auto" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="relative bg-white rounded-lg p-6 w-full max-w-4xl items-start mt-10 mb-8">

        <div className="flex items-center justify-between mb-6">
          <i className="fa-solid fa-eye text-5xl text-gray-900"></i>
          <h2 className="text-4xl font-bold mb-4 text-center">Información del Conductor</h2>
          <button className="-mt-11 -mr-4 text-red-500 hover:text-red-800 text-4xl" onClick={onClose} aria-label="Cerrar modal">
          <i className="fa-solid fa-circle-xmark"></i>
        </button>
        </div>
 
<hr className="my-0 border-gray-800 border-t-4 mb-2" />
<div>
  <p><strong>Nombre:</strong> {conductor.nombre}</p>
  <p><strong>Dirección:</strong> {conductor.direccion}</p>
  <p><strong>Teléfono:</strong> {conductor.telefono}</p>
  <p><strong>Documento:</strong> {conductor.nombreDocumento}</p>
  <p><strong>Número de Documento:</strong> {conductor.nroDocumento}</p>

  {conductor.ineDoc || conductor.licenciaDoc || conductor.reciboLuz || conductor.reciboAgua ? (
    <>
      <hr className="mt-4 my-0 border-gray-800 border-t-4" />
      <p className="text-center"><strong>DOCUMENTACIÓN</strong></p>
    </>
  ) : (
    <p></p>
  )}

  {/* Contenedor para botones en una misma línea */}
  <div className="flex flex-wrap space-x-4 mt-4 justify-center">
    {/* Verificar si el enlace INE existe */}
    {conductor.ineDoc && (
      <a href={conductor.ineDoc} target="_blank" rel="noopener noreferrer">
        <button className="bg-slate-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded">
          INE
        </button>
      </a>
    )}

    {/* Verificar si el enlace Licencia existe */}
    {conductor.licenciaDoc && (
      <a href={conductor.licenciaDoc} target="_blank" rel="noopener noreferrer">
        <button className="bg-slate-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded">
          Licencia
        </button>
      </a>
    )}

    {/* Verificar si el enlace Recibo de Luz existe */}
    {conductor.reciboLuz && (
      <a href={conductor.reciboLuz} target="_blank" rel="noopener noreferrer">
        <button className="bg-slate-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded">
          Recibo de Luz
        </button>
      </a>
    )}

    {/* Verificar si el enlace Recibo de Agua existe */}
    {conductor.reciboAgua && (
      <a href={conductor.reciboAgua} target="_blank" rel="noopener noreferrer">
        <button className="bg-slate-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded">
          Recibo de Agua
        </button>
      </a>
    )}
  </div>
  {/* Verificar si el Aval existe */}
  {conductor.avalNombre || conductor.avalDoc || conductor.avalReciboLuz || conductor.avalReciboAgua ? (
    <>
    <hr className="mt-4 my-0 border-gray-800 border-t-4" />
    <p className='text-center'><strong>AVAL</strong></p>
    </>
  ) : (
    <p></p>
  )}

{conductor.avalNombre ? (
    <p><strong>Nombre :</strong> {conductor.avalNombre}</p>
  ) : (
    <p></p>
  )}

  {conductor.avalTelefono ? (
    <p><strong>Teléfono :</strong> {conductor.avalTelefono}</p>
  ): (
    <p></p>
  )}
{/* Verificar si existen enlaces para el aval */}
{conductor.avalDoc || conductor.avalLuz || conductor.avalAgua ? (
  <>
    <p className="text-center"><strong>DOCUMENTACIÓN</strong></p>
  </>
) : (
  <p></p>
)}

{/* Nombre del Aval */}
{/* Contenedor para los botones de los documentos del aval */}
<div className="flex flex-wrap space-x-4 mt-4 justify-center">
  {/* Verificar si el enlace Documento del Aval existe */}
  {conductor.avalDoc && (
    <a href={conductor.avalDoc} target="_blank" rel="noopener noreferrer">
      <button className="bg-slate-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded">
        Identificación
      </button>
    </a>
  )}

  {/* Verificar si el enlace Recibo de Luz del Aval existe */}
  {conductor.avalLuz && (
    <a href={conductor.avalLuz} target="_blank" rel="noopener noreferrer">
      <button className="bg-slate-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded">
        Recibo de Luz
      </button>
    </a>
  )}

  {/* Verificar si el enlace Recibo de Agua del Aval existe */}
  {conductor.avalAgua && (
    <a href={conductor.avalAgua} target="_blank" rel="noopener noreferrer">
      <button className="bg-slate-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded">
        Recibo de Agua
      </button>
    </a>
  )}
</div>

  <hr className="mt-4 my-0 border-gray-800 border-t-4" />
    {/* Notas */}
    {conductor.nota ? (
      <p className='mt-5 mb-10'><strong>Nota:</strong> {conductor.nota}</p>
    ) : (
      <p></p>
    )}




</div>

        <div className="flex justify-between mt-4">
          <button type="button" className="font-bold bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700" onClick={onClose}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompViewConductor;
