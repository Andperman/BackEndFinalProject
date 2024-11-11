//Aseguraramos que solo los usuarios con el rol adecuado puedan acceder a ciertas rutas protegidas.
function authorizeRole(role) {
    return (req, res, next) => {
        if (req.user && req.user.role === role) {
            return next();  // Si el rol es correcto, sigue con la petición
        } else {
            return res.status(403).send('Acceso denegado');  // Si el rol no coincide, denegar acceso
        }
    };
}

module.exports = authorizeRole;
