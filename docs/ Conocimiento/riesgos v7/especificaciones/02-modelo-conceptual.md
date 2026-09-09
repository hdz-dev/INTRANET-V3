# Modelo conceptual — Gestión Integral de Riesgos

## 1. Propósito

Este documento transforma la especificación funcional del módulo de Gestión Integral de Riesgos de GIGA en un modelo conceptual.

Define:

- entidades;
- responsabilidades;
- relaciones;
- cardinalidades;
- información común;
- información específica por tipología.

No define todavía tablas, tipos SQL, claves foráneas ni modelos Prisma.

---

# 2. Vista general

```text
Vigencia
   │
   └── MatrizRiesgos
          │
          └── Riesgo[]
                 │
                 ├── Proceso
                 ├── Responsable
                 ├── TipologiaRiesgo
                 ├── CausaRiesgo[]
                 ├── ValoracionRiesgo[]
                 ├── Control[]
                 ├── Tratamiento
                 │      └── AccionTratamiento[]
                 ├── Seguimiento[]
                 └── Materializacion[]
```

Además existirán datos específicos asociados al riesgo cuando su tipología lo requiera.

---

# 3. Vigencia

Representa el periodo institucional al cual pertenece una matriz.

Ejemplos:

```text
2026
2027
2028
```

Relación:

```text
Vigencia 1 ───── N MatrizRiesgos
```

Permite conservar históricamente las matrices de diferentes periodos.

---

# 4. MatrizRiesgos

Representa una matriz institucional de riesgos dentro de una vigencia.

Contendrá conceptualmente:

```text
MatrizRiesgos
├── Vigencia
├── Proceso
├── Versión
├── Estado
└── Riesgo[]
```

Relaciones:

```text
Vigencia     1 ───── N MatrizRiesgos
Proceso      1 ───── N MatrizRiesgos
MatrizRiesgos 1 ──── N Riesgo
```

La matriz consolidada mostrada al usuario será una representación de esta información y no una tabla física con todas las columnas del formulario.

---

# 5. Proceso

Representa un proceso institucional.

Ejemplo:

```text
Proceso
├── Código
├── Nombre
├── Tipo
└── Estado
```

Podrá ser reutilizado posteriormente por otros módulos de GIGA.

Relación principal:

```text
Proceso 1 ───── N MatrizRiesgos
```

El riesgo podrá conocer su proceso a través de la matriz a la que pertenece.

---

# 6. Riesgo

Es la entidad central del modelo.

```text
Riesgo
├── Código
├── FechaIdentificacion
├── Descripción
├── Estado
├── Responsable
└── TipologiaRiesgo
```

Relaciones:

```text
MatrizRiesgos   1 ───── N Riesgo
TipologiaRiesgo 1 ───── N Riesgo

Riesgo 1 ───── N CausaRiesgo
Riesgo 1 ───── N ValoracionRiesgo
Riesgo 1 ───── N Control
Riesgo 1 ───── 0..1 Tratamiento
Riesgo 1 ───── N Seguimiento
Riesgo 1 ───── N Materializacion
```

Todos los riesgos utilizan esta misma entidad.

No existirán entidades como:

```text
RiesgoGestion
RiesgoFiscal
RiesgoSeguridad
RiesgoIntegridad
```

---

# 7. TipologiaRiesgo

Representa la clasificación metodológica del riesgo.

Inicialmente:

```text
Gestión
Fiscal
Seguridad de la Información
Integridad Pública
```

Conceptualmente:

```text
TipologiaRiesgo
├── Nombre
├── Descripción
└── Estado
```

Relación:

```text
TipologiaRiesgo 1 ───── N Riesgo
```

La tipología determina qué información específica y reglas son aplicables.

---

# 8. CausaRiesgo

Las causas serán elementos independientes asociados al riesgo.

```text
CausaRiesgo
├── Tipo
├── Descripción
└── Orden
```

El tipo podrá diferenciar inicialmente:

```text
INMEDIATA
RAIZ
```

Relación:

```text
Riesgo 1 ───── N CausaRiesgo
```

Esto permite que un riesgo pueda tener varias causas sin incorporarlas todas dentro de un único texto.

---

# 9. Datos específicos de Seguridad de la Información

Cuando:

```text
TipologiaRiesgo =
Seguridad de la Información
```

el riesgo podrá tener un análisis específico.

```text
AnalisisSeguridadInformacion
├── ActivoInformacion
├── Confidencialidad
├── Integridad
└── Disponibilidad
```

Relación:

```text
Riesgo 1 ───── 0..1 AnalisisSeguridadInformacion
```

Este análisis podrá relacionarse con:

```text
Amenaza[]
Vulnerabilidad[]
```

Por tanto:

```text
Riesgo
  │
  └── AnalisisSeguridadInformacion
          ├── ActivoInformacion
          ├── C / I / D
          ├── Amenaza[]
          └── Vulnerabilidad[]
```

El análisis pertenece al mismo `Riesgo`; no constituye un subtipo de riesgo.

---

# 10. Amenaza

Representa una amenaza identificada durante el análisis de Seguridad de la Información.

```text
Amenaza
├── Nombre
├── Descripción
└── Estado
```

Un análisis podrá tener una o varias amenazas.

---

# 11. Vulnerabilidad

Representa una vulnerabilidad relacionada con el riesgo de Seguridad de la Información.

```text
Vulnerabilidad
├── Nombre
├── Descripción
└── Estado
```

Un análisis podrá contener múltiples vulnerabilidades.

---

# 12. Datos específicos de riesgo Fiscal

Cuando:

```text
TipologiaRiesgo = Fiscal
```

podrá existir:

```text
AnalisisFiscal
```

relacionado uno a uno con el riesgo.

```text
Riesgo 1 ───── 0..1 AnalisisFiscal
```

El análisis permitirá registrar las afectaciones fiscales aplicables:

```text
Recursos públicos
Bienes públicos
Intereses patrimoniales públicos
```

Podrá existir más de una afectación para el mismo riesgo.

---

# 13. ValoracionRiesgo

Representa una valoración realizada sobre un riesgo.

```text
ValoracionRiesgo
├── Tipo
├── Probabilidad
├── Impacto
├── Zona
├── Fecha
└── VersiónMetodologia
```

Los tipos principales serán:

```text
INHERENTE
RESIDUAL
```

Relación:

```text
Riesgo 1 ───── N ValoracionRiesgo
```

Esto permite conservar:

```text
Valoración inherente

Valoración residual inicial

Valoración residual posterior

Nueva valoración después de seguimiento

...
```

sin sobrescribir el histórico.

---

# 14. Control

Representa una medida existente para modificar el nivel del riesgo.

```text
Control
├── Descripción
├── Responsable
├── Tipo
├── Implementación
├── Documentación
├── Frecuencia
├── Ejecución
└── Estado
```

Tipos:

```text
Preventivo
Detectivo
Correctivo
```

Implementación:

```text
Manual
Automático
```

Relación:

```text
Riesgo 1 ───── N Control
```

Cada control podrá tener evidencias.

```text
Control 1 ───── N Evidencia
```

---

# 15. Tratamiento

Representa la decisión adoptada frente al riesgo residual.

```text
Tratamiento
├── Opción
├── Justificación
├── Responsable
├── Fecha
└── Estado
```

Relación:

```text
Riesgo 1 ───── 0..1 Tratamiento
```

Las opciones serán parametrizadas posteriormente.

Conceptualmente podrán incluir:

```text
Aceptar
Reducir
Evitar
Transferir / Compartir
```

---

# 16. AccionTratamiento

Un tratamiento podrá generar múltiples acciones.

```text
Tratamiento
       │
       └── AccionTratamiento[]
```

Conceptualmente:

```text
AccionTratamiento
├── Descripción
├── Responsable
├── FechaInicio
├── FechaLimite
├── Estado
└── Avance
```

Relación:

```text
Tratamiento 1 ───── N AccionTratamiento
```

Una acción podrá tener evidencias:

```text
AccionTratamiento 1 ───── N Evidencia
```

Una acción de tratamiento no es un control.

---

# 17. Seguimiento

Representa cada revisión realizada sobre el riesgo.

```text
Seguimiento
├── Periodo
├── Fecha
├── Responsable
├── Observaciones
└── Estado
```

Relación:

```text
Riesgo 1 ───── N Seguimiento
```

De esta manera se reemplaza el esquema rígido:

```text
T1
T2
T3
T4
```

por:

```text
Seguimiento[]
```

Cada seguimiento podrá contener evidencias.

---

# 18. Materializacion

Representa la ocurrencia efectiva del evento de riesgo.

```text
Materializacion
├── Fecha
├── Descripción
├── Consecuencias
├── AccionesTomadas
└── Responsable
```

Relación:

```text
Riesgo 1 ───── N Materializacion
```

Una materialización podrá tener evidencias.

---

# 19. Evidencia

Representa el soporte documental asociado a la gestión del riesgo.

Conceptualmente:

```text
Evidencia
├── Nombre
├── Descripción
├── Tipo
├── Ubicación
├── Fecha
└── Responsable
```

Podrá soportar:

```text
Control
AccionTratamiento
Seguimiento
Materializacion
```

La estrategia técnica exacta para implementar estas relaciones se decidirá en el modelo lógico.

---

# 20. Responsable

Conceptualmente varios elementos requieren responsable:

```text
Riesgo
Control
Tratamiento
AccionTratamiento
Seguimiento
Materializacion
Evidencia
```

No se creará por ahora una entidad específica `Responsable`.

El modelo lógico determinará cómo relacionar estos responsables con el sistema existente de:

```text
Usuario
Cargo
Dependencia
```

de GIGA.

---

# 21. Historial

El historial no será inicialmente una copia completa del riesgo.

La trazabilidad surgirá principalmente de las entidades históricas:

```text
ValoracionRiesgo[]
Seguimiento[]
Materializacion[]
AccionTratamiento[]
Evidencia[]
```

y de los campos de auditoría que se definan posteriormente.

El modelo lógico deberá contemplar:

```text
CreadoPor
CreadoEn
ActualizadoPor
ActualizadoEn
```

cuando corresponda.

---

# 22. Cardinalidades consolidadas

```text
Vigencia
   1
   │
   N
MatrizRiesgos
   N
   │
   1
Proceso


MatrizRiesgos
   1
   │
   N
Riesgo
   │
   ├── N:1 TipologiaRiesgo
   │
   ├── 1:N CausaRiesgo
   │
   ├── 1:N ValoracionRiesgo
   │
   ├── 1:N Control
   │
   ├── 1:0..1 Tratamiento
   │           │
   │           └── 1:N AccionTratamiento
   │
   ├── 1:N Seguimiento
   │
   ├── 1:N Materializacion
   │
   ├── 1:0..1 AnalisisFiscal
   │
   └── 1:0..1 AnalisisSeguridadInformacion
                     │
                     ├── N Amenaza
                     └── N Vulnerabilidad
```

---

# 23. Modelo completo simplificado

```text
                         Vigencia
                            │
                            ▼
                         Proceso
                            │
                            ▼
                      MatrizRiesgos
                            │
                            ▼
                          Riesgo
                            │
          ┌─────────────────┼──────────────────┐
          │                 │                  │
          ▼                 ▼                  ▼
   TipologiaRiesgo    CausaRiesgo[]     Análisis específico
                                             │
                            ┌────────────────┴───────────────┐
                            ▼                                ▼
                      AnalisisFiscal           AnalisisSeguridadInformacion
                                                             │
                                                      ┌──────┴──────┐
                                                      ▼             ▼
                                                  Amenaza[]   Vulnerabilidad[]

                          Riesgo
                            │
                            ▼
                    ValoracionRiesgo
                       INHERENTE
                            │
                            ▼
                        Control[]
                            │
                            ▼
                    ValoracionRiesgo
                       RESIDUAL
                            │
                            ▼
                       Tratamiento
                            │
                            ▼
                  AccionTratamiento[]
                            │
                            ▼
                     Seguimiento[]
                            │
                            ▼
                   Materializacion[]

Evidencia[] podrá relacionarse con controles,
acciones, seguimientos y materializaciones.
```

---

# 24. Entidades resultantes

El modelo conceptual queda compuesto inicialmente por:

```text
Vigencia
Proceso
MatrizRiesgos
Riesgo
TipologiaRiesgo
CausaRiesgo
AnalisisFiscal
AnalisisSeguridadInformacion
Amenaza
Vulnerabilidad
ValoracionRiesgo
Control
Tratamiento
AccionTratamiento
Seguimiento
Materializacion
Evidencia
```

Además se reutilizarán posteriormente entidades institucionales existentes como:

```text
Usuario
Cargo
Dependencia
```

cuando el modelo lógico determine las relaciones necesarias.

---

# 25. Decisiones del modelo

Se establecen las siguientes decisiones:

1. `Riesgo` será la única entidad principal para todas las tipologías.
2. `TipologiaRiesgo` determina el comportamiento del análisis.
3. Fiscal y Seguridad de la Información pueden tener información especializada sin convertirse en subtipos de `Riesgo`.
4. Los controles serán múltiples.
5. Los seguimientos serán múltiples.
6. Las materializaciones serán múltiples.
7. Las valoraciones serán históricas.
8. Riesgo inherente y residual serán tipos de `ValoracionRiesgo`.
9. El tratamiento tendrá acciones independientes.
10. Las acciones de tratamiento y los controles serán conceptos diferentes.
11. Las evidencias podrán soportar diferentes elementos de la gestión.
12. La matriz consolidada será una vista de información y no una estructura física de almacenamiento.
13. No existirán campos fijos para controles o periodos de seguimiento.
14. El modelo deberá conservar trazabilidad.

---

# 26. Aspectos que pasan al modelo lógico

El modelo conceptual no resolverá todavía:

```text
IDs
UUID vs autoincrementales
nombres de tablas
nombres de columnas
tipos PostgreSQL
ENUM
JSON
tablas intermedias
índices
restricciones UNIQUE
ON DELETE
soft delete
timestamps
relaciones Prisma
estrategia de Evidencia
versionado físico
auditoría
```

Estas decisiones corresponden al siguiente nivel.

---

# 27. Siguiente paso

Este modelo conceptual será la entrada directa para:

```text
modelo-logico.md
```

El modelo lógico deberá convertir cada concepto en estructuras concretas de datos:

```text
Entidad conceptual
        ↓
Tabla / modelo
        ↓
Campos
        ↓
Tipos
        ↓
PK / FK
        ↓
Restricciones
        ↓
Cardinalidades físicas
        ↓
Índices
```

Después de cerrar el modelo lógico podremos escribir directamente:

```text
schema.prisma
```

y posteriormente crear la estructura real en PostgreSQL.