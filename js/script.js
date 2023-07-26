let grupoTarjetas = ["🐰", "🦊", "🐻", "🐼", "🐭", "🐶", "🐱", "🦄"];
let totalTarjetas = grupoTarjetas.concat(grupoTarjetas);

function barajarTarjetas() {
    let resultado = totalTarjetas.sort(function () {
        return 0.5 - Math.random();
    });

    return resultado;
}

function repartirTarjetas() {

    let mesa = document.querySelector('#mesa');
    let tarjetasBarajadas = barajarTarjetas();

    mesa.innerHTML = "";

    tarjetasBarajadas.forEach(function (elemento, indice) {
        let tarjeta = document.createElement("div");

        tarjeta.innerHTML = "<div class='tarjeta' data-valor= " + elemento + ">" + "<div class='tarjetaContenido'>" +
            elemento + "</div>" + "</div>";

        mesa.appendChild(tarjeta);
    })
}

function descubrir() {
    let descubiertas;
    let totalDescubiertas = document.querySelectorAll(".descubierta:not(.acertada)");

    if (totalDescubiertas.length > 1) {
        return;
    }

    this.classList.add("descubierta");

    descubiertas = document.querySelectorAll(".descubierta:not(.acertada)");
    if (descubiertas.length > 2) {
        return;
    } else if (descubiertas.length == 2) {
        comparar(descubiertas);
    }

}

function comparar(tarjetasAComparar) {
    if (tarjetasAComparar[0].getAttribute('data-valor') === tarjetasAComparar[1].getAttribute('data-valor')) {
        acierto(tarjetasAComparar);
    } else {
        error(tarjetasAComparar);
    }
}

function acierto(tarjetasAComparar) {
    tarjetasAComparar.forEach(function (elemento) {
        elemento.classList.add("acertada");
    })
}

function error(tarjetasAComparar) {
    tarjetasAComparar.forEach(function (elemento) {
        elemento.classList.remove("descubierta");
    })
}

repartirTarjetas();

document.querySelectorAll(".tarjeta").forEach(function (elemento) {
    elemento.addEventListener("click", descubrir);
})
