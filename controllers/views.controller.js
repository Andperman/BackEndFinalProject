// READ con GET
const getHome = (req, res) => {
    try {
        let isLogged = true;
        let role = 'user';
        // -- FALTA CONSULTAR SQL PARA VER SI ES ADMIN O NO
            res.status(200).render('home.pug', {
                isLogged: isLogged,
                role: role
            });      
    }
    catch (error) {
        console.log(`ERROR: ${error.stack}`);
        res.status(400).json({msj:`ERROR: ${error.stack}`});
    }
}

// const getSignup = (req, res) => {
// try {
//     res.status(200).render('contact.pug', {
//         name: '--> Nombre creado desde controllers <--',
//     });
// }
// catch (error) {
//     console.log(`ERROR: ${error.stack}`);
//     res.status(400).json({msj:`ERROR: ${error.stack}`});
// }
// }

// const getLogin = (req, res) => {
// try {
//     res.status(200).render('location.pug', {
//         name: '--> Nombre creado desde controllers <--',
//     });
// }
// catch (error) {
//     console.log(`ERROR: ${error.stack}`);
//     res.status(400).json({msj:`ERROR: ${error.stack}`});
// }
// }

// const getFavorites = (req, res) => {
// try {
//     res.status(200).render('mission.pug', {
//         name: '--> Nombre creado desde controllers <--',
//     });
// }
// catch (error) {
//     console.log(`ERROR: ${error.stack}`);
//     res.status(400).json({msj:`ERROR: ${error.stack}`});
// }
// }


module.exports = {
getHome
}