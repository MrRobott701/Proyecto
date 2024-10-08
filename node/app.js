import express from 'express';
import cors from 'cors';
import db from './db/db.js';
import propietariosRoutes from './routes/propietarios.js';
import conductoresRoutes from './routes/conductores.js';
import vehiculosRoutes from './routes/vehiculos.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/propietarios', propietariosRoutes);
app.use('/conductores', conductoresRoutes);
app.use('/vehiculos', vehiculosRoutes);

// Conexión a la base de datos
const startServer = async () => {
    try {
        await db.authenticate();
        console.log('Conectado a la base de datos');

        app.listen(8000, () => {
            console.log('Servidor corriendo en el puerto 8000');
        });
    } catch (error) {
        console.log('Error de conexión', error);
    }
};

startServer();
