# Sistema de Gestión de Mesa de Entradas — Expedientes

Aplicación web desarrollada en **JavaScript Vanilla (ES6+)** orientada a la administración, registro, consulta, depuración y persistencia de expedientes administrativos en una Mesa de Entradas.

---

## 📌 Estado Actual del Desarrollo (Entregas 1 a 8)

El sistema cuenta con una arquitectura modular desacoplada que sincroniza la memoria en tiempo de ejecución (RAM) con almacenamiento local persistente:

* **Modelado con Programación Orientada a Objetos (POO):** Clase `Expediente` para instanciar y estandarizar la estructura de cada trámite (número, carátula/tipo, datos del titular y fechas).
* **Validación Defensiva de Formularios:** Cláusulas de guarda con validación lógica de rangos numéricos para días (1 a 31) y meses (1 a 12), bloqueando ingresos inválidos antes de alterar el estado.
* **Renderizado Dinámico del DOM:** Inyección de tarjetas de expedientes mediante funciones parametrizadas y *Template Literals*, desacoplando la lógica de negocio de la vista.
* **Delegación de Eventos (Event Delegation):** Manejo de acciones dinámicas (botón *Eliminar*) escuchando desde el contenedor padre (`listaExpedientes`) e identificando nodos objetivo mediante atributos de datos HTML5 (`data-numero`).
* **Búsqueda y Filtrado en Tiempo Real:** Motor de consulta sobre la colección de expedientes en memoria utilizando métodos de orden superior (`filter`, `includes`).
* **Persistencia Local y Serialización (Web Storage API):** 
  - Sincronización bidireccional mediante `localStorage` y métodos de serialización `JSON.stringify` / `JSON.parse`.
  - Mecanismo de inicialización defensivo con operador lógico de respaldo (`||`), garantizando la carga de datos del disco o la inicialización con datos de prueba si el storage se encuentra vacío.
  - Persistencia automática de altas (`submit`) y bajas (`click` en eliminación).

---

## 🛠️ Tecnologías Aplicadas

* **HTML5 Semántico:** Formularios estructurados y contenedores dinámicos.
* **CSS3:** Estilizado responsivo y organización visual por tarjetas.
* **JavaScript Moderno (ES6+):** Clases, métodos de array (`push`, `filter`, `findIndex`, `splice`), manipulación del DOM, propagación de eventos, `localStorage` y `JSON`.

---