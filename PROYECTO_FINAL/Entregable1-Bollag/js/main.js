
alert("¡Bienvenido al Programa de Presupuestos de Integraciones!")

let entrada1 = prompt("Ingrese que integración de ERP quiere sumar a su presupuesto: API, Tango, Contabilium o Tactica Software").toUpperCase();

let costoPorHoraEnUSD = 80; //  80 U$S/hora
let IVA = 1.21; //multiplicador por el IVA
let tipoDeCambio = 1006.75; //Dolar oficial al 04/10/2024

let tiempoImplementacionAPI = 5; //medido en horas
let tiempoImplementacionTango = 9; //medido en horas
let tiempoImplementacionContabilium = 7; //medido en horas
let tiempoImplementacionTacticaSoftware = 10; //medido en horas

let tiempoImplementacionMeli = 7;
let tiempoImplementacionBapro = 9;
let tiempoImplementacionFravega = 9;
let tiempoImplementacionBna = 4;
let tiempoImplementacionMacro = 4;

let costoImplementacion = 0;

let totalPresupuestado = 0;

function acumularCostosPresupuestados(presupuesto){
    totalPresupuestado = totalPresupuestado + presupuesto;
    return totalPresupuestado
}

function calcularCostoImplementacion(tiempoImplementacion){
    costoImplementacion = tiempoImplementacion * costoPorHoraEnUSD * tipoDeCambio * IVA;
    costoImplementacion.toFixed(2) //Para redondear a 2 decimales
    return costoImplementacion
}


switch (entrada1){
    case "API":
        calcularCostoImplementacion(tiempoImplementacionAPI)
        alert("La integracion " + entrada1 + " fue agregada a su presupuesto");
        break;
    case "TANGO":
        calcularCostoImplementacion(tiempoImplementacionTango)
        alert("La integracion " + entrada1 + " fue agregada a su presupuesto");
        break;
    case "CONTABILIUM":
        calcularCostoImplementacion(tiempoImplementacionContabilium)
        alert("La integracion " + entrada1 + " fue agregada a su presupuesto");
        break;
    case "TACTICA SOFTWARE":
        calcularCostoImplementacion(tiempoImplementacionTacticaSoftware)
        alert("La integracion " + entrada1 + " fue agregada a su presupuesto");
        break;
}
acumularCostosPresupuestados(costoImplementacion);
let integracionesPresupuestadas = [];
let integracionErpPresupuestador = ["ERP", entrada1, costoImplementacion.toString() + " AR$"]
integracionesPresupuestadas.push(integracionErpPresupuestador)

let canales = ["MELI","BAPRO", "FRAVEGA", "BNA", "MACRO"]

let entrada2 = prompt("Ingrese que integracion de marketplace quiere sumar a su presupuesto: Meli, Bapro, Fravega, BNA, Macro").toUpperCase();    

do{
    
    switch (entrada2){
        case "MELI":
            calcularCostoImplementacion(tiempoImplementacionMeli)
            alert("La integracion " + entrada2 + " fue agregada a su presupuesto");
            
            break;
        case "BAPRO":
            calcularCostoImplementacion(tiempoImplementacionBapro)
            alert("La integracion " + entrada2 + " fue agregada a su presupuesto");
            
            break;
        case "FRAVEGA":
            calcularCostoImplementacion(tiempoImplementacionFravega)
            alert("La integracion " + entrada2 + " fue agregada a su presupuesto");
            
            break;
        case "BNA":
            calcularCostoImplementacion(tiempoImplementacionBna)
            alert("La integracion " + entrada2 + " fue agregada a su presupuesto");
            
            break;
        case "MACRO":
            calcularCostoImplementacion(tiempoImplementacionMacro)
            alert("La integracion " + entrada2 + " fue agregada a su presupuesto");
            
            break;
        default:
            alert("Como se introdujo un valor incorrecto, se decidió finalizar el presupuesto")
            break
    }
    let integracionCanalPresupuestador = ["Canal", entrada2, costoImplementacion.toString() + " AR$"]
    integracionesPresupuestadas.push(integracionCanalPresupuestador)
    acumularCostosPresupuestados(costoImplementacion);
    entrada2 = prompt("Ingrese que integracion de marketplace quiere sumar a su presupuesto: Meli, Bapro, Fravega, BNA, Macro").toUpperCase();    
}while(canales.includes(entrada2))

let entrada3 = prompt("¿Querés un desarrollo custom? Escribir SI o NO").toUpperCase();


switch(entrada3){
    case "SI":
        let entrada4 = parseFloat(prompt("Especifique la cantidad de horas necesarias para el desarrollo"))
        calcularCostoImplementacion(entrada4)
        alert("El desarrollo Custom de " + entrada4.toString() + " horas tiene un costo de " + costoImplementacion.toString() + " AR$, y fue agregada a su presupuesto")
        let integracionCustomPresupuestador = ["Desarrollo Custom", entrada4.toString() + " horas", costoImplementacion.toString() + " AR$"];
        integracionesPresupuestadas.push(integracionCustomPresupuestador);
        acumularCostosPresupuestados(costoImplementacion);
        break;
    case "NO":
        break;
    default:
        break;
}

alert("El presupuesto se ha generado correctamente. Puede abrir la consola para ver el presupuesto");

function mostrarTituloEnConsola(){
    return console.log("PRESUPUESTO GENERADO")
}

function mostrarPresupuestoEnconsolaEnTabla(){
    return console.table(integracionesPresupuestadas); //Figura tabulado el presupuesto
}

function mostrarTotalPresupuestado(){
    let mensajeFinal = "El presupuesto total es de " + totalPresupuestado + " ARS";
    return console.log(mensajeFinal)
}

mostrarTituloEnConsola()
mostrarPresupuestoEnconsolaEnTabla()
mostrarTotalPresupuestado()