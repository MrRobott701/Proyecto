// middlewares/authMiddleware.js
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        // El formato esperado es "Bearer <token>"
        const token = authHeader.split(' ')[1];

        jwt.verify(token, JWT_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403); // Token inválido
            }

            req.user = user; // Información del usuario en el token
            next();
        });
    } else {
        res.sendStatus(401); // No se proporcionó token
    }
};
