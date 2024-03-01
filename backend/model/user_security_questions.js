const {Schema, model} =require("mongoose");

const User_Security_QuestionsSchema =Schema({
    user:{
        type:Schema.ObjectId,
        ref:"User",
    } ,
    question:{
        type:Schema.ObjectId,
        ref:"Security_Question",
    } ,
    answer:{
        type:String,
        require:true
    } ,
    estado:{
        type:String,
        default:"1"
    },
    created_at:{
        type:Date,
        default:Date.now
    }
})

module.exports=model("User_Security_Question",User_Security_QuestionsSchema,"user_security_questions");
 