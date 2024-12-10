function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/auth/login');
}

function setUserLocals(req, res, next) {
    res.locals.user = req.user || null;
    next();
}

module.exports = { isAuthenticated, setUserLocals }; 