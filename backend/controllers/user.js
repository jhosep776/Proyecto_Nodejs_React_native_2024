const user = require("../model/user")
const bcrypt = require("bcrypt")
const rol = require("../model/roles")

// importando JWT

const jwt = require("../services/jwt")


//acciones de prueba 
const pruebaUser = async(req, res) => {

    const role= await rol.findOne({ role: "usuario" })
    console.log(role._id)
    return res.status(200).send({
        message: "mensaje enviado desde: controllers/user.js",
        roles: role._id
       

    })
}
const register = (req, res) => {


    // recoger datos
    let params = req.body;

    // comprobar si se envian paramentros requeridos 

    if (!params.name || !params.email || !params.password || !params.nick) {
        //
        return res.status(200).send({
            status: "error",
            message: "no se estan enviando todos los parametros requeridos",

        });
    }
    //Crear objeto de usuario

    let user_obj = new user(params);
    //Control usuarios duplicados
    user.find({
        $or: [
            { email: user_obj.email.toLowerCase() },
            { nick: user_obj.nick.toLowerCase() }
        ]
    })
        .then(async (users) => {
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
                const role= await rol.findOne({ role: "usuario" })
                 
                user_obj.role= role._id
               
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
        })
        .catch(() => {
            return res.status(400).send({
                status: "error",
                message: "no se esta enviando correctamente el metodo register"
            });
        });








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



const user_list =  (req, res) => {
    rol.find()
        .select('-created_at -__v')
        .sort({created_at:-1})

        .then((result) => {

            if (!result || result.length <= 0) {
                return res.status(400).json({
                    status: "error",
                    message: "No existen roles",
                })
            }
            return res.status(200).json({
                status: "success",
                message: " listado de roles",
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
    login
}