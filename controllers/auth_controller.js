
const { response } = require('express');
const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const { crearJwt } = require('../utils/jwt');


//Ver Usuarios

const verUsuarios = async( req, resp = response) => {
    const usuarios = await User.find();
    // console.log(usuarios.length);
    if (usuarios.length > 0) {
        return resp.json(usuarios);
    }
    resp.json({
        conenxion: true,
        mensaje: 'No hay datos en la BD'
    });
}

//Nuevo Usuario
const nuevoUsuario = async( req , resp = response ) => {
    const { nombre, patio, email, password } = req.body;
    try {
        //Verificar Email Existente
        let user = await User.findOne( { email } );
        if ( user ) {
            return resp.status(400).json({
                creado: false,
                mensaje: 'El email ya existe en la base de datos'
            });
        }       
        const userDb = new User( req.body );
        //Encriptar Contraseña
        const salt =  bcryptjs.genSaltSync();
        userDb.password = bcryptjs.hashSync( password, salt );        
        //Crear JWT
        const jToken = await crearJwt( userDb.id, nombre );
        //Crear Usuario
        await userDb.save();

        return resp.status(200).json({
            creado: true,
            mensaje: 'Usuario creado de manera correcta',
            nombre,
            id: userDb.id,
            jToken
        })        
    } catch (error) {
        return resp.status(500).json({
        validado: false,
        mensaje: 'Por favor comunicarse con el administrador'
        });   
    }
}
//Login Usuario
const loginUsuario = async ( req , resp = response ) => {    
    const { email, password } = req.body;
    try {
        //Validar email de usuario
        const userDb = await User.findOne( { email } );
        if ( !userDb ){
            return resp.status(400).json({
                login: false,
                mensaje: 'Credenciales de Ingreso inválidas, revíse su email'
            });
        }
        //Validar password de usuario
        const validarPassword = bcryptjs.compareSync( password, userDb.password );

        if ( !validarPassword ){
            return resp.status(400).json({
                login: false,
                mensaje: 'Credenciales de Ingreso inválidas, revíse su contraseña'
            });
        }
        //Crear JWT
        const jToken = await crearJwt( userDb.id, userDb.nombre );
        resp.json({
            login: true,
            nombre: userDb.nombre,
            patio: userDb.patio,
            jToken
        })        
    } catch (error) {        
        console.log(error);
        return resp.status(500).json({
            ok: false,
            mensaje: 'Por favor comuniquese con el administrador'
        });        
    }
}
//Validar Token
const validacionUsuario = ( req , resp = response ) => {
    const { id } = req;
    return resp.json({
        válido: true,
        mensaje: 'Navegación Validada',
        id               
    })
}
//Ver usuario por mail
const verUsuarioEmail = async ( req , resp = response ) => {    
    const { email } = req.body;
    try {
        const userDb = await User.findOne( { email } );
        if ( !userDb ){
            return resp.status(400).json({
                login: false,
                mensaje: 'El usuario no se encuentra en la BD'
            });
        }        
        const usuarios = await User.find({email});
        if (usuarios.length > 0) {
            return resp.json(usuarios);
        }
        
    } catch (error) {        
        console.log(error);
        return resp.status(500).json({
            ok: false,
            mensaje: 'Por favor comuniquese con el administrador'
        });
    }
}

//Ver usuario por mail
const eliminarUsuarioEmail = async ( req , resp = response ) => {    
    const { email } = req.body;
    try {      
        const userDb = await User.findOne( { email } );
        if ( !userDb ){
            return resp.status(400).json({
                borrado: false,
                mensaje: 'El usuario no se encuentra en la BD'
            });
        }        
        const usuarios = await User.deleteOne({email});
        return resp.json({
            mensaje: 'Usuario eliminado...'
        });       
    } catch (error) {        
        console.log(error);
        return resp.status(500).json({
            ok: false,
            mensaje: 'Por favor comuniquese con el administrador'
        });        
    }
}



module.exports = {
    verUsuarios,
    nuevoUsuario,
    loginUsuario,
    verUsuarioEmail,
    eliminarUsuarioEmail,
    validacionUsuario
}