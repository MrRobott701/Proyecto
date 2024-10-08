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

  const handleChangeConductor = async (selectedOption) => {
    const selectedConductorId = selectedOption ? selectedOption.value : null;
    setIdConductor(selectedConductorId);

    if (selectedConductorId === 0) {
      await asignarConductor(0);  // Asigna conductor como "Sin conductor"
    } else if (selectedConductorId) {
      await asignarConductor(selectedConductorId);
    }
  };

  return (
    <div>
      <div className="mb-4 mt-4">
        <div className="flex">
          <div className="flex">
            <button onClick={() =>
              Swal.fire({
                title: "Asignación de Conductores",
                html: `<p>Seleccione un <strong>conductor</strong> para asignar al vehículo.</p>
                 <p>Solo se puede asignar <strong>un conductor</strong> a la vez.</p>
                 <p>Si selecciona un <strong>conductor</strong> con un vehículo, el vehículo anterior quedará sin conductor</p>
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

        <Select
          className={`shadow rounded border-2 border-gray-400 mt-2`}
          value={selectedOptionConductor}
          onChange={handleChangeConductor}
          options={conductoresOptions}
          placeholder={idConductor && idConductor !== 0 ? conductorAsignado : "Seleccionar Conductor"}
          isClearable
        />
      </div>
    </div>
  );
};

export default AsignarChofer;
