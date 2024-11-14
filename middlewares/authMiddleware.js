//Extraemos el token JWT de las cookies,verificamos  y si es válido, damos acceso a la ruta. 
//Si el token es inválido o no existe, redirigimos  al usuario al formulario de login.
const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
    // Buscar el token en las cookies
    const token = req.cookies.token;
    // Si no hay token, redirigir al login
    if (!token) {
        return res.redirect('/');  
    }
    // Si hay un token, verificarlo
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        // Si hay un error en la verificación (token no válido o expirado)
        if (err) {
            return res.redirect('/');  
        }
        // Si el token es válido, almacenar los datos decodificados en req.user
        req.user = decoded;
        next();
    });
}

module.exports = authMiddleware;
