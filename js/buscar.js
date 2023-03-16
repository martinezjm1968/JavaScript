try {
    // La busqueda se realiza sobre el campo modelo por lo que debo ingresar el mismo nombre que se encuentra en localStorage

    // Leo el estado del boton buscar
    let boton = document.getElementById("botonBuscar")
    boton.addEventListener("click", respuestaClick)


    function respuestaClick() {

        // Traigo lo que pongo en el input buscar en html
        let aBuscar = document.getElementById("buscar")
        console.log("Modelo a Buscar: " + aBuscar.value)

        let roster = JSON.parse(localStorage.getItem("roster")) || []

        console.log(roster);

        // Hago la búsqueda
        let encontrado = roster.filter(objeto => objeto.modelo == aBuscar.value);
        console.log("Resultado encontrado: " + encontrado);

        if (encontrado) {

            // Traigo la estructura del "nodo" del HTML con el ID = "productos" que es un DIV
            const busquedaResult = document.getElementById('busquedaResult');

            // Recorro el objeto para presentar los resultados en HTML con el innerHTML
            encontrado.forEach(el => {

                busquedaResult.innerHTML +=
                    `
                <div class="col">
                    <div class="card h-40"> 
                        <img src="${el.imagen}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${el.modelo}</h5>
                            <p class="card-text">Tipo: ${el.tipo}</p>
                            <p class="card-text">Nro locomotora: ${el.nro}</p>
                            <p class="card-text">Nro locomotora: ${el.marca}</p>
                            <p class="card-text">Nro locomotora: ${el.cantidad}</p>
                            <p class="card-text">Fecha Compra: ${el.fechaCompra}</p>
                            <p class="card-text">Sistema: ${el.dcc}</p>
                            <p class="card-text">Dir DCC: ${el.dir_dcc}</p>
                            <p class="card-text">Compañia: ${el.cia}</p>
                            <p class="card-text">Costo: ${el.costo}</p>
                            <p class="card-text">Precio: ${el.precio}</p>
                        </div>
                    </div>
                </div>
                `
            })
        }
    }
} catch (err) {
    alert(`Error detectado:
     ${err.name}
     ${err.message} 
     ${err.stack}`);
}
