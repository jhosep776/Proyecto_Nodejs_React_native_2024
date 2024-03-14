//dependencias

const jwt =require("jwt-simple");
const moment = require("moment");

//clave secreta

const secret ="CLAVE_SECRETA_2024_GH_API_REST_2000";

// Funcion para el token
const createToken=(user)=>{
    const payload={
        id:user._id,
        name:user.name,
        surname:user.surname,
        nick:user.nick,
        email:user.email,
        role:user.role,
        image:user.image,
        iat:moment().unix(),
        exp:moment().add(30,"days").unix()

    }

    return jwt.encode(payload,secret);
}

module.exports={
    secret,
    createToken
}