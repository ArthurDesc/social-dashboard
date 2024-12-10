const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Import des routes
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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