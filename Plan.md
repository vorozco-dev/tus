# Plan de Implementación: Transport Unified System (TUS)

## Visión General del Proyecto
Desarrollar un prototipo de UI/UX para un Dashboard de Centro de Operaciones de Red (NOC) estilo "Dark Tech Command Center" para la gestión de redes de transporte de telecomunicaciones.

**Stack Tecnológico:**
- Next.js 14 (App Router)
- React
- TypeScript
- TailwindCSS
- shadcn/ui
- Recharts
- React Flow

---

## Fase 1: Configuración del Proyecto e Identidad Visual

### Tareas Completadas:
1.  **Inicialización del Proyecto**:
    - Creación de la aplicación Next.js con TypeScript.
    - Configuración de ESLint y estructura de carpetas.
2.  **Instalación de Dependencias**:
    - Instalación de `recharts`, `react-flow-renderer` (reactflow), `lucide-react`, `clsx`, `tailwind-merge`, etc.
    - Configuración de `shadcn/ui` (inicialización y adición de componentes base como Button, Card, Badge, Table, Select, etc.).
3.  **Definición de Estilos (Theme)**:
    - Configuración de `tailwind.config.ts` con la paleta de colores oscura:
        - Background: `#0f172a`
        - Panel: `#1e293b`
        - Acentos: Cyan `#22d3ee`, Blue `#38bdf8`
    - Configuración de la tipografía (Inter).
    - Definición de variables globales en `globals.css` para efectos de "brillo" y bordes suaves.

---

## Fase 2: Componentes Base y Layout (Core)

### Tareas Completadas:
1.  **Layout Principal**:
    - Implementación de la estructura `Sidebar` (Navegación izquierda), `Header` (Barra superior) y `Main Workspace`.
    - Estilizado para efecto "Command Center" (fondo oscuro, iconos brillantes).
2.  **Componentes UI Reutilizables**:
    - `MetricTile`: Para mostrar KPIs (tarjetas con valor, label y tendencia).
    - `StatusBadge`: Para indicadores de estado (Activo/Inactivo) y severidad (Critical/Major/Minor).
    - `ChartPanel`: Contenedor estandarizado para gráficos de Recharts.
    - `Card`: Wrapper visual para las secciones.
    - `FilterBar`: Barra reusable para filtros de búsqueda y selects.

---

## Fase 3: Módulo de Red - Visualización y Topología

### Tareas Completadas:
1.  **Dashboard Principal (`/dashboard`)**:
    - Implementación de métricas clave: Total Nodes, Active Links, Network Throughput, Active Failures.
    - Gráficos de serie temporal (Tráfico, Disponibilidad, Pérdida de paquetes, Latencia) usando Recharts.
    - Lista de alarmas recientes y enlaces más congestionados.
2.  **Topología de Transporte (`/network/topology`)**:
    - Integración de **React Flow** para visualizar el grafo de red.
    - Nodos interactivos con detalles en panel lateral.
    - Filtros por Región y Vendor.
3.  **Mapa de Red (`/network/map`)**:
    - Creación de un componente de "Mapa Geográfico" simulad (placeholder visual con nodos distribuidos).
    - Panel lateral derecho mostrando capacidad y estado de enlaces.

---

## Fase 4: Módulo de Red - Capas y Simulación

### Tareas Completadas:
1.  **Vista Multi-Capa (`/network/layers`)**:
    - Selector de capas (Física, Transporte, Lógica, Servicio).
    - Visualización CSS 3D para mostrar las relaciones entre capas.
2.  **Simulación Digital Twin (`/network/digital-twin`)**:
    - Interfaz de control para seleccionar escenarios:
        - Corte de Fibra
        - Fallo de Microondas
        - Crecimiento de Tráfico
        - Saturación de Capacidad
    - Botón "Run Simulation" que actualiza el estado y muestra resultados (Sitios afectados, Tráfico afectado, Rutas alternativas).
    - Resaltado de nodos afectados en el gráfico de topología.
3.  **Análisis de Capacidad (`/analytics/capacity`)**:
    - Gráficos de利用率 (Link Utilization).
    - Heatmap de capacidad.
    - Tendencias de tráfico.

---

## Fase 5: Optimización y Operaciones

### Tareas Completadas:
1.  **Optimización de Rutas (`/analytics/path`)**:
    - Interfaz para calcular caminos.
    - Inputs: Nodo Origen, Nodo Destino.
    - Restricciones: Latencia máx, Utilización máx.
    - Visualización del camino óptimo calculado.
2.  **Análisis de Impacto de Servicio (`/operations/impact`)**:
    - Simulación de fallos de enlace o nodo.
    - Visualización de servicios afectados, sitios afectados y impacto en tráfico.
    - Resaltado visual de nodos en la vista de topología.
3.  **Correlación de Alarmas (`/operations/alarms`)**:
    - Dashboard de alarmas tipo NOC.
    - Tabla de alarmas con indicadores de severidad (Critical, Major, Minor).
    - Panel de "Root Cause" (Causa raíz) para analizar alarmas.

---

## Fase 6: Infraestructura e Integración

### Tareas Completadas:
1.  **Inventario de Transporte (`/infrastructure/inventory`)**:
    - Tabla de exploración de datos.
    - Columnas: Nombre del Nodo, Tecnología, Vendor, Región, Estado.
    - Búsqueda y filtros funcionales.
2.  **Correlación RAN (`/infrastructure/ran`)**:
    - Visualización de la relación jerárquica: RAN Site -> Transport Node -> Aggregation Node -> Core.
    - Métricas de capacidad y tráfico en cada segmento.
3.  **Fuentes de Datos (`/integration/data-sources`)**:
    - Tarjetas de integración (NMS, SNMP, Vendor APIs, CSV Import).
    - Indicadores de estado de conexión.
4.  **API Framework (`/integration/api`)**:
    - UI de documentación de API.
    - Listado de endpoints (`GET /topology`, `GET /links`, etc.).
    - Tarjetas con ejemplos de código.

---

## Fase 7: Pulido y Ajustes Finales

### Tareas Completadas:
1.  **Localización de Datos (Mock Data)**:
    - Actualización de todos los datos estáticos para utilizar ubicaciones y ciudades de **México** (ej. Bogotá -> CDMX, Medellín -> Monterrey) en todas las páginas.
2.  **Corrección de Errores**:
    - Corrección de errores de tipado en TypeScript (especialmente en `recharts`).
    - Corrección de sintaxis CSS en `globals.css`.
    - Ajustes de estilo menores para mejorar la legibilidad y el contraste.

---

## Estado Final
El proyecto se encuentra **completo y funcional**. La aplicación está corriendo en el servidor de desarrollo local (`http://localhost:3000`).
