try {
    // Traigo la estructura del "nodo" del HTML con el ID = "productos" que es un DIV
    const form = document.getElementById("formulario");

    const locomotoras = document.getElementById('locomotoras');
    let contador = 0;
    let roster;


    // Como no tenemos la vision de poder modificar el JSON y mi trabajo puede dar de alta o baja realizo una copia de los dos repositorios
    // JSON y localStorage y los comparo, si hay diferencias trabajo con localStorage y si no con JSON.
    // A futuro se podria tener una variable en localStorage que si se ha modificado o ingresado info se trabaje con este repositorio
    // Roster de archivo JSON
    try {
    fetch('../api/api_roster.json')
        .then(response => response.json())
        .then(rosterJSON => compararRosters(rosterJSON))

    } catch (err) {
        alert(`Error detectado:
        ${err.name}
        ${err.message} 
        ${err.stack}`);
    }
    function compararRosters(rosterJSON) {
        // Roster de localStorage
        let rosterLS = JSON.parse(localStorage.getItem("roster")) || []
        console.log("Storage: " + rosterLS);

        if (rosterLS != rosterJSON) {
            roster = rosterLS;
            // Recorro el objeto para presentar los resultados en HTML con el innerHTML
            roster.forEach(el => {

                locomotoras.innerHTML +=
                    `
                    <div class="col" id="card-${contador}">
                        <div class="card h-40"> 
                            <img src="${el.imagen}" class="card-img-top" alt="...">
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

                                <a href="#" class="btn btn-primary" onclick="borrarCard(${contador})">Borrar Card</a>
                            </div>
                        </div>
                    </div>
                    `
                contador++;
            })
        } else {
            roster = rosterJSON;
            let i = 0;
            for (let i = 0; i < roster.length; i++) {
            const element = roster[i];
                
            
            locomotoras.innerHTML +=
            `
            <div class="col" id="card-${contador}">
                <div class="card h-40"> 
                    <img src="${element.imagen}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${element.modelo}</h5>
                        <p class="card-text">Tipo: ${element.tipo}</p>
                        <p class="card-text">Nro locomotora: ${element.nro}</p>
                        <p class="card-text">Marca: ${element.marca}</p>
                        <p class="card-text">Fecha Compra: ${element.fechaCompra}</p>
                        <p class="card-text">Sistema: ${element.dcc}</p>
                        <p class="card-text">Dir DCC: ${element.dir_dcc}</p>
                        <p class="card-text">Compañia: ${element.cia}</p>
                        <p class="card-text">Costo: u$${element.costo}</p>
                        <p class="card-text">Precio: u$${element.precio}</p>

                        <a href="#" class="btn btn-primary" onclick="borrarCard(${contador})">Borrar Card</a>
                    </div>
                </div>
            </div>
            `
        }
        }
        return roster
    }



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


} catch (err) {
    alert(`Error detectado:
     ${err.name}
     ${err.message} 
     ${err.stack}`);
}
