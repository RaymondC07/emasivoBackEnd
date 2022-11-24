const { Router } = require('express');
const { check }  = require('express-validator');
const { nuevoUsuario, loginUsuario, validacionUsuario, verUsuarios, verUsuarioEmail, eliminarUsuarioEmail } = require('../controllers/auth_controller');
const { validarCampos, validarJWT } = require('../middlewares/validadores');

const router = Router();




//Ver Usuarios
router.get( '/ver', verUsuarios );

//Crear Nuevo
router.post( '/nuevo', [
    check('nombre', 'Por favor ingrese su nombre de usuario').notEmpty(),
    check('patio', 'El campo es obligatorio').equals('Patio1'),
    check('email', 'Email Obligatorio').isEmail(),
    check('password', 'Password Obligatorio, El Password debe ser mínimo 8 caracteres, una mayúscula, una minúscula y un caracter especial'
    ).isStrongPassword(),
    validarCampos
], nuevoUsuario);

//Login
router.post( '/', [
    check('email', 'Email Obligatorio').isEmail(),
    check('password', 'Password Obligatorio, El Password debe ser mínimo 8 caracteres, una mayúscula, una minúscula y un caracter especial'
    ).isStrongPassword(),
    validarCampos
]  ,loginUsuario);

//Buscar por email
router.get('/buscar', verUsuarioEmail );


//Eliminar Usuario
router.delete('/eliminar', eliminarUsuarioEmail );

//Validar Token
router.get( '/validacion', validarJWT, validacionUsuario);












module.exports = router;