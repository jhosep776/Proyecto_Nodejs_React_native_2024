const {Schema, model} =require("mongoose");

const RolesShema =Schema({
    role:{
        type:String,
        require:true
    },
    estado:{
        type:String,
        default:"1"
    },
    created_at:{
        type:Date,
        default:Date.now
    }
})

module.exports=model("Roles",RolesShema,"roles");
 