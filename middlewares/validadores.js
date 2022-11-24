const { response } = require("express");
const { validationResult } = require("express-validator");
const jwt = require('jsonwebtoken');


const validarCampos = ( req, resp = response, next ) =>{

    const errors = validationResult( req );
    if (!errors.isEmpty()){
        return resp.status(400).json({
            Validado: false,
            errors: errors.mapped()
        });
    }

    next();

}


const validarJWT = ( req, resp = response, next ) => {

    const jToken = req.header( 'x-jwt' );

    if ( !jToken ){
        return resp.status(401).json({
            token: false,
            mensaje: 'No hay validación de Json Web Token'
        });
    }

    try {

        const { id } = jwt.verify( jToken, process.env.JWT_SECRET_SEED );
        req.id = id;



    } catch (error) {

        return resp.status(401).json({
            token: false,
            mensaje: 'Error en el Json Web Token'
        });
        
    }
    
    next();

}

module.exports = {
    validarCampos,
    validarJWT
}