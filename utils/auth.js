//autentificación con google mediante passaport.js
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();

//Establecemos la estrategia de Google con los credenciales de nuestro proyecto
passport.use(new GoogleStrategy({
    clientID: `${process.env.CLIENT_ID}`,
    clientSecret: `${process.env.CLIENT_SECRET}`,
    callbackURL: `http://localhost:3000/google/callBack`,
    proxy: true
  },
  function(request, accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
));

//Esta función determina los datos que se van a guardar en la sesión de google: user
passport.serializeUser(function (user, done) {
    done(null,user)
});
//Determina que objeto borrar de la sesión: user
passport.deserializeUser(function (user, done) {
    done(null,user)
});