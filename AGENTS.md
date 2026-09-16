# AGENTS.md

## Propósito

Estas instrucciones guían a cualquier agente que trabaje en `INTRANET-V3`. El objetivo es mantener una aplicación institucional estable, reutilizable, accesible y coherente con el código existente.

## Contexto del repositorio

- Monorepo con `backend/`, `front/` y `frontend/`.
- La aplicación activa nueva está en `frontend/`.
- `frontend/` usa SvelteKit, Svelte 5, Vite, JavaScript, Tailwind CSS v4, ESLint y Prettier.
- `backend/` usa Node.js ESM, Express, Prisma y PostgreSQL/Neon.
- El código de `front/` puede contener componentes legacy que aún deben compilar.
- Usar Node `20.20.2` para desarrollo y validación.

## Reglas de trabajo

1. Leer primero el archivo, componente, ruta o test directamente relacionado con la solicitud.
2. Formular una hipótesis local y hacer el cambio mínimo que permita validarla.
3. Después de cada cambio sustancial, ejecutar una validación focalizada antes de explorar o modificar otra zona.
4. No revertir cambios existentes del usuario, del equipo o de herramientas automáticas.
5. No modificar archivos generados como `.svelte-kit/`.
6. No crear commits ni ramas salvo que se solicite explícitamente.
7. Mantener las modificaciones dentro del alcance solicitado y evitar refactors oportunistas.
8. Si una petición contradice una decisión existente, señalar la incompatibilidad y conservar la opción de menor riesgo.

## Componentes y reutilización

Antes de crear un componente nuevo:

1. Buscar componentes existentes en `frontend/src/lib/components/`, `frontend/src/lib/design-system/` y dentro de la ruta funcional.
2. Revisar si existe una variante equivalente en `front/` o en otro módulo.
3. Reutilizar el componente existente si su contrato, accesibilidad y estilo cubren la necesidad.
4. Si no cubre la necesidad, extenderlo de forma compatible o crear una variante explícita; no copiar y pegar markup.
5. Extraer un componente cuando haya markup repetido, una interacción compartida o una responsabilidad visual clara.
6. Mantener los componentes pequeños y composables: recibir datos por props, emitir eventos o callbacks explícitos y no depender de estado global innecesario.
7. Mantener un único origen para datos, tokens y reglas compartidas. No duplicar mocks, colores, estados ni lógica de filtros en varias vistas.
8. No crear un componente genérico prematuramente: debe existir repetición real o una frontera de responsabilidad clara.
9. Documentar solo contratos no obvios; evitar comentarios narrativos dentro del código.

### Inventario de reutilización

Usar estos puntos de entrada antes de crear alternativas:

- `frontend/src/lib/components/`: componentes compartidos y legacy como inputs, loaders, modal, navegación y gráficos.
- `frontend/src/lib/design-system/index.js`: tokens compartidos de color, radios y motion.
- `frontend/src/lib/api/`: clientes y funciones de acceso a datos existentes; no llamar `fetch` directamente desde cada vista si ya existe un módulo para el recurso.
- `frontend/src/lib/services/`: lógica de dominio del frontend, persistencia temporal y transformación de datos.
- `frontend/src/routes/(app)/mipg-nuevo/components/`: primitives aislados de la experiencia MIPG nueva.
- `frontend/src/lib/mipg-new-data.js`: único origen de los mocks MIPG nuevo.

### Decisión antes de crear componentes

Aplicar esta secuencia:

1. **Componer** componentes existentes si la diferencia es solo contenido, layout o configuración.
2. **Extender** el componente existente si la nueva capacidad es general y mantiene compatibilidad con sus consumidores.
3. **Crear una variante** en el módulo funcional si la interacción pertenece solo a ese módulo, como los overlays de MIPG Nuevo.
4. **Extraer a `src/lib/components/`** únicamente si la misma pieza ya se usa o se usará en dos o más módulos independientes.

Antes de terminar, verificar que el componente nuevo tenga una responsabilidad única, props con nombres claros, estados de carga/vacío/error cuando aplique y al menos un consumidor real. No crear componentes contenedores que solo oculten markup sin aportar una frontera reutilizable.

### Contratos de componentes

- Preferir props de datos y callbacks explícitos sobre imports de estado global.
- Documentar defaults, eventos/callbacks, estados controlados y si una prop admite `bind:`.
- No mutar objetos recibidos por props; derivar el estado local o emitir una actualización.
- Usar claves estables en `{#each}`; no usar el índice si existe un identificador del dominio.
- Evitar que un componente visual conozca rutas, endpoints o reglas de autorización salvo que esa sea su responsabilidad explícita.
- Separar presentación, transformación de datos y acceso a API en módulos distintos.

### Primitives de overlay

- Para `/mipg-nuevo` usar los primitives aislados de `frontend/src/routes/(app)/mipg-nuevo/components/`.
- Reutilizar `DrawerBase`, `ModalBase` y `ModalConfirmacion` antes de crear overlays locales.
- Todo overlay debe contemplar cierre por Escape, botón de cierre accesible, backdrop, bloqueo del scroll, foco inicial, restauración de foco, trampa de Tab, ARIA y responsive.
- No reutilizar ni modificar `frontend/src/lib/components/modal.svelte` para funcionalidades nuevas sin verificar que no afecte las rutas legacy.
- No introducir overlays por decoración. Cada overlay debe reducir navegación o mejorar una consulta contextual.

## Convenciones Svelte 5

- Los layouts y componentes nuevos deben usar `$props()`, `$state`, `$derived` y `$effect` cuando corresponda.
- Usar `$bindable()` cuando un componente hijo deba soportar `bind:prop`.
- No activar `runes: true` globalmente: existen componentes legacy que dependen del modo tradicional.
- No mezclar sintaxis legacy y runes dentro del mismo componente sin una razón técnica clara.
- Preferir `{@render children()}` en componentes nuevos con snippets.
- Usar HTML semántico: `main`, `nav`, `section`, `article`, `aside`, `table`, `label`, `button` y `a` según la interacción.
- Los botones realizan acciones; los enlaces navegan.
- Todos los controles deben tener nombre accesible, estado de foco visible y comportamiento usable con teclado.
- Respetar `prefers-reduced-motion`.

## UI y diseño

- Seguir los tokens y utilidades existentes, especialmente `glass`, `glass-2`, `glass-3`, `--color-primary` y los valores de `frontend/src/lib/design-system/index.js`.
- Usar Tailwind-first; evitar CSS local salvo que sea necesario para una regla que Tailwind no exprese claramente.
- Mantener una interfaz institucional, escaneable y responsive.
- No usar tarjetas anidadas sin necesidad, gradientes morados por defecto, decoraciones sin función ni tipografía arbitraria.
- Mantener tablas con `min-width`, padding suficiente y scroll horizontal controlado en pantallas pequeñas.
- No depender únicamente del color para comunicar estados; acompañar con texto o una etiqueta accesible.
- Cada vista debe considerar datos, carga, estado vacío y error cuando la integración lo requiera.

## MIPG

- `/mipg` y todas sus subrutas existentes son la versión protegida actual: no modificarlas durante el rediseño paralelo.
- `/mipg/gestion-riesgos/nuevo` y sus derivados son formularios protegidos: no duplicarlos ni alterar su lógica.
- `/mipg-nuevo` es el espacio paralelo para nuevas vistas y componentes.
- Centralizar los mocks MIPG en `frontend/src/lib/mipg-new-data.js` mientras no exista API nueva.
- No modificar `riesgosService.js` para resolver necesidades visuales de MIPG Nuevo.
- Mantener habilitadas solo las rutas realmente implementadas; las demás deben indicar claramente que están pendientes.
- Cada nueva vista MIPG debe tener navegación coherente, estado vacío razonable y validación de ruta.

## Backend y datos

- Revisar primero las rutas, controladores, servicios de dominio y esquema Prisma existentes antes de añadir endpoints.
- Validar autenticación y autorización en el backend; una ocultación visual no es un control de permisos.
- No introducir Prisma, migraciones o APIs definitivas para mocks si la solicitud no lo requiere.
- No exponer secretos, tokens o credenciales en código, logs o documentación.
- Mantener validación de entrada y manejo centralizado de errores.

## Validación

Desde `frontend/`:

```sh
nvm use 20.20.2
npm run build
npm run lint:strict
```

Para cambios focalizados, ejecutar primero:

```sh
npx eslint 'src/routes/(app)/mipg-nuevo/**/*.svelte' 'src/lib/mipg-new-data.js'
npx prettier --check <archivos-modificados>
```

Desde la raíz:

```sh
git diff --check
git status --short --branch
```

Cuando exista servidor disponible, comprobar las rutas afectadas con `curl` y, si el cambio es interactivo, probar teclado, Escape, responsive y estados de overlay con Playwright.

No considerar válida una tarea solo porque compila: comprobar también la interacción solicitada, las rutas protegidas y la ausencia de regresiones en el área adyacente.

## Criterio de finalización

Una tarea está terminada cuando:

- El comportamiento solicitado está implementado en el lugar correcto.
- Se reutilizaron componentes existentes o se justificó el nuevo componente.
- No se duplicó lógica ni se rompieron fronteras protegidas.
- El código pasa las validaciones aplicables.
- Las rutas o flujos afectados fueron comprobados.
- El resumen final menciona cambios, validaciones y cualquier limitación restante.
