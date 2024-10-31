import express from 'express';
import { getAllConductor, getConductor, createConductor, updateConductor, deleteConductor,updateConductorVehiculo, getAllConductorActivo,updateContrato, updateVehiculoConductor} from '../controllers/ConductoresController.js';

const router = express.Router();

router.get('/', getAllConductor);
router.get('/activo', getAllConductorActivo);
router.get('/:id', getConductor);
router.post('/', createConductor);
router.put('/:id', updateConductor);
router.put('/quitVehiculo/:id', updateConductorVehiculo);
router.put('/asignar/:id', updateVehiculoConductor);
router.put('/upContrato/:id', updateContrato);
router.delete('/:id', deleteConductor);

export default router;