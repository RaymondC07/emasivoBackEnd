const  mongoose = require("mongoose");


const dbConnetion = async() =>{

    try {

        await mongoose.connect(
            process.env.MDB_CNX
        );
        console.log('Base de datos en línea');
        
    } catch (error) {

        console.log(error);
        throw new Error('Base de datos no inicializada...');
        
    }
}



module.exports = {
    dbConnetion
}