try {
    // Alta de items al rooster

    // Forma abreviada!
    let roster = JSON.parse(localStorage.getItem("roster")) || []

    // Si no hay nada cargado en el rooster lo precargo
    if (roster.length == 0) {
        roster.push({ id: 0, tipo: "Vapor", modelo: "BigBoy", nro: 7310, marca: "Broadway", fechaCompra: "2010/03/01", imagen: "../assets/img/bigboy.png", dcc: "Humo", dir_dcc: 7310, cia: "UP", costo: 400, precio: 850 },
        { id: 1, tipo: "Vapor", modelo: "CabForward", nro: 33, marca: "Broadway", fechaCompra: "2011/05/101", imagen: "../assets/img/cab_forward.png", dcc: "Digital", dir_dcc: 7310, cia: "PRR", costo: 450, precio: 900 },
        { id: 2, tipo: "Vapor", modelo: "Y6B", nro: 101, marca: "Broadway", fechaCompra: "2009/10/01", imagen: "../assets/img/y6b.png", dcc: "Humo", dir_dcc: 7310, cia: "PRR", costo: 350, precio: 900 },
        { id: 3, tipo: "Diesel", modelo: "SD90", nro: 2345, marca: "Genesis", fechaCompra: "2011/04/02", imagen: "../assets/img/sd90.png", dcc: "Digital", dir_dcc: 7310, cia: "CSX", costo: 250, precio: 350 },
        { id: 4, tipo: "Vapor", modelo: "AC4400", nro: 564, marca: "Genesis", fechaCompra: "2013/08/09", imagen: "../assets/img/ac4400.png", dcc: "Digital", dir_dcc: 7310, cia: "UP", costo: 270, precio: 400 })
        
        const rosterJSON = JSON.stringify(roster)

        localStorage.setItem("roster", rosterJSON)
        
        
    } 

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

        roster.push({ id: id, tipo: tipo, modelo: modelo, nro: nro, marca: marca, fechaCompra: fechaCompra, imagen: imagen, dcc: dcc, dir_dcc: dir_dcc, cia: cia, costo: costo, precio: precio })

        const rosterJSON = JSON.stringify(roster)

        localStorage.setItem("roster", rosterJSON)

        form.reset()

        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'La Card ha sido creada!',
            showConfirmButton: false,
            timer: 1500
          })
        console.log(roster)
    })

// Rutina que muestra los errores en pantalla. Podría a futuro codificarlos y guardarlos.
} catch (err) {
    alert(`Error detectado:
     ${err.name}
     ${err.message} 
     ${err.stack}`);
}

