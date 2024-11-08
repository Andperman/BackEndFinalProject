CREATE DATABASE backendfinalproject;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    img VARCHAR(255) NOT NULL,
    role VARCHAR(10) DEFAULT 'user' CHECK (role IN ('admin', 'user'))
);

-- Para crear usuarios no hace falta pasarle el rol, por defecto lo haremos con rol user. Dentro de la BBDD cambiaremos el rol si es necesario
INSERT INTO users(username, password, email, img)
VALUES
	('Noa Yáñez', '1234567', 'noayanez@dominio.com', 'img.com')