const express = require('express');
const router = express.Router();
const path = require('path');

// Page de connexion
router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/login.html'));
});

// Route de connexion
router.post('/login', (req, res) => {
    // Logique de connexion à implémenter
    res.json({ message: 'Login route' });
});

// Route de déconnexion
router.get('/logout', (req, res) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

// Route de statut
router.get('/status', (req, res) => {
    res.json({
        isAuthenticated: req.isAuthenticated(),
        user: req.user
    });
});

module.exports = router; 