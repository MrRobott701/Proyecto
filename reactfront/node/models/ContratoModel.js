import db from "./db/db.js";
import { DataTypes } from "sequelize";

const ContratoModel = db.define("contratos", {
    precioDeposito: {
        type: DataTypes.DECIMAL,
        allowNull: true,
        field: 'precioDeposito',
    },
    precioRenta: {
        type: DataTypes.DECIMAL,
        allowNull: true,
        field: 'precioRenta',
    },
    precioPagare: {
        type: DataTypes.DECIMAL,
        allowNull: true,
        field: 'precioPagare',
    },
    penalidad: {
        type: DataTypes.DECIMAL,
        allowNull: true,
        field: 'penalidad',
    },
    duracionMeses: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'duracionMeses',
    },
    fechaFirma: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'fechaFirma',
    },
    fechaInicio: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'fechaInicio',
    },
    fechaFin: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'fechaFin',
    },
    contratoDoc: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'contratoDoc',
    },
    depositoDoc: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'depositoDoc',
    },
    idConductor: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'idConductor',
    },
    idVehiculo: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'idVehiculo',
    },
    idPropietario: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'idPropietario',
    },
    estado: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'estado',
    },

}, {
    // Desactiva la columna de sequelize
    timestamps: false, 
});

export default ContratoModel;