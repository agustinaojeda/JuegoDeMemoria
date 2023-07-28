function iniciar() {
    movimientos = 0;

    repartirTarjetas(niveles[nivelActual].tarjetas);

    document.querySelector("#mov").innerText = "00"; maxContador();
    document.querySelector(".header").classList.remove("novisible");
    document.querySelector("#feedback").classList.remove("visible");
    document.querySelector("#gameOver").classList.remove("visible");
    document.querySelector("#timeOver").classList.remove("visible");
    document.querySelector("#subeNivel").classList.remove("visible");
    document.querySelector(".mesa").classList.remove("novisible");


    document.querySelectorAll(".tarjeta").forEach(function (elemento) {
        elemento.addEventListener("click", descubrir);
    })

    if (!modoRelax) {
        iniciarCronometro();
    } else {
        document.querySelector("#cronometro").classList.add("cronometroOculto");
    }


}

function reiniciar() {
    nivelActual = 0;
    actualizarNivel();
    iniciar();
}

function iniciarJuegoNormal() {
    modoRelax = false;
    document.querySelector("#bienvenida").classList.remove("visible");
    iniciar();
    document.querySelector(".controlNivel").classList.add("controlOculto");
}

function iniciarJuegoRelax() {
    modoRelax = true;
    document.querySelector("#bienvenida").classList.remove("visible");
    document.querySelector("#cronometro").classList.add("cronometroOculto");
    iniciar();
}