import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'flatpickr/dist/flatpickr.min.css'; // Importamos el CSS de Flatpickr
import flatpickr from 'flatpickr'; // Importamos Flatpickr
import { Spanish } from 'flatpickr/dist/l10n/es.js'; // Localización en español
import Upload from '../../Upload';
import { sendUpload } from '../../sendUpload';
import Select from 'react-select';

import {
  validarVacio,
  validarNombreLongitud,
  validarSoloNumeros,
} from '../../validations/validaciones.js';

const URI = 'http://localhost:8000/vehiculos';

const URI_CONDUCTOR = 'http://localhost:8000/conductores';



const CompCreateVehiculos = ({ onClose, getVehiculos }) => {
  const [propietarios, setPropietarios] = useState([]);
  const [conductores, setConductores] = useState([]);
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [color, setColor] = useState('');
  const [anio, setAnio] = useState('');
  const [placas, setPlacas] = useState('');
  const [placasDoc, setPlacasDoc] = useState('');
  const [placasVencimiento, setPlacasVencimiento] = useState(new Date().toLocaleDateString('es-ES'));
  const [numeroSerie, setnumeroSerie] = useState('');
  const [imosPermiso, setImosPermiso] = useState('');
  const [imosVencimiento, setImosVencimiento] = useState(new Date().toLocaleDateString('es-ES'));
  const [revisionMecanica, setRevisionMecanica] = useState('');
  const [revisionMecanicaVencimiento, setRevisionMecanicaVencimiento] = useState(new Date().toLocaleDateString('es-ES'));
  const [polizaSeguro, setPolizaSeguro] = useState('');
  const [polizaSeguroVencimiento, setPolizaSeguroVencimiento] = useState(new Date().toLocaleDateString('es-ES'));
  const [tarjetaCirculacion, setTarjetaCirculacion] = useState('');
  const [tarjetaCirculacionVencimiento, setTarjetaCirculacionVencimiento] = useState(new Date().toLocaleDateString('es-ES'));
  const [precioRenta, setPrecioRenta] = useState('');
  const [placasDocFile, setPlacasDocFile] = useState(null);
const [imosDocFile, setImosDocFile] = useState(null);
const [revisionMecanicaDocFile, setRevisionMecanicaDocFile] = useState(null);
const [polizaDocFile, setPolizaDocFile] = useState(null);
const [fotoCarro, setFotoCarro] = useState(null);
const [fotoCarroDocFile, setFotoCarroDocFile] = useState(null);
const [tarjetaCirculacionDocFile, setTarjetaCirculacionDocFile] = useState(null);
const [idPropietario, setIdPropietario] = useState('');
const [idConductor, setIdConductor] = useState('');
  const [erroresCampos, setErroresCampos] = useState({
    marca: false,
    modelo: false,
    color: false,
    anio: false,
    placas: false,
    numeroSerie: false,
    renta: false,
    idPropietario: false,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const getPropietarios = async () => {
      try {
        const response = await axios.get('http://localhost:8000/propietarios'); // Asegúrate de reemplazar con tu URL correcta
        setPropietarios(response.data);
      } catch (error) {
        console.error('Error al obtener los propietarios:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error al Obtener Propietarios',
          text: 'No se pudieron obtener los propietarios, por favor intente nuevamente.',
        });
      }
    };


    

    const getConductores = async () => {
      try {
        const response = await axios.get('http://localhost:8000/conductores/activo'); // Asegúrate de reemplazar con tu URL correcta
        setConductores(response.data);
      } catch (error) {
        console.error('Error al obtener los conductores:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error al Obtener Conductores',
          text: 'No se pudieron obtener los conductores, por favor intente nuevamente.',
        });
      }
    };

    getConductores();
    getPropietarios();
  }, []);

  
  const conductoresOptions = conductores.map(conductor => ({
    value: conductor.id,
    label: conductor.nombre
  }));

  const propietariosOptions = propietarios.map(propietario => ({
    value: propietario.id,
    label: propietario.nombre
  }));

  // Encontrar la opción seleccionada basada en idConductor
  const selectedOptionConductor = conductoresOptions.find(
    option => option.value === idConductor
  ) || null;



 // Encontrar la opción seleccionada basada en idPropietario
 const selectedOptionPropietario = propietariosOptions.find(
  option => option.value === idPropietario
) || null;



  // Manejador de cambio para Conductor
  const handleChangeConductor = selectedOption => {
    setIdConductor(selectedOption ? selectedOption.value : null);
  };

  // Manejador de cambio para Propietario
  const handleChangePropietario = selectedOption => {
    setIdPropietario(selectedOption ? selectedOption.value : null);
  };



  const formatFileName = (tipo) => {
    const sanitizedMarca = marca.replace(/\s+/g, '_');
    const sanitizedModelo = modelo.replace(/\s+/g, '_');
    const sanitizedColor = color.replace(/\s+/g, '_');
    const sanitizedPlacas = placas.replace(/\s+/g, '_');
    const sanitizedAnio = anio.replace(/\s+/g, '_');
  
    return `${sanitizedModelo}_${sanitizedMarca}_${sanitizedAnio}_${sanitizedColor}_${sanitizedPlacas}_${tipo}`.toUpperCase();
  };
  
  

  const handlePlacasDocSelected = (file) => {
    const renamedFile = new File([file], formatFileName('PLACAS') + '.' + file.name.split('.').pop(), { type: file.type });
    setPlacasDocFile(renamedFile);
  };
  
  const handleFotoCarroDocSelected = (file) => {
    const renamedFile = new File([file], formatFileName('FOTO_CARRO') + '.' + file.name.split('.').pop(), { type: file.type });
    setFotoCarroDocFile(renamedFile);
  };

  const handleImosDocSelected = (file) => {
    const renamedFile = new File([file], formatFileName('IMOS') + '.' + file.name.split('.').pop(), { type: file.type });
    setImosDocFile(renamedFile);
  };
  
  const handleRevisionMecanicaDocSelected = (file) => {
    const renamedFile = new File([file], formatFileName('REVISION_MECANICA') + '.' + file.name.split('.').pop(), { type: file.type });
    setRevisionMecanicaDocFile(renamedFile);
  };
  
  const handlePolizaDocSelected = (file) => {
    const renamedFile = new File([file], formatFileName('POLIZA') + '.' + file.name.split('.').pop(), { type: file.type });
    setPolizaDocFile(renamedFile);
  };
  
  const handleTarjetaCirculacionDocSelected = (file) => {
    const renamedFile = new File([file], formatFileName('TARJETA_CIRCULACION') + '.' + file.name.split('.').pop(), { type: file.type });
    setTarjetaCirculacionDocFile(renamedFile);
  };
  
  // Función para actualizar el conductor con el ID del vehículo
const updateConductor = async (id, data) => {
  try {
      const response = await axios.put(`${URI_CONDUCTOR}/${id}`, data);
      return response.data;
  } catch (error) {
      console.error('Error al actualizar el conductor:', error);
      Swal.fire({
          icon: 'error',
          title: 'Error al actualizar conductor',
          text: error.response?.data?.error || 'Error desconocido',
      });
  }
};

  
  // Función para manejar la selección de fecha con Flatpickr dentro de SweetAlert
  const handleDateSelection = async (setter, title, currentDate) => {
    let selectedDate = currentDate ? currentDate : new Date().toLocaleDateString('es-ES');

    const { value: date } = await Swal.fire({
      title: title,
      html: '<input type="text" id="datepicker" class="swal2-input">',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Seleccionar',
      confirmButtonColor: '#2ba9fc',
      cancelButtonColor: '#ce1111',
      didOpen: () => {
        flatpickr('#datepicker', {
          locale: Spanish,
          defaultDate: selectedDate,
          dateFormat: 'd/m/Y',
          allowInput: true,
          minDate: null,
          enableTime: false,
          yearSelectorType: 'static',
          onChange: (selectedDates, dateStr) => {
            selectedDate = dateStr;
          },
        });
      },
      preConfirm: () => {
        return selectedDate;
      },
    });

    if (date) {
      setter(date);
    }
  };

  console.log('ID Conductor:', idConductor);
  console.log('ID Propietario:', idPropietario);

  // Función de validación del formulario
  const validateForm = () => {
    let nuevosErroresCampos = {
      marca: false,
      modelo: false,
      color: false,
      anio: false,
      placas: false,
      numeroSerie: false,
      renta: false,
      idPropietario: false,
    };

    let errores = [];

    // Validaciones
    const validaciones = [
      { error: validarVacio(marca, 'Marca') || validarNombreLongitud(marca), campo: 'marca' },
      { error: validarVacio(modelo, 'Modelo') || validarNombreLongitud(modelo), campo: 'modelo' },
      { error: validarVacio(color, 'Color'), campo: 'color' },
      { error: validarVacio(anio, 'Año') || validarSoloNumeros(anio), campo: 'anio' },
      { error: validarVacio(placas, 'Placas') || validarNombreLongitud(placas), campo: 'placas' },
      { error: validarVacio(numeroSerie, 'Número de Serie'), campo: 'numeroSerie' },
      { error: validarVacio(precioRenta, 'Precio de Renta') || validarSoloNumeros(precioRenta), campo: 'renta' },
    ];

    validaciones.forEach(({ error, campo }) => {
      if (error) {
        errores.push(error);
        nuevosErroresCampos[campo] = true;
      }
    });

    setErroresCampos(nuevosErroresCampos);

    if (errores.length > 0) {
      Swal.fire({
        icon: 'error',
        title: 'Errores de validación',
        html: `<ul>${errores.map((err) => `<li>${err}</li>`).join('')}</ul>`,
      });
      return false;
    }

    return true;
  };

  
  

const formatFecha = (fecha) => {
  if (!fecha) return null;
  const [dia, mes, anio] = fecha.split('/');
  return `${anio}-${mes}-${dia}`;
};

const storeVehiculo = async (e) => {
  e.preventDefault();

  if (!validateForm()) {
    return;
  }

  let placasDocUrl = '';
  let imosDocUrl = '';
  let revisionMecanicaDocUrl = '';
  let polizaDocUrl = '';
  let tarjetaCirculacionDocUrl = '';
  let fotoCarroDocUrl = '';

  try {
    Swal.fire({
      title: "Cargando Documentos...",
      html: "Por favor, espere...",
      timer: 20000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      },
      willClose: () => {}
    });

    // Crear promesas para cargar archivos
    const placasPromise = placasDocFile ? sendUpload({ target: { files: [placasDocFile] } }) : Promise.resolve(null);
    const imosPromise = imosDocFile ? sendUpload({ target: { files: [imosDocFile] } }) : Promise.resolve(null);
    const revisionMecanicaPromise = revisionMecanicaDocFile ? sendUpload({ target: { files: [revisionMecanicaDocFile] } }) : Promise.resolve(null);
    const polizaPromise = polizaDocFile ? sendUpload({ target: { files: [polizaDocFile] } }) : Promise.resolve(null);
    const tarjetaCirculacionPromise = tarjetaCirculacionDocFile ? sendUpload({ target: { files: [tarjetaCirculacionDocFile] } }) : Promise.resolve(null);
    const fotoCarroPromise = fotoCarroDocFile ? sendUpload({ target: { files: [fotoCarroDocFile] } }) : Promise.resolve(null);

    // Esperar a que se completen las promesas
    const [placasDocResult, imosDocResult, revisionMecanicaDocResult, polizaDocResult, tarjetaCirculacionDocResult, fotoCarroResult] = await Promise.all([
      placasPromise, imosPromise, revisionMecanicaPromise, polizaPromise, tarjetaCirculacionPromise, fotoCarroPromise
    ]);

    // Asignar las URLs resultantes
    if (placasDocResult) placasDocUrl = placasDocResult;
    if (imosDocResult) imosDocUrl = imosDocResult;
    if (revisionMecanicaDocResult) revisionMecanicaDocUrl = revisionMecanicaDocResult;
    if (polizaDocResult) polizaDocUrl = polizaDocResult;
    if (tarjetaCirculacionDocResult) tarjetaCirculacionDocUrl = tarjetaCirculacionDocResult;
    if (fotoCarroResult) fotoCarroDocUrl = fotoCarroResult;

    Swal.close();

    console.log('Creando vehículo...');
    
    // Convertir las fechas a YYYY/MM/DD antes de enviar
    const placasVencimientoFormatted = formatFecha(placasVencimiento);
    const imosVencimientoFormatted = formatFecha(imosVencimiento);
    const revisionMecanicaVencimientoFormatted = formatFecha(revisionMecanicaVencimiento);
    const polizaSeguroVencimientoFormatted = formatFecha(polizaSeguroVencimiento);
    const tarjetaCirculacionVencimientoFormatted = formatFecha(tarjetaCirculacionVencimiento);

    const response = await axios.post(URI, {
      marca,
      modelo,
      color,
      anio: `20${anio}`,
      placas,
      numeroSerie,
      precioRenta: parseInt(precioRenta, 10),
      placasDoc: placasDocUrl,
      placasVencimiento: placasVencimientoFormatted,
      imosPermiso: imosDocUrl,
      imosVencimiento: imosVencimientoFormatted,
      revisionMecanica: revisionMecanicaDocUrl,
      revisionMecanicaVencimiento: revisionMecanicaVencimientoFormatted,
      polizaSeguro: polizaDocUrl,
      polizaSeguroVencimiento: polizaSeguroVencimientoFormatted,
      tarjetaCirculacion: tarjetaCirculacionDocUrl,
      tarjetaCirculacionVencimiento: tarjetaCirculacionVencimientoFormatted,
      idPropietario,
      idConductor: idConductor || null,
      fotoCarro: fotoCarroDocUrl,
    });

    console.log('Respuesta de la creación del vehículo:', response.data);

    const newVehiculo = response.data.vehiculo;

    if (!newVehiculo || !newVehiculo.id) {
      throw new Error('El vehículo no se creó correctamente.');
    }

    if (idConductor) {
      await updateConductor(idConductor, { idVehiculo: newVehiculo.id });
    }

    Swal.close();

    Swal.fire({
      icon: 'success',
      title: 'Vehículo creado con éxito',
      showConfirmButton: false,
      timer: 1500,
    });

    onClose();
    getVehiculos();
    navigate('/vehiculos');
  } catch (error) {
    Swal.close();
    console.error('Error creando vehículo:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error al Crear Vehículo',
      text: 'No se pudo guardar el vehículo, por favor intente nuevamente.',
    });
  }
};



  return (
    <>
      <div className="p-6 bg-white rounded-lg shadow-xl w-full  text-xl font-bold mb-8">
                    {/* Botón de cerrar */}
                    <button
          className="absolute mr-12 top-20  right-2 text-red-500 hover:text-red-800 text-4xl"
          onClick={onClose}
        >
          <i className="fa-solid fa-circle-xmark"></i>
        </button>

        <h2 className="text-3xl text-center font-bold mb-4">Crear Vehículo</h2>
        {/* Linea Negra Gruesa */}
        <div className="h-1 w-full bg-gray-500 mb-4"></div>
        {Object.values(erroresCampos).some((error) => error) && (
          <p className="text-red-500 mb-4">Por favor corrige los errores en el formulario.</p>
        )}
        <form onSubmit={storeVehiculo}>
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            <div className="mb-4">
              <label className="block font-bold mb-2">Marca:</label>
              <input
                type="text"
                className={`shadow w-full p-2 rounded border-2 ${erroresCampos.marca ? 'border-red-500' : 'border-gray-400'}`}
                value={marca}
                maxLength="40"
                onChange={(e) =>{
                  const regex = /^[a-zA-Z\s]*$/;
                  if (regex.test(e.target.value)) {
                  setMarca(e.target.value)}
                }}
                placeholder="Marca del vehículo"
              />
              
            </div>

            <div className="mb-4">
              <label className="block font-bold mb-2">Modelo:</label>
              <input
                type="text"
                className={`shadow w-full p-2 rounded border-2 ${erroresCampos.modelo ? 'border-red-500' : 'border-gray-400'}`}
                value={modelo}
                maxLength="40"
                onChange={(e) =>{
                  const regex = /^[a-zA-Z\s]*$/;
                  if (regex.test(e.target.value)) {
                  setModelo(e.target.value)}
                }}
                placeholder="Modelo del vehículo"
              />
             
            </div>

            <div className="mb-4">
              <label className="block font-bold mb-2">Color:</label>
              <input
                type="text"
                className={`shadow w-full p-2 rounded border-2 ${erroresCampos.color ? 'border-red-500' : 'border-gray-400'}`}
                value={color}
                maxLength="30"
                onChange={(e) =>{
                  const regex = /^[a-zA-Z\s]*$/;
                  if (regex.test(e.target.value)) {
                  setColor(e.target.value)}
                }}
                placeholder="Color del vehículo"
              />
             
            </div>

            <div className="mb-4">
              <label className="block font-bold mb-2">Año:</label>
              <input
                type="text"
                className={`shadow w-full p-2 rounded border-2 ${erroresCampos.anio ? 'border-red-500' : 'border-gray-400'}`}
                value={`20${anio}`} // Prefijo "20" permanente
                maxLength="4"
                onChange={(e) => {
                  const inputValue = e.target.value.slice(2); // Solo permitir modificar los últimos dos dígitos
                  const regex = /^[0-9]{0,2}$/; // Aceptar solo dos dígitos numéricos
                  if (regex.test(inputValue)) {
                    setAnio(inputValue); // Guardar solo los dos últimos dígitos en el estado
                  }
                }}
                placeholder="Año del vehículo"
              />
             
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <div className="mb-4">
              <label className="block font-bold mb-2">Placas:</label>
              <input
  type="text"
  className={`shadow w-full p-2 rounded border-2 ${erroresCampos.placas ? 'border-red-500' : 'border-gray-400'}`}
  value={placas}
  maxLength="10"
  onChange={(e) => {
    const regex = /^[a-zA-Z0-9\s]*$/;
    if (regex.test(e.target.value)) {
      setPlacas(e.target.value.toUpperCase()); // Convierte el valor a mayúsculas
    }
  }}
  placeholder="Placas del vehículo"
/>

             
            </div>

            <div className="mb-4">
              <label className="block font-bold mb-2">Número de Serie:</label>
              <input
                type="text"
                className={`shadow w-full p-2 rounded border-2 ${erroresCampos.numeroSerie ? 'border-red-500' : 'border-gray-400'}`}
                value={numeroSerie}
                maxLength="50"
                onChange={(e) =>{
                  const regex = /^[a-zA-Z0-9\s]*$/;
                  if (regex.test(e.target.value)) {
                   
                      setnumeroSerie(e.target.value.toUpperCase()); // Convierte el valor a mayúsculas
                    }
                }}
                placeholder="Número de serie del vehículo"
              />
            




            </div>

            <div className="mb-4">
  <label className="block font-bold mb-2">Precio de Renta:</label>
  <div className="relative">
    <input
      type="text"
      className={`shadow pl-8 pr-10 p-2 rounded border-2 ${erroresCampos.renta ? 'border-red-500' : 'border-gray-400'}`}
      value={precioRenta ? `$${Number(precioRenta).toLocaleString('en-US')}` : ''} // Mostrar el valor formateado
      maxLength="5"
      onChange={(e) => {
        const inputValue = e.target.value.replace(/[^0-9]/g, ''); // Eliminar todo lo que no sea dígito
        setPrecioRenta(inputValue); // Almacenar solo el número sin formato
      }}
      placeholder="$ 0,000"
    />
  </div>
 
</div>






          </div>
           
            {/*Selecciona Propietario del Vehiculo */}
          <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-2 gap-6">




 {/* Selecciona Propietario del Vehiculo */}
 <div className="mb-4">
          <label className="block font-bold mb-2">Propietario:</label>
          <Select
            className={`shadow rounded border-2 ${
              erroresCampos.idPropietario ? 'border-red-500' : 'border-gray-400'
            }`}
            value={selectedOptionPropietario}
            onChange={handleChangePropietario}
            options={propietariosOptions}
            placeholder="Nombre del Propietario"
            isClearable // Permite limpiar la selección
          />
          
        </div>

        {/* Selecciona Conductor del Vehiculo */}
        <div className="mb-4">
          <label className="block font-bold mb-2">Conductor:</label>
          <Select
            className={`shadow rounded border-2 ${
              erroresCampos.idConductor ? 'border-red-500' : 'border-gray-400'
            }`}
            value={selectedOptionConductor}
            onChange={handleChangeConductor}
            options={conductoresOptions}
            placeholder="Nombre del Conductor"
            isClearable // Permite limpiar la selección
          />

        </div>



</div>
<div className="h-1 w-full bg-gray-400 mb-4"></div>
<h2 className="text-2xl text-center font-bold mt-6 mb-14">Documentación del Vehículo</h2>

<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
  <h1 className="text-2xl text-center font-bold mb-8">Placas</h1>
  <h1 className="text-2xl text-center font-bold mb-8">IMOS</h1>
  <h1 className="text-2xl text-center font-bold mb-8">Revisión Mecánica</h1>
</div>

<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
  {/* Placas */}
  <div className="mb-16 flex flex-col lg:flex-row items-start lg:space-x-6 text-end">
    <div className="mb-4 lg:mb-0">
      <label className="block font-bold mb-2 mt-2">Vencimiento:</label>
      <br />
      <label className="block font-bold mb-2 mt-2">Documento:</label>
    </div>
    <div className="flex flex-col w-full lg:w-auto text-center">
      
      
      <span
        className="shadow w-full p-2 rounded border-2 border-gray-400 bg-gray-100 cursor-pointer"
        onClick={() =>
          handleDateSelection(
            setPlacasVencimiento,
            'Seleccione la fecha de vencimiento de placas',
            placasVencimiento
          )
        }
      >
        {placasVencimiento ? placasVencimiento : new Date().toLocaleDateString('es-ES')}
      </span>
      <br />
      <Upload onFileSelected={handlePlacasDocSelected} />
    </div>
  </div>

  {/* IMOS */}
  <div className="mb-16 flex flex-col lg:flex-row items-start lg:space-x-6 text-end">
    <div className="mb-4 lg:mb-0">
      <label className="block font-bold mb-2 mt-2">Vencimiento:</label>
      <br />
      <label className="block font-bold mb-2 mt-2">Permiso de IMOS:</label>
    </div>
    <div className="flex flex-col w-full lg:w-auto text-center">
      <span
        className="shadow w-full p-2 rounded border-2 border-gray-400 bg-gray-100 cursor-pointer"
        onClick={() =>
          handleDateSelection(
            setImosVencimiento,
            'Seleccione la fecha de vencimiento del permiso IMOS',
            imosVencimiento
          )
        }
      >
        {imosVencimiento ? imosVencimiento : new Date().toLocaleDateString('es-ES')}
      </span>
      <br/>
      <Upload onFileSelected={handleImosDocSelected} />
    </div>
  </div>

  {/* Revisión Mecánica */}
  <div className="mb-16 flex flex-col lg:flex-row items-start lg:space-x-6 text-end">
    <div className="mb-4 lg:mb-0">
      <label className="block font-bold mb-2 mt-2">Vencimiento:</label>
      <br />
      <label className="block font-bold mb-2 mt-2">Revisión Mecánica:</label>
    </div>
    <div className="flex flex-col w-full lg:w-auto text-center">
      <span
        className="shadow w-full p-2 rounded border-2 border-gray-400 bg-gray-100 cursor-pointer"
        onClick={() =>
          handleDateSelection(
            setRevisionMecanicaVencimiento,
            'Seleccione la fecha de vencimiento de revisión mecánica',
            revisionMecanicaVencimiento
          )
        }
      >
        {revisionMecanicaVencimiento ? revisionMecanicaVencimiento : new Date().toLocaleDateString('es-ES')}
      </span>
      <br />
      <Upload onFileSelected={handleRevisionMecanicaDocSelected} />
    </div>
  </div>
</div>






















<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
<h1 className="text-2xl text-center font-bold mb-8">Seguro</h1>
<h1 className="text-2xl text-center font-bold mb-8">Tarjeta de Circulacion</h1>
<h1 className="text-2xl text-center font-bold mb-8">Foto del Veículo</h1>
</div>

<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
  {/* Poliza */}
  <div className="mb-16 flex flex-col lg:flex-row items-start lg:space-x-6 text-end">
    <div className="mb-4 lg:mb-0">
      <label className="block font-bold mb-2 mt-2">Vencimiento:</label>
      <br />
      <label className="block font-bold mb-2 mt-2">Póliza:</label>
    </div>
    <div className="flex flex-col w-full lg:w-auto text-center">
      
      
    <span
        className="shadow w-full p-2 rounded border-2 border-gray-400 bg-gray-100 cursor-pointer"
        onClick={() =>
          handleDateSelection(
            setPolizaSeguroVencimiento,
            'Seleccione la fecha de vencimiento de la Póliza de Seguro',
            polizaSeguroVencimiento
          )
        }
      >
        {polizaSeguroVencimiento ? polizaSeguroVencimiento : new Date().toLocaleDateString('es-ES')}
      </span>
      <br />
      <Upload onFileSelected={handlePolizaDocSelected} />
    </div>
  </div>

  {/* Tarjeta */}
  <div className="mb-16 flex flex-col lg:flex-row items-start lg:space-x-6 text-end">
    <div className="mb-4 lg:mb-0">
      <label className="block font-bold mb-2 mt-2">Vencimiento:</label>
      <br />
      <label className="block font-bold mb-2 mt-2">Tarjeta:</label>
    </div>
    <div className="flex flex-col w-full lg:w-auto text-center">
    <span
        className="shadow w-full p-2 rounded border-2 border-gray-400 bg-gray-100 cursor-pointer"
        onClick={() =>
          handleDateSelection(
            setTarjetaCirculacionVencimiento,
            'Seleccione la fecha de vencimiento de la tarjeta de circulación',
            tarjetaCirculacionVencimiento
          )
        }
      >
        {tarjetaCirculacionVencimiento ? tarjetaCirculacionVencimiento : new Date().toLocaleDateString('es-ES')}
      </span>
      <br />
      <Upload onFileSelected={handleTarjetaCirculacionDocSelected} />
    </div>
  </div>

  {/* Foto Vehiculo */}
  <div className="mb-16 flex flex-col lg:flex-row items-start lg:space-x-6 text-end">
    <div className="mb-4 lg:mb-0">
      <label className="block font-bold mb-2 mt-2">Foto:</label>
    </div>
    <div className="flex flex-col w-full lg:w-auto text-center">
      <Upload onFileSelected={handleFotoCarroDocSelected} />
    </div>
  </div>
</div>



















          <div className="flex justify-center items-center mt-4">
            <button
              type="button"
              className="bg-red-500 text-white px-4 py-2 mr-16 rounded hover:bg-red-700 font-bold"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 ml-16 rounded hover:bg-green-800 font-bold"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CompCreateVehiculos;
