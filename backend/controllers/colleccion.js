const fs = require("fs");
const path = require("path")

const colleccions = require('../model/colleccion')
const videos = require('../model/videos')
const premium = require("../model/premium")
const save_colleccion = (req, res) => {


    // recoger datos
    let params = req.body;

    // comprobar si se envian paramentros reueridps 

    if (!params.name || !params.description) {
        //
        return res.status(200).send({
            status: "error",
            message: "no se estan enviando los parametros"

        });
    }
    //Crear objeto de usuario

    let colleccion_obj = new colleccions(params);
    //Control usuarios duplicados
    colleccions.find({

        name: colleccions.name.toLowerCase()

    })
        .then(async (colleciones) => {
            if (colleciones && colleciones.length >= 1) {
                return res.status(200).send({
                    status: "success",
                    message: "La coleccion ya existe"
                })
            } else {


                //guardar objeto
                colleccion_obj.save()
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
                            message: "colleccion guardada ",
                            result
                        })
                    })
                    .catch(() => {
                        return res.status(400).send({
                            status: "error",
                            message: "La colleccion no se guardo"
                        });
                    });
            }
        })
        .catch(() => {
            return res.status(400).send({
                status: "error",
                message: "no se esta enviando correctamente el metodo saver"
            });
        });



}
const list_colleccion = (req, res) => {
    const coll_opc = req.params.opcional;
console.log(coll_opc)
   if (coll_opc) {
        colleccions.find({  $or: [
            { genero: { $regex: coll_opc, $options: "i" } },
            { name: { $regex: coll_opc, $options: "i" } }
        ] })
            .select('-created_at -__v')
            .then((result) => {
                if (!result || result.length === 0) {
                    return res.status(404).json({
                        status: "error",
                        message: "No se encontraron colecciones",
                    });
                }
                return res.status(200).json({
                    status: "success",
                    message: "Listado de videos",
                    collecion: result
                });
            })
            .catch((error) => {
                return res.status(400).json({
                    status: "error",
                    message: "Ocurrió un error al buscar colecciones",
                    error
                });
            });
    } else {
        colleccions.find()
            .select('-created_at -__v')
            .then((result) => {
                if (!result || result.length === 0) {
                    return res.status(404).json({
                        status: "error",
                        message: "No se encontraron colecciones",
                    });
                }
                return res.status(200).json({
                    status: "success",
                    message: "Listado de videos",
                    collecion: result
                });
            })
            .catch((error) => {
                return res.status(400).json({
                    status: "error",
                    message: "Ocurrió un error al buscar colecciones",
                    error
                });
            });
    }





}

const save_videos = (req, res) => {
    // recoger datos
    let params = req.body;

    // comprobar si se envian paramentros requeridos 

    if (!params.colleccion || !params.capitulo || !params.numero) {
        //
        return res.status(200).send({
            status: "error",
            message: "no se estan enviando los parametros"

        });
    }

    let videos_obj = new videos(params);
    videos_obj.save()
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
                message: "video guardado  ",
                result
            })
        })
        .catch(() => {
            return res.status(400).send({
                status: "error",
                message: "El video no se guardo"
            });
        });










}
const list_videos_id = async(req, res) => {
    const colleccion_id = req.params.id
    let userIdentity = req.user;

    const user_prem_active = await premium.findOne({
        $and: [
            { user: userIdentity.id },
            { estado: "1" } // Agrega más condiciones si es necesario
        ]
    });

    if(user_prem_active){
        videos.find({ colleccion: colleccion_id })
        .select('-created_at -__v')
        .sort({ numero: 1 })
        .populate('colleccion')
        .then((result) => {

            if (!result || result.length <= 0) {
                return res.status(400).json({
                    status: "error",
                    message: "No existen videos",
                })
            }

            // Transformación de los resultados para ajustar el formato de salida
            const video = result.map(video => ({
                _id: video._id,
                colleccion: video.colleccion.name,
                capitulo: video.capitulo,
                numero: video.numero,
                video: video.video
            }));


            return res.status(200).json({
                status: "success",
                message: " listado de videos",
                videos: video


            })

        }).catch((error) => {
            return res.status(400).json({
                status: "error",
                message: "Ocurrio un error",
                error
            })

        });
    }else{
        console.log("El usuarioo tiene premium ")
    }

    
    






}

const upload_colleccion = (req, res) => {

    // sacar la colleccion

    const colleccionID = req.params.id;

    // recoger el fichero de imagen y comprobar que existe
    if (!req.file) {
        return res.status(400).send({
            status: "error",
            message: "Error en devolver imagen"
        })
    }

    // conseguir nombre del archivo

    let image = req.file.originalname;

    // sacar la extencion del archivo
    const imageSplit = image.split("\.");

    const extension = imageSplit[1];

    // comprobar extension
    if (extension != "png" &&
        extension != "jpg" &&
        extension != "jpeg" &&
        extension != "gif") {

        const filePath = req.file.path;
        console.log(filePath)
        // si no es correcta , borrar archivo
        const fileDelete = fs.unlinkSync(filePath);

        // devolver respuesta
        return res.status(400).send({
            status: "error",
            message: "Extension incorrecta , solo se acepta : png ,jpg ,jpeg ,gif "
        })


    }

    // si es correcta guarda archivo


    colleccions.findOneAndUpdate({ _id: colleccionID }, { image: req.file.filename }, { new: true })
        .then((userUpdate) => {

            if (!userUpdate) {
                return res.status(400).send({
                    status: "error",
                    message: "no se esta enviando el ID",

                })
            }
            // recoger fichero de imagen
            return res.status(200).send({
                status: "success",
                message: "Ejecucion de subida de imagenes",
                colleccion: userUpdate,
                file: req.file,
            })

        })
        .catch((err) => {

            if (err) {
                return res.status(400).send({
                    status: "error",
                    message: "no se esta enviando el ID",

                })
            }

        });
}

const imagen_colleccion = (req, res) => {

    //sacar parametro de la url

    const file = req.params.file;
    // montar path real

    const filePath = "./uploads/image/" + file;
    // comprobar que existe

    fs.stat(filePath, (error, exist) => {
        if (!exist) {
            return res.status(400).send({
                status: "error",
                message: "No existe la imagen",
            })
        }
        // devolver file
        return res.sendFile(path.resolve(filePath));
    })
}


const upload_video = (req, res) => {

    // sacar la colleccion

    const colleccionID = req.params.id;

    // recoger el fichero de imagen y comprobar que existe
    if (!req.file) {
        return res.status(400).send({
            status: "error",
            message: "Error en devolver imagen"
        })
    }

    // conseguir nombre del archivo

    let image = req.file.originalname;

    // sacar la extencion del archivo
    const imageSplit = image.split("\.");

    const extension = imageSplit[1];

    // comprobar extension
    if (extension != "mp4") {

        const filePath = req.file.path;
        console.log(filePath)
        // si no es correcta , borrar archivo
        const fileDelete = fs.unlinkSync(filePath);

        // devolver respuesta
        return res.status(400).send({
            status: "error",
            message: "Extension incorrecta , solo se acepta : png ,jpg ,jpeg ,gif "
        })


    }

    // si es correcta guarda archivo


    videos.findOneAndUpdate({ _id: colleccionID }, { video: req.file.filename }, { new: true })
        .then((userUpdate) => {

            if (!userUpdate) {
                return res.status(400).send({
                    status: "error",
                    message: "no se esta enviando el ID",

                })
            }
            // recoger fichero de imagen
            return res.status(200).send({
                status: "success",
                message: "Ejecucion de subida de imagenes",
                colleccion: userUpdate,
                file: req.file,
            })

        })
        .catch((err) => {

            if (err) {
                return res.status(400).send({
                    status: "error",
                    message: "no se esta enviando el ID",

                })
            }

        });
}

const imagen_video = (req, res) => {

    //sacar parametro de la url

    const file = req.params.file;
    // montar path real

    const filePath = "./uploads/video/" + file;
    // comprobar que existe

    fs.stat(filePath, (error, exist) => {
        if (!exist) {
            return res.status(400).send({
                status: "error",
                message: "No existe la imagen",
            })
        }
        // devolver file
        return res.sendFile(path.resolve(filePath));
    })
}






module.exports = {
    save_colleccion,
    list_colleccion,
    save_videos,
    list_videos_id,
    upload_colleccion,
    imagen_colleccion,
    upload_video,
    imagen_video
}