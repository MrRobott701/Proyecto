import { jsPDF } from 'jspdf';
import axios from 'axios';
import Swal from 'sweetalert2';

export const fetchContratoData = async (contrato) => {
  const URI_CONDUCTORES = "http://localhost:8000/conductores";
  const URI_VEHICULOS = "http://localhost:8000/vehiculos";
  const URI_PROPIETARIOS = "http://localhost:8000/propietarios";

  try {
    // Fetching additional data
    const [conductorRes, vehiculoRes, propietarioRes] = await Promise.all([
      axios.get(`${URI_CONDUCTORES}/${contrato.idConductor}`),
      axios.get(`${URI_VEHICULOS}/${contrato.idVehiculo}`),
      axios.get(`${URI_PROPIETARIOS}/${contrato.idPropietario}`),
    ]);
    
    console.log("Datos obtenidos:");
    console.log(conductorRes.data);
    console.log(vehiculoRes.data);
    console.log(propietarioRes.data);

    return {
      conductor: conductorRes.data || null,
      vehiculo: vehiculoRes.data || null,
      propietario: propietarioRes.data || null,
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error al obtener datos',
      text: 'No se pudieron obtener los datos necesarios para el PDF.',
    });
    return null;
  }
};

export const generarContratoPdf = (contrato, conductor, vehiculo, propietario) => {
  const doc = new jsPDF();

  // Validación de cada dato para evitar errores
  const nombreConductor = conductor?.nombre || 'N/A';
  const marcaVehiculo = vehiculo?.marca || 'N/A';
  const nombrePropietario = propietario?.nombre || 'N/A';

  doc.setFontSize(16);
  doc.text('Detalles del Contrato', 20, 20);

  doc.setFontSize(12);
  doc.text(`ID: ${contrato.id}`, 20, 40);
  doc.text(`Conductor: ${nombreConductor}`, 20, 50);
  doc.text(`Vehículo: ${marcaVehiculo}`, 20, 60);
  doc.text(`Propietario: ${nombrePropietario}`, 20, 70);
  doc.text(`Fecha de Inicio: ${new Date(contrato.fechaInicio).toLocaleDateString()}`, 20, 80);
  doc.text(`Fecha de Fin: ${new Date(contrato.fechaFin).toLocaleDateString()}`, 20, 90);
  doc.text(`Fecha de Firma: ${new Date(contrato.fechaFirma).toLocaleDateString()}`, 20, 100);
  doc.text(`Precio de Depósito: ${contrato.precioDeposito}`, 20, 110);
  doc.text(`Precio de Renta: ${contrato.precioRenta}`, 20, 120);
  doc.text(`Precio de Pagaré: ${contrato.precioPagare}`, 20, 130);
  doc.text(`Penalidad: ${contrato.penalidad}`, 20, 140);
  doc.text(`Duración (Meses): ${contrato.duracionMeses}`, 20, 150);

  doc.save(`Contrato_${contrato.id}.pdf`);
};

// Uso del fetch y generación del PDF
export const handleGenerarPdfContrato = async (contrato) => {
  const data = await fetchContratoData(contrato);
  if (data) {
    const { conductor, vehiculo, propietario } = data;
    generarContratoPdf(contrato, conductor, vehiculo, propietario);
  }
};