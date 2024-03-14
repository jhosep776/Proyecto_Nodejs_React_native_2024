//dependencia de BD
const {connection} = require("./database/connection")
const express =require("express")
const cors = require('cors');
// mensaje 
console.log("Api Node proyect2024")

//coneccion
connection();

const app =express();
const puerto=3900;


//configuracion de cors
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))

//cargar rutas configuradas
const UserRouters =require("./routes/user")
const ColleccionRouters =require("./routes/colleccion")
const RolesRouters =require("./routes/roles")
const Security_questionsRouters =require("./routes/security_questions")
 

app.use("/api/user",UserRouters)
app.use("/api/colleccion",ColleccionRouters)
app.use("/api/roles",RolesRouters)
app.use("/api/security_questions",Security_questionsRouters)
 
// prueba 
app.get("/ruta-prueba" ,(req,res)=>{
    return res.status(200).json({
        "id":1,
        "nombre":"jhosep",
        "web":"jhosep@gmail.com"
    });

})

app.listen(puerto,()=>{
    console.log("servidor corriendo en " ,puerto)

})