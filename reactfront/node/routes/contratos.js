import express from 'express';
import { getAllContrato, getContrato, createContrato, updateContrato, deleteContrato, updateContratoVehiculo, updateContratoConductor } from '../controllers/ContratosController.js';

const router = express.Router();

router.get('/', getAllContrato);
router.get('/:id', getContrato);
router.post('/', createContrato);
router.put('/:id', updateContrato);
router.put('/updateVehiculo/:id', updateContratoVehiculo);
router.put('/updateConductor/:id', updateContratoConductor);
router.delete('/:id', deleteContrato);

export default router;