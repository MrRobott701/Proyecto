import db from "./db/db.js";
import { DataTypes } from "sequelize";

const PropietarioModel = db.define("propietarios", {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    direccion: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    telefono: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nombreDocumento: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nroDocumento: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    
}, {
    // Desactiva la columna de sequelize
    timestamps: false, 
});

export default PropietarioModel;
