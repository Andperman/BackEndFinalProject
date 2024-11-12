const JobOffer = require('../models/jobOffers.model')

const getAllJobOffers = async (id) => {
            return id
            ? await JobOffer.find({id},'-__v').populate('provider', '-_id -__v') 
            : await JobOffer.find({},'-__v').populate(); //{}

};

const getJobOfferByTitle = async (title) => {
    return await JobOffer.findOne({ title });
};

const getJobOfferById = async (id) => {
    return await JobOffer.findById(id);
};

const createJobOffer = async (JobOfferdata) => {
    const jobOffer = new JobOffer(JobOfferdata);
    return await jobOffer.save();
};
//aqui se pasa el id de objeto mongoDB
const editJobOffer = async (id, data) => {
    return await JobOffer.findByIdAndUpdate(id, data, { new: true });
};

const deleteJobOffer = async (id) => {
    
    return await JobOffer.findByIdAndDelete(id);
};

module.exports = {
    getAllJobOffers,
    getJobOfferByTitle,
    getJobOfferById,
    createJobOffer,
    editJobOffer,
    deleteJobOffer
};