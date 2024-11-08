const pool = require('../config/db_pgSQL')
const queries = require('../utils/queries.js') // Queries SQL


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

// POST (CREATE)
const createUser = async (user) => {
    const { name, email, password, img } = user;
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.createUser,[name, email, password, img])
        result = data.rowCount
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}

//UPDATE
const updateUserByEmail = async (updatedUser, currentEmail) => {
    const { name, email, password, img } = updatedUser;
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(queries.updateUserByEmail, [name, email, password, img]);
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