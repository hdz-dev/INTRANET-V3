# GIGA Design System

## Propósito

Este documento formaliza el lenguaje visual existente de la intranet Jamundí para usarlo como base de GIGA. No define una nueva identidad ni sustituye la validación funcional o de autorización del servidor.

## Implementación

- Tokens y utilidades globales: `src/app.css`.
- Tokens JavaScript: `src/lib/design-system/index.js`.
- Primitives compartidos existentes: `src/lib/components/`.
- Shell de aplicación: `src/routes/(app)/+layout.svelte`.

## Color

- Primario: `#4b6bfb`.
- Superficie base: blanco y escalas neutras OKLCH.
- Secundario: gris azulado.
- Accent: turquesa/verde.
- Estados: info, success, warning y error mediante tokens OKLCH de Tailwind.
- Los colores de estado deben comunicar significado y no ser el único indicador.

## Superficies y glassmorphism

- `glass`: fondo negro con 10% de opacidad, blur de 10px, borde blanco de 60% y sombra media.
- `glass-2`: misma superficie con blur visual reducido.
- `glass-3`: fondo blanco al 40%, borde neutro al 50%, blur medio y sombra ligera con transición de sombra.
- Usar glass sobre fondos con suficiente contraste. Evitar anidar superficies glass sin necesidad.

## Tipografía

La familia actual es Inter con fallbacks del sistema. Los tamaños principales son `text-xs` para metadatos, `text-sm` para controles y tablas, `text-lg`/`text-xl` para títulos de sección y `text-2xl`/`text-3xl` para encabezados destacados.

## Espaciado y radios

- Controles: radio base de `0.25rem`.
- Tarjetas: normalmente `rounded-xl`.
- Elementos destacados: `rounded-2xl`.
- Avatares, badges y controles circulares: `rounded-full`.
- Preferir escalas Tailwind `p-4`, `p-6`, `gap-4`, `gap-6` y `space-y-6`.
- Evitar alturas y anchos arbitrarios salvo que el contenido tenga formato fijo.

## Elevación y bordes

Usar bordes de 1px de baja intensidad y sombras suaves. El hover de tarjetas puede elevar la sombra, pero no debe alterar el tamaño ni desplazar contenido.

## Responsive

- `sm`: composición de tarjetas y formularios.
- `md`: cambio entre navegación móvil y sidebar/header de escritorio.
- `lg`: grids de dashboard y distribución de navegación.
- `xl`: densidad de indicadores y columnas amplias.

Todo contenido debe poder crecer verticalmente. Las tablas deben disponer de desplazamiento horizontal controlado y los modales deben ocupar el ancho disponible con un máximo razonable.

## Iconografía

El proyecto usa SVG locales, SVG inline, Font Awesome y Material Symbols. Para GIGA debe elegirse una estrategia única por área y cada icono interactivo debe tener nombre accesible. Los iconos decorativos deben usar `aria-hidden="true"`.

## Movimiento

- Rápido: 150ms.
- Estándar: 300ms.
- Usar transiciones para color, sombra y apertura de navegación.
- Evitar rebotes permanentes en controles de uso frecuente.
- `prefers-reduced-motion` está contemplado globalmente en `app.css`.

## Estados

Todo control interactivo debe definir hover, focus-visible, active y disabled cuando aplique. El focus debe conservar un indicador visible. Los estados de error y éxito deben incluir texto o una relación semántica, no solo color.

## Componentes

Los componentes actuales a consolidar son `Input`, `InputPassword`, `Select`, `Dropdown`, `Modal`, `Loader`, `Table`, calendarios, gráficos, navegación y tarjetas del dashboard. La nueva capa de permisos incluye `PermissionGate`, pero la autorización real siempre debe comprobarse en servidor.

## Accesibilidad

- Usar HTML semántico (`header`, `nav`, `main`, `section`, `footer`, `button`, `a`).
- Todos los botones de icono necesitan `aria-label`.
- Todas las imágenes informativas necesitan `alt` descriptivo.
- No usar `href="#"` para acciones.
- Los overlays deben poder cerrarse con Escape y no dejar el foco detrás del diálogo.
- Mantener contraste suficiente y soporte de teclado.
- No depender únicamente de `hover` ni del color.

## Reglas para agentes y desarrolladores

1. Reutilizar los tokens de `app.css` antes de añadir valores arbitrarios.
2. Mantener el glassmorphism existente cuando mejore la jerarquía visual; no aplicarlo a todo indiscriminadamente.
3. No añadir una librería UI completa para resolver un único control.
4. Separar datos, servicios y presentación.
5. No tratar la visibilidad de un botón como autorización.
6. Añadir estados loading, empty, error y disabled a los flujos que consuman API.
7. Verificar móvil, teclado, contraste y reduced motion antes de cerrar un componente.
