const mongoose =require("mongoose");
const  connection =async()=>{
    try{
        mongoose.connect("mongodb://localhost:27017/proyect2024")

        // parametros por si da error (objeto) casos raros
        //useNewUrlParser:true
        //useUnifiedTopoLogy:true
        //useCreateIndex:true
        console.log("Conexion correcta")

    }catch(error){
        console.log(error)
        throw new Error("No conexion a BD")

    }
}

module.exports={
    connection
}