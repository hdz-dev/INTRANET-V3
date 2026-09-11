# Diseño MIPG Nuevo

## Arquitectura

- El shell existente de `src/routes/(app)/+layout.svelte` permanece como contenedor.
- `/mipg-nuevo` será una ruta paralela con un layout interno para header MIPG y navegación horizontal.
- Los datos temporales vivirán en `src/lib/mipg-new-data.js`.
- Las pantallas serán componentes Svelte pequeños y orientados a lectura/escaneo.

## Navegación

- Dashboard: `/mipg-nuevo`.
- Autodiagnósticos: `/mipg-nuevo/autodiagnosticos`.
- Dimensiones: `/mipg-nuevo/dimensiones`.
- Planes de acción: `/mipg-nuevo/planes-accion`.
- Seguimiento: `/mipg-nuevo/seguimiento`.
- Riesgos: `/mipg-nuevo/gestion-riesgos`, con CTA a `/mipg/gestion-riesgos/nuevo`.
- Reportes: `/mipg-nuevo/reportes`.

## Composición visual

- Banda superior: contexto MIPG, breadcrumb, título y acciones.
- Navegación interna como tabs horizontales.
- Dashboard en grid: métricas, dimensiones, acciones rápidas, tareas y alertas.
- Tarjetas `glass-3` solo para superficies de agrupación.
- Tablas con `overflow-x-auto`, `min-w-*`, padding estable y estados visibles.
- Badges semánticos para estado y progreso; el color no es el único indicador.

## Componentes previstos

- `MIPGHeader` y `MIPGNav`.
- `MetricCard`, `DimensionCard`, `ProgressBar`, `TaskList`, `AlertList`.
- `StatusBadge`, `FilterBar`, `DataTable`.
- Los componentes compartidos se crearán dentro de `src/routes/(app)/mipg-nuevo/components` para no acoplarlos a `/mipg` durante la comparación.

## Datos

- Datos mock centralizados en `src/lib/mipg-new-data.js`.
- Los nombres y cifras son demostrativos y no representan información institucional real.
- La estructura queda preparada para sustituir mocks por servicios sin rehacer las vistas.
