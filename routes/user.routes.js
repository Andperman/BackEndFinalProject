const express = require('express');
// Rutas de productos
const userController = require("../controllers/user.controller");
const router = express.Router();

router.get('/', userController.getAllUsers);
router.get('/email',userController.getUsersByEmail);
router.post('/', userController.createUser);
router.put('/email',userController.updateUserByEmail);
router.delete('/email', userController.deleteUserByEmail);
router.get('/favorites/email',userController.getAllFavoritesFromUserEmail);
// router.delete('/favorites/email',userController.deleteFavoriteFromUserEmail);

module.exports = router;