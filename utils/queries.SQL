CREATE DATABASE backendfinalproject;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    img VARCHAR(255) NOT NULL,
    role VARCHAR(10) DEFAULT 'user' CHECK (role IN ('admin', 'user'))
);
CREATE TABLE joboffers (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL
);
CREATE TABLE favorites (
    user_id int NOT NULL,
    joboffers_id int NOT NULL,
    PRIMARY KEY (user_id, joboffers_id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (joboffers_id) REFERENCES joboffers(id)
);

-- Para crear usuarios no hace falta pasarle el rol, por defecto lo haremos con rol user. 
-- Dentro de la BBDD cambiaremos el rol si es necesario.
INSERT INTO users(username, password, email, img)
VALUES
	('Bolito', '1234567', 'bolito@dominio.com', 'img.com')


SELECT *
    FROM favorites AS f
    WHERE email = $1
    INNER JOIN favorites as f
    ORDER BY u.username;

SELECT j.id
    FROM users AS u
	INNER JOIN favorites AS f 
	ON u.id = f.user_id
	INNER JOIN joboffers AS j
	ON f.joboffers_id = j.id
	WHERE u.email = 'bolito@dominio.com'
    