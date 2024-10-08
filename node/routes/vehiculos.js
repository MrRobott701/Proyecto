import express from 'express';
import { getAllVehiculo, getVehiculo, createVehiculo, updateVehiculo, deleteVehiculo, updateConductorVehiculo } from '../controllers/VehiculosController.js';

const router = express.Router();

router.get('/', getAllVehiculo);
router.get('/:id', getVehiculo);
router.post('/', createVehiculo);
router.put('/:id', updateVehiculo);
router.put('/asignar/:id', updateConductorVehiculo);
router.delete('/:id', deleteVehiculo);

export default router;