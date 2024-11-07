// En controllers/CobrosController.js
import CobrosModel from '../models/CobrosModel.js';


// Mostrar todos los registros
export const getAllCobros = async (req, res) => {
    try {
        const cobros = await CobrosModel.findAll({
            where: {
                activo: 1
            }
        });
        res.status(200).json(cobros);
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error);
    }
};

// Mostrar un registro por id
export const getCobro = async (req, res) => {
    try {
        const cobro = await CobrosModel.findByPk(req.params.id);
        if (!cobro) {
            return res.status(404).json({ message: "Cobro no encontrado" });
        }
        res.status(200).json(cobro);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Crear un registro
export const createCobro = async (req, res) => {
    try {
        const newCobro = await CobrosModel.create(req.body);
        res.status(201).json({ message: "Registro creado", cobro: newCobro });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar un registro
export const updateCobro = async (req, res) => {
    try {
        const cobro = await CobrosModel.findByPk(req.params.id);
        if (!cobro) {
            return res.status(404).json({ message: "Cobro no encontrado" });
        }
        await cobro.update(req.body);
        res.status(200).json({ message: "Registro actualizado", cobro });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar un registro
export const deleteCobro = async (req, res) => {
    try {
        const cobro = await CobrosModel.findByPk(req.params.id);
        if (!cobro) {
            return res.status(404).json({ message: "Cobro no encontrado" });
        }
        await cobro.update({ activo: 0 });
        res.status(200).json({ message: "Registro eliminado", cobro });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Mostrar todos los registros activos
export const getAllCobroActivo = async (req, res) => {
    try {
        const cobros = await CobrosModel.findAll({
            where: {
                activo: 1
            }
        });
        res.status(200).json(cobros);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Mostrar cobros de un contrato
export const getCobrosConductor = async (req, res) => {
    try {
        const cobros = await CobrosModel.findAll({
            where: {
                idConductor: req.params.id,
                activo: 1
            }
        });
        res.status(200).json(cobros);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
