// =============================================================================
// Proyecto : Novena Entrega                            Fecha : 14 / 10 / 2026 
// Alumno   : Diez Marin Gonzalo 
// Curso    : JavaScript / Backend - CoderHouse         Comision : 94820
// =============================================================================
// PROGRAMA DE SISTEMA DE GESTION DE EXPEDIENTES - (Mesa de Entrada)
// =============================================================================

// Caratula de los Expedientes
class Expediente {
    constructor(numero, nombre, apellido, tipo, anio, mes, dia, estado = "En Mesa de Entrada") {
        this.estado = estado;
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

// Molde generador de los 5 expedientes de fábrica (siempre devuelve copias limpias)
const obtenerExpedientesBase = () => [
    new Expediente("EX-2025-52235765", "Agustina mi amorcito", "Gigena", "Cambio de Agrupamiento", 2025, 5, 19),
    new Expediente("EX-2026-23876660", "Juan", "Depratti Ramirez", "Cambio de Agrupamiento", 2025, 7, 25),
    new Expediente("EX-2026-34534123", "Carlos", "Bella", "Designacion Director", 2026, 2, 8),
    new Expediente("EX-2025-23335781", "Valeria", "Posadas", "Traslado Interno", 2025, 9, 23),
    new Expediente("EX-2026-43567812", "Beatriz", "Sago", "Reconocimiento de Servicios", 2026, 4, 15)
];

// 1. CARGA INICIAL: Si hay algo en localStorage (incluso []), lo respeta. Si es null, carga los 5 de base.
const storageGuardado = localStorage.getItem("Expedientes");
let mesaDeEntrada = storageGuardado !== null
    ? JSON.parse(storageGuardado)
    : obtenerExpedientesBase();

// Captura de Elementos del DOM
const formulario = document.getElementById("formulario-expediente");
const numero = document.querySelector(".input-numero");
const nombre = document.querySelector(".input-nombre");
const apellido = document.querySelector(".input-apellido");
const tipo = document.querySelector(".input-tipo");
const anio = document.querySelector(".input-anio");
const mes = document.querySelector(".input-mes");
const dia = document.querySelector(".input-dia");

const busquedaExpediente = document.getElementById("busqueda-expediente");
const listaExpedientes = document.getElementById("lista-expediente");
const botonVaciar = document.getElementById("vaciar-mesa");
const botonRestablecer = document.getElementById("restablecer-mesa");

// =============================================================================
// FUNCIONES AUXILIARES Y PERSISTENCIA
// =============================================================================

// Sincroniza la memoria con localStorage
const guardarEnStorage = () => {
    localStorage.setItem("Expedientes", JSON.stringify(mesaDeEntrada));
};

// Notificación flotante con Toastify
const lanzarNotificacion = (texto, color = "#2ecc71") => {
    Toastify({
        text: texto,
        duration: 2500,
        gravity: "top",
        position: "right",
        style: {
            background: color,
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
        }
    }).showToast();
};

// Renderizado dinámico con DESTRUCTURING
const pintarExpediente = (lista) => {
    listaExpedientes.innerHTML = "";

    if (lista.length === 0) {
        listaExpedientes.innerHTML = `<p class="alerta-vacio">No hay expedientes cargados en la Mesa de Entrada.</p>`;
        return;
    }

    lista.forEach((expe) => {
        const { numero, nombre, apellido, tipo, anio, mes, dia, estado } = expe;

        listaExpedientes.innerHTML += `
            <div class="tarjeta-expediente">
                <div class="info-expediente">
                    <h3>${numero} - ${apellido}, ${nombre}</h3>
                    <p><strong>Trámite:</strong> ${tipo}</p>
                    <p><strong>Fecha:</strong> ${dia}/${mes}/${anio}</p>
                    <p><strong>Estado:</strong> <span class="badge-estado">${estado}</span></p>
                </div>
                <div class="acciones-expediente">
                    <button class="btn-editar" data-numero="${numero}">Cambiar Estado</button>
                    <button class="btn-eliminar" data-numero="${numero}">Eliminar</button>
                </div>
            </div>
        `;
    });
};

// Pintamos los datos iniciales al abrir la app
pintarExpediente(mesaDeEntrada);

// =============================================================================
// EVENTOS Y LÓGICA DE NEGOCIO
// =============================================================================

// 1. ALTA DE EXPEDIENTE
formulario.addEventListener("submit", (event) => {
    event.preventDefault();

    const diaNum = parseFloat(dia.value);
    const mesNum = parseFloat(mes.value);

    // Validación con SweetAlert2
    if (mesNum < 1 || mesNum > 12 || diaNum < 1 || diaNum > 31) {
        Swal.fire({
            icon: "error",
            title: "Fecha inválida",
            text: "Por favor verifique que el día sea entre 1 y 31, y el mes entre 1 y 12.",
            confirmButtonColor: "#3085d6"
        });
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

    // Spread operator para agregar sin mutar directamente
    mesaDeEntrada = [...mesaDeEntrada, nuevoExpediente];
    guardarEnStorage();
    pintarExpediente(mesaDeEntrada);
    formulario.reset();

    lanzarNotificacion(`Expediente ${nuevoExpediente.numero} cargado con éxito`);
});

// 2. BÚSQUEDA EN TIEMPO REAL (con Operador Ternario)
busquedaExpediente.addEventListener("input", () => {
    const texto = busquedaExpediente.value.toLowerCase();
    const resultado = mesaDeEntrada.filter((expe) =>
        expe.numero.toLowerCase().includes(texto) ||
        expe.nombre.toLowerCase().includes(texto) ||
        expe.apellido.toLowerCase().includes(texto) ||
        expe.tipo.toLowerCase().includes(texto)
    );

    resultado.length > 0
        ? pintarExpediente(resultado)
        : (listaExpedientes.innerHTML = `<p class="alerta-vacio">No se encontraron expedientes para "${texto}".</p>`);
});

// 3. EDITAR ESTADO Y ELIMINAR INDIVIDUAL (Delegación de Eventos)
listaExpedientes.addEventListener("click", (e) => {
    const numeroExp = e.target.dataset.numero;

    // Botón Cambiar Estado
    if (e.target.classList.contains("btn-editar")) {
        const expediente = mesaDeEntrada.find((exp) => exp.numero === numeroExp);
        if (!expediente) return;

        Swal.fire({
            title: "Modificar Estado",
            text: `Expediente: ${expediente.numero}`,
            input: "select",
            inputOptions: {
                "En Mesa de Entrada": "En Mesa de Entrada",
                "Pase a Despacho": "Pase a Despacho",
                "En Dictamen Legal": "En Dictamen Legal",
                "Finalizado / Archivado": "Finalizado / Archivado"
            },
            inputValue: expediente.estado,
            showCancelButton: true,
            confirmButtonText: "Guardar cambio",
            cancelButtonText: "Cancelar",
            confirmButtonColor: "#3085d6"
        }).then((result) => {
            if (result.isConfirmed) {
                expediente.estado = result.value;
                guardarEnStorage();
                pintarExpediente(mesaDeEntrada);
                lanzarNotificacion(`Estado actualizado a: "${result.value}"`, "#3498db");
            }
        });
    }

    // Botón Eliminar
    if (e.target.classList.contains("btn-eliminar")) {
        const indice = mesaDeEntrada.findIndex((exp) => exp.numero === numeroExp);
        if (indice === -1) return;

        Swal.fire({
            title: "¿Eliminar expediente?",
            text: `Se borrará el expediente ${numeroExp}. Esta acción no se puede deshacer.`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                mesaDeEntrada.splice(indice, 1);
                guardarEnStorage();
                pintarExpediente(mesaDeEntrada);
                lanzarNotificacion(`Expediente ${numeroExp} eliminado`, "#e74c3c");
            }
        });
    }
});

// 4. VACIAR MESA COMPLETA
if (botonVaciar) {
    botonVaciar.addEventListener("click", () => {
        if (mesaDeEntrada.length === 0) {
            lanzarNotificacion("La mesa ya se encuentra vacía", "#f39c12");
            return;
        }

        Swal.fire({
            title: "¿Vaciar toda la Mesa?",
            text: "Se eliminarán todos los expedientes en pantalla.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Sí, vaciar todo",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                mesaDeEntrada = [];
                guardarEnStorage(); // Guarda [] para que al apretar F5 siga vacía
                pintarExpediente(mesaDeEntrada);
                lanzarNotificacion("Mesa de Entrada vaciada por completo", "#c0392b");
            }
        });
    });
}

// 5. RESTABLECER DATOS DE FÁBRICA (Recuperar los 5 iniciales)
if (botonRestablecer) {
    botonRestablecer.addEventListener("click", () => {
        Swal.fire({
            title: "¿Restablecer datos de prueba?",
            text: "Se volverán a cargar los 5 expedientes originales de fábrica.",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#aaa",
            confirmButtonText: "Sí, restablecer",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                mesaDeEntrada = obtenerExpedientesBase();
                guardarEnStorage();
                pintarExpediente(mesaDeEntrada);
                lanzarNotificacion("Expedientes iniciales restablecidos", "#3498db");
            }
        });
    });
}