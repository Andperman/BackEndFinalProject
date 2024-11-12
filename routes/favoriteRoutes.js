const express = require('express');
// Rutas de usuario
const userController = require("../controllers/user.controller");
const router = express.Router();
//favorites
router.get("/:id", userController.getAllFavoritesFromUser);
router.post("/", userController.markAsFavorite);
router.delete("/:favorite_id", userController.unmarkAsFavorite);
module.exports = router;