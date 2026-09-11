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

## Patrones Modal y Drawer

La interfaz usa tres niveles de interacción:

- Acción rápida: modal centrado.
- Consulta o detalle amplio: drawer lateral derecho.
- Proceso complejo o formulario extenso: página independiente.

### Primitives

Antes de crear primitives nuevos se revisarán `src/lib/components/modal.svelte` y componentes relacionados. Si no son compatibles sin afectar `/mipg`, se crearán variantes aisladas en `src/routes/(app)/mipg-nuevo/components/`:

- `ModalBase.svelte`: overlay, header/footer opcionales, composición de contenido, Escape, backdrop, focus y bloqueo de scroll.
- `DrawerBase.svelte`: panel derecho, ancho responsive, scroll interno, encabezado y cierre accesible.
- `ModalConfirmacion.svelte`: confirmación reutilizable para acciones destructivas o irreversibles.

Los nombres son una propuesta; deben adaptarse a las convenciones reales del proyecto al implementar. No se usará TypeScript.

### Reglas de composición

- El backdrop debe estar debajo del contenido del overlay y no debe permitir interacción con la página de fondo.
- Los modales tendrán un `max-w-*` compacto, mientras los drawers usarán un ancho responsive con scroll vertical interno.
- Ambos patrones deben incluir `role="dialog"`, `aria-modal="true"`, nombre accesible y foco visible.
- El cierre debe funcionar por botón y Escape; el click en backdrop será opcional según el riesgo de perder datos.
- Los formularios largos no se convierten en modal: se mantienen como página.

## Matriz de decisiones de interacción

| Módulo | Modal | Drawer | Página |
|---|---|---|---|
| Vista General | Confirmar tarea atendida | Detalle de tarea, alerta o novedad | No aplica en la primera fase |
| Autodiagnósticos | Confirmaciones breves | Resumen del instrumento | Instrumento completo |
| Dimensiones | Cambiar estado de política | Política, instrumento o evidencia | Detalle de dimensión |
| Planes de Acción | Crear/editar plan simple | Plan, actividad y evidencias | Plan complejo de varios pasos |
| Seguimiento | Observación y respuesta | Tarea, actividad e historial | No aplica salvo flujo posterior complejo |
| Gestión de Riesgos | Acciones auxiliares | Resumen del riesgo | Crear riesgo mediante `/mipg/gestion-riesgos/nuevo` |
| Reportes | Configurar exportación | Detalle de indicador | Reporte completo |

La decisión evita convertir cada interacción en navegación y evita convertir formularios extensos en overlays.

## Datos

- Datos mock centralizados en `src/lib/mipg-new-data.js`.
- Los nombres y cifras son demostrativos y no representan información institucional real.
- La estructura queda preparada para sustituir mocks por servicios sin rehacer las vistas.
