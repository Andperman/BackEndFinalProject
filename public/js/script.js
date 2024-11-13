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

// FORMULARIO DE BÚSQUEDA -> PINTAR OFERTAS
if (document.querySelector('#formResults')) {
    let form = document.querySelector('#formResults');

    form.addEventListener('submit', (event) => {
        event.preventDefault(); // PARALIZA EL ENVÍO DEL FORMULARIO
        let search = event.target.elements.search.value.trim();
        paintOffers(search);
    });
}

// Variable global que declaramos porque la comprobará en distintas funciones
let favoritesUser;

// OBTENER FAVORITOS DE UN USUARIO CONCRETO
const getFavorites = async () => {
    // Comprobar email en la cookie
    // -- Fetch a SQL para obtener ID del User

    // OBTENER FAVORITOS DEL USUARIO
    // Fetch a SQL para obtener los favoritos del User
    let responseSQL = await fetch('/api/favorites/1')
    favoritesUser = await responseSQL.json();

    return favoritesUser;
}

// PINTAR SÓLO FAVORIOS DE UN USUARIO CONCRETO
const paintFavorites = async () => {
    // Obtener lista de favoritos del usuario
    let favoritesUser = await getFavorites();
    console.log(favoritesUser)

    // Obtener lista de ofertas de Mongo
    const responseMongo = await fetch('/api/joboffers');
    // Verificar si la respuesta es exitosa
    if (!responseMongo.ok) {
        throw new Error(`Error HTTP: ${responseMongo.status} - ${responseMongo.statusText}`);
    }
    const dataMongo = await responseMongo.json();

    // Iteramos el array de palabras de búsqueda
    const favorites = dataMongo.filter(offer =>
        favoritesUser.some(favorite => favorite.mongo_id === offer._id)
    );


    // Pintar resultados
    let section = document.querySelector("#divFavorites");
    section.innerHTML = "";
    favorites.forEach(result => {
        //Comprobamos si la oferta está en los favoritos del user
        const isFavorite = favoritesUser.some(favorite => favorite.mongo_id === result._id);
        section.innerHTML += `
            <article class="offerArticle">
                <div>
                    <div>
                        <div>
                            <h2 id=${result._id}>${result.title}</h2>
                            <p class="date">${result.date}</p>
                        </div>
                        <div class="divStars">
                            <button class="heartButtonFull ${isFavorite ? '' : 'hidden'}" id="${result._id}">
                                <i class="fa-solid fa-heart"></i>
                            </button>
                            <button class="heartButtonEmpty ${isFavorite ? 'hidden' : ''}" id="${result._id}">
                                <i class="fa-regular fa-heart"></i>
                            </button>
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
        // Interacción con botones de favorito
        const heartEmptyButtons = document.getElementsByClassName("heartButtonEmpty");
        const heartFullButtons = document.getElementsByClassName("heartButtonFull");

        // Agregar listeners para cada botón de favorito
        for (let i = 0; i < heartEmptyButtons.length; i++) {
            heartEmptyButtons[i].addEventListener('click', () => {
                toggleFavorite(heartEmptyButtons[i].getAttribute('id'), false);
                heartEmptyButtons[i].classList.add("hidden");
                heartFullButtons[i].classList.remove("hidden");
            });
        }

        for (let i = 0; i < heartFullButtons.length; i++) {
            heartFullButtons[i].addEventListener('click', () => {
                toggleFavorite(heartFullButtons[i].getAttribute('id'), true);
                heartFullButtons[i].classList.add("hidden");
                heartEmptyButtons[i].classList.remove("hidden");
            });
        }
    })
}

// MARCAR/DESMARCAR FAVORITO
const toggleFavorite = async (idMongo, isFavorite) => {
    let titleMongo = document.getElementById(`${idMongo}`).innerHTML;

    if (!isFavorite) {
        // Añadir favorito
        await fetch('/api/favorites', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user_id: 1,
                mongo_title: titleMongo,
                mongo_id: idMongo
            })
        });
        getFavorites();
    } else {
        // Eliminar favorito
        let favoriteToDelete = favoritesUser.find(favorite => favorite.mongo_id === idMongo);
        if (favoriteToDelete) {
            await fetch(`/api/favorites/${favoriteToDelete.favorite_id}`, { method: "DELETE" });
        }
        getFavorites();
    }

    // Refrescar lista de favoritos
    await getFavorites();
};

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
        //Comprobamos si la oferta está en los favoritos del user
        const isFavorite = favoritesUser.some(favorite => favorite.mongo_id === result._id);
        section.innerHTML += `
            <article class="offerArticle">
                <div>
                    <div>
                        <div>
                            <h2 id=${result._id}>${result.title}</h2>
                            <p class="date">${result.date}</p>
                        </div>
                        <div class="divStars">
                            <button class="heartButtonFull ${isFavorite ? '' : 'hidden'}" id="${result._id}">
                                <i class="fa-solid fa-heart"></i>
                            </button>
                            <button class="heartButtonEmpty ${isFavorite ? 'hidden' : ''}" id="${result._id}">
                                <i class="fa-regular fa-heart"></i>
                            </button>
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
    const heartEmptyButtons = document.getElementsByClassName("heartButtonEmpty");
    const heartFullButtons = document.getElementsByClassName("heartButtonFull");

    for (let i = 0; i < heartEmptyButtons.length; i++) {
        heartEmptyButtons[i].addEventListener('click', () => {
            toggleFavorite(heartEmptyButtons[i].getAttribute('id'), false);
            heartEmptyButtons[i].classList.add("hidden");
            heartFullButtons[i].classList.remove("hidden");
        });
    }

    for (let i = 0; i < heartFullButtons.length; i++) {
        heartFullButtons[i].addEventListener('click', () => {
            toggleFavorite(heartFullButtons[i].getAttribute('id'), true);
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
    // Iteramos el array y bsucamos los que estén hechas por el admin
    let dataFiltered = dataMongo.filter(offer => offer.createdBy === "admin");
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
// Si estamos en los favoritos, pintar los favoritos del usuario
if (document.querySelector("#divFavorites")) {
    paintFavorites();
}