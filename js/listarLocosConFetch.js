
//const fs = require('fs');

// Traigo la estructura del "nodo" del HTML con el ID = "productos" que es un DIV
const locomotoras = document.getElementById('locomotoras');
const form = document.getElementById("formulario");

let rosterDeJson = JSON.parse(localStorage.getItem("roster")) || []

let contador = 0;
// Esto lo hago desde una API, en este caso local!
fetch('../api/api_roster.json')
    .then(response => response.json())
    // Recorro el objeto para presentar los resultados en HTML con el innerHTML
    .then(roster => roster.forEach(el => {
        locomotoras.innerHTML +=
            `
        <div class="col" id="card-${contador}">
            <div class="card h-40"> 
                <img src="${el.imagen}" class="card-img-top" alt="${el.nombre}">
                <div class="card-body">
                    <h5 class="card-title">${el.modelo}</h5>
                    <p class="card-text">Tipo: ${el.tipo}</p>
                    <p class="card-text">Nro locomotora: ${el.nro}</p>
                    <p class="card-text">Marca: ${el.marca}</p>
                    <p class="card-text">Fecha Compra: ${el.fechaCompra}</p>
                    <p class="card-text">Sistema: ${el.dcc}</p>
                    <p class="card-text">Dir DCC: ${el.dir_dcc}</p>
                    <p class="card-text">Compañia: ${el.cia}</p>
                    <p class="card-text">Costo: u$${el.costo}</p>
                    <p class="card-text">Precio: u$${el.precio}</p>

                    <a href="#" class="btn btn-primary" onclick="borrarCard(${contador},${roster})">Borrar Card</a>
                </div>
            </div>
        </div>
        `
        contador++;
    }))
    

// Funcion borrarCard
function borrarCard(id, roster) {
    console.log(id);

    let objetoModificado = roster.find(objeto => objeto.id === id);

    // SweetAlert
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: 'Estas Seguro?',
        text: "No podras deshacerlo!",
        icon: 'Cuidado',
        showCancelButton: true,
        confirmButtonText: 'Si, borrarlo!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            let borrado = roster.splice(id, 1)

            // // Con este contador regenero los índices según el length.
            let i = 0
            roster.forEach(el => {
                el.id = i
                i++
            })

            // Aca borraba del LocalStorage todo y lo volvía a subir
            const rosterJSON = JSON.stringify(roster)

            localStorage.setItem("roster", rosterJSON)

            console.log(roster)
            swalWithBootstrapButtons.fire(
                'Borrado!',
                'Su Card fue borrada',
                'exitosamente'
            )
            setTimeout(() => {
                location.reload()
            }, 3000);


        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire(
                'Cancelado',
                'Su Card no fue modificada :)',
                'error'
            )
        }
    })

    // Esta funcion refresca la pantalla para borrar lo que no quiero dejar

    //    window.location.href = window.location.href;


}

