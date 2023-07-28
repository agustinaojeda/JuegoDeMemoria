let grupoTarjetas = [['🐰', '🦊'], ['🐻', '🐼'], ['🐭', '🐶', '🐸', '🐷']];
let movimientos = 0;
let modoRelax = false;
let nivelActual = 0;
let niveles = [
    {
        tarjetas: grupoTarjetas[0],
        movimientosMax: 4,
        tiempoMax: 10
    },
    {
        tarjetas: grupoTarjetas[0].concat(grupoTarjetas[1]),
        movimientosMax: 12,
        tiempoMax: 15
    },
    {
        tarjetas: grupoTarjetas[0].concat(grupoTarjetas[1], grupoTarjetas[2]),
        movimientosMax: 20,
        tiempoMax: 40
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
    let segundos = niveles[nivelActual].tiempoMax;
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
            timeOver();
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

    if (movimientos > niveles[nivelActual].movimientosMax && !modoRelax) {
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
    clearInterval(cronometro);
    document.querySelector("#gameOver").classList.add("visible");
}

function timeOver() {
    document.querySelector("#timeOver").classList.add("visible");
}

let verNivel = false;
function escribirNiveles() {
    let menuNiveles = document.querySelector(".seleccionaNivel ul");

    niveles.forEach(function (elemento, indice) {
        let controlNivel = document.createElement("li");
        controlNivel.innerHTML = "<button class='nivel' data-nivel=" +
            indice + ">Nivel " + (indice + 1) + "</button>";
        menuNiveles.appendChild(controlNivel);
    })
}

function cambiarNivel() {
    let nivel = parseInt(this.dataset.nivel);
    nivelActual = nivel;
    actualizarNivel();
    iniciar();
    let verNivel = false;
}


function mostrarMenuNiveles(evento) {
    evento.stopPropagation();
    document.querySelector(".seleccionaNivel").classList.toggle("visible");
    verNivel = true;
}

function ocultarMenuNiveles() {
    document.querySelector(".seleccionaNivel").remove("visible");
    verNivel = false;
}

function clickFueraDeMenu(evento) {
    if (evento.target.closest(".seleccionaNivel")) {
        return;
    }
    if (verNivel) {
        document.querySelector(".seleccionaNivel").classList.remove("visible");
        verNivel = false;
    }

}

function teclaEscCierraMenu(evento) {
    if (evento.key === "Escape") {
        ocultarMenuNiveles();
    }
}