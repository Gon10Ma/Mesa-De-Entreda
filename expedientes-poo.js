// =============================================================================
// Proyecto : Quinta Entrega                           Fecha : 24 / 09 / 2026 
// Alumno : Diez Marin Gonzalo 
// Curso : JavaScript / Backend - CoderHouse            Comision : 94820
// =============================================================================
// PROGRAMA DE SISTEMA DE GESTION DE EXPEDIENTES - (Mesa de Entrada)
// =============================================================================
class Expediente {
    constructor (nombre, apellido, numero, tipo, mes, dia) {
        this.estado = "En Mesa de Entrada" ;
        this.nombre = nombre ;
        this.apellido = apellido ;
        this.numero = numero ;
        this.tipo = tipo ;
        this.mes = mes ;
        this.dia = dia ;
    }
    cambiarEstado (nuevoEstado) {
        this.estado = nuevoEstado ;
    }
}
const expediente1 = new Expediente ("Maria Victoria", "Costantini", "EX-2025-52235765-GDEBA-DDDPPMJYDHGP", "Cambio de Agrupamiento", 5, 19);
const expediente2 = new Expediente ("Juan",  "Depratti Ramirez", "EX-2026-23876660-GDEBA-DDDPPMJYDHGP", "Cambio de Agrupamiento", 7, 25 );
const expediente3 = new Expediente ("Carlos", "Bella", "EX-2026-34534123-GDEBA-DDDPPMJYDHGP", "Designacion Director", 2, 8);

expediente1.cambiarEstado("En Tramite");
console.log("Estado actualizado de expediente 1: " + expediente1.estado);

const mesaDeEntrada = [expediente1, expediente2, expediente3];
console.log(mesaDeEntrada);

function listarExpedientes(lista) {
    for (const exp of lista) {
        console.log("Expediente: " + exp.numero + " | Titular: " + exp.nombre + " " + exp.apellido + " | Estado: " + exp.estado);
    }
}
listarExpedientes(mesaDeEntrada);



