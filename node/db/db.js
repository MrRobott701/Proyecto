import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config(); // Carga las variables de entorno desde .env

const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST || "localhost",
    dialect: "mysql",
    logging: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
});

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
