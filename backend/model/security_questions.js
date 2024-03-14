const {Schema, model} =require("mongoose");

const Security_QuestionsSchema =Schema({
    question:{
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

module.exports=model("Security_Question",Security_QuestionsSchema ,"security_questions");
 