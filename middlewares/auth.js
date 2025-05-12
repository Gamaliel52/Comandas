// Middleware para verificar el rol del usuario
function verificarRol(rol) {
    return (req, res, next) => {
        if (req.session && req.session.user && req.session.user.rol === rol) {
            next(); // El usuario tiene el rol correcto, continuar
        } else {
            res.redirect('/login'); // Redirigir al inicio de sesión si no tiene acceso
        }
    };
}

// Middleware para verificar si el usuario está autenticado
function verificarAutenticacion(req, res, next) {
    if (req.session && req.session.user) {
        next(); // El usuario está autenticado, continuar
    } else {
        res.redirect('/login'); // Redirigir al inicio de sesión si no está autenticado
    }
}

// Middleware para permitir acceso público
function accesoPublico(req, res, next) {
    next(); // Permitir acceso sin restricciones
}

module.exports = { verificarRol, verificarAutenticacion, accesoPublico };