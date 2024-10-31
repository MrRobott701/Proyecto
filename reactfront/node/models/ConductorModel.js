import db from "./db/db.js";
import { DataTypes } from "sequelize";

const ConductorModel = db.define("conductores", {
        nombre: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'nombre',
        },
        direccion: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'direccion',
        },
        telefono: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'telefono',
        },
        nombreDocumento: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'nombreDocumento',
        },
        nroDocumento: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'nroDocumento',
        },
        ineDoc: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'ineDoc',
        },
        licenciaDoc: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'licenciaDoc',
        },
        reciboLuz: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'reciboLuz',
        },
        reciboAgua: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'reciboAgua',
        },
        avalNombre: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'avalNombre',
        },
        avalTelefono: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'avalTelefono',
        },
        avalDoc: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'avalDoc',
        },
        avalLuz: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'avalLuz',
        },
        avalAgua: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'avalAgua',
        },
        nota: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'nota',
        },
        activo: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'activo',
        },
        idVehiculo: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'idVehiculo',
        },
        idContrato: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'idContrato',
        },
    
}, {
    // Desactiva la columna de sequelize
    timestamps: false, 
});

export default ConductorModel;
