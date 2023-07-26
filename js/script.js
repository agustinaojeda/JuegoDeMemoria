let grupoTarjetas = ["🐰", "🦊", "🐻", "🐼", "🐭", "🐶", "🐱", "🦄"];
let totalTarjetas = grupoTarjetas.concat(grupoTarjetas);

function repartirTarjetas() {

    let mesa = document.querySelector('#mesa');

    mesa.innerHTML = "";

    totalTarjetas.forEach(function (elemento, indice) {
        let tarjeta = document.createElement("div");

        tarjeta.innerHTML = "<div class='tarjeta'>" + "<div class='tarjetaContenido'>" +
            elemento + "</div>" + "</div>";

        mesa.appendChild(tarjeta);
    })
}

function descubrir() {
    this.classList.add("descubierta");
}

repartirTarjetas();

document.querySelectorAll(".tarjeta").forEach(function (elemento) {
    elemento.addEventListener("click", descubrir);
})
