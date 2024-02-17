const express =require("express");
const router =express.Router();
const UserController = require("../controllers/user");
const check =require("../middlewares/auth")

router.get("/prueba-usuario" , UserController.pruebaUser);

router.post("/registrar", UserController.register);
router.post("/login", UserController.login);

module.exports =router;