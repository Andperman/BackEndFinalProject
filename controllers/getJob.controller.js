const scraper = require('../utils/scraper') // Importa las funciones de scraping

module.exports = {

    getWorkana: async (req, res) => {
        try {
            // ---Descomenta las 2 siguientes líneas para hacer scraping---
            const products = await scraper.scrap("https://www.workana.com/jobs?category=it-programming&language=es&page=1"); 
            res.status(200).json(products);
            // res.status(200).json({"mensaje":"Aquí irán los productos"}); // ---Comenta esta línea---

        } catch (error) {
            res.status(404).json({ error: "Error al obtener anuncios de Workana" });
        }
    },

    getSoyFreelancer: async (req, res) => {
        try {
            // ---Descomenta las 2 siguientes líneas para hacer scraping---
            const jobs = await scraper.scrapeFreelancerJobs("https://www.soyfreelancer.com/trabajos-freelance/web"); 
            res.status(200).json(jobs);  // Responde con los datos de los trabajos freelance
            // res.status(200).json({"mensaje":"Aquí irán los productos"}); // ---Comenta esta línea---
    
        } catch (error) {
            res.status(404).json({ error: "Error al obtener anuncios de SoyFreelancer" });
        }
    },
    
    getAllAds: async (req, res) => {
        try {
            // Usar las funciones de scraper que ya tienes definidas
            const workanaAds = await scraper.scrap("https://www.workana.com/jobs?category=it-programming&language=es&page=1");
            const soyFreelancerAds = await scraper.scrapeFreelancerJobs("https://www.soyfreelancer.com/trabajos-freelance/web");

            // Combina ambos conjuntos de datos
            const allAds = [...workanaAds, ...soyFreelancerAds];
            
            res.status(200).json(allAds); // Responde con los anuncios combinados
        } catch (error) {
            res.status(404).json({ error: "Error al obtener todos los anuncios" });
        }
    }
    
};

