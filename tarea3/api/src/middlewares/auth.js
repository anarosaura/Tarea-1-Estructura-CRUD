const responseStatus = require('../../utils/response-status');

const adminUser ={
    id: 1,
    role: "admin",
    name: 'john doe'
}

const userUser = {
    id: 2,
    role: 'user',
    name: 'ana'
}

const middleware = (req, res, next) => {
    const {token} = req.query;
    if(token && token === '12345'){
        req.user = {...adminUser};
        next();
    } else{
        res.status(401).send({ message: "No autorizado: Token inválido"});;
    }
};

function hasRole(req, res, next) {
    if (req.user.role === "admin") {
        next(); 
    } else {
        res.status(403).send({ message: "Acceso denegado: No tienes permiso para realizar esta acción" });
    }
}

module.exports = {
    authenticateMiddleware: middleware,
    authorizeMiddleware: hasRole
};