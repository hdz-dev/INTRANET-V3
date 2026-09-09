# Contrato técnico — Gestión Integral de Riesgos

## Propósito

Este documento traduce la especificación funcional y el modelo lógico en límites técnicos para una futura implementación dentro del proyecto principal GIGA. No define todavía `schema.prisma`, endpoints productivos ni migraciones.

## Alcance inicial

El módulo gestionará una única entidad principal: `Riesgo`. La tipología será un catálogo relacionado que activa campos, validaciones y reglas metodológicas. Las tipologías iniciales son:

- Gestión.
- Fiscal.
- Seguridad de la Información.
- Integridad Pública.

`LA/FT` permanece pendiente de definición dentro del marco de Integridad Pública.

## Casos de uso

### Consulta

- Consultar el resumen del módulo.
- Consultar la matriz consolidada.
- Filtrar por vigencia, proceso, tipología, zona y estado.
- Consultar el detalle de un riesgo.
- Consultar el historial de valoraciones, controles y seguimientos.

### Identificación

- Crear un riesgo en estado borrador.
- Seleccionar proceso y responsable institucional.
- Seleccionar tipología.
- Registrar causas y descripción.
- Registrar afectaciones generales o fiscales.
- Registrar información específica de Seguridad de la Información.

### Valoración

- Registrar la información requerida para probabilidad e impacto.
- Crear una valoración inherente independiente.
- Asociar controles múltiples.
- Crear una valoración residual sin sobrescribir la inherente.
- Conservar la explicación y versión metodológica aplicada.

### Tratamiento y seguimiento

- Registrar una decisión de tratamiento.
- Registrar acciones de tratamiento múltiples.
- Registrar seguimientos múltiples.
- Registrar materializaciones.
- Asociar evidencias a controles, acciones, seguimientos y materializaciones.
- Solicitar una nueva valoración sin eliminar el histórico.

## Contrato conceptual de datos

La representación de entrada del formulario debe ser estructurada y no un JSON monolítico:

```text
RiesgoInput
├── identificación
│   ├── código institucional opcional
│   ├── fecha
│   ├── matriz
│   ├── proceso
│   ├── subproceso
│   └── responsable
├── tipología
├── afectaciones[]
├── causas[]
├── descripción
├── datos específicos
│   ├── análisis fiscal
│   └── análisis de seguridad
├── valoración inherente
├── controles[]
├── valoración residual
├── tratamiento
├── acciones[]
├── seguimientos[]
├── materializaciones[]
└── evidencias[]
```

Los resultados calculados no deben ser aceptados ciegamente desde el navegador. El servidor deberá recalcularlos y validarlos cuando exista una metodología aprobada.

## Respuesta de consulta

Una consulta de riesgo deberá poder exponer:

```text
RiesgoView
├── identificador interno
├── código institucional
├── proceso
├── responsable resumido
├── tipología
├── descripción
├── estado
├── valoración inherente
├── valoración residual
├── controles resumidos
├── tratamiento resumido
├── último seguimiento
└── metadatos de auditoría
```

La matriz consolidada será una proyección de esta información, no un modelo de almacenamiento independiente.

## Límites de arquitectura

```text
Ruta SvelteKit
    ↓
load / action / endpoint server
    ↓
RiesgoService
    ↓
RiesgoRules
    ↓
RiesgoRepository
    ↓
Prisma
    ↓
PostgreSQL
```

- Los componentes Svelte no importarán Prisma.
- Las reglas metodológicas no vivirán exclusivamente en componentes.
- La autorización deberá comprobarse en servidor.
- El cliente no decidirá por sí solo el responsable autorizado.
- Los catálogos metodológicos deberán ser consultables y versionables.
- El servicio será la frontera para sustituir mocks por PostgreSQL.

## Organización propuesta

```text
src/lib/server/
├── db/
│   └── prisma.js
├── auth/
├── permissions/
├── riesgos/
│   ├── riesgo.service.js
│   ├── riesgo.repository.js
│   ├── riesgo.rules.js
│   ├── riesgo.validation.js
│   ├── riesgo.mappers.js
│   └── riesgo.constants.js
└── shared/
```

La ruta podrá organizarse como:

```text
src/routes/(app)/mipg/gestion-riesgos/
├── +page.server.js
├── +page.svelte
├── nuevo/
├── [id]/
├── matriz/
└── metodologia/
```

## Errores y estados

El contrato deberá distinguir como mínimo:

- `400`: datos inválidos.
- `401`: sesión ausente o inválida.
- `403`: permiso insuficiente.
- `404`: riesgo o catálogo inexistente.
- `409`: conflicto de versión o código duplicado.
- `422`: regla metodológica no aplicable.
- `500`: error inesperado del servidor.

La interfaz deberá contemplar `loading`, `empty`, `error`, `readonly` y `success`.

## Permisos preliminares

Los nombres son provisionales y no sustituyen la autorización server-side:

```text
risks.view
risks.create
risks.edit
risks.evaluate
risks.manage-controls
risks.manage-treatment
risks.follow-up
risks.view-history
risks.manage-catalogs
```

## Reglas que no se deben implementar todavía

- Fórmula definitiva de múltiples controles.
- Reducción de probabilidad e impacto.
- Matriz oficial de severidad si no están verificadas sus 25 combinaciones.
- Reglas específicas de Integridad Pública.
- Clasificación independiente de LA/FT.
- Reglas fiscales definitivas.
- Tratamiento automático por zona.
- Periodicidad fija de seguimiento.

## Criterios de aceptación de la siguiente fase

- Los modelos institucionales existentes están identificados y aprobados.
- El esquema de responsabilidades está cerrado.
- La matriz de severidad oficial está validada.
- El algoritmo residual está aprobado.
- Los permisos iniciales están asignados a roles.
- El modelo lógico se ha revisado contra este contrato.
- `schema.prisma` se diseña después de estas aprobaciones.

## Próximo entregable

El siguiente paso técnico será una revisión y aprobación del contrato, seguida por el diseño de modelos institucionales y el esquema Prisma. No se deberán ejecutar migraciones hasta aprobar ambos artefactos.
