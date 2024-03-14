const { Schema, model } = require("mongoose");

const ColleccionShema = Schema({
    name: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    genero: {
        type: String,
        require:true
    },
    nro_moneda: {
        type:Number,
        require:true
    },
    image: {
        type: String,
        default: "default.png"
    },
    created_at: {
        type: Date,
        default: Date.now
    }
})

module.exports = model("Colleccion", ColleccionShema, "colleccions");
