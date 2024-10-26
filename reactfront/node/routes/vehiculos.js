import express from 'express';
import { getAllVehiculo,getAllVehiculosActivos, getVehiculo, createVehiculo, updateVehiculo, deleteVehiculo,deleteConductorVehiculo, updateConductorVehiculo, quitConductor } from '../controllers/VehiculosController.js';

const router = express.Router();

router.get('/', getAllVehiculo);
router.get('/activos', getAllVehiculosActivos);
router.get('/:id', getVehiculo);
router.post('/', createVehiculo);
router.put('/:id', updateVehiculo);
router.put('/asignar/:id', updateConductorVehiculo);
router.put('/delete/:id', deleteConductorVehiculo);
router.delete('/:id', deleteVehiculo);
router.put('/quitConductor/:id', quitConductor);

export default router;