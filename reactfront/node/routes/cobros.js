import express from 'express';
import {
    getAllCobros,
    getCobro,
    createCobro,
    updateCobro,
    deleteCobro,
    getAllCobroActivo,
    
} from '../controllers/CobrosController.js';

const router = express.Router();

// Rutas para cobros
router.get('/', getAllCobros); // Obtener todos los cobros
router.get('/activo', getAllCobroActivo); // Obtener solo cobros activos
router.get('/:id', getCobro); // Obtener un cobro por ID
router.post('/', createCobro); // Crear un nuevo cobro
router.put('/:id', updateCobro); // Actualizar un cobro por ID
router.delete('/:id', deleteCobro); // Eliminar (desactivar) un cobro por ID

export default router;
