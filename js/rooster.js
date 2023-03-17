try {
    // Alta de items al rooster

    // Forma abreviada!
    let roster = JSON.parse(localStorage.getItem("roster")) || []

    console.log("Storage: " + roster)

    const form = document.getElementById("formulario")


    form.addEventListener("submit", (e) => {

        e.preventDefault()

        // Primer radio button "Tipo de Locomotora"
        let tipoLoco = document.querySelector('input[name="tipo"]:checked');

        tipoLoco? console.log("Tipo Locomotora: " + tipoLoco.value) : console.log('No hay ninún elemento activo')
        ///////////////
        const id = roster.length
        const tipo = tipoLoco.value
        // Debería buscar si ya tengo alguna con ese tipo y rechazar el ingreso
        // En base al tipo de acá para abajo debería tener tantos campos de c/descr como cantidades
        const cantidad = document.getElementById("cantidad").value
        // En base a cantidad abrir el abanico
        const modelo = document.getElementById("modelo").value
        const nro = document.getElementById("nro").value
        const marca = document.getElementById("marca").value
        const fechaCompra = document.getElementById("fechaCompra").value
        const imagen = document.getElementById("imagen").value

        // Compañia

        let cia_ = document.querySelector('input[name="cia"]:checked');
        cia_ ? console.log("Compañia: " + cia_.value) : console.log('No hay ninún elemento activo')

        // Sistema

        let dcc_ = document.querySelector('input[name="dcc"]:checked');
        dcc_ ? console.log("DCC?: " + dcc_.value) : console.log('No hay ninún elemento activo')

        const cia = cia_.value
        const dcc = dcc_.value
        const dir_dcc = document.getElementById("dir_dcc").value
        const costo = document.getElementById("costo").value
        const precio = document.getElementById("precio").value

        roster.push({ id: id, tipo: tipo, modelo: modelo, nro: nro, marca: marca, cantidad: cantidad, fechaCompra: fechaCompra, imagen: imagen, dcc: dcc, dir_dcc: dir_dcc, cia: cia, costo: costo, precio: precio })

        const rosterJSON = JSON.stringify(roster)

        localStorage.setItem("roster", rosterJSON)

        form.reset()

        console.log(roster)
    })

// Rutina que muestra los errores en pantalla. Podría a futuro codificarlos y guardarlos.
} catch (err) {
    alert(`Error detectado:
     ${err.name}
     ${err.message} 
     ${err.stack}`);
}

