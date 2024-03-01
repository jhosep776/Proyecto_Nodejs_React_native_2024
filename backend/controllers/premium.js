
const premium = require("../model/premium")
const register = async (req, res) => {
    // recoger datos
    let params = req.body;

    // comprobar si se envian paramentros reueridps  
    if (!params.user || !params.fech_ini || !params.fech_fin) {
        //
        return res.status(200).send({
            status: "error",
            message: "no se estan enviando los parametros"
        });
    }

    // Convertir las cadenas de fecha a objetos de fecha año-mes-dia 2024-02-27
    params.fech_ini = new Date(params.fech_ini);
    params.fech_fin = new Date(params.fech_fin);

    const user_prem_active = await premium.findOne({
        $and: [
            { user: params.user },
            { estado: "1" } // Agrega más condiciones si es necesario
        ]
    });

    //Crear objeto de usuario
    let prem_obj = new premium(params);


    if (!user_prem_active) {
        //guardar objeto

        prem_obj.save()
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
                    message: "premium guardado  ",
                    result
                })
            })
            .catch(() => {
                return res.status(400).send({
                    status: "error",
                    message: "El premium no se guardo"
                });
            });

    } else {
        return res.status(200).send({
            status: "error",
            message: "El usuario ya tiene un premium asignado ",

        })
    }



}



const list_id = async (req, res) => {

    let userIdentity = req.user;

    premium.find({
        $and: [
            { user: userIdentity.id },
            { estado: "1" } // Agrega más condiciones si es necesario
        ]

    })
        .select('-created_at -__v')
        .sort({ created_at: -1 })
        .populate('user')
        .then((result) => {
            return res.status(200).json({
                status: "success",
                message: " listado de premiums",
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


const list = (req, res) => {
    premium.find()
        .select('-created_at -__v')
        .sort({ created_at: -1 })

        .then((result) => {

            if (!result || result.length <= 0) {
                return res.status(400).json({
                    status: "error",
                    message: "No existen premiums",
                })
            }
            return res.status(200).json({
                status: "success",
                message: " listado de premiums",
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


const update = (req, res) => {
    const id = req.params.id;
    let premiumToUpdate = req.body
    premium.findByIdAndUpdate(id, premiumToUpdate, { new: true })
        .select('-created_at -__v')
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
}


module.exports = {

    register,
    update,
    list_id,
    list


}