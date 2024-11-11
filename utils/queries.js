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
    getAllFavoritesFromUserEmail: `SELECT j.id
    FROM users AS u
	INNER JOIN favorites AS f 
	ON u.id = f.user_id
	INNER JOIN joboffers AS j
	ON f.joboffers_id = j.id
	WHERE u.email = $1;`,
    deleteFavoritesByEmail: `DELETE FROM jobOffers as j
    INNER JOIN favorites AS f 
	ON j.id = f.joboffers_id
	INNER JOIN users AS u
	ON f.user_id = u.id
	WHERE u.email = $1;`,
    markAsFavorite: `INSERT INTO favorites(user_id,joboffers_id) 
    VALUES ($1,$2)
    `,
    unmarkAsFavorite: `DELETE FROM jobOffers
    WHERE joboffers_id = subquerywhatever`
}
module.exports = queries;