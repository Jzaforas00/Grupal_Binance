var listadoCryptos = [];
var paginaActual = 1;

// Al cargar la página, asigna los datos del localStorage a listadoCryptos si están disponibles
if (localStorage.getItem('cryptosData')) {
    listadoCryptos = JSON.parse(localStorage.getItem('cryptosData'));
}

// Función para restaurar el listado original
function restaurarListadoOriginal() {
    if (localStorage.getItem('cryptosData')) {
        window.location.reload();
    } else {
        // Si no hay datos en el localStorage, se puede realizar una llamada a la API
        fetchDataFromAPI();
    }
}

// Función para ordenar el listado por cambio de precio de las últimas 24 horas de mayor a menor
function ordenarPorCambioPrecioMayor() {
    listadoCryptos.sort((a, b) => b.priceChange - a.priceChange);
    mostrarCryptosPagina(paginaActual);
}
// Función para ordenar el listado por cambio de precio de las últimas 24 horas de menor a mayor
function ordenarPorCambioPrecioMenor() {
    listadoCryptos.sort((a, b) => a.priceChange - b.priceChange);
    mostrarCryptosPagina(paginaActual);
}

// Función para filtrar el listado por un símbolo concreto
function filtrarPorSimbolo() {
    const filtro = document.getElementById('filtrar-simbolo').value.trim().toUpperCase();
    if (filtro === '') {
        // Si no hay filtro, restaurar el listado original
        restaurarListadoOriginal();
    } else {
        const cryptosFiltradas = listadoCryptos.filter(crypto => crypto.symbol.toUpperCase().includes(filtro));
        listadoCryptos = cryptosFiltradas;
        paginaActual = 1; // Establecer el número de página actual a 1 después de filtrar
        mostrarCryptosPagina(paginaActual);
    }
}
