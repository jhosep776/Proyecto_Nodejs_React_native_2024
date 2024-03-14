const mongoose =require("mongoose");
const  connection =async()=>{
    try{
        mongoose.connect("mongodb://mongodb2024:rN12Vyh2R8d4IG2uZkzjJWiSiHWfaT6z4KVk1KfhLHMlB6RrsSEqVI35bA0ITy5wqhmJbkxcLiO5ACDbp5ElKA==@mongodb2024.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&maxIdleTimeMS=120000&appName=@mongodb2024@")
//mongodb://mongodb2024:rN12Vyh2R8d4IG2uZkzjJWiSiHWfaT6z4KVk1KfhLHMlB6RrsSEqVI35bA0ITy5wqhmJbkxcLiO5ACDbp5ElKA%3D%3D@mongodb2024.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&maxIdleTimeMS=120000&appName=@mongodb2024@
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