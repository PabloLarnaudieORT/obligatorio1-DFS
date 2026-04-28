// Middleware para validar rol
const authorize = (roles = []) => {
    return (req, res, next) => {
        
        if (!req.user || !req.user.rol) {
            return res.status(401).send('No autenticado');
        }
        
        if (!roles.includes(req.user.rol)) {
            return res.status(403).send('No tienes permisos para esta acción');
        }
        
        next();
    };
}

export default authorize;