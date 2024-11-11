//funciones donde gestionamos la autentificación y autorización de los usuarios
const { createUser, findUserByUsername } = require('../models/userModel'); // interactuar con la base de datos
const jwt = require('jsonwebtoken');  // JWT generar tokens
const bcrypt = require('bcryptjs');  // Bcrypt para cifrar contraseñas

// Registro de usuario
//Creamos un nuevo usuario en la base de datos, encriptando su contraseña con bcryptjs antes de guardarla.
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
            const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '20m' });
            
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

// Login con Google 
async function googleLogin(req, res) {
    try {
        const { id, displayName, emails } = req.user;
        
        // Verificamos si el usuario ya existe en la base de datos
        let user = await findUserByUsername(displayName);

        // Si el usuario no existe, lo creamos
        if (!user) {
            user = await createUser(displayName, 'default_password', emails[0].value, 'user');
        }

        // Creamos el payload del JWT
        const payload = {
            id: user.id,
            role: user.role
        };

        // Generamos el JWT
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '20m' });

        // Almacenamos el token en las cookies
        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'strict'
        }).redirect('/dashboard');
        
    } catch (error) {
        console.error(error);
        res.status(500).send('Error en la autenticación con Google');
    }
}

module.exports = { register, login, logout, googleLogin };