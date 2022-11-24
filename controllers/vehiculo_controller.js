const { response } = require('express');
const Vehiculo = require('../models/Vehiculo');


const verVehiculos = async( req, resp = response) => {
    const vehiculos = await Vehiculo.find();
    // console.log(usuarios.length);
    if (vehiculos.length > 0) {
        return resp.json(vehiculos);
    }
    resp.json({
        conenxion: true,
        mensaje: 'No hay datos en la BD'
    });
}


module.exports = {
    verVehiculos
}
