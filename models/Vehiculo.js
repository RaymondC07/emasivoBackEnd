const { Schema, model } = require("mongoose");

const VehiculoSchema = Schema({

    id_zonal:{
        type: String,
        require: true
    },
    placa:{
        type: String,
        require: true        
    },
    modelo:{
        type: Number,
        require: true
    },
    tipo:{
        type: String,
        require: true
    }
})

module.exports = model('Vehiculo', VehiculoSchema);
