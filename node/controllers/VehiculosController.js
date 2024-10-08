import VehiculoModel from "../models/VehiculoModel.js";
import { Op } from "sequelize"; // Asegúrate de importar Op para usar operadores de Sequelize


// Mostrar todos los registros
export const getAllVehiculo = async (req, res) => {
    try {
        const vehiculo = await VehiculoModel.findAll();
        res.status(200).json(vehiculo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Mostrar un registro por id
export const getVehiculo = async (req, res) => {
    try {
        const vehiculo = await VehiculoModel.findByPk(req.params.id);
        if (!vehiculo) {
            return res.status(404).json({ message: "Vehiculo no encontrado" });
        }
        res.status(200).json(vehiculo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Crear un registro
export const createVehiculo = async (req, res) => {
    try {
        const newVehiculo = await VehiculoModel.create(req.body);
        res.status(201).json({ message: "Registro creado", vehiculo: newVehiculo });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Actualizar un registro
export const updateVehiculo = async (req, res) => {
    try {
        const [updated] = await VehiculoModel.update(req.body, {
            where: { id: req.params.id }
        });
        if (!updated) {
            return res.status(404).json({ message: "Vehiculo no encontrado" });
        }
        res.status(200).json({ message: "Registro actualizado" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const updateConductorVehiculo = async (req, res) => {
    try {
        const [updated] = await VehiculoModel.update(req.body, {
            where: { id: req.params.id }
        });
        if (!updated) {
            return res.status(404).json({ message: "Vehiculo no encontrado" });
        }

        //Cambiar el idConductor a 0 para todos los vehiculos con el mismo idConductor
        // exepto el vehiculo actual (id pasado en los parametros)
        await VehiculoModel.update(
            { idConductor: 0 },
            {
                where: {
                    idConductor: req.body.idConductor,
                    id: {
                        [Op.ne]: req.params.id
                    }
                }
            }
        );

        res.status(200).json({ message: "Registro actualizado" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};





// Eliminar un registro
export const deleteVehiculo = async (req, res) => {
    try {
        const deleted = await VehiculoModel.destroy({
            where: { id: req.params.id }
        });
        if (!deleted) {
            return res.status(404).json({ message: "Vehiculo no encontrado" });
        }
        res.status(200).json({ message: "Registro eliminado" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};