import { jsPDF } from "jspdf";
import axios from 'axios';
import Swal from 'sweetalert2';
import { GenerarPortada } from "./CompContratoPDF/Portada";
import { GenerarP1 } from "./CompContratoPDF/Pag1";
import { GenerarP2 } from "./CompContratoPDF/Pag2";
import { GenerarP3 } from "./CompContratoPDF/Pag3";
import { GenerarP4 } from "./CompContratoPDF/Pag4";
import { GenerarP5 } from "./CompContratoPDF/Pag5";
import { GenerarP6 } from "./CompContratoPDF/Pag6";
import { GenerarP7 } from "./CompContratoPDF/Pag7";
import { GenerarP8 } from "./CompContratoPDF/Pag8";
import { GenerarP9 } from "./CompContratoPDF/Pag9";
import { GenerarP10 } from "./CompContratoPDF/Pag10";
import { GenerarP11 } from "./CompContratoPDF/Pag11";
import { GenerarP12 } from "./CompContratoPDF/Pag12";
import { GenerarP13 } from "./CompContratoPDF/Pag13";
import { GenerarP14 } from "./CompContratoPDF/Pag14";

// Función para obtener los datos del contrato
export const fetchContratoData = async (contrato) => {
  const URI_CONDUCTORES = "http://localhost:8000/conductores";
  const URI_VEHICULOS = "http://localhost:8000/vehiculos";
  const URI_PROPIETARIOS = "http://localhost:8000/propietarios";

  try {
    const [conductorRes, vehiculoRes, propietarioRes] = await Promise.all([
      axios.get(`${URI_CONDUCTORES}/${contrato.idConductor}`),
      axios.get(`${URI_VEHICULOS}/${contrato.idVehiculo}`),
      axios.get(`${URI_PROPIETARIOS}/${contrato.idPropietario}`),
    ]);

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

// Función para generar el PDF del contrato con las diferentes páginas
export const generarContratoPdf = (contrato, conductor, vehiculo, propietario) => {
  const doc = new jsPDF();

  // Generación de cada página
  GenerarPortada(doc, contrato, conductor, vehiculo, propietario);
  GenerarP1(doc);
  GenerarP2(doc);
  GenerarP3(doc);
  GenerarP4(doc);
  GenerarP5(doc);
  GenerarP6(doc);
  GenerarP7(doc);
  GenerarP8(doc);
  GenerarP9(doc);
  GenerarP10(doc);
  GenerarP11(doc);
  GenerarP12(doc);
  GenerarP13(doc);
  GenerarP14(doc);

  doc.save(`Contrato_${contrato.id}.pdf`);
};

// Función principal que combina la recuperación de datos y la generación del PDF
export const handleGenerarPdfContrato = async (contrato) => {
  const data = await fetchContratoData(contrato);
  if (data) {
    const { conductor, vehiculo, propietario } = data;
    generarContratoPdf(contrato, conductor, vehiculo, propietario);
  }
};
