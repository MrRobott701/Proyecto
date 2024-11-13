// En controllers/CobrosController.js
import CobrosModel from '../models/CobrosModel.js';
import { Op } from 'sequelize'; // Asegúrate de importar Op



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


// Obtener cobros por fechas
export const obtenerCobrosPorFechas = async (req, res) => {
    const { inicio, fin } = req.params;

    // Convertir las fechas a formato Date (si no están ya en ese formato)
    const fechaInicio = new Date(inicio);
    const fechaFin = new Date(fin);

    // Verificar que las fechas son válidas
    if (isNaN(fechaInicio.getTime()) || isNaN(fechaFin.getTime())) {
        return res.status(400).send("Las fechas proporcionadas no son válidas.");
    }

    try {
        const cobros = await CobrosModel.findAll({
            where: {
                // Usamos las columnas fechaInicio y fechaFin para filtrar los cobros
                fechaInicio: { 
                    [Op.gte]: fechaInicio,  // Mayor o igual que fechaInicio
                },
                fechaFin: {
                    [Op.lte]: fechaFin,      // Menor o igual que fechaFin
                }
            }
        });
        res.json(cobros); // Devuelve los cobros encontrados
    } catch (error) {
        console.error("Error en obtenerCobrosPorFechas:", error);
        res.status(500).send("Error al obtener los cobros");
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
    console.log(req.body);
    console.log("Creando cobro");

    try {
        const newCobro = await CobrosModel.create(req.body);
        res.status(201).json({ message: "Registro creado", cobro: newCobro });
        console.log("Cobro creado");
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error);
        console.log("Error al crear cobro");
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
