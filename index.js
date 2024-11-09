const express = require('express') //importamos paquete express
const app = express() // inicializar servidor con express
const port = 3000;
const jwt = require("jsonwebtoken");
const passport = require("passport");
const session = require("express-session");
require("./utils/auth.js");


//Logger
const morgan = require("./middlewares/morgan")
app.use(morgan(':method :url :status - :response-time ms :body'));

app.use(express.json()); // Middleware para parsear el body de las peticiones
//habilitar static
app.use(express.static('public'));//middleware para servir archivos estáticos de front: CSS, JS, Assets

//PUG views
app.set('view engine', 'pug');
app.set('views','./views');

const userRoutes = require("./routes/user.routes");
// const adminRoutes = require("./routes/admin.routes")
const viewsRoutes = require("./routes/views.routes");

// app.use('/', userRoutes);
// app.use('/', adminRoutes);
app.use('/', viewsRoutes);

app.use('*', function(req, res){
    res.status(404).render('error', { statusCode: 400 })
});

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`)
});