// Recoger los datos de más de 1000 Cryptos y paginarlas de 50 en 50
function recogerCryptos() {

    // Variables generales
    var cryptoPorPagina = 50;
    var listadoCryptos = [];
    var paginaActual = 1;

    // Elementos del HTML
    var paginaActualSpan = document.getElementById("paginaActual");
    var anteriorBtn = document.getElementById("anteriorBtn");
    var siguienteBtn = document.getElementById("siguienteBtn");
    var paginaInput = document.getElementById("paginaInput");

    // Función para mostrar las cryptos de una página
    function mostrarCryptosPagina(pagina) {
        const inicio = (pagina - 1) * cryptoPorPagina;
        const fin = inicio + cryptoPorPagina - 1;

        const rangoCryptos = listadoCryptos.slice(inicio, fin + 1);

        // Mostrar cada crypto en la página
        rangoCryptos.forEach((crypto) => {
            const simbolo = crypto.symbol;
            const cambio_precio = crypto.priceChange;
            const precio_actual = crypto.lastPrice;

            const cryptoDiv = document.createElement("div");
            cryptoDiv.className = 'crypto';

            // Preparar el modal donde se van a mostrar las crypto
            cryptoDiv.innerHTML = `<h2 class='mt-4'>Crypto: ${simbolo}</h2>` +
                `<strong>Precio actual: </strong>${precio_actual}` +
                `<strong>Cambio de precio:</strong>  ${cambio_precio} <br><br>` +
                `<hr>`;

            // Añadir al listado
            document.appendChild(cryptoDiv);
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

    // Hacer la llamada a la API y mostrar las cryptos de la página actual (inicialmente la primera página)
    var ajax = new XMLHttpRequest();
    ajax.open("GET", "https://api4.binance.com/api/v3/ticker/24hr");

    ajax.onload = function () {
        if (ajax.status == 200) {
            try {
                const data = JSON.parse(ajax.responseText);

                // Actualizar el listado de cryptos
                listadoCryptos = data;

                // Mostrar las cryptos de la página actual (inicialmente la primera página)
                mostrarCryptosPagina(paginaActual);

            } catch (error) {
                console.error("Error al analizar la respuesta:", error);
            }
        }
    };

    ajax.send();
}
