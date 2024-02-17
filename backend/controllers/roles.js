

const rol = require("../model/roles")
const register = (req, res) => {


    // recoger datos
    let params = req.body;

    // comprobar si se envian paramentros reueridps 

    if (!params.role) {
        //
        return res.status(200).send({
            status: "error",
            message: "no se estan enviando los parametros"

        });
    }
    //Crear objeto de usuario

    let role_obj = new rol(params);
    //Control usuarios duplicados
    rol.find({

        role: role_obj.role.toLowerCase()

    })
        .then(async (roles) => {
            if (roles && roles.length >= 1) {
                return res.status(200).send({
                    status: "success",
                    message: "El rol ya existe"
                })
            } else {


                //guardar objeto
                role_obj.save()
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
                            message: "rol guardado  ",
                            result
                        })
                    })
                    .catch(() => {
                        return res.status(400).send({
                            status: "error",
                            message: "El rol no se guardo"
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
const detail = (req, res) => {
    const roleID = req.params.id;

    rol.findById(roleID).then((result) => {

        if (!result) {
            return res.status(404).send({
                status: "error",
                message: "no existe el rol"

            });
        }

        return res.status(200).send({
            status: "error",
            message: "Rol",
            rol: result

        });

    }).catch((err) => {
        return res.status(404).send({
            status: "error",
            message: "sucedio un error en el envio"

        });
    });

}

//listar publicaciones de usuario



const rol_list =  (req, res) => {
    rol.find({estado:'1'})
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

    register,
    detail,
    rol_list

}