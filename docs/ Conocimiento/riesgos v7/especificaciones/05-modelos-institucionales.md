# Modelos institucionales — Integración con Gestión de Riesgos

## Propósito

Este documento define la integración conceptual entre Gestión Integral de Riesgos y los modelos institucionales de GIGA. Es una propuesta técnica previa: no constituye `schema.prisma`, no crea tablas y no ejecuta migraciones.

## Estado encontrado

El proyecto actual no contiene un `schema.prisma`, Prisma, PostgreSQL ni modelos persistentes institucionales. El proyecto original contiene datos frontend de referencia para dependencias y roles, pero esos arreglos no son entidades de dominio.

Por tanto, el módulo de riesgos no debe inventar copias locales de usuarios o procesos dentro de sus propios archivos. Debe definir las dependencias que el futuro modelo institucional deberá satisfacer.

## Principio de integración

```text
Usuario
  ├── Rol[]
  ├── Cargo
  └── Dependencia

Proceso
  └── MatrizRiesgos[]
          └── Riesgo[]
                  ├── Responsable → Usuario / Cargo
                  ├── TipologiaRiesgo
                  └── elementos de gestión
```

Las relaciones concretas deben apuntar a los modelos institucionales compartidos y no duplicarlos dentro de `riesgos`.

## Usuario

El usuario representa una identidad autenticable de GIGA.

Necesidades mínimas para riesgos:

```text
Usuario
├── id
├── nombre visible
├── correo / identificador de acceso
├── estado
├── cargoId opcional
├── dependenciaId opcional
└── roles[]
```

Un usuario puede ser responsable de un riesgo, control, tratamiento, acción, seguimiento, materialización o evidencia. La relación debe usar un identificador estable, no el nombre libre del funcionario.

La pantalla puede permitir seleccionar un usuario, pero el servidor debe comprobar que existe, está activo y puede asumir la responsabilidad correspondiente.

## Rol y permiso

La autorización debe distinguir identidad, rol y permiso:

```text
Usuario
   ↓
Rol
   ↓
Permiso
   ↓
Acción del módulo
```

Permisos preliminares:

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

Estos nombres no sustituyen la matriz institucional de seguridad. La visibilidad de un control en Svelte nunca será la única autorización.

## Cargo

El cargo representa una posición funcional de la estructura institucional. Es preferible relacionar responsables de controles con `Cargo` cuando la responsabilidad deba sobrevivir al cambio de funcionario.

Propuesta:

```text
Riesgo.responsableUsuarioId opcional
Riesgo.responsableCargoId opcional
Control.responsableUsuarioId opcional
Control.responsableCargoId opcional
```

No se deben imponer ambos campos como obligatorios simultáneamente hasta cerrar la regla institucional. Debe definirse si el responsable es una persona, un cargo o ambos.

## Dependencia

La dependencia representa una unidad organizacional. Puede contextualizar el proceso, subproceso y responsabilidad, pero no debe sustituir al proceso.

Relaciones pendientes de confirmar:

```text
Dependencia 1 ─── N Usuario
Dependencia 1 ─── N Cargo
Dependencia 1 ─── N Proceso   (si la organización lo permite)
```

El campo libre `subproceso/dependencia` del prototipo debe migrar a una relación o catálogo cuando exista la estructura institucional definitiva.

## Proceso

`Proceso` es un catálogo institucional reutilizable por diferentes módulos.

```text
Proceso
├── id
├── codigo
├── nombre
├── tipo
├── estado
└── dependencia propietaria opcional
```

La matriz lógica propone que una matriz de riesgos pertenezca a un proceso. Debe confirmarse si una matriz puede cubrir un solo proceso o varios procesos.

## Vigencia

`Vigencia` agrupa la planificación temporal institucional:

```text
Vigencia
├── id
├── anio
├── estado
└── metadatos de auditoría
```

Debe permitir conservar matrices de años diferentes sin modificar el significado histórico de los riesgos o valoraciones.

## MatrizRiesgos

La matriz es una agrupación administrativa y temporal, no una tabla con todas las columnas del formulario.

```text
MatrizRiesgos
├── id
├── vigenciaId
├── procesoId
├── version
├── estado
└── riesgos[]
```

Restricción propuesta:

```text
(vigenciaId, procesoId, version) UNIQUE
```

La regla debe confirmarse si existen matrices paralelas, versiones en revisión o matrices institucionales transversales.

## Relaciones de responsabilidad

Los elementos de riesgos que requieren responsable son:

```text
Riesgo
Control
Tratamiento
AccionTratamiento
Seguimiento
Materializacion
Evidencia
```

El contrato técnico deberá resolver para cada uno:

- usuario responsable;
- cargo responsable;
- dependencia responsable;
- responsable de revisión;
- responsable de aprobación.

No se recomienda guardar exclusivamente texto libre. Puede existir un campo de observación adicional para casos excepcionales.

## Relación con autorización

La autorización server-side deberá verificar como mínimo:

```text
Sesión válida
  ↓
Permiso requerido
  ↓
Alcance institucional
  ↓
Proceso / dependencia permitido
  ↓
Acción sobre el recurso
```

Un usuario con `risks.view` no necesariamente puede editar todos los riesgos. El alcance por proceso o dependencia debe definirse antes de implementar acciones server-side.

## Decisiones cerradas

- No crear `RiesgoFiscal` ni subtipos equivalentes.
- No duplicar `Usuario`, `Rol`, `Dependencia`, `Cargo` o `Proceso` dentro del módulo.
- `Riesgo` se relaciona con una tipología.
- `MatrizRiesgos` agrupa riesgos por vigencia y proceso.
- La matriz consolidada es una consulta o reporte.
- Los responsables deben usar relaciones institucionales cuando existan.

## Decisiones pendientes

1. Si el proyecto tendrá un único usuario por cargo vigente o historial de ocupantes.
2. Si un riesgo puede tener varios responsables.
3. Si un control puede tener responsable de ejecución y responsable de supervisión.
4. Si el proceso pertenece a una dependencia o puede cruzar dependencias.
5. Si una matriz puede ser transversal a varios procesos.
6. Qué roles y permisos ya existen o deben crearse.
7. Qué alcance institucional tiene cada permiso.
8. Si las evidencias tendrán almacenamiento documental propio o integración externa.
9. Qué política de auditoría aplica a cambios de responsables.
10. Si se requiere aprobación formal para publicar o cerrar una matriz.

## Impacto sobre Prisma

Cuando estas decisiones sean aprobadas, el esquema Prisma deberá:

- referenciar los modelos institucionales reales;
- evitar modelos duplicados;
- definir relaciones opcionales sólo donde el negocio lo permita;
- proteger códigos e identificadores con índices y restricciones;
- conservar referencias históricas;
- definir reglas `onDelete` compatibles con trazabilidad;
- separar catálogos metodológicos de datos capturados;
- mantener server-only el cliente Prisma.

No debe escribirse el esquema hasta confirmar los nombres y claves reales de los modelos institucionales.

## Siguiente paso

El siguiente entregable recomendado es una matriz de decisiones institucionales con respuestas aprobadas. Después podrá elaborarse el primer borrador de `schema.prisma`, aún sin migrar la base de datos.
