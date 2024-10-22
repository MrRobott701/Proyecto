// DocumentSection.jsx

import React from 'react';
import Swal from 'sweetalert2';
import Upload from '../../Upload';

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
  return (
    <div
      className="shadow-2xl"
      style={{
        padding: '16px',
        borderRadius: '15px',
        border: '5px solid #a811ce',
      }}
    >
      <div className="mb-16 flex flex-col space-y-4">
        {/* Renderizar la fecha solo si handleDateSelection está definido */}
        {handleDateSelection && vencimiento ? (
          <>
            <div>
              <span className="block font-bold">Vencimiento</span>
            </div>
            <div className="flex flex-col w-full">
              <span
                className="shadow w-full p-2 rounded border-2 border-gray-400 bg-gray-100 cursor-pointer"
                onClick={() =>
                  handleDateSelection(
                    setVencimiento,
                    `Seleccione la fecha de vencimiento de ${title}`,
                    vencimiento
                  )
                }
              >
                {vencimiento ? vencimiento : new Date().toLocaleDateString('es-ES')}
              </span>
            </div>
          </>
        ) : (
          <div className="flex flex-col w-full">
            {/* Puedes agregar un mensaje o simplemente dejarlo vacío */}
            <span className="block font-bold">No aplica</span>
          </div>
        )}

        <Upload onFileSelected={onFileSelected} />

        {/* Vista Previa del Documento */}
        {docUrl && (
          <div className="mt-2">
            {renderPreview(docUrl, title)}
          </div>
        )}

        {/* Botón para eliminar el documento */}
        {docUrl && (
          <button
            type="button"
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 font-bold mt-4"
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
