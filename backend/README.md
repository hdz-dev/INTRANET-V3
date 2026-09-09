# GIGA Backend

Backend independiente de GIGA construido con Node.js, Express, JavaScript, PostgreSQL y Prisma.

Este backend proporciona autenticación, sesiones, autorización y administración de usuarios. Los módulos de negocio de MIPG permanecen fuera de este backend durante la Fase 1.

## Alcance

Incluye:

- Autenticación y logout.
- Sesiones persistidas en PostgreSQL.
- Cookies `HttpOnly`, `Secure` en producción y `SameSite`.
- Contraseñas protegidas con Argon2id.
- Roles, permisos y asignaciones por alcance.
- Usuarios, dependencias y procesos.
- Sesiones activas y revocación.
- Auditoría de acciones administrativas.
- Rate limiting, CORS restringido, Helmet y validación con Zod.

No incluye ni debe incluir en esta fase:

- Tablas de negocio MIPG.
- Lógica de riesgos, activos de información, FURAG, autodiagnósticos o planes de acción.
- Conexión de formularios MIPG a la API.
- Reglas metodológicas de módulos MIPG.

## Arquitectura

La estructura sigue la convención de `PAOC-BACK`:

```text
backend/
├── src/
│   ├── config/              # Variables de entorno y configuración
│   ├── controllers/         # Casos de uso HTTP y respuestas
│   ├── routes/              # Contratos HTTP y montaje de rutas
│   │   └── main.routes.js   # Composición central de rutas
│   ├── domain/              # Capacidades reutilizables del dominio
│   │   ├── auth/            # Sesiones y cookies
│   │   └── audit/           # Registro de auditoría
│   ├── middleware/          # Auth, permisos, errores y políticas transversales
│   ├── infrastructure/      # Prisma, logger y adaptadores externos
│   ├── app.js               # Configuración de Express
│   └── server.js            # Arranque y apagado del servidor
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.js
├── .env.example
├── package.json
└── README.md
```

### Reglas de dependencias

- `routes/` solo define rutas y delega en controllers.
- `controllers/` coordina entrada, validación, dominio, persistencia y respuesta HTTP.
- `domain/` no depende de Svelte ni de componentes frontend.
- `middleware/` implementa políticas transversales y no contiene lógica de presentación.
- `infrastructure/` encapsula Prisma, logging y servicios externos.
- Las consultas Prisma no deben escribirse directamente en archivos de rutas.
- Toda autorización debe validarse en backend; ocultar botones en frontend no es seguridad.
- Las nuevas capacidades deben incorporarse en capas equivalentes, no mediante lógica monolítica en `app.js`.

## Requisitos

- Node.js LTS, preferiblemente Node 20 o superior.
- npm.
- PostgreSQL compatible con Prisma.
- Variables de entorno configuradas en `backend/.env`.

## Instalación

Desde esta carpeta:

```bash
npm install
cp .env.example .env
```

Completa `DATABASE_URL` y revisa el resto de variables antes de iniciar.

Nunca subas `.env` al repositorio ni incluyas contraseñas en documentación, logs o commits.

## Variables de entorno

```env
NODE_ENV=development
PORT=4000
DATABASE_URL=postgresql://usuario:password@localhost:5432/giga
FRONTEND_ORIGIN=http://localhost:5173
SESSION_COOKIE_NAME=giga_session
SESSION_TTL_DAYS=7
COOKIE_SECURE=false
LOG_LEVEL=info
```

En producción:

- Usa `NODE_ENV=production`.
- Usa `COOKIE_SECURE=true`.
- Sirve la API exclusivamente mediante HTTPS.
- Restringe `FRONTEND_ORIGIN` al dominio real del frontend.
- Usa secretos administrados, no archivos `.env` distribuidos manualmente.

## Comandos

```bash
npm install
npm run prisma:generate
npm run dev
npm start
```

Validación del schema sin modificar la base:

```bash
DATABASE_URL="..." npm exec prisma validate
```

Generar el cliente Prisma:

```bash
npm run prisma:generate
```

Crear una migración en desarrollo:

```bash
./node_modules/.bin/prisma migrate dev --name nombre_de_la_migracion --skip-seed
```

Aplicar migraciones versionadas en producción:

```bash
./node_modules/.bin/prisma migrate deploy
```

Ejecutar el seed de roles y permisos:

```bash
npm run prisma:seed
```

No usar `prisma db push` en entornos compartidos o productivos. Las modificaciones de estructura deben pasar por migraciones revisables.

## API

Base local:

```text
http://localhost:4000
```

Health check:

```http
GET /health
```

### Autenticación

```http
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/me
POST /api/auth/password/change
```

El login establece una cookie de sesión `HttpOnly`. El cliente no debe almacenar tokens de sesión en `localStorage` ni `sessionStorage`.

Ejemplo de login:

```json
{
  "email": "admin@example.com",
  "password": "una-contrasena-segura"
}
```

Las respuestas de credenciales inválidas deben ser uniformes para evitar enumeración de usuarios.

El cambio de contraseña requiere la contraseña actual, una nueva contraseña de al menos 12 caracteres y revoca las demás sesiones activas del usuario.

### Administración

```http
GET   /api/admin/users
POST  /api/admin/users
PATCH /api/admin/users/:id/status
POST  /api/admin/users/:id/roles

GET /api/admin/roles
GET /api/admin/permissions
GET /api/admin/dependencies
GET /api/admin/processes
GET /api/admin/sessions
POST /api/admin/sessions/:id/revoke
GET /api/admin/audit
```

Las rutas administrativas requieren:

1. Sesión válida.
2. Usuario activo.
3. Permiso específico para la operación.
4. Alcance válido cuando aplique dependencia o proceso.

## Autenticación y sesiones

- Las contraseñas se almacenan como hashes Argon2id.
- Los tokens de sesión son aleatorios y opacos.
- Solo se almacena el hash del token en PostgreSQL.
- El token de sesión viaja en cookie `HttpOnly`.
- Las sesiones tienen expiración y pueden revocarse.
- Logout revoca la sesión actual en el backend.
- Los usuarios suspendidos o desactivados no pueden iniciar sesión.
- El backend no confía en roles enviados por el navegador.

## Autorización

La autorización usa permisos mínimos y denegación por defecto.

Ejemplos:

```text
users.read
users.create
users.update
users.disable
roles.read
roles.manage
permissions.read
sessions.read
sessions.revoke
audit.read
dependencies.read
processes.read
```

Las asignaciones de roles pueden tener estos alcances:

```text
GLOBAL
DEPENDENCY
PROCESS
DEPENDENCY_PROCESS
```

Una asignación debe referenciar los recursos requeridos por su alcance. El backend debe validar que esos recursos existan y estén activos.

## Auditoría

Las acciones sensibles deben registrar un `AuditEvent`, incluyendo:

- Inicio de sesión y eventos de autenticación.
- Creación y cambios de usuarios.
- Asignación de roles.
- Revocación de sesiones.
- Cambios de permisos.
- Cambios de dependencias y procesos.

No registrar contraseñas, tokens, cookies ni secretos en `metadata` o logs.

## Seed inicial

El seed crea los módulos, permisos y roles predeterminados:

- Superadministrador.
- Administrador.
- Responsable de proceso.
- Gestor.
- Segunda línea.
- Control Interno.
- Consulta.

Para crear un administrador inicial, define temporalmente variables seguras en el entorno:

```env
SEED_ADMIN_EMAIL=admin@example.com
SEED_ADMIN_PASSWORD=una-contrasena-larga-y-unica
```

Después del seed, elimina esas variables del entorno compartido.

## Frontend

El frontend SvelteKit se ejecuta como aplicación independiente. Debe apuntar al backend mediante:

```env
VITE_MAIN_ENDPOINT=http://localhost:4000
```

Las peticiones autenticadas deben usar:

```javascript
fetch(url, { credentials: 'include' });
```

No se debe reintroducir `Authorization: Bearer` basado en tokens almacenados en el navegador mientras la API use cookies HttpOnly.

## Pruebas mínimas

Antes de integrar nuevos cambios:

```bash
find src prisma -name '*.js' -print0 | xargs -0 -n1 node --check
DATABASE_URL="..." npm exec prisma validate
npm run prisma:generate
```

También debe comprobarse:

- `GET /health` devuelve HTTP 200.
- Login válido crea una sesión.
- Credenciales inválidas devuelven una respuesta uniforme.
- Logout revoca la sesión.
- Un usuario sin permiso recibe HTTP 403.
- Un usuario no autenticado recibe HTTP 401.
- Una sesión revocada no puede usarse.
- La revocación y los cambios administrativos quedan auditados.

## Despliegue

El backend y el frontend deben desplegarse de forma independiente.

Recomendaciones:

- Reverse proxy HTTPS mediante Nginx o plataforma equivalente.
- `COOKIE_SECURE=true` en producción.
- CORS limitado al origen del frontend.
- Migraciones ejecutadas antes de iniciar una nueva versión.
- Backups de PostgreSQL verificados periódicamente.
- Logs estructurados enviados a un sistema centralizado.
- Health check separado de endpoints autenticados.
- Rotación de secretos y credenciales comprometidas.

## Límites de esta fase

No añadir lógica de negocio MIPG en este backend durante la Fase 1. Cualquier módulo posterior deberá definir su propio dominio y contratos después de completar la base de autenticación, autorización y administración.
