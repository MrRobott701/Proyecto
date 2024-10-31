import express from 'express';
import { getAllContrato, getContrato, createContrato, updateContrato, deleteContrato } from '../controllers/ContratosController.js';

const router = express.Router();

router.get('/', getAllContrato);
router.get('/:id', getContrato);
router.post('/', createContrato);
router.put('/:id', updateContrato);
router.delete('/:id', deleteContrato);

export default router;