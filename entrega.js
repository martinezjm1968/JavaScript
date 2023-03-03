// Ejercicio para el ingreso de datos desde una página. Valido el nro de DNI y consulto si es OK el resto de info.
// Una vez ingresada la información puedo ofrecer diferentes opciones según la edad y sexo.

// Defino un capturador de errores por si tuviera alguno y me lo muestre específicamente. Muchas veces el F12
// no muestra correctamente el tipo de error.
try {

    // Declaro la clase Cliente
    class Cliente {
        constructor(id, nombre, apellido, dni, edad, sexo, pais, mail, importe, monto, interes) {
            this.id = id;
            this.nombre = nombre;
            this.apellido = apellido;
            this.dni = dni;
            this.edad = edad;
            this.sexo = sexo;
            this.pais = pais;
            this.mail = mail;
            this.importe = importe;
            this.monto = monto;
            this.interes = interes;
        }

        // Determino el CUIL con el DNI y Sexo
        cuil() {
            let primerDato = 0;
            let cuil;
            let verificador;

            // console.log(this.dni);

            // Los dos primeros dígitos
            if (this.sexo == "Masculino") {
                primerDato = 20;
            } else {
                primerDato = 27;
            }
            // Calculo el verificador
            cuil = String(primerDato) + String(this.dni);

            // Para dividir una línea larga selecciono y presiono ALT-Z
            verificador = ((Number(cuil[0]) * 5) + (Number(cuil[1] * 4)) + (Number(cuil[2] * 3)) + (Number(cuil[3] * 2)),
                (Number(cuil[4]) * 7) + (Number(cuil[5] * 6)) + (Number(cuil[6] * 5)) + (Number(cuil[7] * 4)),
                (Number(cuil[8]) * 3) + (Number(cuil[9] * 2)));

            let z = (parseInt(verificador)) % 11;
            if (z == 0) {
                verificador = 0
            } else {
                verificador = 11 - Number.isInteger(verificador);
                if (verificador == 10) {
                    verificador = 1;
                }
            }
            cuil = String(primerDato) + "-" + String(this.dni) + "-" + String(verificador);
            // console.log(cuil);
            return cuil;
        }
    }

    // Declaro la clase ControCliente
    class ControlCliente {

        constructor() {
            this.listaClientes = []
        }

        agregarCliente(cliente) {
            this.listaClientes.push(cliente)
        }


    }




    // Declaracion de variables
    let id;
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
    let cond = 1;
    let cancela = false;
    let existeDNI;

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

    ////////////////////////////////////////////////////////////////////////////////////////////

    // Programa para ingreso de datos y validaciones
    // Valido nombre y apellido

    // Instancio la clase 
    const controlCliente = new ControlCliente()
    while (cond == 1) {


        while (cancela == false) {

            do {
                nombre = prompt("Nuevo Cliente" + "\nIngrese el nombre:");
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
                    x = isNaN(dni);
                    cancela = cancelar(x, " ");
                    // Si apreto el boton de cancel salgo del ingreso de datos
                    if (cancela == true) {
                        cond = 0;
                        break;
                    } else {
                        cond = 1;
                        alert("El DNI ingresado NO es válido! \nDebe ingresar un DNI mayor a 6.000.000 y menor a 100.000.000");
                    }
                }
            } while (cond == 1);

            // Si cancelo lo saco del ingreso de datos
            if (cancela == true) {
                break;
            }

            // Existe DNI?
            if (controlCliente.listaClientes.length > 0) {
                existeDNI = controlCliente.listaClientes.find(element => Number(element.dni) === Number(dni))
                //alert(existeDNI);
                if (existeDNI != undefined) {
                    alert("El DNI ingresado ya existe! Se cancela el ingreso de datos de este cliente.");
                    break;
                }
            }


            // Valido edad
            cond = 0;
            do {
                edad = parseInt(prompt("Ingrese la edad:"));
                if (edad > 10 && edad < 100) {
                    cond = 0;
                } else {
                    // Si apreto el boton de cancel salgo del ingreso de datos
                    x = isNaN(edad);
                    cancela = cancelar(x, " ");
                    if (cancela == true) {
                        cond = 0;
                        break;
                    } else {
                        alert("La edad no es válida! \nPor favor, ingrese una edad válida.");
                        cond = 1;
                    }
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
                if ((sexo.charAt(0).toUpperCase() == "M" && sexo.charAt(1).toUpperCase() == "A") || (sexo.charAt(0).toUpperCase() == "F" && sexo.charAt(1).toUpperCase() == "E")) {
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
                importe = prompt("Ingrese Monto Solicitado:");
                if (importe > 0) {
                    interes = Number(importe) * 0.30;
                    monto = Number(importe) + Number(interes);
                    cond = 0;
                } else {
                    alert("Usted ha cancelado el ingreso de datos!");
                    cond = 1;
                }
            } while (cond == 1);

            // Calculo el ID del nuevo cliente
            id = Number(controlCliente.listaClientes.length) + 1;
            // console.log(id);
            // Agrego cliente nuevo

            controlCliente.agregarCliente(new Cliente(id, nombre, apellido, dni, edad, sexo, pais, mail, importe, monto, interes))

        }
        let seguir = "S";
        if (cond == 0 || cancela == true) {
            seguir = prompt("Desea ingresar más Clientes (S/N): ");
            if (seguir == "S" || seguir == "s") {
                cond = 1;
                cancela = false;
            } else {
                controlCliente.listaClientes.forEach(element => {
                    alert(`Los datos ingresados son:
                    ID Cliente: ${element.id}
                    Nombre y apellido: ${element.nombre}, ${element.apellido}
                    DNI: ${element.dni} 
                    CUIL: ${element.cuil()}
                    Nacionalidad: ${element.pais}
                    Edad: ${element.edad} 
                    Sexo: ${element.sexo} 
                    E-Mail: ${element.mail}
                    Monto Solicitado: $${element.importe}
                    Interes calculado: $${element.interes}
                    Monto A Devolver: $${element.monto}`);
                });
                break
            }
        } else {
            controlCliente.listaClientes.forEach(element => {
                alert(`Los datos ingresados son:
                ID Cliente: ${element.id}
                Nombre y apellido: ${element.nombre}, ${element.apellido}
                DNI: ${element.dni} 
                CUIL: ${element.cuil()}
                Nacionalidad: ${element.pais}
                Edad: ${element.edad} 
                Sexo: ${element.sexo} 
                E-Mail: ${element.mail}
                Monto Solicitado: $${element.importe}
                Interes calculado: $${element.interes}
                Monto A Devolver: $${element.monto}`);
            });
            break
        }
    }
    alert("Fin Ingreso de Datos!");
}
// ReferenceError
catch (err) {
    alert(`Error detectado: 
${err.name}
${err.message} 
${err.stack}`);
}
