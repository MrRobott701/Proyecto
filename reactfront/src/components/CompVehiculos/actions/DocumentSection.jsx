import React, { useState } from 'react';
import Swal from 'sweetalert2';
import Upload2 from '../../Upload2';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_blue.css'; // Importa el tema que prefieras


const DocumentSection = ({
  title,
  docUrl,
  setDocUrl,
  handleDateSelection,
  vencimiento,
  setVencimiento,
  onFileSelected,
  renderPreview,
  handleDeleteFiles,
  docType,
}) => {
  const [isUploading, setIsUploading] = useState(false); // Estado para controlar si se está subiendo un archivo
  const [reDimensions, setReDimensions] = useState(false); // Controla cuándo se debe redimensionar

  // Cuando se selecciona un archivo
  const handleFileSelected = (file) => {
    if (file) {
      setIsUploading(true);  // Indicar que se está usando "Upload"
      setReDimensions(true);  // Activar el estado de reDimensions para mostrar la vista previa del archivo cargado
      onFileSelected(file);   // Ejecutar la lógica de selección del archivo (notificar al padre)
    }
  };

  // Función para manejar la cancelación de la carga
  const handleCancelUpload = () => {
    setIsUploading(false);    // Detener el estado de carga
    setReDimensions(false);   // Restablecer la vista previa del archivo existente
    onFileSelected(null);     // Notificar que la subida fue cancelada
  };

  const handleDateChange = (selectedDates) => {
    const date = selectedDates[0];
  
    // Establecer la hora en 00:00:00
    const localDate = new Date(date.setHours(0, 0, 0, 0));
  
    // Formatear la fecha directamente usando UTC
    const formattedDate = `${String(localDate.getUTCDate()).padStart(2, '0')}/${String(localDate.getUTCMonth() + 1).padStart(2, '0')}/${localDate.getUTCFullYear()}`;
    setVencimiento(formattedDate);
  };
  
  

  return (
    <div
      className="shadow-2xl"
      style={{
        padding: '16px',
        borderRadius: '15px',
        border: '5px solid #a811ce',
      }}
    >
      <div className="flex flex-col space-y-4">
        {/* Renderizar la fecha solo si handleDateSelection está definido */}
        {handleDateSelection && vencimiento ? (
          <>
            <div>
              <span className="block font-bold">Vencimiento</span>
            </div>
            <div className="flex flex-col w-full">
            <Flatpickr
  value={vencimiento}
  onChange={handleDateChange}
  options={{ locale: 'es', dateFormat: 'd/m/Y' }}
  className="shadow w-full p-2 rounded border-2 border-gray-400"
/>

            </div>
          </>
        ) : (
          <div className="flex flex-col w-full">
            {/* Puedes agregar un mensaje o simplemente dejarlo vacío */}
            <span className="block font-bold"></span>
          </div>
        )}

        {/* Componente de carga de archivos */}
        <Upload2 onFileSelected={handleFileSelected} reDimensions={reDimensions} onCancelUpload={handleCancelUpload} />

        {/* Vista Previa del Documento solo si no está en proceso de subida */}
        {!isUploading && docUrl && (
          <div className="mt-2">
            {renderPreview(docUrl, title)}
          </div>
        )}

        {/* Botón para eliminar el documento */}
        {!isUploading && docUrl && (
          <button
            type="button"
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 font-bold mt-4"
            onClick={async () => {
              const { isConfirmed } = await Swal.fire({
                title: '¿Estás seguro?',
                text: `¿Quieres eliminar el archivo de ${title}?`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sí, eliminar',
                cancelButtonText: 'Cancelar',
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
              });

              if (isConfirmed) {
                try {
                  // Mostrar alerta de carga
                  Swal.fire({
                    title: 'Eliminando...',
                    text: `Eliminando el archivo de ${title}. Por favor, espera.`,
                    allowOutsideClick: false,
                    didOpen: () => {
                      Swal.showLoading();
                    },
                  });

                  console.log(`Iniciando proceso de eliminación de ${title}...`);
                  await handleDeleteFiles(docUrl, setDocUrl, title); // Pasar el título para la notificación
                  console.log(`Proceso de eliminación de ${title} completado`);

                  // Cerrar la alerta de carga y mostrar éxito
                  Swal.fire({
                    icon: 'success',
                    title: 'Archivo Eliminado',
                    text: `El archivo de ${title} ha sido eliminado correctamente.`,
                  });
                } catch (error) {
                  // En caso de error, SweetAlert ya lo maneja en handleDeleteFiles
                }
              }
            }}
          >
            Eliminar {title}
          </button>
        )}
      </div>
    </div>
  );
};

export default DocumentSection;
