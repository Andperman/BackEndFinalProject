const mongoose = require('mongoose');
require('../config/db_mongo') // Conexión a BBDD MongoDB


const objectSchema = {
    title: {
        type: String,
        required: true,
        unique: false
    },

    description: {
        type: String,
        required: true,
        unique: false

    },
    website: {
        type: String,
        required: false,
        validate: {
            validator: function (url) {
                if (url.indexOf('http') != -1)
                    return true;
                else {
                    return false;
                }
            },
            message: "Please, enter a valid URL"
        }
    },
    date: {
        type: String,
        required: true

    },
    createdBy: {
        type: String,
        required: false
    }

}

// Crear el esquema
const jobOfferSchema = mongoose.Schema(objectSchema);
// Crear el modelo
const JobOffer = mongoose.model('JobOffer', jobOfferSchema);

module.exports = JobOffer