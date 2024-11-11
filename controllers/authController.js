//funciones donde gestionamos la autentificación y autorización de los usuarios
// Importamos la función que busca usuarios por email
const { createUser, getUsersByEmail } = require('../models/user2.model');// interactuar con la base de datos
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
    const { email, password } = req.body; 
    try {
        // Buscar el usuario por email
        const users = await getUsersByEmail(email); // Obtener el usuario por email
        //sino encutra nada responde con error 
        if (users.length === 0) {
            return res.status(401).send('Credenciales inválidas');
        }
        //si se encontro lo coge
        const user = users[0]; 

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
        const { id, displayName, emails } = req.user;  // Los datos del usuario de Google

        // Verificar si el usuario ya existe en la base de datos por su email
        let users = await getUsersByEmail(emails[0].value);  // Buscar el usuario por su correo electrónico

        if (users.length === 0) {
            // Si no existe, creamos uno nuevo
            const newUser = await createUser(displayName, 'default_password', emails[0].value, 'user');
            users = [newUser];  
        }

        const user = users[0];  // Seleccionar el primer usuario 

        // Crear el payload para el JWT
        const payload = {
            id: user.id,
            role: user.role
        };

        // Generar el token JWT
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '20m' });

        // Guardar el token en las cookies
        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'strict'
        });

        // Redirigir al dashboard
        res.redirect('/dashboard');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error en la autenticación con Google');
    }
}


module.exports = { register, login, logout, googleLogin };