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

// Mostrar/Ocultar Create Job Offer
if (document.querySelector("#popupAddOffer")) {
    let popupAddOffer = document.querySelector('#popupAddOffer');

    document.querySelector('#addOffer').onclick = function () {
        popupAddOffer.style.display = 'block';
    };

    document.querySelector('#closePopupAddOffer').onclick = function () {
        popupAddOffer.style.display = 'none';
    };
}

// Mostrar/Ocultar Create User
if (document.querySelector("#popupAddUser")) {
    let popupAddOffer = document.querySelector('#popupAddUser');

    document.querySelector('#addUser').onclick = function () {
        popupAddUser.style.display = 'block';
    };

    document.querySelector('#closePopupAddUser').onclick = function () {
        popupAddUser.style.display = 'none';
    };
}

// Variable global que declaramos porque la comprobará en distintas funciones
let favoritesUser;

// ------------------- OTRAS INTERACCIONES CON EL USUARIO -------------------

// FORMULARIO DE BÚSQUEDA -> PINTAR OFERTAS
// Listener en el formulario para activar paintOffers(búsqueda)
if (document.querySelector('#formResults')) {
    let form = document.querySelector('#formResults');

    form.addEventListener('submit', (event) => {
        event.preventDefault(); // PARALIZA EL ENVÍO DEL FORMULARIO
        let search = event.target.elements.search.value.trim();
        paintOffers(search);
    });
}

// (FETCH) OBTENER FAVORITOS DE UN USUARIO CONCRETO
const getFavorites = async () => {
    // Falta:
    // -- Comprobar email en la cookie
    // -- Fetch a SQL para obtener ID del User

    // Obtener favoritos del usuario
    // Fetch a SQL para obtener los favoritos del User
    let responseSQL = await fetch('/api/favorites/1')
    favoritesUser = await responseSQL.json();

    return favoritesUser;
}

// (FETCH) OBTENER TODOS LOS USUARIOS
const getAllUsers = async () => {
    let responseSQL = await fetch('/api/user/');
    allUsers = await responseSQL.json();
    return allUsers;
}

// (FETCH) OBTENER TODAS LAS OFERTAS DE MONGO
const getAllOffers = async () => {
    // Obtener lista de ofertas de Mongo
    const responseMongo = await fetch('/api/joboffers');
    // Verificar si la respuesta es exitosa
    if (!responseMongo.ok) {
        throw new Error(`Error HTTP: ${responseMongo.status} - ${responseMongo.statusText}`);
    }
    return await responseMongo.json();
}

// MARCAR/DESMARCAR FAVORITO
const toggleFavorite = async (idMongo, isFavorite) => {
    let titleMongo = document.getElementById(`${idMongo}`).innerHTML;
    // Si no es favorito, crearlo
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
        // Si es favorito, eliminarlo
    } else {
        // Eliminar favorito
        let favoriteToDelete = favoritesUser.find(favorite => favorite.mongo_id === idMongo);
        if (favoriteToDelete) {
            await fetch(`/api/favorites/${favoriteToDelete.favorite_id}`, {
                method: "DELETE"
            });
        }
        getFavorites();
    }

    // Refrescar lista de favoritos
    await getFavorites();
};

// (/) PINTAR TODAS LAS OFERTAS SIN FILTRAR
const paintAllOffers = async () => {
    await getFavorites()
    // Obtener todas las ofertas
    let dataMongo = await getAllOffers();
    // Pintar resultados iniciales
    let section = document.querySelector("#divResults");
    dataMongo.forEach(result => {
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
}

// (/) PINTAR RESULTADOS DE BÚSQUEDA EN EL DOM
const paintOffers = async (search) => {
    await getFavorites()

    // Obtener todas las ofertas
    let dataMongo = await getAllOffers();

    // Transformamos el string que busca el cliente en un array
    let arraySearch = search.split(' '); // ["página", "web"]
    // Iteramos el array de palabras de búsqueda
    arraySearch.forEach(wordSearch => {
        // Iteramos el array que recibimos por Mongo buscando coincidencias entre ellos
        dataFiltered = dataMongo.filter(offer => {
            // Filtrar coincidencias de 1 palabra por título o descripción
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

    // Agregar listeners para cada botón de favorito (vacíos)
    for (let i = 0; i < heartEmptyButtons.length; i++) {
        heartEmptyButtons[i].addEventListener('click', () => {
            toggleFavorite(heartEmptyButtons[i].getAttribute('id'), false);
            heartEmptyButtons[i].classList.add("hidden");
            heartFullButtons[i].classList.remove("hidden");
        });
    }

    // Agregar listeners para cada botón de favorito (llenos)
    for (let i = 0; i < heartFullButtons.length; i++) {
        heartFullButtons[i].addEventListener('click', () => {
            toggleFavorite(heartFullButtons[i].getAttribute('id'), true);
            heartFullButtons[i].classList.add("hidden");
            heartEmptyButtons[i].classList.remove("hidden");
        });
    }
}

// (/favorites) PINTAR SÓLO FAVORIOS DE UN USUARIO CONCRETO
const paintFavorites = async () => {
    // Obtener los ids de favoritos del usuario
    let favoritesUser = await getFavorites();
    console.log(favoritesUser)

    // Obtener todas las ofertas
    let dataMongo = await getAllOffers();

    // Filtrar en todas las ofertas las que coincidan con los ids de favoritos
    const favorites = dataMongo.filter(offer =>
        favoritesUser.some(favorite => favorite.mongo_id === offer._id)
    );

    // Pintar resultados
    let section = document.querySelector("#divFavorites");
    section.innerHTML = "";
    favorites.forEach(result => {
        //Comprobamos si cada oferta está en los favoritos del user (para ocultar/desocultar el corazón)
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

        // Agregar listeners para cada botón de favorito (vacíos)
        for (let i = 0; i < heartEmptyButtons.length; i++) {
            heartEmptyButtons[i].addEventListener('click', () => {
                // Mandamos el id a la función toggleFvorite()
                toggleFavorite(heartEmptyButtons[i].getAttribute('id'), false);
                heartEmptyButtons[i].classList.add("hidden");
                heartFullButtons[i].classList.remove("hidden");
                paintFavorites();
            });
        }
        // Agregar listeners para cada botón de favorito (llenos)
        for (let i = 0; i < heartFullButtons.length; i++) {
            heartFullButtons[i].addEventListener('click', () => {
                toggleFavorite(heartFullButtons[i].getAttribute('id'), true);
                heartFullButtons[i].classList.add("hidden");
                heartEmptyButtons[i].classList.remove("hidden");
                paintFavorites();
            });
        }
    })
}

// (/users) PINTAR TODOS LOS USUARIOS
const paintAllUsers = async () => {
    let users = await getAllUsers();
    // Pintar resultados
    let section = document.querySelector("#divAllUsers");
    section.innerHTML = "";
    users.forEach(user => {
        section.innerHTML += `
            <article class="usersArticle">
                <div id="divImg">
                    <img src="../assets/img_prueba.jpg" alt="">
                </div>
                <div>
                    <h2>${user.username}</h2>
                    <ul>
                        <li>${user.email}</li>
                        <li>*********</li>
                    </ul>
                    <div>
                        <button class="eraseUser" id="${user.email}"><i class="fa-solid fa-trash"></i></button>
                    </div>
                </div>
            </article>
        `
    })

    // Event listener para borrar un user concreto
    let eraseUser = document.getElementsByClassName('eraseUser');
    for (let i = 0; i < eraseUser.length; i++) {
        eraseUser[i].addEventListener('click', async () => {
            let email = eraseUser[i].getAttribute('id')
            await fetch(`/api/user/email?email=${email}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            paintAllUsers();
        })
    }
}

// (/dashboard) PINTAR SÓLO OFERTAS CREADAS POR EL ADMIN
const paintOffersInDashboard = async () => {

    /// Obtener todas las ofertas
    let dataMongo = await getAllOffers();

    // Iteramos el array y bsucamos los que estén hechas por el admin
    let dataFiltered = dataMongo.filter(offer => offer.createdBy === "admin");

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
                    <div>
                        <button class="eraseOffer" id="${result._id}"><i class="fa-solid fa-trash"></i></button>
                    </div>
                </div>                
            </article>
        `

    })
    // Borrar oferta en concreto
    let eraseOffer = document.getElementsByClassName('eraseOffer');
    for (let i = 0; i < eraseOffer.length; i++) {
        eraseOffer[i].addEventListener('click', async () => {
            let id = eraseOffer[i].getAttribute('id')
            await fetch(`/api/joboffers/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            paintOffersInDashboard();
        })
    }
}


// Si estamos en la home, pintar todas las ofertas
if (document.querySelector("#divResults")) {
   paintAllOffers();
}

// Si estamos en el dashboard, pintar ofertas del admin
if (document.querySelector("#divDashboard")) {
    paintOffersInDashboard();
}
// Si estamos en los favoritos, pintar los favoritos del usuario
if (document.querySelector("#divFavorites")) {
    paintFavorites();
}

// Si estamos viendo todos los users, pintar los users
if (document.querySelector("#divAllUsers")) {
    paintAllUsers();
}