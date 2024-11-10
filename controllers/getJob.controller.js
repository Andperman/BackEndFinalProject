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

   
};
