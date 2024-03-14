const {Schema, model} =require("mongoose");

const UserSchema =Schema({
    name:{
        type:String,
        require:true
    },
    surname:{
        type:String
    },
    nick:{
        type:String
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    role:{
        type:Schema.ObjectId,
        ref:"Roles",
    },
    image:{
        type:String,
        default:"default.png"
    },
    created_at:{
        type:Date,
        default:Date.now
    }
})

module.exports=model("User",UserSchema,"users");
 