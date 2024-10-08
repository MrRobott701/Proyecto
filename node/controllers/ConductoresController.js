import ConductorModel from "../models/ConductorModel.js";
import { Op } from "sequelize"; // Asegúrate de importar Op para usar operadores de Sequelize

// Mostrar todos los registros
export const getAllConductor = async (req, res) => {
    try {
        const conductor = await ConductorModel.findAll();
        res.status(200).json(conductor);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Mostrar todos los registros activos
export const getAllConductorActivo = async (req, res) => {
    try {
        const conductores = await ConductorModel.findAll({
            where: {
                activo: 1
            }
        });
        res.status(200).json(conductores);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Mostrar un registro por id
export const getConductor = async (req, res) => {
    try {
        const conductor = await ConductorModel.findByPk(req.params.id);
        if (!conductor) {
            return res.status(404).json({ message: "Conductor no encontrado" });
        }
        res.status(200).json(conductor);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Crear un registro
export const createConductor = async (req, res) => {
    try {
        const newConductor = await ConductorModel.create(req.body);
        res.status(201).json({ message: "Registro creado", conductor: newConductor });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Actualizar un registro
export const updateConductor = async (req, res) => {
    try {
        const [updated] = await ConductorModel.update(req.body, {
            where: { id: req.params.id }
        });
        if (!updated) {
            return res.status(404).json({ message: "Conductor no encontrado" });
        }
        res.status(200).json({ message: "Registro actualizado" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Actualizar los registros donde idVehiculo sea el mismo pero el id sea diferente
export const updateVehiculoConductor = async (req, res) => {
    try {
        // Actualizar el conductor con el id que viene en los parámetros
        const [updated] = await ConductorModel.update(req.body, {
            where: { id: req.params.id }
        });

        if (!updated) {
            return res.status(404).json({ message: "Conductor no encontrado" });
        }

        // Cambiar el idVehiculo a 0 para todos los conductores con el mismo idVehiculo
        // excepto el conductor actual (id pasado en los parámetros)
        await ConductorModel.update(
            { idVehiculo: 0 },
            {
                where: {
                    idVehiculo: req.body.idVehiculo, // Mismo idVehiculo que en el request
                    id: { [Op.ne]: req.params.id } // Que sean diferentes del conductor actual
                }
            }
        );

        res.status(200).json({ message: "Registro actualizado y otros conductores reasignados" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Eliminar un registro
export const deleteConductor = async (req, res) => {
    try {
        const deleted = await ConductorModel.destroy({
            where: { id: req.params.id }
        });
        if (!deleted) {
            return res.status(404).json({ message: "Conductor no encontrado" });
        }
        res.status(200).json({ message: "Registro eliminado" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
