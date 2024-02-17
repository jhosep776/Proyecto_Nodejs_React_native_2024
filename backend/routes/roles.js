const express =require("express");
const router =express.Router();
const Roles = require("../controllers/roles");
const check =require("../middlewares/auth")

 
router.post("/registrar",check.auth, Roles.register);
router.get("/detalle/:id",check.auth, Roles.detail);
router.get("/listado", Roles.rol_list);
 
 
 

module.exports =router;