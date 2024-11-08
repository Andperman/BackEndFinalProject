const queries = {
    getUsersByEmail: `
    SELECT name,email,password,img
    FROM users
    WHERE email=$1;`,
    getAllUsers: `SELECT a.name,a.email,a.image,a.email 
    FROM users AS u
    ORDER BY u.name;`,
    createUser: `INSERT INTO users(name,email,password,img) 
    VALUES ($1,$2,$3,$4)
    `,
    updateUserByEmail: `UPDATE users
    SET name = $1, email = $2, password = $3, img = $4
    WHERE email = $5
    `,
    deleteUserByEmail: `DELETE FROM users
    WHERE id_user = 
    (SELECT id_user 
    FROM users 
    WHERE email = $1);
    `,
    
}
module.exports = queries;