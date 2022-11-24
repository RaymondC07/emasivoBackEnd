const express = require('express');
const cors = require('cors');
const { dbConnetion } = require('./db/config');
require('dotenv').config();


//Servicio App Express
const app = express();

//Conección BD
dbConnetion();

//Directorio Público
app.use( express.static( 'public' ) );


//Middleware CORS 
app.use( cors() );

//Middleware lectura del body
app.use( express.json() );


//Rutas
//use middleware express
app.use( '/api/auth', require( './routes/auth' ) );
app.use( '/api/data', require('./routes/vehiculo') );


app.listen( process.env.PORT, () => {
  console.log(`Servidor Arriba, Puerto => ${process.env.PORT}`)
});
