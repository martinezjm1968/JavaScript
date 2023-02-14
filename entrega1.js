// Ejercicio para el ingreso de datos desde una página. Valido el nro de DNI y consulto si es OK el resto de info.
// Una vez ingresada la información puedo ofrecer diferentes opciones según la edad y sexo.

// Defino un capturador de errores por si tuviera alguno y me lo muestre específicamente. Muchas veces el F12
// no muestra correctamente el tipo de error.
try {


    // Declaracion de variables
    let nombre;
    let apellido;
    let dni;
    let edad;
    let sexo;
    let pais;
    let mail;
    let importe;
    let monto;
    let interes;
    let cond = 0;
    let cancela = false;

    // Declaro funciones
    // Determino si cancela o no
    function cancelar(param1, param2) {
        if (param1 == null || param1 == undefined || param2 == null || param2 == undefined) {
            alert("Usted ha cancelado el ingreso de datos");
            return true;
        } else {
            return false;
        }
    }


    // Determino la nacionalidad con el DNI
    function nacionalidad(condicion) {
        if (condicion < 90000000) {
            return "Argentino";
        } else {
            return "Extranjero";
        }
    }

    // Determino el CUIL con el DNI y Sexo
    function cuil(documento, sex) {
        // Los dos primeros dígitos
        if (sex == "Masculino") {
            primerDato = 20;
        } else {
            primerDato = 27;
        }
        // Calculo el verificador
        cuil = String(primerDato) + String(documento);

        // Para dividir una línea larga selecciono y presiono ALT-Z
        verificador = ((Number(cuil[0]) * 5) + (Number(cuil[1] * 4)) + (Number(cuil[2] * 3)) + (Number(cuil[3] * 2)),
            (Number(cuil[4]) * 7) + (Number(cuil[5] * 6)) + (Number(cuil[6] * 5)) + (Number(cuil[7] * 4)),
            (Number(cuil[8]) * 3) + (Number(cuil[9] * 2)));

        z = (parseInt(verificador)) % 11;
        if (z == 0) {
            verificador = 0
        } else {
            verificador = 11 - Number.isInteger(verificador);
            if (verificador == 10) {
                verificador = 1;
            }
        }
        cuil = primerDato + "-" + documento + "-" + String(verificador);
        return cuil;
    }






    ////////////////////////////////////////////////////////////////////////////////////////////

    // Programa para ingreso de datos y validaciones
    // Valido nombre y apellido
    while (cancela == false) {

        do {
            nombre = prompt("Ingrese el nombre:");
            apellido = prompt("Ingrese el apellido:");

            if ((nombre != "" && nombre != null) || (apellido != "" && apellido != null)) {
                cond = 0;
            } else {
                // Si apreto el boton de cancel salgo del ingreso de datos
                cancela = cancelar(nombre, apellido);
                if (cancela == true) {
                    break;
                }
                alert("Debe ingresar nombre y apellido válido!");
                cond = 1;
            }
        } while (cond == 1);

        // Si cancelo lo saco del ingreso de datos
        if (cancela == true) {
            break;
        }

        // Valido DNI
        cond = 0;
        do {
            dni = parseInt(prompt("Ingrese el DNI:"));

            if (dni >= 6000000 && dni < 100000000) {
                cond = 0;

                // Valido nacionalidad
                pais = nacionalidad(dni);

            } else {
                // Si apreto el boton de cancel salgo del ingreso de datos
                x = dni.isNaN;
                cancela = cancelar(x, " ");
                if (cancela == true) {
                    break;
                }
                cond = 1;
                alert("El DNI ingresado NO es válido! \nDebe ingresar un DNI mayor a 6.000.000 y menor a 100.000.000");
            }
        } while (cond == 1);

        // Si cancelo lo saco del ingreso de datos
        if (cancela == true) {
            break;
        }

        // Valido edad
        cond = 0;
        do {
            edad = parseInt(prompt("Ingrese el edad:"));
            if (edad > 10 && edad < 100) {

                cond = 0;
            } else {
                // Si apreto el boton de cancel salgo del ingreso de datos
                x = edad.isNaN;
                cancela = cancelar(x, " ");
                if (cancela == true) {
                    break;
                }                
                alert("La edad no es válida! \nPor favor, ingrese una edad válida.");
                cond = 1;
            }
        } while (cond == 1);

        // Si cancelo lo saco del ingreso de datos
        if (cancela == true) {
            break;
        }

        // Valido sexo y convierto
        cond = 0;
        do {
            sexo = prompt("Ingrese el sexo:");
            sexo = sexo.toUpperCase()

            if ((sexo.charAt(0) == "M" && sexo.charAt(1) == "A") || (sexo.charAt(0) == "F" && sexo.charAt(1) == "E")) {
                if ((sexo.charAt(0) == "M")) {
                    //alert(`El sexo es "Masculino".`);
                    sexo = "Masculino"
                } else {
                    //alert(`El sexo es "Femenino".`);
                    sexo = "Femenino"
                }
                cond = 0;

            } else {
                // Si apreto el boton de cancel salgo del ingreso de datos
                cancela = cancelar(sexo, " ");
                if (cancela == true) {
                    break;
                }
                alert("Debe ingresar Masculino o Femenino");
                cond = 1;
            }
        } while (cond == 1);

        // Si cancelo lo saco del ingreso de datos
        if (cancela == true) {
            break;
        }

        //acá pongo un error para ver si funciona el objeto try - catch. Tengo una variable no definida
        //alert(pepe);

        // Valido mail
        cond = 0;
        do {
            mail = prompt("Ingrese E-Mail:");
            cancela = cancelar(mail, " ");
            if (cancela == true) {
                break;
            }
            existe = mail.search("@");
            if (existe >= 0) {
                cond = 0;
            } else {
                cond = 1;
            }
        } while (cond == 1);

        // Si cancelo lo saco del ingreso de datos
        if (cancela == true) {
            break;
        }

        // Aquí va a ingresar un monto X para poder determinar el porcentaje de interes que se aplica
        cond = 0;
        do {
            importe = prompt("Ingrese Monto:");
            if (importe > 0) {
                interes = Number(importe) * 0.30;
                monto = Number(importe) + Number(interes);
                cond = 0;
            } else {
                alert("Por favor, ingrese un monto mayor a cero!");
                cond = 1;
            }
        } while (cond == 1);

        // Muestro el resultado de los datos ingresados
        alert(`Los datos ingresados son:
        Nombre y apellido: ${nombre.trim()}, ${apellido.trim()}
        DNI: ${dni} 
        CUIL: ${cuil(dni, sexo)}
        Nacionalidad: ${pais}
        Edad: ${edad} 
        Sexo: ${sexo} 
        E-Mail: ${mail}
        Monto Ingresado: $${importe}
        Interes calculado: $${interes}
        Monto final: $${monto}`);
    }
    alert("Fin");

        // ReferenceError
} 
catch (err) {
    alert(`Error detectado: 
${err.name}
${err.message} 
${err.stack}`);
}
