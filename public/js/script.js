// ------------------- MENÚ HAMBURGUESA -------------------
if (document.querySelector("#openMenu")) {
    let openMenu = document.querySelector("#openMenu");
    let closeMenu = document.querySelector("#closeMenu");

    openMenu.addEventListener('click', function () {
        console.log("CLICK")
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
        console.log(search);
    });
}



// PINTAR RESULTADOS DE BÚSQUEDA EN EL DOM
// Se hace una parte en el front porque hay que acceder al DOM
const paintOffers = async () => {
    // Ejemplo de lo que recibiríamos (borrar):
    let example = [
        {
            title: "Se busca a Bolito",
            description: "Bolito es el mejor freelancer. Te necesitamos Bolito :(",
            date: "12/10/24",
            url: "www.ejemplo.com"
        },
        {
            title: "Necesitamos freelancer con experiencia",
            description: "Blablabla ejemplo balsdnashdjafhans nlasdkjsakd",
            date: "15/10/24",
            url: "www.ejemplo.com"
        }
    ]

    // Pintar resultados
    let section = document.querySelector("#divResults");
    section.innerHTML = "";
    example.forEach(result => {
        section.innerHTML += `
            <article class="offerArticle">
                <div>
                    <h2>${result.title}</h2>
                    <div class="divStars">
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                    </div>
                </div>
                <div>
                    <ul>
                        <li>${result.title}</li>
                        <li>${result.date}</li>
                        <li>${result.url}</li>
                    </ul>
                    <button id="viewOffer">VIEW OFFER</button>
                </div>
            </article>
        `
    })
}
