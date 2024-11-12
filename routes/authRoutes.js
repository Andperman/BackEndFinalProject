//Gestionamos las rutas de autenticación y protegemos las rutas con autenticación y autorización.
const express = require('express');
const router = express.Router();
const passport = require('passport');
const authMiddleware = require('../middlewares/authMiddleware');
const authorizeRole = require('../middlewares/roleMiddleware');

// Controladores
const { register, login, logout, googleLogin } = require('../controllers/authController');
const { getUsersView } = require('../controllers/views.controller');
const { getProfile, getFavorites } = require('../controllers/views.controller');
// const { getUsersView ,getDashboard } = require('../controllers/views.controller'); //falta poner funcion crear anuncio

// Rutas de autenticación
router.get('/register', (req, res) => res.render('register'));  // Registro
router.post('/register', register);                              // Registrar usuario
router.get('/login', (req, res) => res.render('login'));         // Login
router.post('/login', login);                                    // Login usuario
router.get('/logout', logout);                                   // Logout usuario

// Rutas de autenticación con Google
router.get('/google', passport.authenticate('google', { scope: ['email', 'profile'], prompt: 'select_account' }));
router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/auth/failure' }),
    googleLogin // Si todo va bien, lo dirigimos al dashboard
);

// Rutas de usuario (requiere autenticación)
router.get('/profile', authMiddleware, getProfile);              // Perfil de usuario
router.get('/favorites', authMiddleware, getFavorites);          // Ofertas favoritas

// Rutas de administrador (requiere autenticación y rol de 'admin')
router.get('/admin/dashboard', authMiddleware, authorizeRole('admin'),  getDashboard); // Dashboard admin
router.get('/admin/users', authMiddleware, authorizeRole('admin'), getUsersView);         // Listado de usuarios
// router.post('/admin/ads', authMiddleware, authorizeRole('admin'), createAd);          // Crear anuncio

// Ruta de fallo en la autenticación con Google
router.get('/auth/failure', (req, res) => {    //poner las rutas de fallos
    res.send('Something went wrong...');
});

module.exports = router;
