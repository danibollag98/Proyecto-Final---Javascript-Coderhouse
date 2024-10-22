// alert("¡Bienvenido al Programa de Presupuestos de Integraciones!") let
// entrada1 = prompt("Ingrese que integración de ERP quiere sumar a su
// presupuesto, escribiendo el numero correcto del listado: \n1 = API \n2 =
// Tango \n3 = Contabilium  \n4 = Tactica Software");

const integracionesERPconObjetosYArrays = [
    {
        id: 1, //ID unico dentro del array
        nombre: "API", //nombre de la integracion
        tiempo: 5, //medidos en horas
    }, {
        id: 2, //ID unico dentro del array
        nombre: "TANGO", //nombre de la integracion
        tiempo: 9, //medidos en horas
    }, {
        id: 3, //ID unico dentro del array
        nombre: "CONTABILIUM", //nombre de la integracion
        tiempo: 7, //medidos en horas
    }, {
        id: 4, //ID unico dentro del array
        nombre: "TACTICA SOFTWARE", //nombre de la integracion
        tiempo: 10, //medidos en horas
    }
];

let costoPorHoraEnUSD = 80; //  80 U$S/hora
let IVA = 1.21; //multiplicador por el IVA
let tipoDeCambio = 1006.75; //Dolar oficial al 04/10/2024

let costoImplementacion = 0;

let totalPresupuestado = 0;

function acumularCostosPresupuestados(presupuesto) {
    totalPresupuestado = totalPresupuestado + presupuesto;
    return totalPresupuestado
}

function calcularCostoImplementacion(tiempoImplementacion) {
    costoImplementacion = tiempoImplementacion * costoPorHoraEnUSD * tipoDeCambio * IVA;
    costoImplementacion.toFixed(2) //Para redondear a 2 decimales
    return costoImplementacion
}

let integracionesPresupuestadas = [];

let integracionesCanales = [
    {
        id: 6, //ID unico dentro del array
        nombre: "MELI", //nombre de la integracion
        tiempo: 7, //medidos en horas
    }, {
        id: 7, //ID unico dentro del array
        nombre: "BAPRO", //nombre de la integracion
        tiempo: 9, //medidos en horas
    }, {
        id: 8, //ID unico dentro del array
        nombre: "FRAVEGA", //nombre de la integracion
        tiempo: 9, //medidos en horas
    }, {
        id: 9, //ID unico dentro del array
        nombre: "BNA", //nombre de la integracion
        tiempo: 4, //medidos en horas
    }, {
        id: 10, //ID unico dentro del array
        nombre: "MACRO", //nombre de la integracion
        tiempo: 4, //medidos en horas
    }
]

// switch(entrada3){     case "SI":         let entrada4 =
// parseFloat(prompt("Especifique la cantidad de horas necesarias para el
// desarrollo"))         calcularCostoImplementacion(entrada4)         alert("El
// desarrollo Custom de " + entrada4.toString() + " horas tiene un costo de " +
// costoImplementacion.toString() + " AR$, y fue agregada a su presupuesto")
// let integracionCustomPresupuestador = ["Desarrollo Custom",
// entrada4.toString() + " horas", costoImplementacion.toString() + " AR$"];
// integracionesPresupuestadas.push(integracionCustomPresupuestador);
// acumularCostosPresupuestados(costoImplementacion);         break;     case
// "NO":         break;     default:         break; }
// ---------------------------------USER-INTERFACE---------------------------------------------------------
// Eventos UI:
function userInterfaceCalculadorPresupuestos() {
    let erp = parseInt(document.getElementById("txtValor1").innerHTML);
    let meli = document.getElementById("checkBox1").checked;
    let bapro = document.getElementById("checkBox2").checked;
    let fravega = document.getElementById("checkBox3").checked;
    let tiendaBna = document.getElementById("checkBox4").checked;
    let macro = document.getElementById("checkBox5").checked;

    integracionesPresupuestadas = integracionesERPconObjetosYArrays.map(
        function (it) {
            if (it.id == erp && [1, 2, 3, 4].includes(erp)) {
                calcularCostoImplementacion(it.tiempo)
                return {id: it.id, nombre: it.nombre, tiempo: it.tiempo, costoImplementacion: costoImplementacion}
            }
        }
    )
    //Hasta acá solamente se agregó la integración ERP al array del presupuesto.

    let integracionesCanalesPresupuestados = [];

    //logica para agregar las integraciones checked al array para presupuestar

    if (meli == true) {
        let objetoMeli = integracionesCanales.find(it => it.id == 1);
        calcularCostoImplementacion(objetoMeli.tiempo);
        let integracionCosteada = {
            id: objetoMeli.id,
            nombre: objetoMeli.nombre,
            tiempo: objetoMeli.tiempo,
            costoImplementacion: costoImplementacion
        }
        integracionesCanalesPresupuestados.push(integracionCosteada)
    }
    if (bapro == true) {
        let objetoBapro = integracionesCanales.find(it => it.id == 2);
        calcularCostoImplementacion(objetoMeli.tiempo);
        let integracionCosteada = {
            id: objetoBapro.id,
            nombre: objetoBapro.nombre,
            tiempo: objetoBapro.tiempo,
            costoImplementacion: costoImplementacion
        }
        integracionesCanalesPresupuestados.push(integracionCosteada)
    }
    if (fravega == true) {
        let objetoFravega = integracionesCanales.find(it => it.id == 3);
        calcularCostoImplementacion(objetoMeli.tiempo);
        let integracionCosteada = {
            id: objetoFravega.id,
            nombre: objetoFravega.nombre,
            tiempo: objetoFravega.tiempo,
            costoImplementacion: costoImplementacion
        }
        integracionesCanalesPresupuestados.push(integracionCosteada)
    }
    if (tiendaBna == true) {
        let objetoBNA = integracionesCanales.find(it => it.id == 4);
        calcularCostoImplementacion(objetoMeli.tiempo);
        let integracionCosteada = {
            id: objetoBNA.id,
            nombre: objetoBNA.nombre,
            tiempo: objetoBNA.tiempo,
            costoImplementacion: costoImplementacion
        }
        integracionesCanalesPresupuestados.push(integracionCosteada)
    }
    if (macro == true) {
        let objetoMacro = integracionesCanales.find(it => it.id == 5);
        calcularCostoImplementacion(objetoMeli.tiempo);
        let integracionCosteada = {
            id: objetoMacro.id,
            nombre: objetoMacro.nombre,
            tiempo: objetoMacro.tiempo,
            costoImplementacion: costoImplementacion
        }
        integracionesCanalesPresupuestados.push(integracionCosteada)
    }

    integracionesPresupuestadas.concat(integracionesCanalesPresupuestados);

    return console.log(integracionesPresupuestadas)

}

function eventosCalculadorPresupuesto() {
    document.getElementById("btn1").addEventListener("click", userInterfaceCalculadorPresupuestos)
}

eventosCalculadorPresupuesto()
