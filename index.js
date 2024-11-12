const express = require('express') //importamos paquete express
// const swaggerUi = require('swagger-ui-express');//documentacion de la app
const swaggerDocument = require('./swagger.json');
const app = express() // inicializar servidor con express
const port = 3000;
const jwt = require("jsonwebtoken");
const passport = require("passport");
const session = require("express-session");
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
require("./utils/auth.js");

dotenv.config();
//Logger
const morgan = require("./middlewares/morgan")
app.use(morgan(':method :url :status - :response-time ms :body'));

//habilitar static
app.use(express.static('public'));//middleware para servir archivos estáticos de front: CSS, JS, Assets
app.use(express.urlencoded({ extended: true })); //Middleware puppeteer 
app.use(cookieParser());  //Middleware cookieParser
app.use(express.json()); // Middleware para parsear el body de las peticiones
//PUG views
app.set('view engine', 'pug');
app.set('views','./views');

//Inicializamos passport y la session de passport
app.use(session({ secret: 'SECRET' }));
app.use(passport.initialize());
app.use(passport.session());

const userRoutes = require("./routes/user.routes");
const jobOffersRoutes = require("./routes/jobOffers.routes")
const viewsRoutes = require("./routes/views.routes");
// const routes = require('./routes/getJob.routes'); //añadido andrea
// const authRoutes = require('./routes/authRoutes');

app.use('/api/user', userRoutes);
app.use('/api/joboffers', jobOffersRoutes);
app.use('/', viewsRoutes);
// app.use(routes); //añadido andrea
// app.use(authRoutes);

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));//inicializamos ruta de la documentación
app.use('*', function(req, res){
    res.status(404).render('error', { statusCode: 400 })
});

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`)
});