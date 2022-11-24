const { Schema, model } = require("mongoose");


const UserSchema = Schema({
    nombre:{
        type: String,
        required: true
    },
    patio:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    }
})

module.exports = model('User', UserSchema);