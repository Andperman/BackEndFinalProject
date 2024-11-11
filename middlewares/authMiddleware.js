//verificar si el usuario esta identificado mediante JWT en las cookies
const jwt = require('jsonwebtoken');

// Middleware de autenticación
function authMiddleware(req, res, next) {
    // Buscar el token en las cookies
    const token = req.cookies.token;
    // Si no hay token, redirigir al login
    if (!token) {
        return res.redirect('/login');  // O puedes enviar un mensaje de error
    }
    // Si hay un token, verificarlo
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        // Si hay un error en la verificación (token no válido o expirado)
        if (err) {
            return res.redirect('/login');  // O enviar un mensaje de error más detallado
        }

        // Si el token es válido, almacenar los datos decodificados en req.user
        req.user = decoded;

        // Llamar a next() para continuar con el siguiente middleware o ruta
        next();
    });
}

module.exports = authMiddleware;
