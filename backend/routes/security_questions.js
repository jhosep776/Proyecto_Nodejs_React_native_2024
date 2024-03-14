const express =require("express");
const router =express.Router();
const Security_questions = require("../controllers/security_questions")
 
const check =require("../middlewares/auth")

 
router.post("/registrar" , Security_questions.register);
router.get("/listar" , Security_questions.questions_list);
router.post("/registrar_user" , Security_questions.register_user_question);
router.get("/listar_questions/:id", Security_questions.questions_user_list);
router.get("/listar_questions_cor/:cor", Security_questions.questions_user_cor);
 
 
 
 
 

module.exports =router;