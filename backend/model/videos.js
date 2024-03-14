const {Schema, model} =require("mongoose");

const VideoShema =Schema({
    colleccion: {
        type: Schema.ObjectId,
        ref: "Colleccion",
    },
    capitulo:{
        type:String,
        require:true
    },
    numero:{
        type:Number,
        require:true
    },
    video:{
        type:String,
        default:"default.mp4"
    },
    created_at:{
        type:Date,
        default:Date.now
    }
})

module.exports=model("Video",VideoShema,"videos");
 