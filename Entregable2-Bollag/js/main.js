let costoPorHoraEnUSD = 80; //  80 U$S/hora
let IVA = 1.21; //multiplicador por el IVA
let tipoDeCambio = 1006.75; //Dolar oficial al 04/10/2024

let costoImplementacion = 0;

let ERPs = [
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
// ---------------------------------USER-INTERFACE---------------------------------------------------------
// Eventos UI:

let integracionesPresupuestadas = [];

let presupuestosGuardados = []; //Acá se van a guardar los presupuestos que ingrese el usuario

//Objeto de cada presupuesto:
class presupuestos {
    static numeroPresupuesto = 1;
    constructor() {
        this.numero = presupuestos.numeroPresupuesto++;
        this.costo_Total;
        this.costo_Integraciones_Nativas;
        this.costo_Desarrollo_Custom;
    }
}

function guardarPresupuesto(pCosto_Total, pCosto_Integraciones_Nativas, pCosto_Desarrollo_Custom) {
    let nuevoPresupuesto = new presupuestos();
    nuevoPresupuesto.costo_Total = `AR$ ${pCosto_Total}`;
    nuevoPresupuesto.costo_Integraciones_Nativas = `AR$ ${pCosto_Integraciones_Nativas}`;
    nuevoPresupuesto.costo_Desarrollo_Custom = `AR$ ${pCosto_Desarrollo_Custom}`;
    presupuestosGuardados.push(nuevoPresupuesto);
}

function verCostoTotalDelUltimoPresupuesto(lista){
    let costoTotalUltimoPresupuesto = 0;
    for (let i = lista.length - 1; i <= lista.length - 1; i++){
        let costo = lista[i];
        if (costo !== undefined) {
            costoTotalUltimoPresupuesto = costo.costo_Total
        };
    }
    return costoTotalUltimoPresupuesto
}

function verCostoIntegracionesNativasUltimoPresupuesto(lista) {
    let costoIntegracionesNativasUltimoPresupuesto = 0;
    for (let i = lista.length - 1; i <= lista.length - 1; i++) {
        let costo = lista[i];
        if (costo !== undefined) {
            costoIntegracionesNativasUltimoPresupuesto = costo.costo_Integraciones_Nativas;
        }
    }
    return costoIntegracionesNativasUltimoPresupuesto;
}

function verCostoDesarrolloCustomUltimoPresupuesto(lista){
    let CostoDesarrolloCustomUltimoPresupuesto = 0;
    for(let i = lista.length -1 ; i<=lista.length -1; i++){
        let costo = lista[i];
        if (costo !== undefined){
            CostoDesarrolloCustomUltimoPresupuesto = costo.costo_Desarrollo_Custom
        }
    }
    return CostoDesarrolloCustomUltimoPresupuesto
}

function verTodosLosPresupuestosGuardados(lista){
    let mostrar = "";
    for(let i= 0; i<lista.length; i++){
        let presupuesto = lista[i];
        mostrar += `<div class="alert alert-info"> <br>
                    Presupuesto ${presupuesto.numero} <br>
                    El costo total es de: ${presupuesto.costo_Total} <br>
                    El costo de las integraciones nativas es de: ${presupuesto.costo_Integraciones_Nativas}. <br>
                    El costo del desarrollo custom es de: ${presupuesto.costo_Desarrollo_Custom} <br></div>`
    }
    return mostrar;
}

function guardarDatosLocalStorage(pCosto_Total, pCosto_Integraciones_Nativas, pCosto_Desarrollo_Custom) {
    localStorage.costo_Total = pCosto_Total;
    localStorage.costo_Integraciones_Nativas = pCosto_Integraciones_Nativas;
    localStorage.costo_Desarrollo_Custom = pCosto_Desarrollo_Custom;
}

function recuperarDatosLocalStorage() {
    if ((localStorage.costo_Total !== undefined) && (localStorage.costo_Integraciones_Nativas !== undefined) && localStorage.costo_Desarrollo_Custom !== undefined) {
        return console.log(`Costo total: ${localStorage.costo_Total} Corresponde a integraciones nativas: 
        ${localStorage.costo_Integraciones_Nativas} Corresponde a desarrollo custom  ${localStorage.costo_Desarrollo_Custom}`);
    } else {
        return console.log("Ha ocurrido un error");
    }
}


//-------------------------------------USER INTERFACE----------------------------------------------------------------

function userInterfaceCalculadorPresupuestos() {
    let erp = document.getElementById("erps").value;
    console.log(erp);
    let meli = document.getElementById("checkBox1").checked;
    let bapro = document.getElementById("checkBox2").checked;
    let fravega = document.getElementById("checkBox3").checked;
    let tiendaBna = document.getElementById("checkBox4").checked;
    let macro = document.getElementById("checkBox5").checked;

    let validacionCustom = document.getElementById("checkBox6").checked;
    let horasCustom = parseFloat(document.getElementById("txtValor1").value);
    
    let totalPresupuestado = 0; //Esta variable es la que se guarda en el presupuesto

    let costoIntegracionesNativas = 0; //Esta variable es la que se guarda en el presupuesto
    
    let costoDesarrolloCustom = 0; //Esta variable es la que se guarda en el presupuesto

    function acumularCostosPresupuestados(presupuesto) {
        totalPresupuestado = totalPresupuestado + presupuesto;
        return totalPresupuestado
    }
    
    function acumularCostosIntegracionesNativas(costoIntegracionNativa){
        costoIntegracionesNativas = costoIntegracionesNativas + costoIntegracionNativa;
        return costoIntegracionesNativas
    }
    
    function calcularCostoImplementacion(tiempoImplementacion) {
        costoImplementacion = tiempoImplementacion * costoPorHoraEnUSD * tipoDeCambio * IVA;
        costoImplementacion.toFixed(2) //Para redondear a 2 decimales
        return costoImplementacion
    }

    let mensaje = "";
    
    if(erp !==  ""){
    let objetoErp = ERPs.find(element => element.nombre == erp); //me devuelve el obojeto ERP elegido
    calcularCostoImplementacion(objetoErp.tiempo);
    let integracionCosteada = {
        id: objetoErp.id,
        nombre: objetoErp.nombre,
        tiempo: objetoErp.tiempo,
        costoImplementacion: costoImplementacion
    }
    acumularCostosPresupuestados(integracionCosteada.costoImplementacion)
    acumularCostosIntegracionesNativas(integracionCosteada.costoImplementacion)
    integracionesPresupuestadas.push(integracionCosteada)
    }

    //Hasta acá solamente se agregó la integración ERP al array del presupuesto.

    //logica para agregar las integraciones checked al array para presupuestar

    if (meli == true) {
        let objetoMeli = integracionesCanales.find(it => it.id == 6);
        calcularCostoImplementacion(objetoMeli.tiempo);
        let integracionCosteada = {
            id: objetoMeli.id,
            nombre: objetoMeli.nombre,
            tiempo: objetoMeli.tiempo,
            costoImplementacion: costoImplementacion
        }
        acumularCostosPresupuestados(integracionCosteada.costoImplementacion)
        acumularCostosIntegracionesNativas(integracionCosteada.costoImplementacion)
        integracionesPresupuestadas.push(integracionCosteada)
    }
    if (bapro == true) {
        let objetoBapro = integracionesCanales.find(it => it.id == 7);
        calcularCostoImplementacion(objetoBapro.tiempo);
        let integracionCosteada = {
            id: objetoBapro.id,
            nombre: objetoBapro.nombre,
            tiempo: objetoBapro.tiempo,
            costoImplementacion: costoImplementacion
        }
        acumularCostosPresupuestados(integracionCosteada.costoImplementacion)
        acumularCostosIntegracionesNativas(integracionCosteada.costoImplementacion)
        integracionesPresupuestadas.push(integracionCosteada)
    }
    if (fravega == true) {
        let objetoFravega = integracionesCanales.find(it => it.id == 8);
        calcularCostoImplementacion(objetoFravega.tiempo);
        let integracionCosteada = {
            id: objetoFravega.id,
            nombre: objetoFravega.nombre,
            tiempo: objetoFravega.tiempo,
            costoImplementacion: costoImplementacion
        }
        acumularCostosPresupuestados(integracionCosteada.costoImplementacion)
        acumularCostosIntegracionesNativas(integracionCosteada.costoImplementacion)
        integracionesPresupuestadas.push(integracionCosteada)
    }
    if (tiendaBna == true) {
        let objetoBNA = integracionesCanales.find(it => it.id == 9);
        calcularCostoImplementacion(objetoBNA.tiempo);
        let integracionCosteada = {
            id: objetoBNA.id,
            nombre: objetoBNA.nombre,
            tiempo: objetoBNA.tiempo,
            costoImplementacion: costoImplementacion
        }
        acumularCostosPresupuestados(integracionCosteada.costoImplementacion)
        acumularCostosIntegracionesNativas(integracionCosteada.costoImplementacion)
        integracionesPresupuestadas.push(integracionCosteada)
    }
    if (macro == true) {
        let objetoMacro = integracionesCanales.find(it => it.id == 10);
        calcularCostoImplementacion(objetoMacro.tiempo);
        let integracionCosteada = {
            id: objetoMacro.id,
            nombre: objetoMacro.nombre,
            tiempo: objetoMacro.tiempo,
            costoImplementacion: costoImplementacion
        }
        acumularCostosPresupuestados(integracionCosteada.costoImplementacion)
        acumularCostosIntegracionesNativas(integracionCosteada.costoImplementacion)
        integracionesPresupuestadas.push(integracionCosteada)
    }

    if (validacionCustom == true && horasCustom > 0 ){
        calcularCostoImplementacion(horasCustom)
        let objetoCustom = {
            id: 11,
            nombre:"DESARROLLO CUSTOM",
            tiempo: horasCustom,
            costoImplementacion: costoImplementacion
        }
        costoDesarrolloCustom = objetoCustom.costoImplementacion
        acumularCostosPresupuestados(objetoCustom.costoImplementacion)
        integracionesPresupuestadas.push(objetoCustom)
    }

    if(erp !== "" || ((meli == true || fravega == true || bapro == true || tiendaBna == true || macro == true) || (validacionCustom == true && horasCustom >0))){
        mensaje = `El costo total es de AR$ ${totalPresupuestado.toFixed(2)} 
            Incluye AR$ ${costoIntegracionesNativas.toFixed(2)} correspondiente a integraciones nativas
            Incluye AR$ ${costoDesarrolloCustom.toFixed(2)} correspondiente al desarrollo custom`;
    } else mensaje = "No se puede generar el presupuesto, verifique nuevamente las integraciones a presupuestar";

    document.getElementById("divMostrarResultado").innerText = mensaje; //Aca se muestra el mensaje en el HTML
}

function userInterfaceGuardarPresupuesto(){
    let erp = document.getElementById("erps").value;
    
    let meli = document.getElementById("checkBox1").checked;
    let bapro = document.getElementById("checkBox2").checked;
    let fravega = document.getElementById("checkBox3").checked;
    let tiendaBna = document.getElementById("checkBox4").checked;
    let macro = document.getElementById("checkBox5").checked;

    let validacionCustom = document.getElementById("checkBox6").checked;
    let horasCustom = parseFloat(document.getElementById("txtValor1").value);
    
    let totalPresupuestado = 0; //Esta variable es la que se guarda en el presupuesto

    let costoIntegracionesNativas = 0; //Esta variable es la que se guarda en el presupuesto
    
    let costoDesarrolloCustom = 0; //Esta variable es la que se guarda en el presupuesto

    function acumularCostosPresupuestados(presupuesto) {
        totalPresupuestado = totalPresupuestado + presupuesto;
        return totalPresupuestado
    }
    
    function acumularCostosIntegracionesNativas(costoIntegracionNativa){
        costoIntegracionesNativas = costoIntegracionesNativas + costoIntegracionNativa;
        return costoIntegracionesNativas
    }
    
    function calcularCostoImplementacion(tiempoImplementacion) {
        costoImplementacion = tiempoImplementacion * costoPorHoraEnUSD * tipoDeCambio * IVA;
        costoImplementacion.toFixed(2) //Para redondear a 2 decimales
        return costoImplementacion
    }

    let mensaje = "";

    if(erp !== ""){
    let objetoErp = ERPs.find(element => element.nombre == erp); //me devuelve el obojeto ERP elegido
    calcularCostoImplementacion(objetoErp.tiempo);
    let integracionCosteada = {
        id: objetoErp.id,
        nombre: objetoErp.nombre,
        tiempo: objetoErp.tiempo,
        costoImplementacion: costoImplementacion
    }
    acumularCostosPresupuestados(integracionCosteada.costoImplementacion)
    acumularCostosIntegracionesNativas(integracionCosteada.costoImplementacion)
    integracionesPresupuestadas.push(integracionCosteada)
}
    //Hasta acá solamente se agregó la integración ERP al array del presupuesto.

    //logica para agregar las integraciones checked al array para presupuestar

    if (meli == true) {
        let objetoMeli = integracionesCanales.find(it => it.id == 6);
        calcularCostoImplementacion(objetoMeli.tiempo);
        let integracionCosteada = {
            id: objetoMeli.id,
            nombre: objetoMeli.nombre,
            tiempo: objetoMeli.tiempo,
            costoImplementacion: costoImplementacion
        }
        acumularCostosPresupuestados(integracionCosteada.costoImplementacion)
        acumularCostosIntegracionesNativas(integracionCosteada.costoImplementacion)
        integracionesPresupuestadas.push(integracionCosteada)
    }
    if (bapro == true) {
        let objetoBapro = integracionesCanales.find(it => it.id == 7);
        calcularCostoImplementacion(objetoBapro.tiempo);
        let integracionCosteada = {
            id: objetoBapro.id,
            nombre: objetoBapro.nombre,
            tiempo: objetoBapro.tiempo,
            costoImplementacion: costoImplementacion
        }
        acumularCostosPresupuestados(integracionCosteada.costoImplementacion)
        acumularCostosIntegracionesNativas(integracionCosteada.costoImplementacion)
        integracionesPresupuestadas.push(integracionCosteada)
    }
    if (fravega == true) {
        let objetoFravega = integracionesCanales.find(it => it.id == 8);
        calcularCostoImplementacion(objetoFravega.tiempo);
        let integracionCosteada = {
            id: objetoFravega.id,
            nombre: objetoFravega.nombre,
            tiempo: objetoFravega.tiempo,
            costoImplementacion: costoImplementacion
        }
        acumularCostosPresupuestados(integracionCosteada.costoImplementacion)
        acumularCostosIntegracionesNativas(integracionCosteada.costoImplementacion)
        integracionesPresupuestadas.push(integracionCosteada)
    }
    if (tiendaBna == true) {
        let objetoBNA = integracionesCanales.find(it => it.id == 9);
        calcularCostoImplementacion(objetoBNA.tiempo);
        let integracionCosteada = {
            id: objetoBNA.id,
            nombre: objetoBNA.nombre,
            tiempo: objetoBNA.tiempo,
            costoImplementacion: costoImplementacion
        }
        acumularCostosPresupuestados(integracionCosteada.costoImplementacion)
        acumularCostosIntegracionesNativas(integracionCosteada.costoImplementacion)
        integracionesPresupuestadas.push(integracionCosteada)
    }
    if (macro == true) {
        let objetoMacro = integracionesCanales.find(it => it.id == 10);
        calcularCostoImplementacion(objetoMacro.tiempo);
        let integracionCosteada = {
            id: objetoMacro.id,
            nombre: objetoMacro.nombre,
            tiempo: objetoMacro.tiempo,
            costoImplementacion: costoImplementacion
        }
        acumularCostosPresupuestados(integracionCosteada.costoImplementacion)
        acumularCostosIntegracionesNativas(integracionCosteada.costoImplementacion)
        integracionesPresupuestadas.push(integracionCosteada)
    }

    if (validacionCustom == true && horasCustom > 0 ){
        calcularCostoImplementacion(horasCustom)
        let objetoCustom = {
            id: 11,
            nombre:"DESARROLLO CUSTOM",
            tiempo: horasCustom,
            costoImplementacion: costoImplementacion
        }
        costoDesarrolloCustom = objetoCustom.costoImplementacion
        acumularCostosPresupuestados(objetoCustom.costoImplementacion)
        integracionesPresupuestadas.push(objetoCustom)
    } 

    if(erp !== "" || ((meli == true || fravega == true || bapro == true || tiendaBna == true || macro == true) || (validacionCustom == true && horasCustom >0))){
        mensaje = "Se guardó el presupuesto correctamente"
        guardarPresupuesto(totalPresupuestado.toFixed(2), costoIntegracionesNativas.toFixed(2), costoDesarrolloCustom.toFixed(2));
    } 
    else mensaje = "No se puede generar el presupuesto, verifique nuevamente las integraciones a presupuestar";

    
    
    document.getElementById("divMostrarResultado").innerText = mensaje;


    //Guardar datos en el Local Storage
    guardarDatosLocalStorage(totalPresupuestado.toFixed(2), costoIntegracionesNativas.toFixed(2), costoDesarrolloCustom.toFixed(2));
    recuperarDatosLocalStorage()
}

function userInterfaceVerTodosLosPresupuestoGuardados(){
    let resultado = verTodosLosPresupuestosGuardados(presupuestosGuardados);
    let mensaje = "";
    if(resultado !== ""){
        mensaje += "Los presupuestos guardados hasta el momento son: "
        mensaje += resultado; 
    } else {mensaje = "No se encontró ningún presupuesto guardado"}

    document.getElementById("divMostrarResultado").innerHTML = mensaje;
}

function userInterfaceVerUltimoPresupuesto(){
    let mensaje= "";
    let costoTotalUltimoPresupuesto = verCostoTotalDelUltimoPresupuesto(presupuestosGuardados);
    let costoIntegracionesNativasUltimoPresupuesto = verCostoIntegracionesNativasUltimoPresupuesto(presupuestosGuardados);
    let costoDesarrolloCustomUltimoPresupuesto = verCostoDesarrolloCustomUltimoPresupuesto(presupuestosGuardados);
    if(costoTotalUltimoPresupuesto !== 0 && costoIntegracionesNativasUltimoPresupuesto !== 0 && costoDesarrolloCustomUltimoPresupuesto !== 0){
        mensaje = `<div class="alert alert-info">El costo del ultimo presupuesto guardado es: <br>
        Costo Total: ${costoTotalUltimoPresupuesto} <br>
        Costo Integraciones Nativas ${costoIntegracionesNativasUltimoPresupuesto} <br>
        Costo Desarrollo Custom ${costoDesarrolloCustomUltimoPresupuesto}. <br></div>`;
    } else mensaje = "No se encontró ningún presupuesto."
    document.getElementById("divMostrarResultado").innerHTML = mensaje;
}

function eventosCalculadorPresupuesto() {
    document.getElementById("btn1").addEventListener("click", userInterfaceCalculadorPresupuestos);
    document.getElementById("btn2").addEventListener("click", userInterfaceGuardarPresupuesto);
    document.getElementById("btn3").addEventListener("click", userInterfaceVerUltimoPresupuesto);
    document.getElementById("btn4").addEventListener("click", userInterfaceVerTodosLosPresupuestoGuardados);
}

eventosCalculadorPresupuesto()

