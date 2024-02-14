// Variables generales
var cryptoPorPagina = 50;
var listadoCryptos = [];
var paginaActual = 1;

// Elementos del HTML
var paginaActualSpan = document.getElementById("paginaActual");
var anteriorBtn = document.getElementById("anteriorBtn");
var siguienteBtn = document.getElementById("siguienteBtn");
var paginaInput = document.getElementById("paginaInput");
var cryptosContainer = document.getElementById("cryptosContainer");

// Función para mostrar las cryptos de una página
function mostrarCryptosPagina(pagina) {
    cryptosContainer.innerHTML = ''; // Limpiar el contenedor antes de mostrar las cryptos

    const inicio = (pagina - 1) * cryptoPorPagina;
    const fin = inicio + cryptoPorPagina;

    const rangoCryptos = listadoCryptos.slice(inicio, fin);

    // Mostrar cada crypto en la página
    rangoCryptos.forEach((crypto) => {
        const simbolo = crypto.symbol;
        const cambio_precio = crypto.priceChange;
        const precio_actual = crypto.lastPrice;

        const cryptoDiv = document.createElement("div");
        cryptoDiv.className = 'crypto';

        // Preparar el modal donde se van a mostrar las crypto
        cryptoDiv.innerHTML = `
        <li>
            <div class="crypto-info">
                <h3 style="margin-left: 40;">Crypto: ${simbolo}</h3>
                <p>Precio: ${precio_actual}</p>
                <p>Cambio en las últimas 24 horas: ${cambio_precio}</p>
            </div>
        </li>`;

        // Añadir al listado
        cryptosContainer.appendChild(cryptoDiv);
    });

    // Actualizar la información de la página actual
    paginaActualSpan.textContent = `Página ${pagina} de ${Math.ceil(listadoCryptos.length / cryptoPorPagina)}`;

    // Habilitar o deshabilitar los botones de la paginación según sea conveniente
    anteriorBtn.disabled = pagina === 1;
    siguienteBtn.disabled = pagina === Math.ceil(listadoCryptos.length / cryptoPorPagina);
}

// Función para ir a una página específica
function irAPagina() {
    const paginaDeseada = parseInt(paginaInput.value, 10);
    if (!isNaN(paginaDeseada) && paginaDeseada >= 1 && paginaDeseada <= Math.ceil(listadoCryptos.length / cryptoPorPagina)) {
        paginaActual = paginaDeseada;
        mostrarCryptosPagina(paginaActual);
    }
}

// Función para ir a la página anterior
function anteriorPagina() {
    if (paginaActual > 1) {
        paginaActual--;
        mostrarCryptosPagina(paginaActual);
    }
}

// Función para ir a la página siguiente
function siguientePagina() {
    if (paginaActual < Math.ceil(listadoCryptos.length / cryptoPorPagina)) {
        paginaActual++;
        mostrarCryptosPagina(paginaActual);
    }
}

// Obtener los datos almacenados localmente, si existen
var storedData = localStorage.getItem('cryptosData');

if (storedData) {
    listadoCryptos = JSON.parse(storedData);
    mostrarCryptosPagina(paginaActual);
} else {
    // Hacer la llamada a la API solo si no hay datos almacenados
    fetchDataFromAPI();
}

// Función para obtener datos de la API y guardarlos localmente
function fetchDataFromAPI() {
    var ajax = new XMLHttpRequest();
    ajax.open("GET", "https://api4.binance.com/api/v3/ticker/24hr");

    ajax.onload = function () {
        if (ajax.status == 200) {
            try {
                const data = JSON.parse(ajax.responseText);

                // Actualizar el listado de cryptos
                listadoCryptos = data;

                // Guardar los datos en el almacenamiento local
                localStorage.setItem('cryptosData', JSON.stringify(listadoCryptos));

                // Mostrar las cryptos de la página actual (inicialmente la primera página)
                mostrarCryptosPagina(paginaActual);

            } catch (error) {
                console.error("Error al analizar la respuesta:", error);
            }
        }
    };

    ajax.send();
}

// Verificar si han pasado 24 horas desde la última actualización y actualizar si es necesario
var lastUpdateTimestamp = localStorage.getItem('lastUpdateTimestamp');

if (lastUpdateTimestamp) {
    var currentTime = new Date().getTime();
    var timeDiff = currentTime - lastUpdateTimestamp;
    var hoursDiff = timeDiff / (1000 * 3600);

    if (hoursDiff >= 24) {
        // Si han pasado más de 24 horas, actualizar los datos
        fetchDataFromAPI();
        // Actualizar el tiempo de la última actualización
        localStorage.setItem('lastUpdateTimestamp', currentTime);
    }
} else {
    // Si no hay una marca de tiempo, establecer una nueva
    localStorage.setItem('lastUpdateTimestamp', new Date().getTime());
}
