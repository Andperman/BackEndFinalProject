// ------------------- MENÚ HAMBURGUESA -------------------
if (document.querySelector("#openMenu")) {
    let openMenu = document.querySelector("#openMenu");
    let closeMenu = document.querySelector("#closeMenu");

    openMenu.addEventListener('click', function () {
        openMenu.classList.add("hidden");
        closeMenu.classList.remove("hidden");
    });

    closeMenu.addEventListener('click', function () {
        closeMenu.classList.add("hidden");
        openMenu.classList.remove("hidden");
    });
}


// ------------------- POP UPS -------------------

if (document.querySelector("#popupSignUp")) {
    // Mostrar/Ocultar Sign Up -------
    let popupSignup = document.querySelector('#popupSignUp');

    document.querySelector('#signup').onclick = function () {
        popupSignup.style.display = 'block';
    };

    document.querySelector('#closePopupSignUp').onclick = function () {
        popupSignup.style.display = 'none';
    };

    // Mostrar/Ocultar Login -------
    let popupLogin = document.querySelector('#popupLogin');

    document.querySelector('#login').onclick = function () {
        popupLogin.style.display = 'block';
    };

    document.querySelector('#closePopupLogin').onclick = function () {
        popupLogin.style.display = 'none';
    };
}

if (document.querySelector("#popupAddOffer")) {
    // Mostrar/Ocultar Create Job Offer -------
    let popupAddOffer = document.querySelector('#popupAddOffer');

    document.querySelector('#addOffer').onclick = function () {
        popupAddOffer.style.display = 'block';
    };

    document.querySelector('#closePopupAddOffer').onclick = function () {
        popupAddOffer.style.display = 'none';
    };
}

// Ocultar/Desocultar favoritos
// if (document.querySelector(".offerArticle")) {
//     console.log("hola")
//     let heartEmpty = document.getElementsByClassName("heartButton");
//     let heartFull = document.getElementsByClassName("heartButtonFull");
//     heartEmpty.addEventListener('click', function () {
//         heartEmpty.classList.add("hidden");
//         heartFull.classList.remove("hidden");
//     });
// }




// if (document.querySelector("#logOut")) {
//     // Mostrar/Ocultar Create Job Offer -------
//     let btnLogOut = document.querySelector('#logOut');

//     btnLogOut.onclick = function () {
//         popupAddOffer.style.display = 'block';
//     };

// }



// // Cerrar popup si se hace click fuera -------
// window.onclick = function (event) {
//     if (event.target == popupSignup) {
//         popupSignup.style.display = 'none';
//     }
//     if (event.target == popupLogin) {
//         popupLogin.style.display = 'none';
//     }
//     if (event.target == popupAddOffer) {
//         popupAddOffer.style.display = 'none';
//     }
// };

// FORMULARIO DE BÚSQUEDA
if (document.querySelector('#formResults')) {
    let form = document.querySelector('#formResults');

    form.addEventListener('submit', (event) => {
        event.preventDefault(); // PARALIZA EL ENVÍO DEL FORMULARIO
        let search = event.target.elements.search.value.trim();
        paintOffers(search);
    });
}
// OFERTAS EN DASHBOARD

if (document.querySelector('#divDashboard')) {
    let section = document.querySelector('#divDashboard');

    section.innerHTML = `
    
    `

    // article.homeArticle
    //                 h2 Oferta de trabajo
    //                 ul
    //                     li Description
    //                     li URL
    //                     li Date
    //                 if scrapping
    //                     button
}

let favoritesUser;

// OBTENER FAVORITOS DE UN USUARIO CONCRETO
const getFavorites = async () => {
    // -- Fetch a SQL para obtener ID del User

    // OBTENER FAVORITOS DEL USUARIO
    // Fetch a SQL para obtener los favoritos del User
    let responseSQL = await fetch('/api/favorites/1')
    favoritesUser = await responseSQL.json();
    console.log(favoritesUser);
    return favoritesUser;
}

// HOME
// PINTAR RESULTADOS DE BÚSQUEDA EN EL DOM
const paintOffers = async (search) => {
    await getFavorites()

    // PINTAR OFERTAS DE MONGODB
    // Realizar la solicitud a la API
    const responseMongo = await fetch('/api/joboffers');
    // Verificar si la respuesta es exitosa
    if (!responseMongo.ok) {
        throw new Error(`Error HTTP: ${responseMongo.status} - ${responseMongo.statusText}`);
    }
    const dataMongo = await responseMongo.json();
    // Transformamos el string que busca el cliente en un array
    let arraySearch = search.split(' ');
    // Iteramos el array de palabras de búsqueda
    arraySearch.forEach(wordSearch => {
        // Iteramos el array que recibimos por Mongo buscando coincidencias entre ellos
        dataFiltered = dataMongo.filter(offer => {
            return offer.title.toLowerCase().split(' ').some(word => word.includes(wordSearch.toLowerCase())) || offer.description.toLowerCase().split(' ').some(word => word.includes(wordSearch.toLowerCase()))
        });
    })

    // Pintar resultados
    let section = document.querySelector("#divResults");
    section.innerHTML = "";
    dataFiltered.forEach(result => {
        section.innerHTML += `
            <article class="offerArticle">
                <div>
                    <div>
                        <div>
                            <h2 id=${result._id}>${result.title}</h2>
                            <p class="date">${result.date}</p>
                        </div>
                        <div class="divStars">
                            <button class="heartButtonFull hidden" id="${result._id}"><i class="fa-solid fa-heart"></i></button>
                            <button class="heartButtonEmpty" id="${result._id}"><i class="fa-regular fa-heart"></i></button>
                        </div>
                    </div>
                    <div>
                        <p>${result.description}</p>
                    </div>
                </div>
                <div>
                    <a href="${result.website}" class=viewOfferButton>VIEW OFFER</a>
                </div>
                
            </article>
        `
    })
    // Interacción con botones de favorito
    let heartEmptyButtons = document.getElementsByClassName("heartButtonEmpty");
    let heartFullButtons = document.getElementsByClassName("heartButtonFull");

    // CREAR FAVORITO
    for (let i = 0; i < heartEmptyButtons.length; i++) {
        // Vacío -> Lleno
        heartEmptyButtons[i].addEventListener('click', async () => {
            heartEmptyButtons[i].classList.add("hidden");
            heartFullButtons[i].classList.remove("hidden");
            // Sacar el ID de mongo de ese elemento
            let idMongo = heartEmptyButtons[i].getAttribute('id');
            // Sacar el título de Mongo
            let h2 = document.getElementById(`${idMongo}`);
            let titleMongo = h2.innerHTML;
            // Coger datos cookie

            await fetch('/api/favorites', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    user_id: 1,
                    mongo_title: `${titleMongo}`,
                    mongo_id: `${idMongo}`
                })
            })
            //Refrescar favoritos
            await getFavorites();
        });

        // Lleno -> Vacío
        heartFullButtons[i].addEventListener('click', async () => {
            heartFullButtons[i].classList.add("hidden");
            heartEmptyButtons[i].classList.remove("hidden");
        });
    }
    // BORRAR FAVORITO
    for (let i = 0; i < heartFullButtons.length; i++) {
        // Vacío -> Lleno
        heartFullButtons[i].addEventListener('click', async () => {
            heartFullButtons[i].classList.add("hidden");
            heartEmptyButtons[i].classList.remove("hidden");
            // Cogemos el ID de mongo del botón en el que estemos
            let idMongo = heartFullButtons[i].getAttribute('id');
            console.log("ID de Mongo (string) : " + idMongo)
            // Recorrer array de favoritos del user y buscar el que coincida con idMongo
            let favoriteToDelete = favoritesUser.filter(favorite => favorite.mongo_id === idMongo);
            console.log(favoriteToDelete)
            let idFavoriteNum = favoriteToDelete[0].favorite_id;
            console.log(typeof idFavoriteNum);
            console.log(idFavoriteNum)
            let idFavoriteString = idFavoriteNum.toString()
            console.log("Favorito para borrar:" + idFavoriteString)
            // let favoritesFromUser = await fetch('/api/favorites/1')
            // let favoritesUser = await responseSQL.json();

            // Coger datos cookie
            // Fetch a Api para borrar favorito de ese usuario
            await fetch(`/api/favorites/${idFavoriteNum}`, { method: "DELETE" })
            // await fetch(`/api/favorites/15`, {method: "DELETE"})
        });

        // Lleno -> Vacío
        heartFullButtons[i].addEventListener('click', async () => {
            heartFullButtons[i].classList.add("hidden");
            heartEmptyButtons[i].classList.remove("hidden");
        });
    }
}

// DASHBOARD
// PINTAR OFERTAS CREADAS POR EL ADMIN
const paintOffersInDashboard = async () => {
    // PINTAR OFERTAS DE MONGODB
    // Realizar la solicitud a la API
    const responseMongo = await fetch('/api/joboffers');
    // Verificar si la respuesta es exitosa
    if (!responseMongo.ok) {
        throw new Error(`Error HTTP: ${responseMongo.status} - ${responseMongo.statusText}`);
    }
    const dataMongo = await responseMongo.json();
    // Iteramos el array y bsucamos los que no tengan URL
    let dataFiltered = dataMongo.filter(offer => !offer.website);
    console.log(dataFiltered)
    // Pintar resultados
    let section = document.querySelector("#divDashboard");
    section.innerHTML = "";
    dataFiltered.forEach(result => {
        section.innerHTML += `
            <article class="offerArticle">
                <div>
                    <div>
                        <div>
                            <h2 id=${result._id}>${result.title}</h2>
                            <p class="date">${result.date}</p>
                        </div>
                    </div>
                    <div>
                        <p>${result.description}</p>
                    </div>
                </div>                
            </article>
        `
    })
}

// Si estamos en el dashboard, pintar ofertas del admin
if (document.querySelector("#divDashboard")) {
    paintOffersInDashboard();
}