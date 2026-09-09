# Guía de frontend

## Stack

- SvelteKit con Vite.
- Tailwind CSS v4 mediante `@tailwindcss/vite`.
- JavaScript, salvo que una migración posterior establezca TypeScript.
- Svelte 5 con compatibilidad para componentes legacy existentes.

## Lenguaje visual GIGA

- Color primario: `#4b6bfb`, expuesto por el tema como `primary`.
- Usar neutros OKLCH y tokens de estado para info, success, warning y error.
- Los estados no deben comunicarse únicamente mediante color; añadir texto, icono o relación semántica.
- Usar `glass`, `glass-2` y `glass-3` solo cuando mejoren la jerarquía visual. Evitar anidar superficies glass sin necesidad.
- `glass-3` es la superficie preferida para paneles administrativos y módulos sobre el fondo global.
- Mantener Inter y sus fallbacks existentes: `text-xs` para metadatos, `text-sm` para controles y tablas, `text-lg`/`text-xl` para secciones y `text-2xl`/`text-3xl` para encabezados.
- Preferir `rounded-xl` para tarjetas, `rounded-2xl` para superficies destacadas y `rounded-full` para avatares, badges y toggles.
- Preferir `p-4`, `p-6`, `gap-4`, `gap-6` y `space-y-6`. Evitar dimensiones arbitrarias salvo formatos fijos.

## Tailwind y CSS

- Usar clases utilitarias de Tailwind directamente en los componentes.
- No crear bloques `<style>` locales para layout, formularios, tablas, botones, estados, modales o espaciado.
- No añadir clases CSS locales como `.admin-input`, `.modal-header` o `.icon-action` si el estilo puede expresarse con Tailwind.
- Reservar `src/app.css` para tokens globales, fondo de aplicación, accesibilidad global y utilidades compartidas.
- Usar `@theme` y `@utility` en `app.css` solo para valores reutilizables por varias áreas.
- Preferir `bg-primary`, `text-primary`, `border-primary` y escalas neutras frente a valores hexadecimales repetidos.
- Mantener el glassmorfismo existente sin duplicar sus reglas en cada página.

## Layout y Responsive

- El shell compartido vive en `src/routes/(app)/+layout.svelte` y contiene header, sidebar y footer.
- Login y rutas públicas no deben heredar el sidebar de la aplicación.
- Header global: `z-50`.
- Sidebar de escritorio: `z-40`, debajo del header y separado mediante `top`/`bottom`.
- Menús móviles: `z-50`.
- Backdrops y modales: `z-[70]`.
- Usar `sm`, `md`, `lg` y `xl` para transformar progresivamente la composición, no para ocultar contenido esencial.
- Las tablas deben envolverse en `overflow-x-auto`.
- Las tablas administrativas deben usar un `min-w-*` razonable, padding horizontal y vertical en `th`/`td`, encabezados alineados y filas separadas visualmente; nunca dejar el contenido pegado al borde del panel.
- Definir anchos relativos para columnas largas como usuario, dependencia y acciones; no permitir que el navegador comprima todos los campos por igual.
- Los modales deben usar `w-full` con un `max-w-*` razonable y scroll interno cuando su contenido crezca.
- Verificar como mínimo 375px, 768px y escritorio amplio.

## Formularios y Estados

- Todo control debe contemplar `default`, `hover`, `focus-visible`, `error`, `disabled` y `loading` cuando aplique.
- Patrón recomendado para campos: `rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/25`.
- Las labels deben ser visibles y estar asociadas semánticamente con su control.
- Los placeholders complementan la label; no la sustituyen.
- Mostrar errores junto al campo y un resumen o alerta cuando el formulario tenga varios errores.
- Validar en frontend para feedback inmediato y en backend como autoridad definitiva.
- Los formularios administrativos deben representar documento, nombre, correo, contraseña, dependencia, área, rol y alcance cuando sean requisitos del dominio.
- Los botones deben declarar `type="button"` salvo los botones `submit`.

## Tablas, CRUD y API

- Toda tabla debe tener estados loading, empty, error y loaded.
- Las acciones de tabla deben tener `aria-label`, `title` cuando sean iconos y estado `disabled` mientras se ejecuta la operación.
- Las operaciones optimistas deben guardar el estado anterior y restaurarlo si la API falla.
- Las eliminaciones requieren confirmación explícita, mensaje de resultado y rollback visual si corresponde.
- Separar presentación, estado y llamadas HTTP; preferir servicios en `src/lib/api` para lógica reutilizable.
- No simular respuestas exitosas ni crear botones para endpoints que no existen.
- Manejar explícitamente `401`, `403`, `404`, `409` y `500`.
- La UI refleja permisos, pero la autorización siempre se comprueba en el backend.
- Las operaciones administrativas deben registrar auditoría en el servidor.

## Modales y Overlays

- Usar `role="dialog"` y `aria-modal="true"`.
- Cerrar con Escape, botón visible y backdrop cuando corresponda.
- No cerrar al pulsar dentro del contenido del modal.
- Mover el foco al abrir y devolverlo al control que lo abrió al cerrar.
- No permitir interacción con contenido detrás del modal.
- Mostrar errores y estados de guardado dentro del modal sin perder los valores introducidos.

## Iconografía y Accesibilidad

- Para nuevas interfaces elegir una estrategia coherente por área: preferentemente SVG inline o una única librería.
- Mantener Font Awesome y SVG heredados solo donde sustituirlos implique riesgo funcional.
- Los iconos decorativos deben tener `aria-hidden="true"`.
- Los botones de icono necesitan `aria-label` y `title` si la acción no es evidente.
- Usar HTML semántico: `header`, `nav`, `main`, `section`, `footer`, `button` y `a`.
- No usar `href="#"` para acciones; usar botones o rutas reales.
- Verificar navegación por teclado, focus visible, contraste y `prefers-reduced-motion`.
- Los overlays deben poder cerrarse con teclado y no dejar el foco detrás del diálogo.

## Movimiento y Performance

- Movimiento rápido: `150ms`; estándar: `300ms`.
- Animar color, sombra, opacidad y apertura; evitar rebotes permanentes en controles de uso frecuente.
- Respetar `prefers-reduced-motion` definido globalmente en `app.css`.
- No usar animaciones para ocultar errores o retrasar acciones críticas.
- Evitar cargar imágenes o librerías pesadas si el componente no está visible.

## Arquitectura

- Tokens y utilidades globales: `src/app.css`.
- Tokens JavaScript: `src/lib/design-system/index.js` cuando estén disponibles.
- Primitives compartidos: `src/lib/components`.
- API y servicios: `src/lib/api` y `src/lib/services`.
- Permisos de interfaz: `PermissionGate` o equivalentes, sin sustituir la autorización del servidor.
- Reutilizar `Input`, `InputPassword`, `Select`, `Dropdown`, `Modal`, `Loader`, `Table` y primitives existentes antes de crear duplicados.
- Mantener separadas presentación, estado, servicios y autorización.

## Validación y calidad

Desde `frontend`:

```sh
nvm use 20.20.2
npm run build
npm run dev
git diff --check
```

Antes de finalizar cambios de UI:

1. Verificar las rutas afectadas por HTTP o navegador.
2. Revisar errores de Svelte y consola.
3. Probar estados loading, empty, error, disabled y permisos insuficientes.
4. Probar móvil, teclado, contraste y reduced motion.
5. Confirmar que las operaciones optimistas tienen rollback.

No editar `.svelte-kit`, `node_modules` ni archivos generados manualmente. No añadir una librería UI completa para resolver un solo control.
