// controllers/UsuarioController.js
import UserModel from '../models/UserModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Obtener el secreto de JWT desde las variables de entorno
const JWT_SECRET = process.env.JWT_SECRET;

// Crear un nuevo usuario (Registro)
export const registerUser = async (req, res) => {
    const { nombre, correo, password } = req.body;
    try {
        // Verificar si el correo ya está registrado
        const existingUser = await UserModel.findOne({ where: { correo } });
        if (existingUser) {
            return res.status(400).json({ message: "El correo ya está registrado" });
        }

        // Crear nuevo usuario (la contraseña será hasheada por el hook)
        const newUser = await UserModel.create({ nombre, correo, password });
        res.status(201).json({ message: "Usuario registrado exitosamente" });
    } catch (error) {
        res.status(500).json({ message: 'Error creando el usuario', error: error.message });
    }
};

// Iniciar sesión de usuario
export const loginUser = async (req, res) => {
    const { correo, password } = req.body;
    try {
        // Encontrar el usuario por correo
        const user = await UserModel.findOne({ where: { correo } });
        if (!user) {
            return res.status(400).json({ message: "Credenciales inválidas" });
        }

        // Comparar contraseñas
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Credenciales inválidas" });
        }

        // Crear token JWT
        const token = jwt.sign(
            { id: user.id, correo: user.correo },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Preparar datos del usuario para la respuesta (excluyendo la contraseña)
        const userData = {
            id: user.id,
            nombre: user.nombre, // Asegúrate de que el modelo tenga este campo
            correo: user.correo,
            // Añade otros campos que consideres necesarios
        };

        res.status(200).json({ token, user: userData });
    } catch (error) {
        res.status(500).json({ message: 'Error iniciando sesión', error: error.message });
    }
};


// Listar todos los registros (Protegida)
export const getUsers = async (req, res) => {
    try {
        const users = await UserModel.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({
            message: 'Error obteniendo usuarios',
            error: error.message
        });
    }
};

// Obtener usuario por ID (Protegida)
export const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await UserModel.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({
            message: 'Error obteniendo usuario',
            error: error.message
        });
    }
};

// Actualizar usuario por ID (Protegida)
export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { nombre, correo, password } = req.body;
    try {
        const user = await UserModel.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        // Actualizar campos
        user.nombre = nombre || user.nombre;
        user.correo = correo || user.correo;
        if (password) {
            user.password = password; // Será hasheada por el hook
        }
        await user.save();
        res.json({ message: 'Usuario actualizado exitosamente', user });
    } catch (error) {
        res.status(500).json({
            message: 'Error actualizando usuario',
            error: error.message
        });
    }
};

// Eliminar usuario por ID (Protegida)
export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await UserModel.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        await user.destroy();
        res.json({ message: 'Usuario eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({
            message: 'Error eliminando usuario',
            error: error.message
        });
    }
};
