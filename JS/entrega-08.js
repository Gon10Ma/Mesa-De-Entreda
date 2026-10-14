// =============================================================================
// Proyecto : Octava Entrega                            Fecha : 08 / 10 / 2026 
// Alumno   : Diez Marin Gonzalo 
// Curso    : JavaScript / Backend - CoderHouse         Comision : 94820
// =============================================================================
// PROGRAMA DE SISTEMA DE GESTION DE EXPEDIENTES - (Mesa de Entrada)
// =============================================================================

// Caratula de los Expedientes ---> COMIENZAN EN MESA DE ENTRADA 
class Expediente {
    constructor(numero, nombre, apellido, tipo, anio, mes, dia) {
        this.estado = "En Mesa de Entrada";
        this.numero = numero;
        this.nombre = nombre;
        this.apellido = apellido;
        this.tipo = tipo;
        this.anio = anio;
        this.mes = mes;
        this.dia = dia;
    }
    cambiarEstado(nuevoEstado) {
        this.estado = nuevoEstado;
    }
}

// 1. PERSISTENCIA: Recuperar datos del localStorage o inicializar por defecto
let mesaDeEntrada = JSON.parse(localStorage.getItem("Expedientes")) || [
    new Expediente("EX-2025-52235765", "Agustina mi amorcito", "Gigena", "Cambio de Agrupamiento", 2025, 5, 19),
    new Expediente("EX-2026-23876660", "Juan", "Depratti Ramirez", "Cambio de Agrupamiento", 2025, 7, 25),
    new Expediente("EX-2026-34534123", "Carlos", "Bella", "Designacion Director", 2026, 2, 8),
    new Expediente("EX-2025-23335781", "Valeria", "Posadas", "Traslado Interno", 2025, 9, 23),
    new Expediente("EX-2026-43567812", "Beatriz", "Sago", "Reconocimiento de Servicios", 2026, 4, 15)
];

// Acceso al DOM de Formularios 
const formulario = document.getElementById("formulario-expediente");
const numero = document.querySelector(".input-numero");
const nombre = document.querySelector(".input-nombre");
const apellido = document.querySelector(".input-apellido");
const tipo = document.querySelector(".input-tipo");
const anio = document.querySelector(".input-anio");
const mes = document.querySelector(".input-mes");
const dia = document.querySelector(".input-dia");

// BOTON DE CARGA DE EXPEDIENTES 
const botonDeCarga = document.getElementById("agregar-expediente");

// Respuestas a Solicitudes 
const consultaBusqueda = document.getElementById("consulta-busqueda");
const busquedaExpediente = document.getElementById("busqueda-expediente");
const respuestaBusqueda = document.getElementById("respuesta-busqueda");
const listaExpedientes = document.getElementById("lista-expediente");

// =============================================================================
// FUNCIONES AUXILIARES Y DE RENDERIZADO
// =============================================================================

// Almacenar / Sincronizar en LocalStorage
const guardadoStorage = () => {
    localStorage.setItem("Expedientes", JSON.stringify(mesaDeEntrada));
};

// Vaciar Storage y reiniciar estado
const vaciarStorage = () => {
    localStorage.removeItem("Expedientes");
    mesaDeEntrada = [];
    pintarExpediente(mesaDeEntrada);
};

// Renderizado dinámico con DESTRUCTURING de objetos
const pintarExpediente = (lista) => {
    listaExpedientes.innerHTML = "";

    lista.forEach((expe) => {
        // Desestructuración de propiedades del expediente
        const { numero, nombre, apellido, tipo, anio, mes, dia, estado } = expe;

        listaExpedientes.innerHTML += `
            <div class="tarjeta-expediente">
                <div class="info-expediente">
                    <h3>${numero} - ${apellido}, ${nombre}</h3>
                    <p>Trámite: ${tipo}</p>
                    <p>Fecha: ${dia}/${mes}/${anio}</p>
                    <p>Estado: ${estado}</p>
                </div>
                <button class="btn-eliminar" data-numero="${numero}">Eliminar</button>
            </div>
        `;
    });
};

// Pintamos los datos iniciales al abrir la app
pintarExpediente(mesaDeEntrada);

// =============================================================================
// EVENTOS
// =============================================================================

// Capturando los Valores de los Inputs y Alta de Expediente
formulario.addEventListener("submit", (event) => {
    event.preventDefault();

    if (parseFloat(mes.value) < 1 || parseFloat(mes.value) > 12 || parseFloat(dia.value) < 1 || parseFloat(dia.value) > 31) {
        alert("Debe ingresar una fecha valida ...");
        return;
    }

    const nuevoExpediente = new Expediente(
        numero.value,
        nombre.value, 
        apellido.value,
        tipo.value, 
        anio.value,
        mes.value, 
        dia.value
    );

    mesaDeEntrada.push(nuevoExpediente);
    guardadoStorage();
    pintarExpediente(mesaDeEntrada);
    formulario.reset();
});

// Motor de Búsqueda con OPERADOR TERNARIO (?)
busquedaExpediente.addEventListener("input", (e) => {
    const texto = busquedaExpediente.value.toLowerCase();
    const resultado = mesaDeEntrada.filter((expe) => 
        expe.numero.toLowerCase().includes(texto) ||
        expe.nombre.toLowerCase().includes(texto) ||
        expe.apellido.toLowerCase().includes(texto) ||
        expe.tipo.toLowerCase().includes(texto)
    );

    // Operador ternario reemplazando el condicional simple
    resultado.length > 0
        ? pintarExpediente(resultado)
        : (listaExpedientes.innerHTML = `<p class="alerta-vacio">No se encontraron expedientes para "${texto}"</p>`);
});

// Funcionalidad del Botón de Eliminar Expediente (Borrado y persistencia)
listaExpedientes.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-eliminar")) {
        const expedienteEliminado = e.target.dataset.numero;
        const indice = mesaDeEntrada.findIndex((exp) => exp.numero === expedienteEliminado);
        
        if (indice !== -1) {
            mesaDeEntrada.splice(indice, 1);
            guardadoStorage();
            pintarExpediente(mesaDeEntrada);
        }
    }
});