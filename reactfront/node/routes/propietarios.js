import express from 'express';
import { getAllPropietario, getPropietario,  createPropietario, updatePropietario, deletePropietario } from '../controllers/PropietarioController.js';
const router = express.Router();

router.get('/', getAllPropietario);
router.get('/:id', getPropietario);
router.post('/', createPropietario);
router.put('/:id', updatePropietario);
router.delete('/:id', deletePropietario);

export default router;