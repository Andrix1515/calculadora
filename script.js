const costoPorKWh = 0.67;
let electrodomesticos = [];
let consumoMensualTotal = 0;

function agregarElectrodomestico() {
    const nombre = document.getElementById("nombre").value;
    const potencia = parseFloat(document.getElementById("potencia").value);
    const horas = parseFloat(document.getElementById("horas").value);
    const minutos = parseFloat(document.getElementById("minutos").value);
    const dias = parseFloat(document.getElementById("dias").value);

    if (nombre && potencia && horas >= 0 && minutos >= 0 && dias) {
        const horasTotales = horas + minutos / 60;
        const consumoDiario = (potencia / 1000) * horasTotales;
        const consumoMensual = consumoDiario * dias;

        electrodomesticos.push({ nombre, consumoMensual, dias });

        actualizarLista();
        calcularGastoTotal();
    } else {
        alert("Por favor, complete todos los campos correctamente.");
    }
}

function actualizarLista() {
    const lista = document.getElementById("listaElectrodomesticos");
    lista.innerHTML = "";
    electrodomesticos.forEach((electro, index) => {
        const li = document.createElement("li");
        li.textContent = `${electro.nombre}: ${electro.consumoMensual.toFixed(2)} kWh`;
        lista.appendChild(li);
    });
}

function calcularGastoTotal() {
    consumoMensualTotal = electrodomesticos.reduce((total, electro) => total + electro.consumoMensual, 0);
    const precioTotal = consumoMensualTotal * costoPorKWh;

    document.getElementById("gastoTotal").textContent = consumoMensualTotal.toFixed(2);
    document.getElementById("precioTotal").textContent = precioTotal.toFixed(2);
}

function calcularAhorro(reduccion) {
    const precioActual = consumoMensualTotal * costoPorKWh;
    const nuevoPrecio = precioActual * (1 - reduccion);
    const nuevoConsumo = nuevoPrecio / costoPorKWh;
    const ahorroEstimado = precioActual - nuevoPrecio;

    const recomendacionesDiv = document.getElementById("recomendaciones");
    recomendacionesDiv.innerHTML = `<h3>Recomendaciones:</h3>
        <p><strong>Ahorro estimado:</strong> S/. ${ahorroEstimado.toFixed(2)}</p>`;

    electrodomesticos.forEach((electro) => {
        const consumoReducido = (electro.consumoMensual / consumoMensualTotal) * nuevoConsumo;
        const diasPromedio = consumoReducido / electro.consumoMensual * electro.dias;
        const recomendacion = document.createElement("p");
        recomendacion.textContent = `${electro.nombre}: Usa aproximadamente ${diasPromedio.toFixed(
            2
        )} días al mes para ahorrar un ${(reduccion * 100).toFixed(0)}%.`;
        recomendacionesDiv.appendChild(recomendacion);
    });
}
function irAOtraPagina() {
    window.location.href = 'principal.html'; // Cambia 'otra_pagina.html' por la URL o archivo que desees
}
