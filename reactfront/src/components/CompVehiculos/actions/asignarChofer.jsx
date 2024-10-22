import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Select from 'react-select';
import { showSuccessAlert, showErrorAlert } from './../../alerts.jsx';

const URI = 'http://localhost:8000/vehiculos';
const URI_CONDUCTOR = 'http://localhost:8000/conductores';

const AsignarChofer = ({ idVehiculo, onAsignacionExitosa }) => {
  const [conductores, setConductores] = useState([]);
  const [idConductor, setIdConductor] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [conductorAsignado, setConductorAsignado] = useState(null); // Para mostrar el conductor asignado

  useEffect(() => {
    const getVehiculoInfo = async () => {
      try {
        const response = await axios.get(`${URI}/${idVehiculo}`);
        const { idConductor } = response.data;
        setIdConductor(idConductor);
        if (idConductor && idConductor !== 0) {
          const conductor = await axios.get(`${URI_CONDUCTOR}/${idConductor}`);
          setConductorAsignado(conductor.data.nombre);
        }
      } catch (error) {
        console.error('Error al obtener la información del vehículo:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error al obtener el vehículo',
          text: 'Hubo un problema al obtener la información del vehículo.',
        });
      }
    };

    getVehiculoInfo();
  }, [idVehiculo]);

  useEffect(() => {
    const getConductores = async () => {
      try {
        const response = await axios.get(`${URI_CONDUCTOR}/activo`);
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
  }, []);

  // Agregar opción "Sin conductor"
  const conductoresOptions = [
    { value: 0, label: "Sin conductor" },
    ...conductores.map((conductor) => ({
      value: conductor.id,
      label: conductor.nombre,
    }))
  ];

  const selectedOptionConductor = conductoresOptions.find(
    (option) => option.value === idConductor
  ) || null;

  const updateConductor = async (id, idVehiculo) => {
    try {
      const response = await axios.put(`${URI_CONDUCTOR}/asignar/${id}`, {
        idVehiculo: idVehiculo,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.log('Error al actualizar el conductor:', error);
      showErrorAlert('ERROR AL ACTUALIZAR CONDUCTOR');
    }
  };

  const asignarConductor = async (idConductor) => {
    console.log('Asignando conductor...');
    console.log('idVehiculo:', idVehiculo);
    console.log('idConductor:', idConductor);

    try {
      const response = await axios.put(`${URI}/asignar/${idVehiculo}`, {
        idConductor: idConductor,
      });
      showSuccessAlert('CONDUCTOR ASIGNADO');

      if (idConductor && idConductor !== 0) {
        await updateConductor(idConductor, idVehiculo);
      }
      onAsignacionExitosa();

    } catch (error) {
      setIsLoading(false);
      console.error('Error al asignar el conductor:', error);
      showErrorAlert('ERROR AL ASIGNAR CONDUCTOR');
    }
  };

  const handleChangeConductor = (selectedOption) => {
    const selectedConductorId = selectedOption ? selectedOption.value : null;

    // Mostrar la alerta de confirmación cuando se selecciona un nuevo conductor
    Swal.fire({
      title: '¿Estás seguro?',
      html: '<p>Está a punto de cambiar el conductor asignado.</p><p>¿Desea continuar?</p>',
       icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cambiar conductor',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        // Si el usuario confirma el cambio, se asigna el nuevo conductor
        setIdConductor(selectedConductorId);
        await asignarConductor(selectedConductorId);
      }
    });
  };

  return (
    <div>
      <div>
        <Select
          className={`shadow rounded border-2 border-gray-400 mt-2`}
          value={selectedOptionConductor}
          onChange={handleChangeConductor} // Aquí usas la función con SweetAlert
          options={conductoresOptions}
          placeholder={idConductor && idConductor !== 0 ? conductorAsignado : "Seleccionar Conductor"}
          isClearable
        />
      </div>
    </div>
  );
};

export default AsignarChofer;
