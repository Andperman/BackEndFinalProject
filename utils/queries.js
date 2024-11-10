const queries = {
    getUsersByEmail: `
    SELECT username,email,password,img,role
    FROM users
    WHERE email=$1;`,
    getAllUsers: `SELECT u.username,u.email,u.password,u.img,u.role
    FROM users AS u
    ORDER BY u.username;`,
    createUser: `INSERT INTO users(username,email,password,img) 
    VALUES ($1,$2,$3,$4)
    `,
    updateUserByEmail: `UPDATE users
    SET username = $1, email = $2, password = $3, img = $4
    WHERE email = $5
    `,
    deleteUserByEmail: `DELETE FROM users
    WHERE email = $1;
    `,
    
}
module.exports = queries;