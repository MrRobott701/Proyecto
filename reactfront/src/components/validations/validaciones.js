
// Función para validar si el campo está vacío
export const validarVacio = (value, fieldName) => {
    if (!value.trim()) {
        return `El campo <strong>${fieldName}</strong> no puede estar vacío.`;
    }
    return '';
};

// Función para validar si el nombre tiene menos de 80 caracteres
export const validarNombreLongitud = (nombre) => {
    if (nombre.length > 80) {
        return 'El <strong>Nombre</strong> no puede exceder los 80 caracteres.';
    }
    return '';
};

// Función para validar si el nombre solo contiene letras
export const validarNombreSoloLetras = (nombre) => {
    const regex = /^[a-zA-Z\s]+$/;
    if(nombre.length != 0){
        if (!regex.test(nombre)) {
            return 'El <strong>Nombre</strong> solo puede contener letras.';
        }
    }
    return '';
};

// Función para validar si el documento solo contiene letras
export const validarDocumentoSoloLetras = (nombre) => {
    const regex = /^[a-zA-Z\s]+$/;
    if(nombre.length != 0){
        if (!regex.test(nombre)) {
            return 'El <strong>Documento</strong> solo puede contener letras.';
        }
    }
    return '';
};

// Función para validar si la dirección tiene menos de 120 caracteres
export const validarDireccionLongitud = (value) => {
    if (value.length > 120) {
        return 'La <strong>Dirección</strong> no puede exceder los 120 caracteres.';
    }
    return '';
};

// Función para validar si el teléfono solo contiene números
export const validarSoloNumeros = (value) => {
    const regex = /^[0-9]+$/;
    if(value.length != 0){
        if (!regex.test(value)) {
            return 'El <strong>Número de Teléfono</strong> solo puede contener números.';
        }
    }
    return '';
};

// Función para validar si el teléfono tiene 10 dígitos
export const validarTelefonoLongitud = (value) => {
    if (value.length != 10) {
        return 'El <strong>Número de Teléfono</strong> debe tener 10 dígitos.';
    }
    return '';
};
