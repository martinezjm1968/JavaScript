
// let roster = JSON.parse(localStorage.getItem("roster")) || []

function traerRoster() {
    // Esto lo hago desde una API, en este caso local!
    fetch('../api/api_roster.json')
        .then(response => response.json())
        .then(roster => roster)
}

let roster = traerRoster()
const form = document.getElementById("formulario");

// Traigo la estructura del "nodo" del HTML con el ID = "productos" que es un DIV
const locomotoras = document.getElementById('locomotoras');
let contador = 0;
// Recorro el objeto para presentar los resultados en HTML con el innerHTML
//roster.forEach(el => {

    locomotoras.innerHTML +=
        `
        <div class="col" id="card-${contador}">
            <div class="card h-40"> 
                <img src="${roster.imagen}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${roster.modelo}</h5>
                    <p class="card-text">Tipo: ${roster.tipo}</p>
                    <p class="card-text">Nro locomotora: ${roster.nro}</p>
                    <p class="card-text">Marca: ${roster.marca}</p>
                    <p class="card-text">Fecha Compra: ${roster.fechaCompra}</p>
                    <p class="card-text">Sistema: ${roster.dcc}</p>
                    <p class="card-text">Dir DCC: ${roster.dir_dcc}</p>
                    <p class="card-text">Compañia: ${roster.cia}</p>
                    <p class="card-text">Costo: u$${roster.costo}</p>
                    <p class="card-text">Precio: u$${roster.precio}</p>

                    <a href="#" class="btn btn-primary" onclick="borrarCard(${contador})">Borrar Card</a>
                </div>
            </div>
        </div>
        `
    contador++;
//})

// Funcion borrarCard
function borrarCard(id) {
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

