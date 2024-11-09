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
const createUser= async (req, res) => {
    const newUser = req.body; // {username,email,password, img}
    const response = await User.createUser(newUser);
    res.status(201).json({
        "items_created": response,
        message: `Usuario creado: ${req.body.email}`,
        data: newUser
    });
}
// Actualizar Autor por email
const updateUserByEmail = async (req, res) => {
    const updatedUser = req.body; // {name, surname, image, email, currentEmail}
    const currentEmail = req.body.currentEmail; // current email como criterio de búsqueda de autor
    try {
        const response = await author.updateUserByEmail(updatedUser, currentEmail);
        if (response) {
            res.status(200).json({
                message: `Usuario actualizado: ${currentEmail}`,
                data: updatedUser
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
    const userToDelete = req.body.email; // {email} le pasaremos el email por el body del postman
    try {
        const response = await User.deleteUserByEmail(userToDelete);
        if (response) {
            res.status(200).json({
                message: `Se ha borrado: ${userToDelete}`,
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