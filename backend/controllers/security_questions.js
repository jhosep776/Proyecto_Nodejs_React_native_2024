const questions = require("../model/security_questions")
const user_questions = require("../model/user_security_questions")
const user =require("../model/user")

const register = (req, res) => {
    // recoger datos
    let params = req.body;
    // comprobar si se envian paramentros reueridps 
    if (!params.question) {
        //
        return res.status(200).send({
            status: "error",
            message: "no se estan enviando los parametros"
        });
    }
    //Crear objeto de usuario
    let questions_obj = new questions(params);
    //Control duplicados
    questions.find({
        question: questions_obj.question.toLowerCase()
    }).then(async (quest) => {
        if (quest && quest.length >= 1) {
            return res.status(200).send({
                status: "success",
                message: "La pregunta ya existe"
            })
        } else {


            //guardar objeto
            questions_obj.save()
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
                        message: "La pregunta fue guardada  ",
                        result
                    })
                })
                .catch(() => {
                    return res.status(400).send({
                        status: "error",
                        message: "La pregunta no se guardo"
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

const questions_list = (req, res) => {
    questions.find({ estado: '1' })
        .select('-created_at -__v')
        .sort({ created_at: -1 })
        .then((result) => {

            if (!result || result.length <= 0) {
                return res.status(400).json({
                    status: "error",
                    message: "No existen preguntas",
                })
            }
            return res.status(200).json({
                status: "success",
                message: " listado de preguntas",
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
const register_user_question = (req, res) => {
    // recoger datos
    let params = req.body;
    // comprobar si se envian paramentros reueridps 
    if (!params.user || !params.question || !params.answer) {
        //
        return res.status(200).send({
            status: "error",
            message: "no se estan enviando los parametros"
        });
    }
    //Crear objeto de usuario
    let user_questions_obj = new user_questions(params);

    //guardar objeto
    user_questions_obj.save()
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
                message: "La pregunta del usuario fue guardada  ",
                result
            })
        })
        .catch(() => {
            return res.status(400).send({
                status: "error",
                message: "La pregunta no se guardo"
            });
        });





}
const questions_user_list = (req, res) => {
    const UserID = req.params.id;

    user_questions.find({ user: UserID, estado: '1' })
        .select('-created_at -__v')
        .sort({ created_at: -1 })
//.populate('user')
        .populate('question')
        .then((result) => {
            if (!result || result.length <= 0) {
                return res.status(400).json({
                    status: "error",
                    message: "No existen preguntas",
                })
            }

            const questions_user = result.map(questions_user => ({
                _id: questions_user._id,
              //  user: questions_user.user.name,
                question: questions_user.question.question,
                answer:questions_user.answer
             
            }));


          
            return res.status(200).json({
                status: "success",
                message: " listado de preguntas",
                questions_user,
            })

        }).catch((error) => {
            return res.status(400).json({
                status: "error",
                message: "Ocurrio un error",
                error
            })

        });
}

const questions_user_cor = async(req, res) => {
    const User_correo = req.params.cor;
    const usuarios = await user.findOne({email:User_correo});

    
    user_questions.find({ user: usuarios._id, estado: '1' })
        .select('-created_at -__v')
        .sort({ created_at: -1 })
//.populate('user')
        .populate('question')
        .then((result) => {
            if (!result || result.length <= 0) {
                return res.status(400).json({
                    status: "error",
                    message: "No existen preguntas",
                })
            }

            const questions_user = result.map(questions_user => ({
                _id: questions_user._id,
              //  user: questions_user.user.name,
                question: questions_user.question.question,
                answer:questions_user.answer
             
            }));


          
            return res.status(200).json({
                status: "success",
                message: " listado de preguntas",
                questions_user,
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
    questions_list,
    register_user_question,
    questions_user_list,
    questions_user_cor 

}