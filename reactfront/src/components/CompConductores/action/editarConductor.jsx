import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { sendUpload } from '../../sendUpload';
import { deleteFile } from '../../deleteFile';
import DocumentSection from './DocumentSection';

// Importar las validaciones
import { 
  validarVacio, 
  validarNombreLongitud, 
  validarNombreSoloLetras, 
  validarDocumentoSoloLetras, 
  validarSoloNumeros, 
  validarTelefonoLongitud, 
  validarDireccionLongitud 
} from '../../validations/validaciones';

const URI = 'http://localhost:8000/conductores';
const URI_VEHICULO = 'http://localhost:8000/vehiculos';

const CompEditConductores = ({ id, onClose, getConductores }) => {
  const navigate = useNavigate();

  
   // Initial state to track form data and changes
   const [initialValues, setInitialValues] = useState({});
   const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Cambiar el estado para que se mantenga los datos del conductor
  const [conductor, setConductor] = useState(null);
  const [nombre, setNombre] = useState('');
  const [colonia, setColonia] = useState('');
  const [calle, setCalle] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [nombreDocumento, setNombreDocumento] = useState('');
  const [nroDocumento, setNroDocumento] = useState('');
  const [avalNombre, setavalNombre] = useState('');
  const [avalTelefono, setAvalTelefono] = useState('');
  const [nota, setNota] = useState('');
  const [avalDoc, setAvalDoc] = useState('');
  const [avalDocFile, setAvalDocFile] = useState(null);
  const [telefonoInput, setTelefonoInput] = useState(''); // Campo con formato
  const[avalTelefonoInput,setAvalTelefonoInput] = useState(''); // Campo con formato




// Función para formatear el número de teléfono
const formatTelefono = (telefono) => {
  let formattedValue = '';
  if (telefono.length > 0) {
      formattedValue += telefono.substring(0, 3);
  }
  if (telefono.length >= 4) {
      formattedValue += '-' + telefono.substring(3, 6);
  }
  if (telefono.length >= 7) {
      formattedValue += '-' + telefono.substring(6, 8);
  }
  if (telefono.length >= 9) {
      formattedValue += '-' + telefono.substring(8, 10);
  }
  return formattedValue;
};

// Al cargar el componente, formatear el número inicial
useEffect(() => {
  if (telefono) {
      setTelefonoInput(formatTelefono(telefono));
  }
  if (avalTelefono) {
      setAvalTelefonoInput(formatTelefono(avalTelefono));
  }
}, [telefono, avalTelefono]);

// Función para manejar el cambio en el campo de teléfono
const handleTelefonoChange = (e) => {
  let value = e.target.value.replace(/\D/g, '').slice(0, 10);
  setTelefono(value);
  setTelefonoInput(formatTelefono(value));
};

// Para manejar el cambio en el campo de avalTeléfono
const handleAvalTelefonoChange = (e) => {
  let value = e.target.value.replace(/\D/g, '').slice(0, 10);
  setAvalTelefono(value);
  setAvalTelefonoInput(formatTelefono(value));
};

  useEffect(() => {
    // Deshabilitar scroll al mostrar modal
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const fetchConductor = async (id) => {
    try {
      const response = await axios.get(`${URI}/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateConductores = async (id, data) => {
    try {
      const response = await axios.put(`${URI}/${id}`, data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = async (data) => {
    try {
      await updateConductores(id, data);
      Swal.fire({
        icon: 'success',
        title: 'Registro actualizado',
        showConfirmButton: false,
        timer: 1500,
      });
      getConductores(); 
      onClose();
      navigate('/conductores');
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error al actualizar',
        text: error.response?.data?.error || 'Error desconocido',
      });
    }
  };




  
  const transformGoogleDriveURL = (url) => {
    const fileIdMatch = url.match(/\/d\/(.*?)\//);
    if (fileIdMatch) {
      const fileId = fileIdMatch[1];
      return `https://drive.google.com/file/d/${fileId}/preview?disablezoom=true`;
    }
    return url;
  }


  
    // Función para formatear el nombre del archivo
    const formatFileName = (tipo) => {
      const sanitizedNombre = nombre.replace(/\s+/g, '_');
      return `${sanitizedNombre}_AVAL_${tipo}`.toUpperCase();
    };


    const handleAvalDocSelected = (file) => {
      if (!file) {
        console.log("No file selected");
        return;
      }
      const renamedFile = new File(
        [file],
        `${formatFileName('IDENTIFICACIÓN')}.${file.name.split('.').pop()}`,
        { type: file.type }
      );
      setAvalDocFile(renamedFile);
    };
    
  



      // Función para extraer el FILE_ID de la URL de Google Drive
  const extractFileId = (url) => {
    console.log('URL:', url);
    if (!url) return null;
    const regex = /\/d\/([a-zA-Z0-9_-]{25,})\//; // Asegura que el ID tenga al menos 25 caracteres
    const match = url.match(regex);
    console.log('Match:', match);
    return match ? match[1] : null;
  };

// Función para manejar la eliminación de archivos (Generalizada)
const handleDeleteFiles = async (docUrl, setDocUrl, docType) => {
  try {
    const urlId = extractFileId(docUrl); // Obtener el ID del archivo
    if (!urlId) {
      console.error('ID del archivo no válido, no se puede eliminar.');
      Swal.fire({
        icon: 'error',
        title: 'ID Inválido',
        text: 'No se pudo obtener el ID del archivo para eliminar.',
      });
      return;
    }

    console.log(`Eliminando archivo de Google Drive (${docType}) con ID:`, urlId);
    // Eliminar el archivo usando la función deleteFile
    const mensaje = await deleteFile(urlId); // Esperar a que se elimine el archivo
    console.log('Archivo eliminado exitosamente:', mensaje);

    // Vaciar el estado del documento correspondiente
    setDocUrl('');
    // Actualizar el conductor eliminando el archivo del estado
    const updatedData = {
      ...conductor, // Asegúrate de que `conductor` sea el estado del conductor actual
      [`${docType}Url`]: '', // Actualiza el campo correspondiente a este documento
    };

    // Realiza la actualización de los datos del conductor
    const response = await axios.put(`${URI}/${id}`, updatedData);
    console.log('Conductor actualizado exitosamente:', response.data);

    Swal.fire({
      icon: 'success',
      title: 'Archivo Eliminado y Conductor Actualizado',
      showConfirmButton: false,
      timer: 1500,
    });

    return response.data;
  } catch (error) {
    console.error('Error al eliminar el archivo de Google Drive:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error al Eliminar Archivo',
      text: 'No se pudo eliminar el archivo de Google Drive, por favor intente nuevamente.',
    });
  }
};


    // Función para determinar el tipo de archivo
    const getFileType = (url) => {
      if (!url) return null;
      const extension = url.split('.').pop().toLowerCase();
      if (['jpg', 'jpeg', 'png', 'gif', 'bmp'].includes(extension)) {
        return 'image';
      }
      if (['pdf'].includes(extension)) {
        return 'pdf';
      }
      return 'other';
    };

    // Función para renderizar la vista previa del documento en iframe y agregar "Ver Documento"
    const renderPreview = (url, tipo) => {
      if (!url) return null;
  
      const transformedURL = transformGoogleDriveURL(url);
      const fileType = getFileType(url);
  
      return (
        <div className="mt-2">
          {fileType === 'image' ? (
            <img
              src={transformedURL}
              alt={`${tipo} Preview`}
              className="w-full h-48 object-contain rounded shadow"
            />
          ) : (
            <iframe
              src={`${transformedURL}&embedded=true`}
              title={`${tipo} Preview`}
              className="w-full h-48 rounded shadow"
              allow="autoplay"
            />
          )}
        </div>
      );
    };

  useEffect(() => {
 const loadConductor = async () => {
      const data = await fetchConductor(id);
      setConductor(data);
      setNombre(data.nombre);
      setColonia(data.colonia);
      setCalle(data.calle);
      setDireccion(data.direccion);
      setTelefono(data.telefono);
      setNombreDocumento(data.nombreDocumento);
      setNroDocumento(data.nroDocumento);
      setavalNombre(data.avalNombre);
      setAvalTelefono(data.avalTelefono);
      setAvalDoc(data.avalDoc);
      setNota(data.nota);

      // Save initial values to compare later
      setInitialValues({
        nombre: data.nombre,
        direccion: data.direccion,
        telefono: data.telefono,
        nombreDocumento: data.nombreDocumento,
        nroDocumento: data.nroDocumento,
        avalNombre: data.avalNombre,
        avalTelefono: data.avalTelefono,
        avalDoc: data.avalDoc,
        nota: data.nota,
      });
    };
    loadConductor();
  }, [id]);

  // Efecto para inicializar los valores formateados
useEffect(() => {
  if (telefono) {
      setTelefonoInput(formatTelefono(telefono));
  }
  if (avalTelefono) {
      setAvalTelefonoInput(formatTelefono(avalTelefono));
  }
}, [telefono, avalTelefono]);

  const [erroresCampos, setErroresCampos] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errores = [];
    let nuevosErroresCampos = {};


    // Validaciones
    const validaciones = [
      { error: validarVacio(nombre, 'Nombre'), campo: 'nombre' },
      { error: validarNombreLongitud(nombre), campo: 'nombre' },
      { error: validarNombreSoloLetras(nombre), campo: 'nombre' },

      { error: validarVacio(direccion, 'Direccion'), campo: 'direccion' },
      { error: validarDireccionLongitud(direccion), campo: 'direccion' },
      
      { error: validarVacio(telefono, 'Teléfono'), campo: 'telefono' },
      { error: validarSoloNumeros(telefono), campo: 'telefono' },
      { error: validarTelefonoLongitud(telefono), campo: 'telefono' },
      
      { error: validarVacio(nombreDocumento, 'Documento'), campo: 'nombreDocumento' },
      { error: validarNombreSoloLetras('Documento'), campo: 'documento' },
      
      { error: validarDocumentoSoloLetras(nombreDocumento), campo: 'nombreDocumento' },
      { error: validarVacio(nroDocumento, 'Nro Documento'), campo: 'nroDocumento' },
    ];

    validaciones.forEach(({ error, campo }) => {
      if (error) {
        errores.push(error);
        nuevosErroresCampos[campo] = true;
      }
    });

    if (errores.length > 0) {
      Swal.fire({
        icon: 'error',
        title: 'Errores de validación',
        html: `<ul>${errores.map((err) => `<li>${err}</li>`).join('')}</ul>`,
      });
      setErroresCampos(nuevosErroresCampos);
      return;
    }

    try {
      Swal.fire({
        title: "Guardando Documentos...",
        html: "Por favor, espere...",
        timer: 40000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
        },
        willClose: () => { }
      });

 
          // Función para eliminar y luego subir archivos si se ha seleccionado uno nuevo
          const handleDeleteAndUpload = async (docUrl, setDocUrl, docFile, docType) => {
            if (docFile) {
              if (docUrl) {
                // Primero eliminar el archivo antiguo
                await handleDeleteFiles(docUrl, setDocUrl, docType);
              }
              // Luego subir el nuevo archivo
              const uploadedUrl = await sendUpload({ target: { files: [docFile] } });
              return uploadedUrl || '';
            } else {
              // Si no hay un nuevo archivo, mantener la URL existente
              return docUrl || '';
            }
          };

                    // Manejar cada documento secuencialmente
                    const avalDocUrl = await handleDeleteAndUpload(avalDoc, setAvalDoc, avalDocFile, 'Identificación');
                    console.log('URL del documento de identificación:', avalDocUrl);
                    Swal.close();
            
                    
                    try {
                      Swal.fire({
                        title: "Guardando datos...",
                        html: "Por favor, espere...",
                        timer: 10000,
                        timerProgressBar: true,
                        didOpen: () => {
                          Swal.showLoading();
                        },
                        willClose: () => { }
                      });

    // Si no hay errores, continuar con la lógica de envío
    const datosConductor = {
      nombre,
      direccion,
      telefono,
      nombreDocumento,
      nroDocumento,
      avalNombre,
      avalTelefono,
      avalDoc: avalDocUrl,
      nota,
    };

  if (!conductor) {
    return <div>Cargando...</div>; // Puedes mostrar un spinner de carga
  }

  const response = await axios.put(`${URI}/${id}`, datosConductor);
  console.log('Respuesta:', response.data);

  Swal.close();

  Swal.fire({
    icon: 'success',
    title: 'Vehículo actualizado con éxito',
    showConfirmButton: false,
    timer: 1500,
  });
  onClose();
  getConductores();
  navigate('/conductores');
                    } catch (error) {
                      Swal.close();
        console.error('Error actualizando conuctor:', error);
        const mensajeError = error.response?.data?.error || 'Porfavor, modifique algún dato e intente nuevamente.';
        Swal.fire({
          icon: 'error',
          title: 'Error al Actualizar conuctor',
          text: mensajeError,
        });
      }
    } catch (error) {
      Swal.close();
      console.error('Error al Subir Archivos:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error al Subir Archivos',
        text: 'No se pudieron guardar los archivos en Drive, por favor intente nuevamente.',
      });
    }
  }

  // Function to compare current form values with initial values
  const checkForChanges = () => {
    const currentValues = {
      nombre,
      direccion,
      telefono,
      nombreDocumento,
      nroDocumento,
      avalNombre,
      avalTelefono,
      avalDoc,
      nota,
    };
    return JSON.stringify(currentValues) !== JSON.stringify(initialValues);
  };

  // useEffect to detect changes
  useEffect(() => {
    if (checkForChanges()) {
      setHasUnsavedChanges(true);
    } else {
      setHasUnsavedChanges(false);
    }
  }, [nombre, direccion, telefono, nombreDocumento, nroDocumento, avalNombre, avalTelefono, avalDoc, nota]);

  // Function to handle modal close with unsaved changes alert
  const onCloseSinGuardar = () => {
    if (hasUnsavedChanges) {
      Swal.fire({
        title: 'HAY CAMBIOS SIN GUARDAR',
        text: 'Si cierras perderás los cambios no guardados',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, cerrar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
      }).then((result) => {
        if (result.isConfirmed) {
          onClose();
        }
      });
    } else {
      onClose();
    }
  };

  return (
    <>

    <div className="fixed inset-0 bg-gray-900 bg-opacity-70 flex justify-center items-start z-40 max-h-screen overflow-y-auto " onClick={(e) => e.target === e.currentTarget && onCloseSinGuardar()}>
      <div className="relative bg-white rounded-lg p-6 w-full max-w-2xl items-start mt-10 mb-8">


        <div className="flex items-center justify-between mb-6">
        <i className="fa-solid fa-person-circle-exclamation text-5xl text-gray-900"></i>
        <h2 className="text-2xl font-bold mb-4 text-center">Editar Conductor</h2>
  <button className="-mt-11 -mr-4 text-red-500 hover:text-red-800 text-4xl" onClick={onClose} aria-label="Cerrar modal">
    <i className="fa-solid fa-circle-xmark"></i>
  </button>
        </div>

        <hr className="my-0 border-gray-800 border-t-4" />
        <br />

        {Object.values(erroresCampos).some((error) => error) && (
          <div className="font-bold bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
            <p>Error en los campos:</p>
            <ul>
              {erroresCampos.nombre && <li>Nombre</li>}
              {erroresCampos.telefono && <li>Teléfono</li>}
              {erroresCampos.direccion && <li>Dirección</li>}
              {erroresCampos.nombreDocumento && <li>Documento</li>}
              {erroresCampos.nroDocumento && <li>Nro Documento</li>}
            </ul>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            {/* Campo Nombre */}
            <label className="block text-gray-900 text-lg font-bold mb-2" htmlFor="nombre">Nombre Completo</label>
            <strong>
              <input
                type="text"
                id="nombre"
                className={`shadow appearance-none border ${erroresCampos.nombre ? 'border-red-500' : ''} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                placeholder="Ingresa el nombre"
                value={nombre}
                maxLength={80}
                onChange={(e) => setNombre(e.target.value)}
              />
            </strong>

            {/* Campo Teléfono */}
            <label className="block text-gray-900 text-lg font-bold mb-2 mt-4" htmlFor="telefono">Teléfono</label>

            <strong>
            <input
            type="text"
            id="telefono"
            className={`shadow rounded border-2 ${
              erroresCampos.telefono ? 'border-red-500' : ''
            } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            placeholder="Número de teléfono"
            value={telefonoInput}
            onChange={handleTelefonoChange}
          />
            </strong>


            

            {/* Campo Dirección */}
            <label className="block text-gray-900 text-lg font-bold mb-2 mt-4">Dirección</label>
            <strong>
              <input
                type="text"
                id="direccion"
                className={`shadow appearance-none border ${erroresCampos.direccion ? 'border-red-500' : ''} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                placeholder="Dirección"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
              />
            </strong>
            
            {/* Campo Documento */}

              <div className="flex flex-wrap -mx-2 mb-4 font-bold text-center mt-4">
  <div className=" w-60 px-2">
    <label id="DocumentoName" className="block text-gray-900 text-xl font-bold mb-2" htmlFor="nombreDocumento">
      Documento
    </label>
    <div className="relative">
      <select
        id="nombreDocumento"
        className={`block appearance-none w-full bg-white border border-gray-300 hover:border-gray-800 px-4 py-2 pr-8 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 leading-tight ${
          erroresCampos.nombreDocumento ? 'border-red-500' : ''
        }`}
        value={nombreDocumento}
        onChange={(e) => setNombreDocumento(e.target.value)}
      >
       <option value="LICENCIA">LICENCIA</option>
        <option value="INE">INE</option>
        <option value="CURP">CURP</option>
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg className="fill-current h-8 w-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5.5 7l4.5 4.5L14.5 7z"/></svg>
      </div>
    </div>
  </div>

              <div className="flex-1 px-2">
                <label className="block text-gray-900 text-lg font-bold mb-2" htmlFor="nroDocumento">Nro Documento</label>
                <input
                  type="text"
                  id="nroDocumento"
                  className={`shadow appearance-none border ${erroresCampos.nroDocumento ? 'border-red-500' : ''} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2`}
                  placeholder="Nro de Documento"
                  maxLength={30}
                  value={nroDocumento}
                  onChange={(e) => setNroDocumento(e.target.value)}
                />
              </div>
            </div>
          </div>


          <hr className="mb-4 my-0 border-gray-800 border-t-4" />
          <label className="block text-gray-900 text-lg font-bold mb-2 text-center" htmlFor="aval">AVAL</label>
          <div className="mb-4">
            {/* Campo Aval */}
            <label className="block text-gray-900 text-lg font-bold mb-2" htmlFor="avalNombre">Nombre</label>
            <input
              type="text"
              id="avalNombre"
              className="font-bold shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Nombre del Aval"
              value={avalNombre}
              onChange={(e) => setavalNombre(e.target.value)}
            />

            {/* Campo Aval Teléfono */}
            <label className="block text-gray-900 text-lg font-bold mb-2 mt-4" htmlFor="avalTelefono">Teléfono</label>
            <input
              type="text"
              id="avalTelefono"
              className="font-bold shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Teléfono del Aval"
              value={avalTelefonoInput}
              onChange={handleAvalTelefonoChange}
              maxLength={10}
            />
          </div>
          <div className="flex justify-between">
            <h1 className="text-2xl font-bold mb-4 text-center">Documentos</h1>
          <DocumentSection
              title="Identificación"
              docUrl={avalDoc}
              setDocUrl={setAvalDoc}
              onFileSelected={handleAvalDocSelected}
              renderPreview={renderPreview}
              handleDeleteFiles={handleDeleteFiles}
              docType="Identificación"
              />

            </div>

          <hr className="mb-4 my-0 border-gray-800 border-t-4" />
          <div className="mb-4">
            {/* Campo Nota */}
            <label className="block text-gray-900 text-lg font-bold mb-2" htmlFor="nota">Nota</label> 
            <input
              id="nota"
              className="font-bold shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Nota"
              value={nota}
              onChange={(e) => setNota(e.target.value)}
            />
          </div>

          <div className="flex justify-between">
            <button type="button" className="font-bold bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="font-bold bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default CompEditConductores;
