const express = require("express");
const router = express.Router();
const multer = require("multer")
const colleccion = require("../controllers/colleccion");
const check = require("../middlewares/auth")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads/image/")
    },
    filename: (req, file, cb) => {
        cb(null, "peli-" + Date.now() + "-" + file.originalname);
    }
})
const uploads = multer({ storage })

const storage_vide = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads/video/")
    },
    filename: (req, file, cb) => {
        cb(null, "vide-" + Date.now() + "-" + file.originalname);
    }
})
const uploads_vide = multer({
    storage: storage_vide,
    limits: {
        fileSize: 300 * 1024 * 1024 // 100 MB en bytes
    }
})

router.post("/registrar", colleccion.save_colleccion);
router.get("/listar/:opcional?", colleccion.list_colleccion);
router.post("/registrar", colleccion.save_colleccion);
router.get("/buscar_capitulos/:id", colleccion.list_videos_id);


router.post("/uploads_coll/:id", [uploads.single("file")], colleccion.upload_colleccion);
router.get("/media_coll/:file", colleccion.imagen_colleccion);

router.post("/uploads_vide/:id", [uploads_vide.single("file")], colleccion.upload_video);
router.get("/media_vide/:file", colleccion.imagen_video);






module.exports = router;