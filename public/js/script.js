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

if (document.querySelector('#formResults')) {
    let form = document.querySelector('#formResults');

    form.addEventListener('submit', (event) => {
        event.preventDefault(); // PARALIZA EL ENVÍO DEL FORMULARIO
        let search = event.target.elements.search.value.trim();
        paintOffers(search);
    });
}

if (document.querySelector('#formResults')) {
    let form = document.querySelector('#formResults');

    form.addEventListener('submit', (event) => {
        event.preventDefault(); // PARALIZA EL ENVÍO DEL FORMULARIO
        let search = event.target.elements.search.value.trim();
        paintOffers(search);
    });
}


// PINTAR RESULTADOS DE BÚSQUEDA EN EL DOM
// Se hace una parte en el front porque hay que acceder al DOM
const paintOffers = async (search) => {

    // Realizar la solicitud a la API
    const response = await fetch('/api/joboffers');
    // Verificar si la respuesta es exitosa
    if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    // Transformamos el string que busca el cliente en un array
    let arraySearch = search.split(' ');
    // Iteramos el array de palabras de búsqueda
    arraySearch.forEach(wordSearch => {
        // Iteramos el array que recibimos por Mongo buscando coincidencias entre ellos
        dataFiltered = data.filter(offer => {
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
                            <h2>${result.title}</h2>
                            <p class="date">${result.date}</p>
                        </div>
                        <div class="divStars">
                            <button class="heartButtonFull hidden"><i class="fa-solid fa-heart"></i></button>
                            <button class="heartButtonEmpty"><i class="fa-regular fa-heart"></i></button>
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

    for (let i = 0; i < heartEmptyButtons.length; i++) {
        // Vacío -> Lleno
        heartEmptyButtons[i].addEventListener('click', () => {
            heartEmptyButtons[i].classList.add("hidden");
            heartFullButtons[i].classList.remove("hidden");
        });
    
        // Lleno -> Vacío
        heartFullButtons[i].addEventListener('click', () => {
            heartFullButtons[i].classList.add("hidden");
            heartEmptyButtons[i].classList.remove("hidden");
        });
    }
}
