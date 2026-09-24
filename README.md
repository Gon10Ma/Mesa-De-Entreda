# Sistema de Gestión de Expedientes - Mesa de Entradas

Sistema de registro, seguimiento y ordenamiento cronológico de actuaciones administrativas oficiales para la administración pública provincial (nomenclatura GDEBA).

## 🚀 Funcionalidades actuales
- **Modelado de datos:** Definición de la entidad `Expediente` mediante Programación Orientada a Objetos (`class` constructora).
- **Ingreso de actuaciones:** Incorporación dinámica de nuevos registros con métodos de mutación (`.push()`).
- **Búsqueda unitaria:** Localización de expedientes por titular/apellido (`.find()`).
- **Filtrado multicriterio:** Segmentación por período temporal y tipo de trámite (`.filter()`).
- **Control cronológico:** Ordenamiento temporal inmutable por fecha de ingreso (`.toSorted()`).
- **Visualización:** Formateo tabular de datos en consola (`console.table()`).

## 🛠️ Tecnologías utilizadas
- **JavaScript (ES6+)**
- **HTML5**
- **Git & GitHub**

## 📂 Estructura del proyecto
- `index.html`: Estructura base de ejecución.
- `js/main.js`: Lógica del sistema y manipulación de datos.