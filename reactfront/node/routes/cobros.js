import express from 'express';
import {
    getAllCobros,
    getCobro,
    createCobro,
    updateCobro,
    deleteCobro,
    getAllCobroActivo,
    obtenerCobrosPorFechas,
} from '../controllers/CobrosController.js';

const router = express.Router();

// Rutas para cobros
router.get('/', getAllCobros); // Obtener todos los cobros
router.get('/activo', getAllCobroActivo); // Obtener solo cobros activos
router.get('/:id', getCobro); // Obtener un cobro por ID
router.post('/', createCobro); // Crear un nuevo cobro
router.put('/:id', updateCobro); // Actualizar un cobro por ID
router.delete('/:id', deleteCobro); // Eliminar (desactivar) un cobro por ID
router.get('/fechas/:inicio/:fin', obtenerCobrosPorFechas); // Obtener cobros entre dos fechas

export default router;
