import express from 'express';
import { getAllPropietario, getPropietario,  createPropietario, updatePropietario, deletePropietario } from '../controllers/PropietarioController.js';
import { getAllConductor, getConductor, createConductor, updateConductor, deleteConductor } from '../controllers/ConductoresController.js';
import { getAllVehiculo, getVehiculo, createVehiculo, updateVehiculo, deleteVehiculo, getAllVehiculosActivos } from '../controllers/VehiculosController.js';
const router = express.Router();

router.get('/', getAllPropietario);
router.get('/:id', getPropietario);
router.post('/', createPropietario);
router.put('/:id', updatePropietario);
router.delete('/:id', deletePropietario);

router.get('/', getAllConductor);
router.get('/:id', getConductor);
router.post('/', createConductor);
router.put('/:id', updateConductor);
router.delete('/:id', deleteConductor);

router.get('/', getAllVehiculo);
router.get('/activos', getAllVehiculosActivos);
router.get('/:id', getVehiculo);
router.post('/', createVehiculo);
router.put('/:id', updateVehiculo);
router.delete('/:id', deleteVehiculo);

export default router;