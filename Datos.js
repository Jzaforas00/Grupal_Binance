// FunciÃ³n para mostrar los detalles de una criptomoneda
function mostrarDetallesCrypto(crypto) {
    const simbolo = crypto.symbol;
    const cambioPrecio = crypto.priceChange;
    const precioActual = crypto.lastPrice;
    const fechaApertura = new Date(crypto.openTime).toLocaleString();
    const fechaCierre = new Date(crypto.closeTime).toLocaleString();

    const detallesMensaje = `
        Crypto: ${simbolo}<br><br>
        Precio actual: ${precioActual}<br><br>
        Cambio de precio: ${cambioPrecio}<br><br>
        Fecha de apertura: ${fechaApertura}<br><br>
        Fecha de cierre: ${fechaCierre}
    `;

    const detallesCrypto = document.getElementById("detalles");
    detallesCrypto.innerHTML = detallesMensaje;
    document.documentElement.scrollTop = 0;
}

function mostrarDetalles(simbolo) {
    const cryptoSeleccionada = listadoCryptos.find(crypto => crypto.symbol === simbolo);

    if (cryptoSeleccionada) {
        mostrarDetallesCrypto(cryptoSeleccionada);
    }
}

function borrarDetalles(){
   const divInfo =  document.getElementById("detalles");
   divInfo.innerText="";
}
