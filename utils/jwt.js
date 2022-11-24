const jwt = require('jsonwebtoken');

const crearJwt = ( id, nombre )=>{

    const payload = { id, nombre };

    return  new Promise( (resolve, reject) =>  {

        jwt.sign( payload, process.env.JWT_SECRET_SEED,{
            expiresIn: '2h'
        }, ( err, jtoken ) => {

            if (err){

                reject(err);
                console.log(err);

            }else{

                resolve( jtoken );

            }

        });  
    });


}

module.exports = {
    crearJwt
}