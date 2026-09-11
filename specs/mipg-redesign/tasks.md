# Tareas MIPG Nuevo

## Etapa 1: Shell y dashboard

- [x] T01 Crear ruta paralela `/mipg-nuevo`.
  - Aceptación: `/mipg` sigue funcionando sin cambios y `/mipg-nuevo` responde.
- [x] T02 Crear datos mock centralizados.
  - Aceptación: ningún mock principal queda disperso en las vistas.
- [x] T03 Implementar header interno, navegación y métricas.
  - Aceptación: se puede navegar entre las vistas paralelas.
- [x] T04 Implementar dimensiones, acciones, tareas y alertas.
  - Aceptación: el dashboard reproduce la composición del mockup.

## Etapa 2: Vistas operativas

- [x] T05 Crear listado de autodiagnósticos con filtros.
- [x] T06 Crear vista de dimensiones.
- [x] T07 Crear planes de acción y seguimiento.
- [x] T08 Crear entrada de riesgos con enlace al formulario protegido existente.
- [x] T09 Crear reportes con filtros y métricas mock.

## Etapa 3: Calidad

- [ ] T10 Revisar responsive móvil/tablet/escritorio.
- [ ] T11 Revisar teclado, focus-visible, contraste y reduced motion.
- [ ] T12 Ejecutar lint, build y validación de rutas.
- [ ] T13 Comparar visualmente `/mipg` y `/mipg-nuevo` sin modificar la versión actual.

## Etapa 4: Overlays y flujo contextual

- [ ] T14 Auditar `src/lib/components/modal.svelte` y overlays existentes.
  - Aceptación: documentar si se pueden reutilizar sin afectar `/mipg`.
- [ ] T15 Crear `ModalBase` aislado para `/mipg-nuevo` si el primitive existente no cubre Escape, foco, backdrop y scroll.
  - Aceptación: modal accesible, responsive y con header/footer opcionales.
- [ ] T16 Crear `DrawerBase` lateral derecho aislado para `/mipg-nuevo`.
  - Aceptación: scroll interno, cierre por botón/Escape, backdrop y focus visible.
- [ ] T17 Crear `ModalConfirmacion` reutilizable.
  - Aceptación: acciones destructivas muestran contexto, Cancelar y Confirmar.
- [ ] T18 Aplicar modales y drawers según la matriz de `design.md`.
  - Aceptación: cada acción implementada usa el patrón documentado y no agrega overlays por decoración.
- [ ] T19 Probar overlays en móvil, teclado, Escape, reduced motion y pérdida de foco.
  - Aceptación: no se puede interactuar con el contenido de fondo mientras el overlay está abierto.

## Restricciones de implementación

- No modificar `/mipg` ni sus subrutas.
- No modificar `/mipg/gestion-riesgos/nuevo` ni sus derivados.
- No implementar overlays en esta actualización de especificación; las tareas anteriores quedan pendientes de aprobación.
