const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const authorizeRole = require('../middlewares/roleMiddleware');

// Controladores
const { register, login, logout } = require('../controllers/authController');
const { getProfile, getFavorites } = require('../controllers/userController');
const { getUsers, createAd, getDashboard } = require('../controllers/adminController');

// Rutas de autenticación
router.get('/register', (req, res) => res.render('register'));  // Registro
router.post('/register', register);                              // Registrar usuario
router.get('/login', (req, res) => res.render('login'));         // login
router.post('/login', login);                                    // Login usuario
router.get('/logout', logout);                                   // Logout usuario

// Rutas de usuario (requiere autenticación)
router.get('/profile', authMiddleware, getProfile);              // Perfil de usuario
router.get('/favorites', authMiddleware, getFavorites);          // Ofertas favoritas

// Rutas de administrador (requiere autenticación y rol de 'admin')
router.get('/admin/dashboard', authMiddleware, authorizeRole('admin'), getDashboard); // Dashboard admin
router.get('/admin/users', authMiddleware, authorizeRole('admin'), getUsers);         // Listado de usuarios
router.post('/admin/ads', authMiddleware, authorizeRole('admin'), createAd);          // Crear anuncio

module.exports = router;
