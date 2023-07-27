let grupoTarjetas = [['🐰', '🦊'], ['🐻', '🐼'], ['🐭', '🐶']];
let movimientos = 0;
let nivelActual = 0;
let niveles = [
    {
        tarjetas: grupoTarjetas[0],
        movimientosMax: 3
    },
    {
        tarjetas: grupoTarjetas[0].concat(grupoTarjetas[1]),
        movimientosMax: 8
    },
    {
        tarjetas: grupoTarjetas[0].concat(grupoTarjetas[1], grupoTarjetas[2]),
        movimientosMax: 12
    }
];

function barajarTarjetas(tarjetas) {
    let totalTarjetas = tarjetas.concat(tarjetas);
    let resultado = totalTarjetas.sort(function () {
        return 0.5 - Math.random();
    });

    return resultado;
}

function repartirTarjetas(tarjetas) {

    let mesa = document.querySelector('#mesa');
    let tarjetasBarajadas = barajarTarjetas(tarjetas);

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
    let tarjetasPendientes;
    let totalDescubiertas = document.querySelectorAll(".descubierta:not(.acertada)");

    if (totalDescubiertas.length > 1) {
        return;
    }

    this.classList.add("descubierta");

    document.querySelector("#sonCarta").cloneNode().play();

    descubiertas = document.querySelectorAll(".descubierta:not(.acertada)");
    if (descubiertas.length > 2) {
        return;
    } else if (descubiertas.length == 2) {
        comparar(descubiertas);
        actualizarMovimientos();
        tarjetasPendientes = document.querySelectorAll(".tarjeta:not(.acertada)")
    }

    if (tarjetasPendientes.length == 0) {
        setTimeout(() => {
            document.querySelector(".mesa").classList.add("novisible");
        }, 1000);
        setTimeout(finalizar, 900);
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
    document.querySelector("#sonAcierto").play();
}

function error(tarjetasAComparar) {
    tarjetasAComparar.forEach(function (elemento) {
        elemento.classList.add("error");
    })

    document.querySelector("#sonError").play();

    setTimeout(function () {
        tarjetasAComparar.forEach(function (elemento) {
            elemento.classList.remove("descubierta");
            elemento.classList.remove("error");
        })
    }, 1000);
}

let cronometro;
function iniciarCronometro() {
    let segundos = 10;
    let minutos = 0;
    let segTexto;
    let minTexto;

    function actualizarContador() {

        segundos--;
        if (segundos < 0) {
            segundos = 59;
            minutos--;
        }
        if (minutos < 0) {
            segundos = 0;
            minutos = 0;
            clearInterval(cronometro);
        }

        segTexto = segundos;
        minTexto = minutos;

        if (segundos < 10) {
            segTexto = '0' + segundos;
        }
        if (minutos < 10) {
            minTexto = '0' + minutos;
        }

        document.querySelector("#minutos").innerText = minTexto;
        document.querySelector("#segundos").innerText = segTexto;

    }

    cronometro = setInterval(actualizarContador, 1000);
}

function actualizarMovimientos() {
    let movTexto;
    movimientos++;
    movTexto = movimientos;

    if (movimientos > niveles[nivelActual].movimientosMax) {
        gameOver();
        return;
    }

    if (movimientos < 10) {
        movTexto = "0" + movimientos;
    }
    document.querySelector("#mov").innerText = movTexto;
}

function maxContador() {
    let movMaxTexto = niveles[nivelActual].movimientosMax;

    if (movMaxTexto < 10) {
        movMaxTexto = "0" + movMaxTexto;
    }

    document.querySelector("#movTotal").innerText = movMaxTexto;
}

function finalizar() {
    clearInterval(cronometro);
    document.querySelector(".header").classList.add("novisible");
    if (nivelActual < niveles.length - 1) {
        document.querySelector("#subeNivel").classList.add("visible");
    } else {
        document.querySelector("#feedback").classList.add("visible");
    }

}

function subirNivel() {
    nivelActual++;
}

function actualizarNivel() {
    let nivelTexto = nivelActual + 1;
    if (nivelTexto < 10) {
        nivelTexto = "0" + nivelTexto;
    }
    document.querySelector("#nivel").innerText = nivelTexto;
}

function cargarNivel() {
    subirNivel();
    actualizarNivel();
    iniciar();
}

function gameOver() {
    document.querySelector("#gameOver").classList.add("visible");
}