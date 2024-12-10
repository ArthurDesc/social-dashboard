const express = require('express');
const cors = require('cors');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();

const app = express();

// Import des routes
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
// Ajout du middleware d'authentification
const { setUserLocals } = require('./middleware/auth');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuration de la session (à ajouter avant les routes)
app.use(session({
      secret: process.env.SESSION_SECRET || 'e81770deb20cdf7c892b03d5eab8a711bd403e9ad963589bca59c8b94e50fec3',
      resave: false,
      saveUninitialized: false
}));

// Initialisation de Passport
app.use(passport.initialize());
app.use(passport.session());

// Ajout du middleware setUserLocals après passport
app.use(setUserLocals);

// Configuration de la stratégie Google OAuth
passport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "https://a582-2a01-e0a-8b2-8e30-25a7-7f8d-5261-aec4.ngrok-free.app/auth/google/callback"
},
      function (accessToken, refreshToken, profile, cb) {
            // Ici vous pourrez gérer l'utilisateur (base de données, etc.)
            return cb(null, profile);
      }
));

// Sérialisation/Désérialisation pour les sessions
passport.serializeUser((user, done) => {
      done(null, user);
});

passport.deserializeUser((user, done) => {
      done(null, user);
});

// Routes d'authentification Google (à ajouter avant vos autres routes)
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback',
      passport.authenticate('google', { failureRedirect: '/login' }),
      function (req, res) {
            res.redirect('/');
      }
);

// Servir les fichiers statiques
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', indexRouter);
app.use('/auth', authRouter);

// Port
const PORT = process.env.PORT || 3000;

// Démarrage du serveur
app.listen(PORT, () => {
      console.log(`Serveur démarré sur le port ${PORT}`);
});

module.exports = app; 