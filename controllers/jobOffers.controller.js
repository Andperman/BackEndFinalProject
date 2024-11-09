//const JobOffer = require('../models/jobOffers.model');//interacción con los favoritos?
const jobOffersService = require('../services/jobOffers.service');

// CREATE
const createJobOffer = async (req, res) => {
    console.log(req.body);

    try {
        const data = req.body;
        let answer = await jobOffersService.createJobOffer(data);
        res.status(201).json({
            message: "Job Offer created successfully",
            data: answer
        });

    } catch (error) {
        console.log(`ERROR: ${error.stack}`);
        res.status(400).json({ msj: `ERROR: ${error.stack}` });
    }
}

// READ
const getAllJobOffers = async (req, res) => {
    try {
        const JobOffers = await jobOffersService.getAllJobOffers();
        res.status(200).json(JobOffers); // Respuesta de la API para 1 JobOffer
    }
    catch (error) {
        console.log(`ERROR: ${error.stack}`);
        res.status(400).json({ msj: `ERROR: ${error.stack}` });
    }
}

// UPDATE
const updateJobOffer = async (req, res) => {

    try {
        const editedJobOffer = await jobOffersService.editJobOffer(req.params.id, req.body);//el id lo coge por param en la ruta
        if (editedJobOffer) {
            res.status(200).json({
                "jobOffer_updated": editedJobOffer.title,
                data: editedJobOffer
            });
        }
    }
    catch (error) {
        console.log(`ERROR: ${error.stack}`);
        res.status(400).json({ msj: `ERROR: ${error.stack}` });
    }

}

// DELETE
const deleteJobOffer = async (req, res) => {
    try {
        const deletedJobOffer = await jobOffersService.deleteJobOffer(req.params.id);//borramos por id en ruta
        if (deletedJobOffer) {
            res.status(200).json({
                message: `Job Offer: ${deletedJobOffer.title} deleted`
            });
        }
    }
    catch (error) {
        console.log(`ERROR: ${error.stack}`);
        res.status(400).json({ msj: `ERROR: ${error.stack}` });
    }

}

module.exports = {
    createJobOffer,
    getAllJobOffers,
    updateJobOffer,
    deleteJobOffer
}