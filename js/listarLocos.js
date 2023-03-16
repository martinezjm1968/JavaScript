try {
    let roster = JSON.parse(localStorage.getItem("roster")) || []

    console.log("Storage: " + roster);

    const form = document.getElementById("formulario");

    // Traigo la estructura del "nodo" del HTML con el ID = "productos" que es un DIV
    const locomotoras = document.getElementById('locomotoras');
    let contador = 0;
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
                    <p class="card-text">Cantidad: ${el.cantidad}</p>
                    <p class="card-text">Fecha Compra: ${el.fechaCompra}</p>
                    <p class="card-text">Sistema: ${el.dcc}</p>
                    <p class="card-text">Dir DCC: ${el.dir_dcc}</p>
                    <p class="card-text">Compañia: ${el.cia}</p>
                    <p class="card-text">Costo: ${el.costo}</p>
                    <p class="card-text">Precio: ${el.precio}</p>

                    <a href="#" class="btn btn-primary" onclick="borrarCard(${contador})">Borrar Card</a>
                </div>
            </div>
        </div>
        `
        contador++;
    })

    // Funcion borrarCard
    function borrarCard(id) {
        console.log(id);

        let objetoModificado = roster.find(objeto => objeto.id === id);
        alert("Se borrará el ítem: " + objetoModificado.modelo);

        let borrado = roster.splice(id, 1)

        // Con este contador regenero los índices según el length.
        let i = 0
        roster.forEach(el => {
            el.id = i
            i++
        })


        const rosterJSON = JSON.stringify(roster)

        localStorage.setItem("roster", rosterJSON)

        

        console.log(roster)
        // Esta funcion refresca la pantalla para borrar lo que no quiero dejar
        window.location.href = window.location.href;

    }


} catch (err) {
    alert(`Error detectado:
     ${err.name}
     ${err.message} 
     ${err.stack}`);
}
