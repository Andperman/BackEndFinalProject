// HOME
const getHome = (req, res) => {
    try {
        let isLogged = false;
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

const searchJobOffers = async (req, res) => {
    try {

        // Recibimos el texto por body (viene del formulario)
        let search = req.body.search;
        // -- AQUÍ FALTA LA LLAMADA AL SCRAPPING CON ELTEXTO BUSCADO
        // Poner aquí el fetch y el await
        
        // Ejemplo de lo que recibiríamos (borrar):
        let example = [
            {
                title: "Se busca a Bolito",
                description: "Bolito es el mejor freelancer. Te necesitamos Bolito :(",
                date: "12/10/24",
                url: "www.ejemplo.com"
            },
            {
                title: "Necesitamos freelancer con experiencia",
                description: "Blablabla ejemplo balsdnashdjafhans nlasdkjsakd",
                date: "15/10/24",
                url: "www.ejemplo.com"
            }
        ]
        // Pintar resultados
        let section = document.querySelector("section");
        section.innerHTML = "";
        example.forEach(result => {
            section.innerHTML += `
                <article>
                    <h2>${result.title}</h2>
                    <p>${result.description}</p>
                    <p>${result.date}</p>
                    <a src=${result.url}></a>
                </article>
            `
        })
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