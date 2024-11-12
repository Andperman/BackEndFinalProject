const puppeteer = require("puppeteer");

// Función para extraer la información de cada anuncio
const extractProductData = async (url, browser) => {
    try {
        const productData = {}; // Creamos un objeto vacío para almacenar los datos de cad anuncio
        const page = await browser.newPage(); // Abrimos una nueva pestaña
        // Accedemos al link de cada producto que nos llega por parámetros
        await page.goto(url)

        // // Extraemos los datos de cada anuncio
        // productData['title'] = await page.$eval('#projects > div:nth-child(1) > div.project-header > h2 > span > a > span', title => title.innerText);
        // // // productData['description'] = await page.$eval("")
       // Espera a que el selector esté presente
       productData['title'] = await page.$eval("#productName > h1", name => name.innerHTML.trim().replace(/\n+/g, ' ').replace(/\s+/g, ' '));
       productData['description'] = await page.$eval("#app > div > div.container.main > section > section > div > section > article:nth-child(1) > div.expander.js-expander-passed", description => description.innerText.slice(0,200).trim().replace(/\n+/g, ' ').replace(/\s+/g, ' ') + '...');
       productData['date'] = await page.$eval("#productName > p", data => data.innerHTML.trim().replace(/\n+/g, ' ').replace(/\s+/g, ' '));
       productData['website'] = await page.url();
       

       await page.close();
      


        return productData; 

    } catch (err) {
        return { error: err }; 
    }
};
// Función para realizar el scraping de Workana
const scrap = async (url) => {
    try {
      // Creamos un array vacío scrapedData donde almacenaremos la información obtenida del scraping (se alamcenan los objetos)
      const scrapedData = []
      // inicializamos una instancia del navegador (browser) con puppeteer.launch() y añadimos en el objeto de configuración la opción headless
      console.log("Opening the browser......");
      const browser = await puppeteer.launch({headless:true})

      // Abrimos una nueva pestaña en el navegador creando una instancia con el método newPage() a la que llamaremos page
      const page = await browser.newPage();
      // Indicamos la url que debe cargarse en la pestaña con page.goto(url)
      await page.goto(url);
      console.log(`Navigating to ${url}...`);

      // Extraemos todos los links a los que luego navegaremos para obtener el detalle de cada producto

      // Utilizamos el método $$eval(selector, callback) para capturar una colección de nodos y aplicar la lógica que necesitemos
      // En este caso , en el CB filtramos el array de items, guardando en un nuevo array

      /********** A RELLENAR page.$eval(selector, function)  *********/
      const tmpurls = await page.$$eval("h2.project-title a", links => links.map(a => a.href));

      
    //   const tmpurls = await page.$$eval("#projects > div:nth-child(1) > div.project-header > h2 > span > a" , link => link.map (a => a.href))
      //Quitamos los duplicados
      const urls = await tmpurls.filter((link,index) =>{ return tmpurls.indexOf(link) === index})

      console.log("url capuradas",urls)
      // Me quedo con los 20 primeros productos, porque sino es muy largo
      const urls2 = urls.slice(0, 10);

      for(productLink in urls2){
        const product = await extractProductData(urls2[productLink],browser)
        scrapedData.push(product)
    }
    
    console.log(scrapedData, "Lo que devuelve mi función scraper", scrapedData.length) 
   
    // cerramos el browser con el método browser.close
    await browser.close()
    // Devolvemos el array con los productos
    return scrapedData;

    } catch (err) {
        console.log("Error:", err);
    }
};
// Exportar la funcion de scraping
exports.scrap = scrap;

//Función extraer la informacion de cada aanuncio
const getFreelancerJobData = async (url, browser) => {
    try {
        const jobData = {}; // Creamos un objeto vacío para almacenar los datos de cada trabajo freelance
        const page = await browser.newPage(); // Abrimos una nueva pestaña
        // Accedemos al link de cada trabajo que nos llega por parámetros
        await page.goto(url)

        // Extraemos los datos de cada trabajo freelance
        jobData['title'] = await page.$eval("#app > div > div > div.flex-fill.mb-2.mb-0.mr-md-4.mt-md-0.p-5 > h1", title => title.innerHTML.trim().replace(/\n+/g, ' ').replace(/\s+/g, ' '));
        jobData['description'] = await page.$eval("#app > div > div > div.flex-fill.mb-2.mb-0.mr-md-4.mt-md-0.p-5 > div.pt-4.pb-4 > div.profile-detail-text", description => description.innerText.slice(0,250).trim().replace(/\n+/g, ' ').replace(/\s+/g, ' ') + '...');
        jobData['date'] = await page.$eval("#app > div > div > div.flex-fill.mb-2.mb-0.mr-md-4.mt-md-0.p-5 > div:nth-child(5) > div > div:nth-child(1) > div.flex-fill", data => data.innerHTML);
        jobData['website'] = await page.url();
       
        await page.close();

        return jobData; // Devolvemos los datos extraídos de cada trabajo freelance

    } catch (err) {
        return { error: err }; 
    }
};

// Función para realizar el scraping de soyFreelancer
const scrapeFreelancerJobs = async (url) => {
    try {
      const scrapedData = []; // Array vacío para almacenar los datos de los trabajos freelance
      const browser = await puppeteer.launch({ headless: true }); // Inicializamos el navegador
      console.log("Opening the browser......");

      const page = await browser.newPage(); // Abrimos una nueva página
      await page.goto(url); // Cargamos la URL proporcionada
      console.log(`Navigating to ${url}...`);

      // Extraemos los links de los trabajos freelance
      const tmpurls = await page.$$eval("h2.jobSubTitle a", links => links.map(a => a.href));

      // Quitamos los duplicados
      const urls = tmpurls.filter((link, index) => tmpurls.indexOf(link) === index);
      console.log("URLs capturadas", urls);

      // Limitar a los primeros 10 trabajos freelance para evitar largos tiempos de carga
      const urls2 = urls.slice(0, 10);

      // Iteramos sobre las URLs de los trabajos freelance y extraemos los datos de cada uno
      for (let jobLink of urls2) {
          const job = await getFreelancerJobData(jobLink, browser);  // Llamamos a la función getFreelancerJobData para cada URL
          scrapedData.push(job);
      }

      console.log(scrapedData, "Datos obtenidos de los trabajos freelance", scrapedData.length);

      await browser.close(); // Cerramos el navegador

      return scrapedData; // Devolvemos los datos obtenidos

    } catch (err) {
        console.log("Error:", err);
    }
};

// Exportar la funcion de scraping
exports.scrapeFreelancerJobs = scrapeFreelancerJobs;



