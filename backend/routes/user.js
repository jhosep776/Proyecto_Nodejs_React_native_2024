const express =require("express");
const router =express.Router();
const UserController = require("../controllers/user");
const PremiumController = require("../controllers/premium");
const check =require("../middlewares/auth")

router.get("/prueba-usuario" , UserController.pruebaUser);

router.post("/registrar", UserController.register);
router.post("/login", UserController.login);
router.put("/update", check.auth,UserController.update);
router.get("/list", check.auth,UserController.list);

router.post("/premium", PremiumController.register);
router.get("/premium/list", PremiumController.list);
router.get("/premium/list_id",check.auth, PremiumController.list_id);
router.put("/premium/update/:id", PremiumController.update);
module.exports =router;