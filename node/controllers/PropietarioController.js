import PropietarioModel from "../models/PropietarioModel.js";

// Mostrar todos los registros
export const getAllPropietario = async (req, res) => {
    try {
        const propietarios = await PropietarioModel.findAll();
        res.status(200).json(propietarios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Mostrar un registro por id
export const getPropietario = async (req, res) => {
    try {
        const propietario = await PropietarioModel.findByPk(req.params.id);
        if (!propietario) {
            return res.status(404).json({ message: "Propietario no encontrado" });
        }
        res.status(200).json(propietario);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Crear un registro
export const createPropietario = async (req, res) => {
    try {
        const newPropietario = await PropietarioModel.create(req.body);
        res.status(201).json({ message: "Registro creado", propietario: newPropietario });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Actualizar un registro
export const updatePropietario = async (req, res) => {
    try {
        const [updated] = await PropietarioModel.update(req.body, {
            where: { id: req.params.id }
        });
        if (!updated) {
            return res.status(404).json({ message: "Propietario no encontrado" });
        }
        res.status(200).json({ message: "Registro actualizado" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Eliminar un registro
export const deletePropietario = async (req, res) => {
    try {
        const deleted = await PropietarioModel.destroy({
            where: { id: req.params.id }
        });
        if (!deleted) {
            return res.status(404).json({ message: "Propietario no encontrado" });
        }
        res.status(200).json({ message: "Registro eliminado" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
