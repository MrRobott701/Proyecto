import db from "./db/db.js";
import { DataTypes } from "sequelize";

const CobrosModel = db.define("cobros", {

    idConductor: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    idVehiculo: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    idPropietario: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    renta: {
        type: DataTypes.FLOAT(10, 2),
        allowNull: true,
    },
    saldo: {
        type: DataTypes.FLOAT(10, 2),
        allowNull: true,
    },
    cobro: {
        type: DataTypes.FLOAT(10, 2),
        allowNull: true,
    },
    deuda: {
        type: DataTypes.FLOAT(10, 2),
        allowNull: true,
    },
    pago:{
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    fechaInicio: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    fechaFin: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    nota: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    activo: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
}, {
    // Desactiva la columna de sequelize
    timestamps: false, 
});

export default CobrosModel;
