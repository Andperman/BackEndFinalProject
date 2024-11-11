const express = require('express') //importamos paquete express
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
app.use(express.json()); // Middleware para parsear el body de las peticiones
//habilitar static
app.use(express.static('public'));//middleware para servir archivos estáticos de front: CSS, JS, Assets
app.use(express.urlencoded({ extended: true })); //Middleware puppeteer 
app.use(cookieParser());  //Middleware cookieParser
//PUG views
app.set('view engine', 'pug');
app.set('views','./views');

const userRoutes = require("./routes/user.routes");
const jobOffersRoutes = require("./routes/jobOffers.routes")
const viewsRoutes = require("./routes/views.routes");
const routes = require('./routes/getJob.routes'); //añadido andrea
const authRoutes = require('./routes/authRoutes');

app.use('/api/user', userRoutes);
app.use('/api/joboffers', jobOffersRoutes);
app.use('/', viewsRoutes);
app.use(routes); //añadido andrea
app.use(authRoutes);

app.use('*', function(req, res){
    res.status(404).render('error', { statusCode: 400 })
});

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`)
});