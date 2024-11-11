const pool = require('../config/db_pgSQL')
const queries = require('../utils/queries.js') // Queries SQL
const bcrypt = require('bcryptjs');



// GET

const getAllUsers = async () => {
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.getAllUsers)
        result = data.rows
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}
// GET BY EMAIL CONTROLLER PARAMS
const getUsersByEmail = async (email) => {
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.getUsersByEmail, [email])
        result = data.rows
        
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}

// POST (CREATE) con contreaseña encriptada
const createUser = async (user) => {
    const { username, email, password, img } = user;
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const hashedPassword = await bcrypt.hash(password, 10);
        const data = await client.query(queries.createUser,[username, email ,hashedPassword, img])
        result = data.rowCount
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}

//UPDATE (actualizar usuario por email)
const updateUserByEmail = async (updatedUser, currentEmail) => {
    const { name, email, password, img } = updatedUser;
    let client, result;
    try {
        client = await pool.connect();
        const hashedPassword = await bcrypt.hash(password, 10); 
        const data = await client.query(queries.updateUserByEmail, [name, email, hashedPassword , img, currentEmail]);
        result = data.rows; // Devuelve la fila actualizada
    } catch (err) {
        console.log('Error updating user:', err);
        throw err;
    } finally {
        client.release();
    }
    return result;
};
// DELETE
const deleteUserByEmail = async (userToDelete) => {
    const email = userToDelete;
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(queries.deleteUserByEmail, [email]);
        result = data.rowCount
        
    } catch (err) {
        console.log('Error deleting user:', err);
        throw err;
    } finally {
        client.release();
    }
    return result;
};


const Users = {
    getAllUsers,
    getUsersByEmail,
    createUser,
    updateUserByEmail,
    deleteUserByEmail
    
}

module.exports = Users;