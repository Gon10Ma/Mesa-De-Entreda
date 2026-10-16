// =============================================================================
// Proyecto : Decima Entrega                            Fecha : 15 / 10 / 2026 
// Alumno   : Diez Marin Gonzalo 
// Curso    : JavaScript / Backend - CoderHouse         Comision : 94820
// =============================================================================
// PROGRAMA DE SISTEMA DE GESTION DE EXPEDIENTES - (Mesa de Entrada)
// =============================================================================

// Caratula de los Expedientes ---> COMIENZAN EN MESA DE ENTRADA 
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

// Lista principal donde guardamos los expedientes en memoria
let mesaDeEntrada = [];

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

// Respuestas a Solicitudes y Botones de la Mesa
const consultaBusqueda = document.getElementById("consulta-busqueda");
const busquedaExpediente = document.getElementById("busqueda-expediente");
const respuestaBusqueda = document.getElementById("respuesta-busqueda");
const listaExpedientes = document.getElementById("lista-expediente");
const botonVaciar = document.getElementById("vaciar-mesa");
const botonRestablecer = document.getElementById("restablecer-mesa");

// Guardar en el Storage
const guardadoStorage = () => {
    localStorage.setItem("Expedientes", JSON.stringify(mesaDeEntrada));
};

// Cartelito de aviso con Toastify
const mostrarAviso = (mensaje, colorFondo = "#2ecc71") => {
    Toastify({
        text: mensaje,
        duration: 2500,
        gravity: "top",
        position: "right",
        style: {
            background: colorFondo
        }
    }).showToast();
};

// Funcion para pintar las tarjetas en el HTML ---> Usando Destructuring
const pintarExpediente = (lista) => {
    listaExpedientes.innerHTML = "";

    if (lista.length === 0) {
        listaExpedientes.innerHTML = `<p class="alerta-vacio">No hay expedientes en la Mesa de Entrada.</p>`;
        return;
    }

    lista.forEach((expe) => {
        const { numero, nombre, apellido, tipo, anio, mes, dia, estado } = expe;

        listaExpedientes.innerHTML += `
            <div class="tarjeta-expediente">
                <div class="info-expediente">
                    <h3>${numero} - ${apellido}, ${nombre}</h3>
                    <p>Trámite: ${tipo}</p>
                    <p>Fecha: ${dia}/${mes}/${anio}</p>
                    <p>Estado: ${estado}</p>
                </div>
                <div class="botones-tarjeta">
                    <button class="btn-editar" data-numero="${numero}">Cambiar Estado</button>
                    <button class="btn-eliminar" data-numero="${numero}">Eliminar</button>
                </div>
            </div>
        `;
    });
};

// =============================================================================
// ASINCRONIA: PEDIR EXPEDIENTES CON FETCH (async / await)
// =============================================================================

const pedirExpedientes = async () => {
    // 1. Feedback visual mientras esperamos la respuesta
    listaExpedientes.innerHTML = `<p class="alerta-cargando">Cargando expedientes desde el servidor...</p>`;

    try {
        // 2. Consulta asincronica con fetch hacia el archivo JSON local
        const respuesta = await fetch("./data.json");

        if (!respuesta.ok) {
            throw new Error(`Error en la solicitud: ${respuesta.status}`);
        }

        const datosJSON = await respuesta.json();

        // 3. Revisamos si el usuario ya tenia cambios en localStorage
        const datosGuardados = localStorage.getItem("Expedientes");

        if (datosGuardados !== null) {
            // Si ya existia el storage (incluso si fue vaciado []), lo respetamos
            mesaDeEntrada = JSON.parse(datosGuardados);
        } else {
            // Si es la primera vez que entra, usamos los datos traidos del fetch
            mesaDeEntrada = datosJSON.map((item) => new Expediente(
                item.numero,
                item.nombre,
                item.apellido,
                item.tipo,
                item.anio,
                item.mes,
                item.dia,
                item.estado
            ));
            guardadoStorage();
        }

        // 4. Renderizamos en el DOM y mostramos aviso con Toastify
        pintarExpediente(mesaDeEntrada);
        mostrarAviso("Expedientes cargados con exito");

    } catch (error) {
        // Manejo de errores con SweetAlert2 en vez de alert nativo
        listaExpedientes.innerHTML = `<p class="alerta-error">Ocurrio un problema al cargar los expedientes.</p>`;
        
        Swal.fire({
            icon: "error",
            title: "Error de conexion",
            text: "No se pudieron obtener los datos de la Mesa de Entrada. Intente nuevamente mas tarde."
        });
    }
};

// Llamamos a la funcion asincronica al iniciar la pagina
pedirExpedientes();

// =============================================================================
// EVENTOS DEL SISTEMA
// =============================================================================

// Capturando los Valores de los Inputs
formulario.addEventListener("submit", (event) => {
    event.preventDefault();

    // Validacion de fecha con SweetAlert2
    if (parseFloat(mes.value) < 1 || parseFloat(mes.value) > 12 || parseFloat(dia.value) < 1 || parseFloat(dia.value) > 31) {
        Swal.fire({
            icon: "error",
            title: "Fecha incorrecta",
            text: "Debe ingresar una fecha valida (dia del 1 al 31 y mes del 1 al 12)."
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

    mesaDeEntrada.push(nuevoExpediente);
    guardadoStorage();
    pintarExpediente(mesaDeEntrada);
    formulario.reset();

    mostrarAviso("Expediente agregado correctamente");
});

// Motor de Busqueda ---> Con operador ternario (?)
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
        : (listaExpedientes.innerHTML = `<p class="alerta-vacio">No se encontraron expedientes para "${texto}"</p>`);
});

// Funcionalidad de los Botones de Editar y Eliminar Expediente
listaExpedientes.addEventListener("click", (e) => {
    
    // Boton para cambiar el estado del expediente
    if (e.target.classList.contains("btn-editar")) {
        const numeroBuscado = e.target.dataset.numero;
        const expedienteEncontrado = mesaDeEntrada.find((exp) => exp.numero === numeroBuscado);

        Swal.fire({
            title: "Cambiar estado del expediente",
            text: `Expediente: ${numeroBuscado}`,
            input: "select",
            inputOptions: {
                "En Mesa de Entrada": "En Mesa de Entrada",
                "En Despacho": "En Despacho",
                "En Legales": "En Legales",
                "Archivado": "Archivado"
            },
            inputValue: expedienteEncontrado.estado,
            showCancelButton: true,
            confirmButtonText: "Guardar",
            cancelButtonText: "Cancelar"
        }).then((respuesta) => {
            if (respuesta.isConfirmed) {
                expedienteEncontrado.estado = respuesta.value;
                guardadoStorage();
                pintarExpediente(mesaDeEntrada);
                mostrarAviso("Estado modificado con exito", "#3498db");
            }
        });
    }

    // Boton para eliminar un expediente
    if (e.target.classList.contains("btn-eliminar")) {
        const expedienteEliminado = e.target.dataset.numero;
        const indice = mesaDeEntrada.findIndex((exp) => exp.numero === expedienteEliminado);
        
        if (indice !== -1) {
            Swal.fire({
                title: "¿Seguro que queres eliminar?",
                text: `Se va a borrar el expediente ${expedienteEliminado}`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Si, borrar",
                cancelButtonText: "Cancelar"
            }).then((respuesta) => {
                if (respuesta.isConfirmed) {
                    mesaDeEntrada.splice(indice, 1);
                    guardadoStorage();
                    pintarExpediente(mesaDeEntrada);
                    mostrarAviso("Expediente eliminado", "#e74c3c");
                }
            });
        }
    }
});

// Funcion para vaciar todo el Storage desde el boton
const vaciarStorage = () => {
    Swal.fire({
        title: "¿Vaciar toda la Mesa de Entrada?",
        text: "Se van a borrar todos los expedientes cargados",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Si, vaciar todo",
        cancelButtonText: "Cancelar"
    }).then((respuesta) => {
        if (respuesta.isConfirmed) {
            mesaDeEntrada = [];
            guardadoStorage();
            pintarExpediente(mesaDeEntrada);
            mostrarAviso("Se vacio la Mesa de Entrada", "#e74c3c");
        }
    });
};

if (botonVaciar) {
    botonVaciar.addEventListener("click", vaciarStorage);
}

// Boton para volver a pedir los expedientes al archivo JSON (Restablecer)
if (botonRestablecer) {
    botonRestablecer.addEventListener("click", () => {
        Swal.fire({
            title: "¿Restablecer datos originales?",
            text: "Se volveran a consultar los datos desde el archivo data.json",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Si, restablecer",
            cancelButtonText: "Cancelar"
        }).then(async (respuesta) => {
            if (respuesta.isConfirmed) {
                localStorage.removeItem("Expedientes");
                await pedirExpedientes();
            }
        });
    });
}