function iniciar() {
    movimientos = 0;

    repartirTarjetas(niveles[nivelActual].tarjetas);

    document.querySelector("#mov").innerText = "00"; maxContador();
    document.querySelector(".header").classList.remove("novisible");
    document.querySelector("#feedback").classList.remove("visible");
    document.querySelector("#gameOver").classList.remove("visible");
    document.querySelector("#subeNivel").classList.remove("visible");
    document.querySelector(".mesa").classList.remove("novisible");

    document.querySelectorAll(".tarjeta").forEach(function (elemento) {
        elemento.addEventListener("click", descubrir);
    })

    iniciarCronometro();
}

function reiniciar() {
    nivelActual = 0;
    actualizarNivel();
    iniciar();
}

iniciar();

document.querySelector("#reiniciar").addEventListener("click", reiniciar);

document.querySelectorAll(".reiniciar1").forEach(function (elemento) {
    elemento.addEventListener("click", iniciar);
})

document.querySelector("#subir").addEventListener("click", cargarNivel);