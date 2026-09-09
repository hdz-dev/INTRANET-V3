# GIGA — Fase 1: Backend, autenticación y administración

## Estado del documento

Este documento contiene la auditoría inicial y el modelo conceptual de la Fase 1. No define todavía el esquema Prisma ni crea tablas de base de datos. La siguiente etapa requiere revisión y aprobación.

## Alcance y límites

Esta fase cubre exclusivamente:

- Backend Express separado.
- PostgreSQL y Prisma.
- Autenticación segura.
- Sesiones persistidas.
- Autorización backend.
- Usuarios, dependencias, procesos, roles, permisos y sesiones.
- Administración de usuarios, roles, permisos, dependencias, procesos y sesiones.
- Pruebas de seguridad y preparación de despliegue.

No se modifican, conectan ni migran los formularios o servicios de MIPG. Las rutas, componentes y servicios actuales de riesgos, activos de información y demás módulos MIPG permanecen fuera del alcance.

## Auditoría inicial

### Estructura actual

- Frontend: SvelteKit 2, Svelte 5, JavaScript, Tailwind CSS 4 y Vite.
- Aplicación actual en un único proyecto, sin backend Express local separado.
- No existe `PLAN.md` previo.
- No existe carpeta `server/` de backend fuente.
- No hay configuración de Prisma ni migraciones.
- El paquete actual contiene dependencias principalmente de frontend.

### Login actual

El login está en `src/routes/login/+page.svelte` y usa `authUser()` desde `src/lib/api/auth.js`.

Actualmente:

- Envía `email` y `password` a `POST /login` mediante `VITE_MAIN_ENDPOINT`.
- Guarda la respuesta completa en `localStorage` con la clave `authToken`.
- Lee `TokenSesion` desde ese objeto y lo envía como `Authorization: Bearer`.
- Mantiene usuario, rol y estado en stores Svelte.
- Confía en `ExpirationDate` enviado por el backend.
- Redirige al inicio después de autenticar.

Riesgos actuales:

- El token se almacena en `localStorage`, por lo que queda expuesto ante XSS.
- No hay sesión persistida en PostgreSQL bajo control del proyecto.
- No hay revocación server-side verificable.
- No hay rotación de sesión ni protección CSRF implementada.
- El login no espera explícitamente el resultado de `authUser()` antes de mostrar el estado de autenticación.
- La recuperación de contraseña es una pantalla informativa sin flujo real.
- El cierre de sesión del perfil no está conectado al `logout()` actual.
- `src/lib/api/users.js` accede directamente a `localStorage` y usa Axios, separado del cliente común.

### Autorización actual

Existe una base visual y nominal reutilizable:

- `src/lib/permissions/permissions.js` define permisos simples como `users.manage`.
- `PermissionGate.svelte` oculta contenido según un arreglo de permisos del cliente.

Esto no constituye autorización segura porque:

- Los permisos proceden del estado del navegador.
- No existe validación equivalente obligatoria en un backend propio.
- No hay asignaciones por proceso o dependencia.
- No hay denegación por defecto centralizada en una API.
- No hay auditoría de cambios de permisos.

El componente podrá conservarse como ayuda de interfaz, pero nunca será la frontera de seguridad.

### Reutilización visual

Se pueden reutilizar:

- `app.css` y sus utilidades visuales.
- Componentes de entrada, contraseña, modal, header y perfil.
- Patrón visual glassmorphism y navegación existente.
- `apiRequest()` como referencia de contrato, no como implementación final de sesión.

La administración deberá seguir el lenguaje visual actual, pero no tocará las pantallas de negocio MIPG.

## Arquitectura propuesta

### Convención adoptada desde PAOC-BACK

La estructura del backend sigue ahora la convención observada en `PAOC-BACK`:

- `src/controllers/`: decisiones HTTP y coordinación de casos de uso.
- `src/routes/`: definición del contrato HTTP y delegación a controllers.
- `src/domain/`: capacidades de dominio reutilizables, como sesiones y auditoría.
- `src/middleware/`: autenticación, autorización, errores y políticas transversales.
- `src/infrastructure/`: Prisma, logger y adaptadores externos.
- `src/routes/main.routes.js`: composición central de rutas.

Las rutas no deben contener consultas Prisma ni lógica de negocio. Los controllers no deben montar rutas, y las capacidades reutilizables no deben depender de componentes Svelte.

Monorepo con aplicaciones separadas:

```text
/
├── frontend/ o src/                 # SvelteKit existente
├── backend/                         # Express + Prisma
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── routes/
│   │   │   └── main.routes.js
│   │   ├── domain/
│   │   ├── middleware/
│   │   ├── infrastructure/
│   │   └── app.js
│   ├── prisma/
│   └── package.json
├── package.json                      # workspace/orquestación
└── PLAN.md
```

La ubicación exacta de `frontend/` deberá decidirse según el costo de mover el SvelteKit actual. La opción conservadora es mantener el frontend en la raíz durante la primera transición y agregar `backend/` como aplicación hermana, sin mover rutas existentes.

## Modelo conceptual

Este modelo describe relaciones y reglas; no es todavía un esquema Prisma definitivo.

### Usuario

- Identidad institucional.
- Nombre y correo únicos.
- Estado: activo, suspendido o desactivado.
- Hash de contraseña Argon2id.
- Indicador de MFA requerido/habilitado.
- Dependencia principal.
- Metadatos de creación, actualización y último acceso.

Un usuario no recibe permisos directamente salvo una excepción administrativa explícitamente aprobada. Los accesos normales se derivan de asignaciones de roles.

### Dependencia

Unidad organizacional a la que pertenece un usuario y que puede agrupar procesos. Debe soportar estado activo y trazabilidad de cambios.

### Proceso

Proceso institucional que delimita el alcance operativo de un rol. Debe poder asociarse a una dependencia y mantenerse independiente de las entidades de negocio MIPG.

### Módulo

Recurso funcional protegido por permisos, por ejemplo Administración, Usuarios, Roles, Permisos o Sesiones. Los módulos MIPG no se implementan ni se conectan en esta fase, aunque el modelo debe permitir registrarlos posteriormente.

### Permiso

Acción mínima sobre un módulo, por ejemplo:

- `users.read`
- `users.create`
- `users.update`
- `users.disable`
- `roles.read`
- `roles.assign`
- `permissions.manage`
- `sessions.revoke`
- `audit.read`

La autorización debe aplicar mínimo privilegio y denegación por defecto.

### Rol

Conjunto configurable de permisos. Debe incluir:

- Nombre y descripción.
- Estado.
- Indicador de rol crítico/protegido.
- Permisos asociados.
- Alcance global o limitado a procesos/dependencias.

Los roles críticos no se eliminan físicamente desde la interfaz; sus permisos requieren protección adicional y auditoría.

### Asignación de rol

Relación entre usuario y rol con alcance:

- Global.
- Dependencia específica.
- Proceso específico.
- Dependencia + proceso.

Debe incluir vigencia opcional, estado, creador, fecha y auditoría. El backend resolverá los permisos efectivos en cada solicitud, sin confiar en un rol enviado por el navegador.

### Sesión

Sesión persistida en PostgreSQL con:

- Identificador interno.
- Token opaco aleatorio almacenado únicamente como hash.
- Usuario propietario.
- Fecha de creación y expiración.
- Última actividad.
- Revocación y motivo.
- IP y user-agent normalizados según política de privacidad.

El navegador recibirá una cookie `HttpOnly`, `Secure` en producción y `SameSite` definido según el despliegue. No se almacenarán tokens de sesión en `localStorage`.

### Recuperación de contraseña

Debe modelarse como token de un solo uso, almacenado como hash, con expiración corta, invalidación al consumirlo y auditoría. No se revelará si un correo existe.

### Auditoría

Registro append-only para eventos sensibles:

- Inicio de sesión exitoso o fallido.
- Cierre y revocación de sesión.
- Cambio y recuperación de contraseña.
- Alta, edición, activación y desactivación de usuarios.
- Asignación o retiro de roles.
- Cambios de permisos, procesos y dependencias.
- Cambios de configuración de MFA.

## Autenticación y seguridad propuesta

- Argon2id para contraseñas.
- Tokens de sesión opacos, aleatorios y rotables.
- Cookies HttpOnly, Secure y SameSite.
- CSRF para solicitudes mutables basadas en cookie.
- CORS con allowlist explícita del frontend.
- Helmet/cabeceras de seguridad.
- Rate limiting global y límites más estrictos para login, recuperación y cambio de contraseña.
- Respuestas uniformes para evitar enumeración de usuarios.
- Bloqueo o enfriamiento progresivo contra fuerza bruta.
- Límites de tamaño de body y validación estricta de entrada.
- Secretos únicamente por variables de entorno o gestor externo.
- Logs estructurados sin contraseñas, tokens ni datos sensibles.
- MFA preparado para administradores y roles críticos.
- Revocación de todas las sesiones tras eventos de seguridad definidos.

## API conceptual inicial

No se implementa todavía. Rutas candidatas:

- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/me`
- `POST /api/auth/password/recovery-request`
- `POST /api/auth/password/reset`
- `POST /api/auth/password/change`
- `GET /api/admin/users`
- `POST /api/admin/users`
- `PATCH /api/admin/users/:id`
- `POST /api/admin/users/:id/disable`
- `GET /api/admin/roles`
- `POST /api/admin/roles`
- `PATCH /api/admin/roles/:id`
- `POST /api/admin/roles/:id/permissions`
- `GET /api/admin/permissions`
- `GET/POST/PATCH /api/admin/dependencies`
- `GET/POST/PATCH /api/admin/processes`
- `GET /api/admin/sessions`
- `POST /api/admin/sessions/:id/revoke`
- `GET /api/admin/audit`

Todas las rutas administrativas deben verificar autenticación, permiso y alcance en backend.

## Etapas de implementación

### Etapa 0 — Revisión y decisiones

- Revisar este documento.
- Confirmar ubicación del backend.
- Confirmar nombres y datos institucionales mínimos.
- Aprobar modelo conceptual.
- Aprobar política de roles críticos y MFA.
- No crear Prisma todavía.

### Etapa 1 — Backend base

- Crear `backend/` independiente.
- Express, configuración por entorno, logs, errores y validación.
- PostgreSQL y Prisma.
- Generar el esquema solo después de aprobar el modelo.
- Migración inicial y seed controlado.

### Etapa 2 — Autenticación

- Login, logout, sesión actual.
- Hash Argon2id.
- Cookies y CSRF.
- Recuperación y cambio de contraseña.
- Rate limiting y protección contra enumeración.

### Etapa 3 — Autorización

- Middleware de sesión.
- Resolución de permisos efectivos.
- Alcance global/dependencia/proceso.
- Denegación por defecto.
- Auditoría de decisiones sensibles.

### Etapa 4 — Administración frontend

- Usuarios.
- Roles y permisos.
- Dependencias y procesos.
- Sesiones activas y revocación.
- Integración mínima del login existente.
- Sin conectar formularios ni servicios MIPG.

### Etapa 5 — Pruebas y despliegue

- Tests de autenticación y autorización.
- Aislamiento entre procesos.
- Revocación y expiración.
- Rate limiting.
- Validación de entrada.
- Migraciones de producción, HTTPS/Nginx, backups y despliegue separado.

## Criterios de aceptación de esta fase

- Un usuario no autenticado no puede acceder a administración.
- Un usuario autenticado sin permiso recibe denegación uniforme.
- El backend valida todos los permisos, aunque el frontend oculte botones.
- Las sesiones pueden expirar y revocarse server-side.
- No existen tokens de sesión en `localStorage`.
- Las contraseñas nunca aparecen en logs ni respuestas.
- Los roles pueden limitarse por proceso y dependencia.
- Los cambios administrativos quedan auditados.
- Las rutas y formularios MIPG siguen funcionando sin cambios de negocio.

## Decisiones pendientes para aprobación

1. ¿Se mantiene el frontend actual en la raíz y se agrega `backend/`, o se reorganiza en `frontend/` y `backend/`?
2. ¿Cuál será el dominio/origen permitido para frontend y backend en desarrollo y producción?
3. ¿Qué identificador institucional será obligatorio para usuarios: correo, documento o ambos?
4. ¿Qué roles son críticos y requieren MFA obligatorio desde la primera versión?
5. ¿Los administradores globales pueden asignar roles en cualquier proceso o se requiere doble aprobación?
6. ¿Qué datos de IP/user-agent pueden conservarse según la política institucional de privacidad?
7. ¿Qué proveedor se usará para correo de recuperación de contraseña?
8. ¿Se aprueba el catálogo inicial de permisos propuesto?

## Regla de trabajo

Hasta que este documento sea revisado y aprobado:

- No crear el esquema definitivo de Prisma.
- No ejecutar migraciones.
- No crear tablas de negocio MIPG.
- No conectar riesgos, activos de información ni otros formularios MIPG a la API.
- No modificar la lógica de negocio ni las interfaces actuales de MIPG.
