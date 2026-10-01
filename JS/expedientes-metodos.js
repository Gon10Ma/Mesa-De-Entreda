// =============================================================================
// Proyecto : Sexta Entrega                             Fecha : 24 / 09 / 2026 
// Alumno   : Diez Marin Gonzalo 
// Curso    : JavaScript / Backend - CoderHouse         Comision : 94820
// =============================================================================
// SISTEMA DE GESTIÓN DE EXPEDIENTES - FUNCIONES DE ORDEN SUPERIOR
// =============================================================================
class Expediente {
    constructor(nombre, apellido, numero, tipo, mes, dia) {
        this.estado = "En Mesa de Entrada";
        this.nombre = nombre;
        this.apellido = apellido;
        this.numero = numero;
        this.tipo = tipo;
        this.mes = mes;
        this.dia = dia;
    }
    cambiarEstado(nuevoEstado) {
        this.estado = nuevoEstado;
    }
}
// Base de datos de expedientes
const mesaDeEntrada = [
    new Expediente("Agustina mi amorcito", "Gigena", "EX-2025-52235765", "Cambio de Agrupamiento", 5, 19),
    new Expediente("Juan", "Depratti Ramirez", "EX-2026-23876660", "Cambio de Agrupamiento", 7, 25),
    new Expediente("Carlos", "Bella", "EX-2026-34534123", "Designacion Director", 2, 8),
    new Expediente("Valeria", "Posadas", "EX-2025-23335781", "Traslado Interno", 9, 23),
    new Expediente("Beatriz", "Sago", "EX-2026-43567812", "Reconocimiento de Servicios", 4, 15)
];
// Le cambio el estado a un expediente
mesaDeEntrada[2].cambiarEstado("En Tramite");
console.table(mesaDeEntrada);
// Busqueda de Expedientes con .filter() 
const busquedaExpediente = prompt("Que tramite desea buscar ?");
const resultadoBusqueda = mesaDeEntrada.filter( (expediente) => expediente.tipo === busquedaExpediente );
if (resultadoBusqueda.length > 0 ) {
    console.log(resultadoBusqueda);
} else {
    console.log("No hay expedientes que tengan ese tipo de tramite");
}
// Busqueda de Expedientes con .find()
const preguntaApellido = prompt("Ingrese un apellido para ver si existen expedientes");
const busquedaApellido = mesaDeEntrada.find((exp) => exp.apellido === preguntaApellido);
if (busquedaApellido !== undefined ) {
    console.log(busquedaApellido);
} else {
    console.log("No existen expedientes con el apellido... " + preguntaApellido );
}
// Lista de expedientes con .map()
const caratula = mesaDeEntrada.map( (expediente) => {
    return expediente.numero + " - " + expediente.apellido + ", " + expediente.nombre;
    }
)
console.log(caratula);