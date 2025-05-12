function verificarRol(rol) {
    return (req, res, next) => {
        if (req.session && req.session.user && req.session.user.rol === rol) {
            next();
        } else {
            res.redirect('/login');
        }
    };
}

function verificarAutenticacion(req, res, next) {
    if (req.session && req.session.user) {
        next();
    } else {
        res.redirect('/login');
    }
}

function accesoPublico(req, res, next) {
    next();
}

module.exports = { verificarRol, verificarAutenticacion, accesoPublico };