# Plan de Implementación: Transport Unified System (TUS)

Este documento detalla las fases del plan que se diseñaron e implementaron para el desarrollo del prototipo de interfaz de usuario (UI/UX) del dashboard estilo NOC (Network Operations Center) para la gestión de redes de transporte de telecomunicaciones.

## Fase 1: Configuración y Preparación del Proyecto
- **Inicialización:** Creación del proyecto con Next.js 14 (App Router), React y TypeScript.
- **Dependencias:** Instalación de Tailwind CSS, shadcn/ui, Recharts (para gráficos) y React Flow (para topología de red).
- **Estilos Base:** Configuración de la paleta de colores "Dark Tech Command Center" (fondos oscuros `#0f172a`, paneles `#1e293b`, acentos cyan `#22d3ee` y azul `#38bdf8`) y tipografía (Inter) en la configuración de Tailwind.

## Fase 2: Layout Principal y Componentes Reutilizables
- **Estructura Base:** Implementación del layout principal que asemeja un centro de comando real (Navegación lateral izquierda colapsable, Barra superior de estado, Espacio de trabajo principal).
- **Componentes UI:** Desarrollo de componentes modulares y reutilizables como `Card`, `MetricTile`, `StatusBadge`, `ChartPanel`, `FilterBar` y paneles de detalles para mantener consistencia visual.

## Fase 3: Vistas Principales de Red y Dashboard
- **Dashboard (`/dashboard`):** Creación de la vista general con tarjetas de métricas (Nodos totales, Enlaces activos, Throughput, Fallos) y gráficos de tráfico, disponibilidad, latencia y pérdida de paquetes.
- **Transport Topology (`/network/topology`):** Implementación del grafo de red interactivo usando React Flow, con capacidades de zoom, detalles de nodos al hacer hover y filtros por región/tecnología.
- **Network Map (`/network/map`):** Creación de la vista de mapa geográfico con rutas de fibra y enlaces de microondas, incluyendo un panel lateral con el estado y utilización de los enlaces.

## Fase 4: Visualización Avanzada y Analítica
- **Multi-Layer View (`/network/layers`):** Desarrollo de la visualización en capas (Física, Transporte, Lógica, Servicio) mostrando las relaciones visuales y dependencias entre ellas.
- **Digital Twin Simulation (`/network/digital-twin`):** Interfaz de simulación para probar escenarios de fallo (Corte de fibra, Fallo de microondas, Crecimiento de tráfico) y visualizar el impacto en sitios y tráfico alterno.
- **Capacity Analytics (`/analytics/capacity`):** Dashboards analíticos con gráficos de utilización de enlaces, mapas de calor de capacidad y tendencias de tráfico usando Recharts.
- **Path Optimization (`/analytics/path`):** Interfaz para calcular rutas óptimas basadas en restricciones de latencia máxima y utilización.

## Fase 5: Operaciones e Infraestructura
- **Service Impact Analysis (`/operations/impact`):** Herramienta para simular fallos en nodos/enlaces específicos y visualizar los servicios y sitios afectados directamente.
- **Alarm Correlation (`/operations/alarms`):** Dashboard de alarmas del NOC con tabla de eventos, indicadores de severidad (Crítica, Mayor, Menor) y panel de análisis de causa raíz.
- **Transport Inventory (`/infrastructure/inventory`):** Tabla exploradora de datos con el inventario de nodos, tecnologías, proveedores y estados, incluyendo funcionalidades de búsqueda y filtros.
- **RAN Transport Correlation (`/infrastructure/ran`):** Visualización de la relación y topología desde el sitio RAN hasta el nodo de Agregación y el Core, mostrando métricas de capacidad.

## Fase 6: Integración y Detalles Finales
- **Data Sources (`/integration/data-sources`):** Tarjetas de integración mostrando el estado de conexión simulado con NMS, SNMP, APIs de proveedores y archivos CSV.
- **API Framework (`/integration/api`):** Interfaz estilo documentación de API con endpoints (`/topology`, `/links`, `/capacity`) y ejemplos de código de respuesta.
- **Pulido Visual (UI/UX):** Ajustes finales para asegurar un aspecto moderno, futurista y profesional, aplicando efectos de hover suaves, bordes sutiles, sombras y acentos brillantes característicos de un SOC/NOC.
- **Localización de Datos:** Actualización de todos los datos estáticos (mock data) para reflejar locaciones y ciudades de México (CDMX, Monterrey, Polanco, Santa Fe, etc.) según los requerimientos.
