import db from "./db/db.js";
import { DataTypes } from "sequelize";

const VehiculoModel = db.define("vehiculos", {
        marca: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'marca',
        },
        modelo: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'modelo',
        },
        color: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'color',
        },
        anio: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'anio',
        },
        placas: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'placas',
        },
        placasDoc: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'placasDoc',  
        },
        placasVencimiento: {
            type: DataTypes.DATE,
            allowNull: true,
            field: 'placasVencimiento',
        },
        numeroSerie: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'numeroSerie',
        },
        imosPermiso: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'imosPermiso',
        },
        imosVencimiento: {
            type: DataTypes.DATE,
            allowNull: true,
            field: 'imosVencimiento',
        },
        revisionMecanica: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'revisionMecanica',
        },
        revisionMecanicaVencimiento: {
            type: DataTypes.DATE,
            allowNull: true,
            field: 'revisionMecanicaVencimiento',
        },
        polizaSeguro: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'polizaSeguro',
        },
        polizaSeguroVencimiento: {
            type: DataTypes.DATE,
            allowNull: true,
            field: 'polizaSeguroVencimiento',
        },
        tarjetaCirculacion: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'tarjetaCirculacion',
        },
        tarjetaCirculacionVencimiento: {
            type: DataTypes.DATE,
            allowNull: true,
            field: 'tarjetaCirculacionVencimiento',
        },
        precioRenta: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'precioRenta',
        },
        idPropietario: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'idPropietario',
        },
        idConductor: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'idConductor',
        },
        fotoCarro: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'fotoCarro',
        },
        activo:{
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'activo',
        }
}, {
    // Desactiva la columna de sequelize
    timestamps: false, 
});

export default VehiculoModel;
