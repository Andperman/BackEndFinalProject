const mongoose = require('mongoose');
require('../config/db_mongo') // Conexión a BBDD MongoDB


const objectSchema = {
    companyName: { 
        type: String, 
        required: true,
        unique: true 
    },

    CIF: {
        type: String, 
        required: true,
        unique: true 

    },
    adress: {
        type: String, 
        required: true,
        unique: true 

    },
    website: {
        type: String,
        required: true,
        validate: {
            validator: function(url){
                if(url.indexOf('http') != -1)
                    return true;
                else {
                    return false;
                }
            }, 
            message: "Porfa, introduce una URL válida"
        }
    }
    
}

// Crear el esquema
const jobOfferSchema = mongoose.Schema(objectSchema);
// Crear el modelo
const JobOffer = mongoose.model('JobOffer', jobOfferSchema);

module.exports = JobOffer