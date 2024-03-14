//importar modulos 
const jwt =require("jwt-simple");
const moment = require("moment");

const libjwt =require("../services/jwt")
// importar clave secreta

const secret = libjwt.secret;
// Funcion de autentificacion
exports.auth = (req, res, next) => {
    // comprobar si llega la cabecera

    if (!req.headers.authorization) {
        return res.status(400).send({
            status: "error",
            message: "La peticion no tiene cabecera de autentificacion"
        })
    }
    //limpiar Token 
    let token = req.headers.authorization.replace(/['"]+/g, '')
    // decodificar token
    try {
        let payload = jwt.decode(token, secret);
        //comprobar expiracion
        if (payload.exp <= moment().unix()) {
            return res.status(400).send({
                status: "error",
                message: "Token Expirado"

            })
        };
        // agregar datos de usuarios a rquest

        req.user = payload;
    } catch (error) {
        return res.status(400).send({
            status: "error",
            message: "Token Invalido",
            
        })
    }




    // pasar a ejecucion
    next();
}
