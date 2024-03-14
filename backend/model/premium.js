const { Schema, model } = require("mongoose");

const PremiumSchema = Schema({
    user: {
        type: Schema.ObjectId,
        ref: "User",
    },
    fech_ini: {
        type: Date,
        require:true
    },
    fech_fin: {
        type: Date,
        require:true
    },
    estado: {
        type: String,
        default: "1"
    },
    created_at: {
        type: Date,
        default: Date.now
    }
})

module.exports = model("Premium", PremiumSchema, "premiums");
