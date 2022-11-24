const { Router } = require('express');
const { verVehiculos } = require('../controllers/vehiculo_controller');
const router = Router();

router.get( '/ver', verVehiculos );


module.exports = router;

