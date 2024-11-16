

let costoPorHoraEnUSD = 80; //  80 U$S/hora
let IVA = 1.21; //multiplicador por el IVA
let tipoDeCambio = 0; //Se asigna un valor de 0 para que cuando obtenga la respuesta del fetch, se guarde en esta variable.

fetch('https://dolarapi.com/v1/dolares/oficial')
  .then(response => response.json())
  .then(data => {
    console.log(data)
    tipoDeCambio = data.venta
  })

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
        id: 1, //ID unico dentro del array
        nombre: "MercadoLibre", //nombre de la integracion
        tiempo: 7, //medidos en horas
    }, {
        id: 2, //ID unico dentro del array
        nombre: "Provincia Compras", //nombre de la integracion
        tiempo: 9, //medidos en horas
    }, {
        id: 3, //ID unico dentro del array
        nombre: "Fravega", //nombre de la integracion
        tiempo: 9, //medidos en horas
    }, {
        id: 4, //ID unico dentro del array
        nombre: "Tienda BNA+", //nombre de la integracion
        tiempo: 4, //medidos en horas
    }, {
        id: 5, //ID unico dentro del array
        nombre: "Macro Premia", //nombre de la integracion
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
    localStorage.setItem("costo_Total",pCosto_Total);
    localStorage.setItem("costo_Integraciones_Nativas",pCosto_Integraciones_Nativas);
    localStorage.setItem("costo_Desarrollo_Custom",pCosto_Desarrollo_Custom);
}

function recuperarDatosLocalStorage() {
    let costo_Total = localStorage.getItem("costo_Total");
    let costo_Integraciones_Nativas = localStorage.getItem("costo_Integraciones_Nativas");
    let costo_Desarrollo_Custom = localStorage.getItem("costo_Desarrollo_Custom");

    if ((costo_Total !== undefined) && (costo_Integraciones_Nativas !== undefined) && costo_Desarrollo_Custom !== undefined) {
        return console.log(`Costo total: ${costo_Total} Corresponde a integraciones nativas: 
        ${costo_Integraciones_Nativas} Corresponde a desarrollo custom  ${costo_Desarrollo_Custom}`);
    } else {
        return console.log("Ha ocurrido un error");
    }
}


//-------------------------------------USER INTERFACE----------------------------------------------------------------

//REVISAR LOGICAS REDUNDANTES

//Agregar lo de Bootstrap al Head desde el archivo .js
const linkBootstrap = document.createElement('link');
linkBootstrap.rel = 'stylesheet';
linkBootstrap.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css'; // URL del CSS de Bootstrap
linkBootstrap.crossOrigin = 'anonymous';

document.head.appendChild(linkBootstrap);


//CONTEINER de TODOS los inputs para el presupuesto. CLASS = forms-conteiner

const main = document.createElement('main');
main.class = "container-fluid";
document.body.appendChild(main);

const form = document.createElement('form');
form.class = "container";
main.appendChild(form);

const formsConteiner = document.createElement("form");
formsConteiner.className = "forms-conteiner";
formsConteiner.class = "container";
form.appendChild(formsConteiner);

//CONTEINER del TITULO y LISTADO de erps. CLASS = lista-Erps
const tituloListaERPsConteiner = document.createElement("form");
tituloListaERPsConteiner.className = "lista-erps";
formsConteiner.appendChild(tituloListaERPsConteiner);

//TITULO de LISTA de ERPs
const tituloListaERPs = document.createElement("div");
tituloListaERPs.innerText = "¿Cual integración del ERP quieres agregar al presupuesto? Seleccioná alguno de la siguiente lista: ";
tituloListaERPsConteiner.appendChild(tituloListaERPs);

//INPUT de LISTA de ERPs
const ErpsSelect = document.createElement("select");
ERPs.forEach(erp => {
    const option = document.createElement("option");
    option.value = erp.nombre;
    option.innerText = `${erp.nombre}`;
    ErpsSelect.appendChild(option)
})

//Logica de seleccion de la lista con el eventListener
tituloListaERPsConteiner.appendChild(ErpsSelect);
let erp = "API";
ErpsSelect.addEventListener("change", function () {
    erp = ErpsSelect.value;
})

const lineBreak1 = document.createElement('br');
form.appendChild(lineBreak1);


//CONTEINER del TITULO, NOMBRE de CHECKBOX y CHECKBOXES de CANALES. CLASS = titulo-nombres-checkboxes-canales
const TituloNombresCheckboxesConteiner = document.createElement("div");
TituloNombresCheckboxesConteiner.className = "titulo-nombres-checkboxes-canales";
form.appendChild(TituloNombresCheckboxesConteiner);




//TITULO de Agregar canales al presupuesto. CLASS = Titulo
const tituloCheckboxes = document.createElement("section");
tituloCheckboxes.innerText = "Selecciona los canales que deseas agregar al presupuesto: ";
TituloNombresCheckboxesConteiner.appendChild(tituloCheckboxes);

const lineBreak = document.createElement('br');
form.appendChild(lineBreak);

//CheckBoxes de Canales. CLASS = checkboxes
integracionesCanales.forEach(canal => {
    //Crear una nueva section por cada checkbox
    
    const nuevaSection = document.createElement("section");
    nuevaSection.className = "cada-checkbox";

    for (let i = 0; i < 2; i++) {
        const lineBreak2 = document.createElement('br');
        nuevaSection.appendChild(lineBreak2);
    }    

    //Crear el nombre de cada checkbox
    const checkboxName = document.createElement("label");
    checkboxName.for = "checkBox" + canal.id;
    checkboxName.innerText = canal.nombre;
    checkboxName.class="form-check-label fs-6";

    //Crear el checkbox con su ID
    const checkbox = document.createElement("input");
    checkbox.type = 'checkbox';
    checkbox.id = "checkBox" + canal.id;
    checkbox.name = canal.nombre;
    checkbox.class="form-check-input";
    
    nuevaSection.appendChild(checkboxName);
    nuevaSection.appendChild(checkbox);
    
      
    
    //Agregar cada section (cada uno tiene un nombre y un checkbox) al conteiner total.
    TituloNombresCheckboxesConteiner.appendChild(nuevaSection);
})

const lineBreak3 = document.createElement('br');
form.appendChild(lineBreak3);

//CONTEINER del TITULO, NOMBRE de CHECKBOX y ENTRADA de texto para DESARROLLO CUSTOM. CLASS = titulo-checkbox-entradaTexto-desarrolloCustom
const tituloCheckboxTextoDesarrolloCustom = document.createElement('div');
tituloCheckboxTextoDesarrolloCustom.className = "titulo-checkbox-entradaTexto-desarrolloCustom";
form.appendChild(tituloCheckboxTextoDesarrolloCustom)

//Titulo de Agregar desarrollo Custom. CLASS = TituloDesarrolloCustom
const tituloDesarrolloCustom = document.createElement('div');
tituloDesarrolloCustom.innerText = "Si deseas agregar un Desarrollo Custom, haz click aquí y escribe la cantidad de horas que tomará el desarrollo custom.";
tituloCheckboxTextoDesarrolloCustom.appendChild(tituloDesarrolloCustom);

//Checkbox de Desarrollo Custom.
const checkboxName = document.createElement("label");
checkboxName.for = "checkBoxCustom";
checkboxName.innerText = "Desarrollo Custom";

//Crear el checkbox con su ID
const checkbox = document.createElement("input");
checkbox.type = 'checkbox';
checkbox.id = "checkBox6";
checkbox.name = "DesarrolloCustom";

tituloCheckboxTextoDesarrolloCustom.appendChild(checkboxName);
tituloCheckboxTextoDesarrolloCustom.appendChild(checkbox);

//Entrada de texto para ingresar horas al desarrollo. CLASS = InputHorasDesarrolloCustom
const seccionCustom = document.createElement('div');
seccionCustom.className = "CajaContenedoraDelInput";

const entradaHorasDesarrolloCustom = document.createElement('input');
entradaHorasDesarrolloCustom.className = "InputHorasDesarrolloCustom";
entradaHorasDesarrolloCustom.type = "number";
entradaHorasDesarrolloCustom.id = "txtValor1";
entradaHorasDesarrolloCustom.min = "0.1";
entradaHorasDesarrolloCustom.placeholder = "Ingrese las horas";

seccionCustom.appendChild(entradaHorasDesarrolloCustom);
tituloCheckboxTextoDesarrolloCustom.appendChild(seccionCustom);

//seccion boton1 + boton2 (Calcular Presupuesto + Guardar Presupuesto)
const seccion2botones = document.createElement('div');
seccion2botones.className = "2botones";
form.appendChild(seccion2botones);

const boton1 = document.createElement("button");
boton1.type = "button";
boton1.class = "btn1";
boton1.id = "btn1";
boton1.innerText = "Calcular Presupuesto";

const boton2 = document.createElement("button");
boton2.type = "button";
boton2.id = "btn2";
boton2.innerText = "Guardar Presupuesto";

seccion2botones.appendChild(boton1);
seccion2botones.appendChild(boton2);

//seccion boton3 (Ver ultimo presupuesto guardado)
const seccionBoton3 = document.createElement('div');
seccionBoton3.className = "boton3";
form.appendChild(seccionBoton3);

const boton3 = document.createElement("button");
boton3.type = "button";
boton3.id = "btn3";
boton3.innerText = "Ver ultimo presupuesto guardado";

seccionBoton3.appendChild(boton3);

//seccion boton4 (Ver todos los presupuestos guardados)
const seccionBoton4 = document.createElement('div');
seccionBoton4.className = "boton4";
form.appendChild(seccionBoton4);


const boton4 = document.createElement('button');
boton4.type = "button";
boton4.id = "btn4";
boton4.innerText = "Ver todos los presupuestos guardados";
boton4.class = "btn btn-primary";

seccionBoton4.appendChild(boton4);



//Seccion para mostrar el mensaje del resultado. (divMostrarResultado)
const divMostrarResultado = document.createElement('div');
divMostrarResultado.id = "divMostrarResultado";

form.appendChild(divMostrarResultado);



//----------------------------------------------------------------------------------------------------------------------


function userInterfaceCalculadorPresupuestos() {
    //let erp = document.getElementById("erps").value;
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
        let objetoMeli = integracionesCanales.find(it => it.id == 1);
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
        let objetoBapro = integracionesCanales.find(it => it.id == 2);
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
        let objetoFravega = integracionesCanales.find(it => it.id == 3);
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
        let objetoBNA = integracionesCanales.find(it => it.id == 4);
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
        let objetoMacro = integracionesCanales.find(it => it.id == 5);
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
    //let erp = document.getElementById("erps").value;
    
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
        let objetoMeli = integracionesCanales.find(it => it.id == 1);
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
        let objetoBapro = integracionesCanales.find(it => it.id == 2);
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
        let objetoFravega = integracionesCanales.find(it => it.id == 3);
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
        let objetoBNA = integracionesCanales.find(it => it.id == 4);
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
        let objetoMacro = integracionesCanales.find(it => it.id == 5);
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
    } else {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "No se encontró ningún presupuesto",
            footer: '<a href="#">Why do I have this issue?</a>'
        });
    }

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
    } else {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "No se encontró ningún presupuesto",
            footer: '<a href="#">Why do I have this issue?</a>'
          });
    }//mensaje = "No se encontró ningún presupuesto."
    document.getElementById("divMostrarResultado").innerHTML = mensaje;
}

function eventosCalculadorPresupuesto() {
    document.getElementById("btn1").addEventListener("click", userInterfaceCalculadorPresupuestos);
    document.getElementById("btn2").addEventListener("click", userInterfaceGuardarPresupuesto);
    document.getElementById("btn3").addEventListener("click", userInterfaceVerUltimoPresupuesto);
    document.getElementById("btn4").addEventListener("click", userInterfaceVerTodosLosPresupuestoGuardados);
}

eventosCalculadorPresupuesto()

