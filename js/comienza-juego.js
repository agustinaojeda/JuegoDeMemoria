escribirNiveles();

document.querySelectorAll(".reiniciar").forEach(function (elemento) {
    elemento.addEventListener("click", reiniciar);
});

document.querySelector("#juegoNormal").addEventListener("click", iniciarJuegoNormal);

document.querySelector("#juegoRelax").addEventListener("click", iniciarJuegoRelax);

document.querySelector("#controlNivel").addEventListener("click", mostrarMenuNiveles);

document.querySelector("#cierraNiveles").addEventListener("click", ocultarMenuNiveles);

document.querySelectorAll(".nivel").forEach(function (elemento) {
    elemento.addEventListener("click", cambiarNivel);
})

document.querySelector("#subir").addEventListener("click", cargarNivel);

document.querySelector("body").addEventListener("click", clickFueraDeMenu);

document.addEventListener("keydown", teclaEscCierraMenu);


document.querySelector("#bienvenida").classList.add("visible");