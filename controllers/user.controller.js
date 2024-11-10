const User = require('../models/user.model'); // Importar el modelo de la BBDD

// GET http://localhost:3000/users --> ALL
// GET http://localhost:3000/users?email=hola@gmail.com --> query por email
const getAllUsers = async (req, res) => {
    let users;
    users = await User.getAllUsers();

    res.status(200).json(users); // 
}
const getUsersByEmail = async (req, res) => {
    const { email } = req.query;
    try {
        const userData = await User.getUsersByEmail(email);
        if (userData) {
            res.status(200).json(userData);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error obtaining user by email:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Crear usuario //Post
const createUser = async (req, res) => {
    const newUser = req.body; // {username,email,password, img}
    const response = await User.createUser(newUser);
    res.status(201).json({
        "items_created": response,
        message: `User created: ${req.body.email}`,
        data: newUser
    });
}
// Actualizar Autor por email
const updateUserByEmail = async (req, res) => {
    const { email } = req.query; // {name, surname, image, email, currentEmail}
    const updatedUserData = req.body; // current email como criterio de búsqueda de autor
    try {
        const response = await User.updateUserByEmail(email);
        if (response) {
            res.status(200).json({
                message: `User updated: ${email}`,
                data: updatedUserData
            });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error updating User:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const deleteUserByEmail = async (req, res) => {
    const { email } = req.query; // {email} le pasaremos el email por el body
    try {
        const response = await User.deleteUserByEmail(email);
        if (response) {
            res.status(200).json({
                message: `User: ${email} was deleted successfully`,
                data: response
            });
        } else {
            res.status(404).json({ error: 'User with that email was not found' });
        }
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    getAllUsers,
    getUsersByEmail,
    createUser,
    updateUserByEmail,
    deleteUserByEmail

}