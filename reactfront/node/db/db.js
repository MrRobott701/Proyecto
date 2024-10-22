import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config(); // Carga las variables de entorno desde .env

const db = new Sequelize(
    process.env.DB_NAME,       // Nombre de la base de datos
    process.env.DB_USER,       // Usuario de la base de datos
    process.env.DB_PASSWORD,   // Contraseña de la base de datos
    {
        host: process.env.DB_HOST,   // Host de la base de datos (sin https://)
        dialect: "mysql",            // Dialecto de la base de datos
        logging: false,              // Desactiva el logging de Sequelize
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
    }
);

// Conexión con manejo de errores
const connectDB = async () => {
    try {
        await db.authenticate();
        console.log("Conexión a la base de datos establecida con éxito.");
    } catch (error) {
        console.error("No se pudo conectar a la base de datos:", error.message);
    }
};

connectDB();

export default db;
