const user = require("../model/user")
const bcrypt = require("bcrypt")
const rol = require("../model/roles")
const premium = require("../model/premium")
// ayuda con las fechas
const { addDays } = require('date-fns')
// importando JWT

const jwt = require("../services/jwt")


//acciones de prueba 
const pruebaUser = async (req, res) => {

    const role = await rol.findOne({ role: "usuario" })
    console.log(role._id)
    return res.status(200).send({
        message: "mensaje enviado desde: controllers/user.js",
        roles: role._id


    })
}

 


const premium_def = async (id) => {
    // Obtener la fecha actual
    const fechaActual = new Date();
    // Crear una nueva fecha sumando 6 días a la fecha actual
    const fechaFin = addDays(fechaActual, 6);
    // Ahora puedes utilizar fechaActual y fechaFin para crear tu objeto premium
    const premium_user = new premium({
        user: id,
        fech_ini: fechaActual,
        fech_fin: fechaFin
    });
    const user_prem_active = await premium.findOne({
        $and: [
            { user: id },
            { estado: "1" } // Agrega más condiciones si es necesario
        ]
    });

    if (!user_prem_active) {
        //guardar objeto

        premium_user.save()
            .then((result) => {
                if (!result) {
                    console.log("no existe respuesta premium");
                }
                console.log("se guardo correctamente el premium");
            })
            .catch(() => {
                console.log("El premium no se guardo");
               
            });

    } else {
        
        console.log("El usuario ya tiene un premium asignado");
    }




}


const register = (req, res) => {
    // recoger datos
    let params = req.body;
    // comprobar si se envian paramentros requeridos 
    if (!params.name || !params.email || !params.password) {
        //|| !params.nick
        return res.status(200).send({
            status: "error",
            message: "no se estan enviando todos los parametros requeridos",

        });
    }
    //Crear objeto de usuario

    let user_obj = new user(params);
    //Control usuarios duplicados
    user.find({
        email: user_obj.email
        /*$or: [
            { email: user_obj.email.toLowerCase() },
           { nick: user_obj.nick.toLowerCase() }
        ]*/
    }).then(async (users) => {
        if (users && users.length >= 1) {
            return res.status(200).send({
                status: "success",
                message: "El usuario ya existe"
            })
        } else {
            // cifrar la contraseña
            let pwd = await bcrypt.hash(params.password, 10)
            params.password = pwd;
            // Crear Objeto
            let user_obj = new user(params)
            // console.log(user_obj)
            const role = await rol.findOne({ role: "usuario" })

            user_obj.role = role._id
            // nick por defecto
            const fechaActual = new Date();
            user_obj.nick = user_obj.name.replace(/\s/g, '') + fechaActual.getTime()



            //guardar objeto
            user_obj.save()
                .then((result) => {
                    if (!result) {
                        return res.status(400).send({
                            status: "error",
                            message: "no se esta enviando el resultado ",
                            result
                        })
                    }
                    const userId = result._id;
                    premium_def(userId)
                        .then((response) => {
                            console.log(response);
                        })
                        .catch((error) => {
                            console.error(error);
                        });


                    return res.status(200).send({
                        status: "success",
                        message: "usuario guardado  ",
                        result
                    })
                })
                .catch(() => {
                    return res.status(400).send({
                        status: "error",
                        message: "El usuario no se guardo"
                    });
                });
        }
    }).catch(() => {
        return res.status(400).send({
            status: "error",
            message: "no se esta enviando correctamente el metodo register"
        });
    });








}
const update = (req, res) => {
    let userIdentity = req.user;
    let userToUpdate = req.body

    // eliminado parametris del autorizacion 

    delete userIdentity.role
    delete userIdentity.image
    delete userIdentity.iat
    delete userIdentity.exp
    //Control usuarios duplicados
    user.find({
        email: userToUpdate.email
    }).then(async (users) => {
        let userIsset = false;
        users.forEach(user => {
            if (user && user.id != userIdentity.id) {
                userIsset = true;
            }
        });
        if (userIsset) {
            return res.status(200).send({
                status: "success",
                message: "El usuario ya existe",
            })
        }
        if (userToUpdate.password) {
            // cifrar la contraseña
            let pwd = await bcrypt.hash(userToUpdate.password, 10)
            userToUpdate.password = pwd;
            // enviar el nick 

        }
        const fechaActual = new Date();
        userToUpdate.nick = userToUpdate.name.replace(/\s/g, '_') + "|" + fechaActual.getTime()

        user.findByIdAndUpdate(userIdentity.id, userToUpdate, { new: true })
            .select('-created_at -__v -role -image -password')
            .then((result) => {
                if (result) {
                    return res.status(200).send({
                        status: "success",
                        message: "probando el metodo Updata",
                        result
                    })
                }

            }).catch((err) => {
                return res.status(404).send({
                    status: "success",
                    message: "error en la actualizacion de datos",
                    err
                })


            });

    }).catch((err) => {
        return res.status(400).send({
            status: "error",
            message: "Sucedio un error en la busqueda",
            err


        })
    })







}
const login = (req, res) => {

    // recoger parametros del body 
    const params = req.body;
    if (!params.email || !params.password) {
        return res.status(404).send({
            status: "error",
            message: "no se ingreso el correo o contraseña"
        })
    }

    // buscar el email en la base de datos
    user.findOne({ email: params.email })
        // .select({"password":0})
        .then((result) => {

            if (!result) {
                return res.status(404).send({
                    status: "error",
                    message: "no existe el usuario"
                })
            }

            // comparar contraseña

            const pwd = bcrypt.compareSync(params.password, result.password);

            if (!pwd) {
                return res.status(400).send({

                    status: "error",
                    message: "no te has identificado correctamente"

                })
            }
            const token = jwt.createToken(result);

            return res.status(200).send({
                status: "success",
                message: " login corracto",
                user: {
                    id: result._id,
                    name: result.name,
                    nick: result.nick

                },
                token
            })
        })
        .catch((err) => {
            return res.status(404).send({
                status: "error",
                message: "no se esta enviando el dato"
            })
        });

}

const list = (req, res) => {


    let userIdentity = req.user;
    user.find({ _id: userIdentity.id })
        .select('-created_at -__v -role -image -password')
        .sort({ created_at: -1 })
        .then((result) => {

            if (!result || result.length <= 0) {
                return res.status(400).json({
                    status: "error",
                    message: "No existe el usuario",
                })
            }
            return res.status(200).json({
                status: "success",
                message: " listado de datos del usuario",
                result,


            })

        }).catch((error) => {
            return res.status(400).json({
                status: "error",
                message: "Ocurrio un error",
                error
            })

        });






}




module.exports = {
    pruebaUser,
    register,
    update,
    login,
    list
}