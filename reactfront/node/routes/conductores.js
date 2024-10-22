import express from 'express';
import { getAllConductor, getConductor, createConductor, updateConductor, deleteConductor, getAllConductorActivo, updateVehiculoConductor} from '../controllers/ConductoresController.js';

const router = express.Router();

router.get('/', getAllConductor);
router.get('/activo', getAllConductorActivo);
router.get('/:id', getConductor);
router.post('/', createConductor);
router.put('/:id', updateConductor);
router.put('/asignar/:id', updateVehiculoConductor);
router.delete('/:id', deleteConductor);

export default router;