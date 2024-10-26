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


// Mostrar todos los registros activos
export const getAllVehiculosActivos = async (req, res) => {
    try {
        const vehiculo = await VehiculoModel.findAll({
            where: { activo: 1 }
        });
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

// Crear un registro de vehículo y actualizar otros registros
export const createVehiculo = async (req, res) => {
    const { idConductor } = req.body;

    // Iniciar una transacción
    const transaction = await VehiculoModel.sequelize.transaction();
    try {
        // Crear el nuevo vehículo dentro de la transacción
        const newVehiculo = await VehiculoModel.create(req.body, { transaction });

        // Actualizar otros vehículos asignados al mismo conductor para desasignarlos
        await VehiculoModel.update(
            { idConductor: 0 },
            {
                where: {
                    idConductor: idConductor,
                    id: { [Op.ne]: newVehiculo.id } // Exceptuar el nuevo vehículo creado
                },
                transaction
            }
        );

        // Confirmar la transacción
        await transaction.commit();

        // Responder con éxito
        res.status(201).json({ message: "Registro creado", vehiculo: newVehiculo });
    } catch (error) {
        // Revertir la transacción en caso de error
        await transaction.rollback();
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

export const quitConductor = async (req, res) => {
    try {
        const [updated] = await VehiculoModel.update(
            { idConductor: 0 },
            {
                where: { id: req.params.id }
            }
        );
        if (!updated) {
            return res.status(404).json({ message: "Vehiculo no encontrado" });
        }
        res.status(200).json({ message: "Registro actualizado" });
    }
    catch (error) {
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




// Actualizar un registro
// Cambiar estado de activo a 0
export const deleteConductorVehiculo = async (req, res) => {
    try {
        // Actualiza el campo 'activo' a 0 para desactivar el vehículo
        const [updated] = await VehiculoModel.update(
            { activo: 0,
                idConductor: 0
             }, 
            
            { where: { id: req.params.id } }
        );

        if (!updated) {
            return res.status(404).json({ message: "Vehículo no encontrado" });
        }

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
