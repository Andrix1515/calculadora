let electrodomesticos = [];
const costoPorKWh = 0.67;

// Lista de consumos promedio en kWh por mes
const consumoPromedio = {
    "Refrigerador": 30,
    "Televisor": 10,
    "Lavadora": 15,
    "Microondas": 5,
    "Computadora": 8,
    "Aire Acondicionado": 40,
    "Calentador de Agua": 25,
    "Ventilador": 3,
    "Plancha": 6,
    "Horno Eléctrico": 10,
    "Licuadora": 1,
    "Secadora de Ropa": 20,
    "Lavavajillas": 15,
    "Cafetera": 2,
    "Aspiradora": 4,
    "Tostadora": 1,
    "Router Wi-Fi": 3,
    "Lámpara de Escritorio": 1,
    "Hervidor Eléctrico": 3,
    "Consola de Videojuegos": 8,
    "Impresora": 2,
    "Purificador de Aire": 5,
    "Televisor Smart TV": 12,
    "DVD/Blu-Ray": 1,
    "Radio/Parlantes": 2,
    "Congelador": 35

};

function agregarElectrodomestico() {
    const nombre = document.getElementById("nombre").value;
    const potencia = parseFloat(document.getElementById("potencia").value);
    const horas = parseFloat(document.getElementById("horas").value);
    const minutos = parseFloat(document.getElementById("minutos").value);
    const dias = parseFloat(document.getElementById("dias").value);

    if (nombre && potencia && horas >= 0 && minutos >= 0 && dias) {
        const horasTotales = horas + (minutos / 60);
        const consumoDiario = (potencia / 1000) * horasTotales;
        const consumoMensual = consumoDiario * dias;

        electrodomesticos.push({ nombre, consumoMensual });

        actualizarLista();
        limpiarFormulario();
    } else {
        alert("Por favor, complete todos los campos correctamente.");
    }
}

function actualizarLista() {
    const lista = document.getElementById("listaElectrodomesticos");
    lista.innerHTML = '';

    let gastoTotal = 0;
    let ahorroTotal = 0;

    electrodomesticos.forEach((e) => {
        const consumoProm = consumoPromedio[e.nombre] || 0;
        const ahorro = Math.max(0, consumoProm - e.consumoMensual);
        ahorroTotal += ahorro;

        const item = document.createElement("li");
        item.textContent = `${e.nombre}: ${e.consumoMensual.toFixed(2)} kWh (Ahorro estimado: ${ahorro.toFixed(2)} kWh)`;
        lista.appendChild(item);

        gastoTotal += e.consumoMensual;
    });

    document.getElementById("gastoTotal").textContent = gastoTotal.toFixed(2);
    const precioTotal = gastoTotal * costoPorKWh;
    document.getElementById("precioTotal").textContent = precioTotal.toFixed(2);
    document.getElementById("ahorroTotal").textContent = (ahorroTotal * costoPorKWh).toFixed(2);
}

function limpiarFormulario() {
    document.getElementById("nombre").value = '';
    document.getElementById("potencia").value = '';
    document.getElementById("horas").value = '';
    document.getElementById("minutos").value = '';
    document.getElementById("dias").value = '';
}
