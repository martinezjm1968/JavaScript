
// La busqueda se realiza sobre el campo modelo por lo que debo ingresar el mismo 
// nombre que se encuentra en localStorage / api

// Leo el estado del boton buscar
let boton = document.getElementById("botonBuscar")
// Traigo lo que pongo en el input buscar en html
let aBuscar = document.getElementById("buscar")
console.log("Modelo a Buscar: " + aBuscar.value)
// Traigo la estructura del "nodo" del HTML con el ID = "productos" que es un DIV
const busquedaResult = document.getElementById('busquedaResult');

boton.addEventListener("click", respuestaClick)

function respuestaClick() {
    // Esto lo hago desde el localStorage
    //let roster = JSON.parse(localStorage.getItem("roster")) || []
    //console.log(roster);

    // Esto lo hago desde una API, en este caso local!
    fetch('../api/api_roster.json')
        .then(response => response.json())
        .then(roster => encontrado(roster))
}



// Hago la búsqueda
function encontrado(roster) {
    let encontrado = roster.find(objeto => objeto.modelo.toLowerCase() == aBuscar.value.toLowerCase());
    //console.log('Resultado encontrado:  + ${JSON.stringfy(encontrado)}')

    if (encontrado) {
        // Me fijo si el objeto "encontrado" esta vacío. 
        busquedaResult.innerHTML +=
            `
                <div class="col">
                    <div class="card h-40"> 
                        <img src="${encontrado.imagen}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${encontrado.modelo}</h5>
                            <p class="card-text">Tipo: ${encontrado.tipo}</p>
                            <p class="card-text">Nro locomotora: ${encontrado.nro}</p>
                            <p class="card-text">Nro locomotora: ${encontrado.marca}</p>
                            <p class="card-text">Fecha Compra: ${encontrado.fechaCompra}</p>
                            <p class="card-text">Sistema: ${encontrado.dcc}</p>
                            <p class="card-text">Dir DCC: ${encontrado.dir_dcc}</p>
                            <p class="card-text">Compañia: ${encontrado.cia}</p>
                            <p class="card-text">Costo: u$${encontrado.costo}</p>
                            <p class="card-text">Precio: u$${encontrado.precio}</p>
                        </div>
                    </div>
                </div>
                `
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No se pudo encontrar!',
            //footer: '<a href="">Why do I have this issue?</a>'
        })
    }
}
