// HOME
const getHome = (req, res) => {
    try {
        let isLogged = true;
        let role = 'user';
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
        res.status(400).render('error', { errorCode: 400 });
    }
}

// PROFILE
const getProfile = (req, res) => {
    try {
        let isLogged = false;
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
        }else { // Error de no autorizado
            res.status(401).render('error', { errorCode: 401 });
        }
        
    }
    catch (error) {
        console.log(`ERROR: ${error.stack}`);
        res.status(400).render('error', { errorCode: 400 });
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
        }else { // Error de no autorizado
            res.status(401).render('error', { errorCode: 401 });
        }
        
    }
    catch (error) {
        console.log(`ERROR: ${error.stack}`);
        res.status(400).render('error', { errorCode: 400 });
    }
}

module.exports = {
    getHome,
    getProfile,
    getFavorites
}