// =============================================================================
// Proyecto : Cuarta Entrega                           Fecha : 24 / 09 / 2026 
// Alumno : Diez Marin Gonzalo 
// Curso : JavaScript / Backend - CoderHouse            Comision : 94820
// =============================================================================
// PROGRAMA DE SISTEMA DE GESTION DE EXPEDIENTES - (Mesa de Entrada)
// =============================================================================
const actuacionesMesaEntradas = [
    "EX-2025-52235765-GDEBA-DDDPPMJYDHGP",
    "EX-2026-23876660-GDEBA-DDDPPMJYDHGP",
    "EX-2026-34534123-GDEBA-DDDPPMJYDHGP",
    "EX-2025-23335781-GDEBA-DDDPPMJYDHGP",
    "EX-2026-43567812-GDEBA-DDDPPMJYDHGP"
];

actuacionesMesaEntradas.push("EX-2026-78901234-GDEBA-DDDPPMJYDHGP");    
actuacionesMesaEntradas.unshift("EX-2026-11223344-GDEBA-DDDPPMJYDHGP"); 

const actuacionDespachada = actuacionesMesaEntradas.pop(); 
console.log("Se ha eliminado el elemento: " + actuacionDespachada);
const expedienteBuscado = "EX-2026-34534123-GDEBA-DDDPPMJYDHGP";

if (actuacionesMesaEntradas.includes(expedienteBuscado)) {
    const posicion = actuacionesMesaEntradas.indexOf(expedienteBuscado);
    console.log("El expediente " + expedienteBuscado + " se encuentra en la posición: " + posicion);
} else {
    console.log("El expediente " + expedienteBuscado + " no se encuentra registrado.");
}

actuacionesMesaEntradas.splice(2, 1, "EX-2026-99999999-GDEBA-DDDPPMJYDHGP");

function listarActuaciones(lista) {
    console.log("--- REGISTRO ACTUALIZADO DE MESA DE ENTRADAS ---");
    for (const expediente of lista) {
        console.log("Expediente registrado: " + expediente);
    }
}

listarActuaciones(actuacionesMesaEntradas);