const { createUser, findUserByUsername } = require('../models/userModel'); // interactuar con la base de datos
const jwt = require('jsonwebtoken');  // JWT generar tokens
const bcrypt = require('bcryptjs');  // Bcrypt para cifrar contraseñas

// Registro de usuario
async function register(req, res) {
    const { username, password, email, role = 'user' } = req.body; // role se establece por defecto como 'user'
    try {
        // Crear nuevo usuario en la base de datos
        const newUser = await createUser(username, password, email, role);
        res.redirect('/login');  // Redireccionar al login si todo sale bien 
    } catch (error) {
        res.status(500).send('Error en el registro'); 
    }
}

// Inicio de sesión
async function login(req, res) {
    const { username, password } = req.body;
    try {
        // Encontrar usuario por nombre
        const user = await findUserByUsername(username);

        // Validar usuario y contraseña
        if (user && await bcrypt.compare(password, user.password)) {
            // Crear JWT con los datos del usuario
            const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
            
            // Guardar token en cookie 
            res.cookie('token', token, { httpOnly: true });
            
            // Redireccionar según el rol del usuario
            res.redirect(user.role === 'admin' ? '/admin/dashboard' : '/profile');
        } else {
            res.status(401).send('Credenciales inválidas');
        }
    } catch (error) {
        res.status(500).send('Error en el inicio de sesión'); 
    }
}

// Cierre de sesión
function logout(req, res) {
    // Elimina la cookie del token
    res.clearCookie('token');
    res.redirect('/login');  // Redireccionar al login después del logout
}

module.exports = { register, login, logout };
