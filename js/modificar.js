try {

    //La busqueda se realiza sobre el campo modelo por lo que debo ingresar el mismo nombre que se encuentra en localStorage

    // Defino la función de búsqueda y mostrar los datos obtenidos para modificar
    function respuestaClick() {
        // Traigo lo que pongo en el input buscar en html
        let aBuscar = document.getElementById("buscar")
        console.log("Modelo a Buscar: " + aBuscar.value)

        // Traigo lo que tengo en el localStorage
        let roster = JSON.parse(localStorage.getItem("roster")) || []
        console.log(roster);

        // Hago la búsqueda
        let encontrado = roster.filter(objeto => objeto.modelo.toLowerCase() == aBuscar.value.toLowerCase());
        console.log("Resultado encontrado: " + encontrado);

        // Si bien encontrado debería ser único lo trato como un array de objeto para facilitar la carga
        if (encontrado) {
            encontrado.forEach(element => {
                // Traigo los input y le paso el valor que tiene guardado en localStorage
                const modelo = document.querySelector('#modelo')
                modelo.value = element.modelo || null
                const nro = document.querySelector('#nro')
                nro.value = element.nro || null
                const marca = document.querySelector('#marca')
                marca.value = element.marca || ""
                const cantidad = document.querySelector('#cantidad')
                cantidad.value = element.cantidad || null
                const fechaCompra = document.querySelector('#fechaCompra')
                fechaCompra.value = element.fechaCompra
                const imagen = document.querySelector('#imagen')
                imagen.value = element.imagen || null
                const dir_dcc = document.querySelector('#dir_dcc')
                dir_dcc.value = element.dir_dcc || null
                const costo = document.querySelector('#costo')
                costo.value = element.costo || null
                const precio = document.querySelector('#precio')
                precio.value = element.precio || null
                // Muestro lo que traen los radio button
                // Tipo de locomotora
                switch (element.tipo) {
                    case "Vapor":
                        document.querySelector('#vapor').checked = true;
                        break;
                    case "Diesel":
                        document.querySelector('#diesel').checked = true;
                        break;
                    case "Vagon":
                        document.querySelector('#vagon').checked = true;
                        break;
                    default:
                        document.querySelector('#electrica').checked = true;
                        break;
                }

                // compañia a la que pertenece
                switch (element.cia) {
                    case "BNSF":
                        document.querySelector('#bnsf').checked = true;
                        break;
                    case "NP":
                        document.querySelector('#np').checked = true;
                        break;
                    case "PRR":
                        document.querySelector('#prr').checked = true;
                        break;
                    case "SP":
                        document.querySelector('#sp').checked = true;
                        break;
                    case "CSX":
                        document.querySelector('#csx').checked = true;
                        break;
                    case "UP":
                        document.querySelector('#up').checked = true;
                        break;
                    case "NB":
                        document.querySelector('#nb').checked = true;
                        break;
                    case "CN":
                        document.querySelector('#cn').checked = true;
                        break;
                    case "NS":
                        document.querySelector('#ns').checked = true;
                        break;

                    default:
                        document.querySelector('#electrica').checked = true;
                        break;
                }

                // Sistema DCC
                switch (element.dcc) {
                    case "Analoga":
                        document.querySelector('#analoga').checked = true;
                        break;
                    case "Digital":
                        document.querySelector('#digital').checked = true;
                        break;
                    case "Sonido":
                        document.querySelector('#sonido').checked = true;
                        break;
                    default:
                        document.querySelector('#humo').checked = true;
                        break;
                }
            });
        }
    }


    //
    //
    // Funcion respuestaSubmit - cuando ingresa los datos modificados los guardo
    function respuestaSubmit() {
        let aBuscar = document.getElementById("buscar")
        console.log("Busco: " + aBuscar.value);
        // Traigo lo que tengo en el localStorage
        let roster = JSON.parse(localStorage.getItem("roster")) || []
        console.log("Roster:" + roster);

        // Primero tengo que buscar en roster lo encontrado 
        // Segundo, actualizo los índices y hago un push de la nueva info ingresada
        
        // Hago la búsqueda y borrado
        let encontrado = roster.filter(objeto => objeto.modelo.toLowerCase() == aBuscar.value.toLowerCase());

        encontrado.forEach(element => {
            let contador = 0
            console.log("Encontrado id: " + element.id);
            // Traigo la info de los inputs para haer un push
            // Primer radio button "Tipo de Locomotora"
            let tipoLoco = document.querySelector('input[name="tipo"]:checked');
            tipoLoco ? console.log("Tipo Locomotora: " + tipoLoco.value) : console.log('No hay ninún elemento activo')
            ///////////////
            const id = roster.length
            const tipo = tipoLoco.value
            const modelo = document.getElementById("modelo").value
            const nro = document.getElementById("nro").value
            const marca = document.getElementById("marca").value
            const cantidad = document.getElementById("cantidad").value
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

            // Borro el que buscaba para darlo de alta
            console.log("Elemento que voy a borrar: " +element.id);
            let borrado = roster.splice(element.id, 1)
            
            // Doy de alta la modificación
            roster.push({ id: id, tipo: tipo, modelo: modelo, nro: nro, marca: marca, cantidad: cantidad, fechaCompra: fechaCompra, imagen: imagen, dcc: dcc, dir_dcc: dir_dcc, cia: cia, costo: costo, precio: precio })
            roster.forEach(element => {
                element.id = contador
                contador++
            });

            const rosterJSON = JSON.stringify(roster)
            localStorage.setItem("roster", rosterJSON)

            console.log(roster)
            
            //window.location.href = window.location.href;

            
        })
    }


    // Leo el estado del boton buscar

    let botonBuscar = document.getElementById("botonBuscar")
    botonBuscar.addEventListener("click", respuestaClick)

    // Leo el botón submit

    let botonSubmit = document.getElementById("botonSubmit")
    botonSubmit.addEventListener("click", respuestaSubmit)



} catch (err) {
    alert(`Error detectado:
     ${err.name}
     ${err.message} 
     ${err.stack}`);
}
