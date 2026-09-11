# Requisitos MIPG Nuevo

## Alcance

Crear una experiencia paralela en `/mipg-nuevo` inspirada en el mockup aprobado, sin modificar `/mipg` ni `/mipg/gestion-riesgos/nuevo`.

## Requisitos funcionales

- RF-01: Mostrar un dashboard MIPG con avance general, dimensiones, políticas, alertas, tareas y acciones rápidas.
- RF-02: Mantener navegación interna hacia `/autodiagnosticos`, `/dimensiones`, `/planes-accion`, `/seguimiento`, `/gestion-riesgos` y `/reportes`.
- RF-03: Mostrar autodiagnósticos con búsqueda, filtros, estado, avance y acción principal.
- RF-04: Mostrar dimensiones con avance, políticas, instrumentos y pendientes.
- RF-05: Mostrar planes de acción con responsable, estado, avance y fecha límite.
- RF-06: Mostrar seguimiento con pendientes y alertas de revisión.
- RF-07: La entrada de gestión de riesgos debe enlazar al formulario protegido `/mipg/gestion-riesgos/nuevo`.
- RF-08: Mostrar reportes con filtros y métricas preparadas para datos reales futuros.
- RF-09: Usar mocks centralizados mientras no exista backend MIPG nuevo.

## Visuales y UX

- RV-01: Mantener sidebar, header, footer, tokens y glassmorphism de GIGA.
- RV-02: Usar fondo claro azulado, tarjetas claras, bordes redondeados, sombras suaves y azul primario.
- RV-03: Priorizar densidad escaneable: indicadores compactos, tablas con padding y jerarquía clara.
- RV-04: Cada vista debe contemplar loading, empty, error y datos.
- RV-05: Ser responsive en móvil, tablet y escritorio.

## Accesibilidad

- RA-01: Usar HTML semántico, labels, focus-visible y nombres accesibles para iconos.
- RA-02: No depender solo de color para estados.
- RA-03: Respetar reduced motion y navegación por teclado.

## Restricciones

- No modificar `/mipg` ni sus subrutas existentes.
- No modificar `/mipg/gestion-riesgos/nuevo` ni sus componentes derivados.
- No crear backend, Prisma ni API definitiva en esta fase.
- No alterar cálculos existentes de riesgos.
- No introducir librerías visuales nuevas.
