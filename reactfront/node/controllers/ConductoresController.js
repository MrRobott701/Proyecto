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
    const {idVehiculo}  = req.body;
    //INICIAR UNA TRANSACCION
    const transaction = await ConductorModel.sequelize.transaction();
    try {
        const newConductor = await ConductorModel.create(req.body, { transaction });

        await ConductorModel.update(
            { idVehiculo: 0 },
            {
                where: {
                    idVehiculo: idVehiculo,
                    id: { [Op.ne]: newConductor.id }
                },
                transaction
            }
        );
        //CONFIRMAR LA TRANSACCION
        await transaction.commit();
        res.status(201).json({ message: "Registro creado", conductor: newConductor });
    } catch (error) {
        await transaction.rollback();
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



export const updateConductorVehiculo = async (req, res) => {
    try {
        const { id } = req.params;

        // Verificar si el id es nulo, 0 o no válido
        if (!id || id === "0" || isNaN(id)) {
            return res.status(200).json({ message: "No tenia IdConductor" });
        }

        // Actualiza el campo idVehiculo a 0 para desasociar al conductor del vehículo
        const [updated] = await ConductorModel.update(
            { idVehiculo: 0 },  // Establece idVehiculo a 0
            { where: { id } }  // Filtra por el id del conductor
        );

        // Verifica si se realizó la actualización
        if (!updated) {
            return res.status(404).json({ message: "Conductor no encontrado" });
        }

        res.status(200).json({ message: "Conductor actualizado correctamente" });
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

export const updateContrato = async (req, res) => {
    try {
        // Actualizar el conductor con el idContrato que viene en los parámetros
        const [updated] = await ConductorModel.update(req.body, {
            where: { id: req.params.id }
        });

        if (!updated) {
            return res.status(404).json({ message: "Conductor no encontrado" });
        }

        // Cambiar el idContrato a 0 para todos los conductores con el mismo idContrato
        // excepto el conductor actual (id pasado en los parámetros)
        await ConductorModel.update(
            { idContrato: 0 },
            {
                where: {
                    idContrato: req.body.idContrato, // Mismo idContrato que en el request
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


export const getConductores = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    try {
        const { rows: conductores, count: total } = await ConductorModel.findAndCountAll({
            offset: offset,
            limit: limit,
        });

        res.json({
            conductores,
            totalPages: Math.ceil(total / limit),
            currentPage: page
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

