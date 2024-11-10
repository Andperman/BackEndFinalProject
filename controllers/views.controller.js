// HOME
const getHome = (req, res) => {
    try {
        let isLogged = true;
        let role = 'admin';
        scrapping = true;
        // -- FALTA CONSULTAR SQL PARA VER SI ES ADMIN O NO
        res.status(200).render('home', {
            isLogged: isLogged,
            role: role,
            scrapping: scrapping
        });
    }
    catch (error) {
        console.log(`ERROR: ${error.stack}`);
        res.status(400).render('error', { statusCode: 400 });
    }
}

// PROFILE
const getProfile = (req, res) => {
    try {
        let isLogged = true;
        let role = 'user';
        let username = 'Bolito';
        let email = 'bolito@gmail.com';
        let password = '******';
        // -- FALTA CONSULTAR SQL PARA VER SI ES ADMIN O NO
        // -- FALTA RECIBIR DATOS DE USERNAME, EMAIL, PASSWORD DE SQL
        if (isLogged === true) {
            res.status(200).render('profile', {
                isLogged: isLogged,
                role: role,
                username: username,
                email: email,
                password: password
            });
        } else { // Error de no autorizado
            res.status(401).render('error', { statusCode: 401 });
        }

    }
    catch (error) {
        console.log(`ERROR: ${error.stack}`);
        res.status(400).render('error', { statusCode: 400 });
    }
}

// FAVORITES
const getFavorites = (req, res) => {
    try {
        let isLogged = true;
        let role = 'user';
        scrapping = true;
        // -- FALTA CONSULTAR SQL PARA VER SI ES ADMIN O NO
        // -- FALTA RECIBIR DATOS DE USERNAME, EMAIL, PASSWORD DE SQL
        if (isLogged === true && role === 'user') {
            res.status(200).render('favorites', {
                isLogged: isLogged,
                role: role,
                scrapping: scrapping
            });
        } else { // Error de no autorizado
            res.status(401).render('error', { statusCode: 401 });
        }

    }
    catch (error) {
        console.log(`ERROR: ${error.stack}`);
        res.status(400).render('error', { statusCode: 400 });
    }
}

// USERS VIEW (Only Admin)
const getUsersView = (req, res) => {
    try {
        let isLogged = true;
        let role = 'admin';
        let username = 'Bolito';
        let email = 'bolito@gmail.com';
        let password = '******';
        // -- FALTA CONSULTAR SQL PARA VER SI ES ADMIN O NO
        // -- FALTA RECIBIR DATOS DE USERNAME, EMAIL, PASSWORD DE SQL
        if (isLogged === true && role === 'admin') {
            res.status(200).render('users', {
                isLogged: isLogged,
                role: role,
                username: username,
                email: email,
                password: password
            });
        } else { // Error de no autorizado
            res.status(401).render('error', { statusCode: 401 });
        }

    }
    catch (error) {
        console.log(`ERROR: ${error.stack}`);
        res.status(400).render('error', { statusCode: 400 });
    }
}

// DASHBOARD (Only Admin)
const getDashboard = (req, res) => {
    try {
        let isLogged = true;
        let role = 'admin';
        // -- FALTA CONSULTAR SQL PARA VER SI ES ADMIN O NO
        // -- FALTA RECIBIR DATOS DE USERNAME, EMAIL, PASSWORD DE SQL
        if (isLogged === true && role === 'admin') {
            res.status(200).render('dashboard', {
                isLogged: isLogged,
                role: role
            });
        } else { // Error de no autorizado
            res.status(401).render('error', { statusCode: 401 });
        }

    }
    catch (error) {
        console.log(`ERROR: ${error.stack}`);
        res.status(400).render('error', { statusCode: 400 });
    }
}

// Función asíncrona porque se hará el fetch del scrapping y MongoDB
const searchJobOffers = async (req, res) => {
    try {

        // Recibimos el texto por body (viene del formulario)
        let search = req.body.search;
        // -- AQUÍ FALTA LA LLAMADA AL SCRAPPING CON ELTEXTO BUSCADO
        // Poner aquí el fetch y el await
        const response = await fetch(search);
        const data = response.json();

        // Llamar al front para que pinte
    }
    catch (error) {
        console.log(`ERROR: ${error.stack}`);
        res.status(400).render('error', { statusCode: 400 });
    }
}

module.exports = {
    getHome,
    getProfile,
    getFavorites,
    getUsersView,
    getDashboard,
    searchJobOffers
}