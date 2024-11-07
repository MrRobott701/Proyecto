import ContratoModel from '../models/ContratoModel.js';
import ConductorModel from '../models/ConductorModel.js';

// Mostrar todos los registros
export const getAllContrato = async (req, res) => {
    try {
        const contratos = await ContratoModel.findAll({
            where: { estado: 1 }
        });
        res.status(200).json(contratos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Mostrar un registro por id
export const getContrato = async (req, res) => {
    try {
        const contrato = await ContratoModel.findByPk(req.params.id);
        if (!contrato) {
            return res.status(404).json({ message: 'Contrato no encontrado' });
        }
        res.status(200).json(contrato);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Crear un registro
export const createContrato = async (req, res) => {
    try {
        const newContrato = await ContratoModel.create(req.body);
        res.status(201).json({ message: 'Registro creado', contrato: newContrato });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Actualizar un registro
export const updateContrato = async (req, res) => {
    try {
        const [updated] = await ContratoModel.update(req.body, {
            where: { id: req.params.id },
        });
        if (!updated) {
            return res.status(404).json({ message: 'Contrato no encontrado' });
        }
        res.status(200).json({ message: 'Registro actualizado' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Eliminar un registro
export const deleteContrato = async (req, res) => {
    try {
        // Eliminar el contrato
        const deleted = await ContratoModel.update(
            {estado: 0},
            { where: { id: req.params.id } }
        );

        if (!deleted) {
            return res.status(404).json({ message: 'Contrato no encontrado' });
        }

        // Actualizar idContrato de los conductores asociados a 0
        await ConductorModel.update(
            { idContrato: 0 },
            { where: { idContrato: req.params.id } }
        );

        res.status(200).json({ message: 'Registro y relaciones actualizadas correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};