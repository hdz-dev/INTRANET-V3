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

## Interacción contextual

- UX-01: Usar un modal centrado para acciones rápidas que no requieran abandonar la vista actual.
- UX-02: Usar un drawer lateral derecho para consultas amplias y detalle contextual.
- UX-03: Usar una página independiente para formularios extensos, procesos de varios pasos y flujos con navegación propia.
- UX-04: Los modales deben ser compactos, conservar visible el contexto de fondo y ofrecer `Cancelar` y `Guardar`/`Confirmar`.
- UX-05: Los drawers deben tener scroll interno, encabezado identificable, cierre accesible y conservar visualmente la pantalla principal detrás.
- UX-06: En móvil, modal y drawer podrán ocupar casi toda la pantalla cuando el contenido lo requiera.
- UX-07: No introducir overlays por estética; cada modal o drawer debe reducir navegación innecesaria o mejorar la consulta contextual.

## Requisitos de overlays

- OV-01: Prever primitives reutilizables `ModalBase` y `DrawerBase`, adaptadas a la arquitectura Svelte existente.
- OV-02: Prever `ModalConfirmacion` como variante reutilizable para acciones destructivas o irreversibles.
- OV-03: Los overlays deben contemplar Escape, botón de cierre, foco, bloqueo del scroll de fondo, backdrop, ARIA y responsive.
- OV-04: No modificar ni reutilizar de forma riesgosa overlays de `/mipg`; los nuevos primitives deben aislarse inicialmente dentro del ámbito de `/mipg-nuevo`.

## Matriz de interacción obligatoria

| Módulo | Acción | Patrón | Justificación |
|---|---|---|---|
| Vista General | Ver tarea pendiente | Drawer | Permite consultar el contexto sin perder el dashboard. |
| Vista General | Ver alerta o novedad | Drawer | El detalle puede ser amplio y sigue siendo contextual. |
| Vista General | Marcar tarea como atendida | Modal | Acción breve con confirmación y resultado inmediato. |
| Autodiagnósticos | Buscar y filtrar | En la página | Es interacción de consulta directa y repetitiva. |
| Autodiagnósticos | Continuar instrumento | Página | Es un proceso extenso con navegación propia. |
| Autodiagnósticos | Ver resumen del instrumento | Drawer | Consulta amplia sin abandonar el listado. |
| Dimensiones | Ver detalle de dimensión | Página | Tiene contenido y navegación propia. |
| Dimensiones | Ver política o instrumento | Drawer | Permite explorar detalle sin perder la dimensión. |
| Dimensiones | Cambiar estado de una política | Modal | Acción corta con confirmación. |
| Planes de Acción | Crear plan simple | Modal | Alta breve con pocos campos. |
| Planes de Acción | Editar plan simple | Modal | Edición contextual y acotada. |
| Planes de Acción | Ver plan completo, actividad o evidencias | Drawer | Detalle amplio que debe conservar el listado detrás. |
| Planes de Acción | Gestionar plan de múltiples pasos | Página | Requiere espacio, navegación y estados propios. |
| Seguimiento | Ver detalle de tarea o pendiente | Drawer | Consulta contextual de actividad. |
| Seguimiento | Agregar observación | Modal | Acción rápida con comentario y guardado. |
| Seguimiento | Responder observación | Modal | Interacción breve asociada al registro visible. |
| Gestión de Riesgos | Consultar resumen de riesgo | Drawer | Permite revisar contexto sin abandonar la entrada. |
| Gestión de Riesgos | Confirmar acción auxiliar | Modal | Confirmación breve. |
| Gestión de Riesgos | Crear riesgo | Página | Debe reutilizar `/mipg/gestion-riesgos/nuevo`, que es un formulario extenso protegido. |
| Reportes | Configurar exportación | Modal | Filtros y formato de exportación son una acción corta. |
| Reportes | Ver detalle de indicador o consolidado | Drawer | Consulta ampliada sobre el reporte actual. |
| Reportes | Explorar reporte completo | Página | Requiere espacio para filtros, gráficos y resultados. |

## Restricciones

- No modificar `/mipg` ni sus subrutas existentes.
- No modificar `/mipg/gestion-riesgos/nuevo` ni sus componentes derivados.
- No crear backend, Prisma ni API definitiva en esta fase.
- No alterar cálculos existentes de riesgos.
- No introducir librerías visuales nuevas.
