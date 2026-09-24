// =============================================================================
// Proyecto : Cuarta Entrega                           Fecha : 24 / 09 / 2026 
// Alumno : Diez Marin Gonzalo 
// Curso : JavaScript / Backend - CoderHouse            Comision : 94820
// =============================================================================
// PROGRAMA DE SISTEMA DE GESTION DE EXPEDIENTES - (Mesa de Entrada)
// =============================================================================
class Expediente {
    constructor (nombre, apellido, numero, tipo, mes, dia) {
        this.nombre = nombre ;
        this.apellido = apellido ;
        this.numero = numero ;
        this.tipo = tipo ;
        this.mes = mes ;
        this.dia = dia ;
    }
}
const expedientes = [
    new Expediente ("Maria Victoria", "Costantini", "EX-2025-52235765-GDEBA-DDDPPMJYDHGP", "Cambio de Agrupamiento", 5, 19),
    new Expediente ("Juan",  "Depratti Ramirez", "EX-2026-23876660-GDEBA-DDDPPMJYDHGP", "Cambio de Agrupamiento", 7, 25 ),
    new Expediente ("Carlos", "Bella", "EX-2026-34534123-GDEBA-DDDPPMJYDHGP", "Designacion Director", 2, 8),
    new Expediente ("Valeria", "Posadas", "EX-2025-23335781-GDEBA-DDDPPMJYDHGP", "Traslado Interno",9 , 23),
    new Expediente ("Ramon", "Baiviene", "EX-2025-67233451-GDEBA-DDDPPMJYDHGP", "Designacion Director", 5, 30),
    new Expediente ("Beatriz", "Sago", "EX-2026-43567812-GDEBA-DDDPPMJYDHGP", "Reconocimiento de Servicios", 4 , 15),
]
// AGREGANDO NUEVOS EXPEDIENTES 
expedientes.push( new Expediente("Maria", "Puriccelli", "EX-2024-52311265-GDEBA-DDDPPMJYDHGP", "Reconocimiento de Servicios", 7, 13));
console.log(expedientes);
// BUSQUEDA DE PERSONA POR APELLIDO 
const persona = expedientes.find( (expediente) => expediente.apellido == "Posadas");
console.log(persona);
// BUSQUEDA DE EXPEDIENTES ANTES DE JULIO 
const fecha = expedientes.filter( (expediente) => expediente.mes <= 6 && expediente.tipo == "Designacion Director");
console.table(fecha);
// ORDEN CRONOLOGICO DE LOS EXPEDIENTES 
const cronologia = expedientes.toSorted((a , b) => a.mes - b.mes);
console.table(cronologia);


