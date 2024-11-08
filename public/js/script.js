// CLICK EN MENÚ = Cambiar icono por otro + Cambiar img Home por texto "Home"
console.log("HOLA")
    // Almacenar la ruta de los 2 iconos en variables
    let openMenu = document.querySelector("#openMenu");
    let closeMenu = document.querySelector("#closeMenu");

    openMenu.addEventListener('click', function () {
        // Cambiar la clase para ocultarlo y sacar la otra
        openMenu.setAttribute("class", "hidden");
        closeMenu.setAttribute("class", "");
    });

    closeMenu.addEventListener('click', function () {
        // Cambiar la clase para ocultarlo y sacar la otra
        closeMenu.setAttribute("class", "hidden");
        openMenu.setAttribute("class", "");
    });