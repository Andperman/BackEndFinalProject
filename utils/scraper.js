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
       productData['name'] = await page.$eval("#productName > h1", name => name.innerHTML.trim().replace(/\n+/g, ' ').replace(/\s+/g, ' '));
       productData['description'] = await page.$eval("#app > div > div.container.main > section > section > div > section > article:nth-child(1) > div.expander.js-expander-passed", description => description.innerText.slice(0,200).trim().replace(/\n+/g, ' ').replace(/\s+/g, ' ') + '...');
       productData['data'] = await page.$eval("#productName > p", data => data.innerHTML.trim().replace(/\n+/g, ' ').replace(/\s+/g, ' '));
       productData['url'] = await page.url();
       

       await page.close();
      


        return productData; 

    } catch (err) {
        return { error: err }; 
    }
};

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

exports.scrap = scrap;

