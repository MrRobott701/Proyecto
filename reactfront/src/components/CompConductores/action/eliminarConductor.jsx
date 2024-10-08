import Swal from 'sweetalert2';
import axios from 'axios';
import 'tailwindcss/tailwind.css'; // Importa los estilos de Tailwind

const URI = 'http://localhost:8000/Conductores';

const EliminarConductor = ({ id, getConductores }) => {

    // Función para confirmar y eliminar conductor
    const deleteConductor = async () => {
        const swalWithTailwindButtons = Swal.mixin({
            customClass: {
                cancelButton: 'bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-700 focus:outline-none ',
                confirmButton: 'bg-green-500 ml-4 text-white font-bold py-2 px-4 rounded hover:bg-green-700 focus:outline-none'
            },
            buttonsStyling: false // Desactiva el estilo predeterminado de SweetAlert2
        });

        swalWithTailwindButtons.fire({
            title: '¿Estás seguro?',
            text: "¡No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminarlo!',
            cancelButtonText: 'No, cancelar!',
            reverseButtons: true
        }).then(async (result) => {
            if (result.isConfirmed) {
                // Eliminar el conductor
                await axios.delete(`${URI}/${id}`);
                getConductores(); // Refrescar la lista de Conductores
                swalWithTailwindButtons.fire(
                    '¡Eliminado!',
                    'El conductor ha sido eliminado.',
                    'success'
                );
            }
        });
    };

    return (
        <button
            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-800 text-lg ml-1 mr-1 font-bold "
            onClick={deleteConductor}
            aria-label="Eliminar conductor"
        >
            <i className="fa-solid fa-trash"></i>
        </button>
    );
};

export default EliminarConductor;
