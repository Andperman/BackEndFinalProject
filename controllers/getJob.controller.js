const scraper = require('../utils/scraper') // Importa las funciones de scraping

module.exports = {

    getWorkana: async (req, res) => {
        try {
            const products = await scraper.scrap("https://www.workana.com/jobs?category=it-programming&language=es&page=1"); 
            res.status(200).json(products);

        } catch (error) {
            res.status(404).json({ error: "Error al obtener anuncios de Workana" });
        }
    },

    getSoyFreelancer: async (req, res) => {
        try {
         
            const jobs = await scraper.scrapeFreelancerJobs("https://www.soyfreelancer.com/trabajos-freelance/web"); 
            res.status(200).json(jobs);  // Responde con los datos de los trabajos freelance
    
        } catch (error) {
            res.status(404).json({ error: "Error al obtener anuncios de SoyFreelancer" });
        }
    },
    
    getAllAds: async (req, res) => {
        try {
            // Usamos las funciones scrap y scrapeFreelancerJobs
            const workanaAds = await scraper.scrap("https://www.workana.com/jobs?category=it-programming&language=es&page=1");
            const soyFreelancerAds = await scraper.scrapeFreelancerJobs("https://www.soyfreelancer.com/trabajos-freelance/web");

            // Combina ambos datos
            const allAds = [...workanaAds, ...soyFreelancerAds];
            
            res.status(200).json(allAds); // Obtenemos los anuncios
        } catch (error) {
            res.status(404).json({ error: "Error al obtener todos los anuncios" });
        }
    }
    
};

