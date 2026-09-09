# Modelo lógico — Gestión Integral de Riesgos

## 1. Propósito

Este documento transforma el modelo conceptual del módulo de Gestión Integral de Riesgos de GIGA en una estructura lógica preparada para su implementación con:

```text
Prisma
PostgreSQL
```

Define:

- modelos;
- campos principales;
- relaciones;
- cardinalidades;
- restricciones;
- catálogos;
- criterios de integridad.

Todavía no constituye el `schema.prisma`.

---

# 2. Convenciones generales

Como criterio inicial:

```text
id                Identificador interno
creadoEn          Fecha de creación
actualizadoEn     Fecha de última modificación
estado            Estado funcional cuando aplique
```

Las entidades principales utilizarán identificadores propios.

Las relaciones se implementarán mediante claves foráneas.

---

# 3. Vigencia

Representa el periodo institucional.

```text
Vigencia
-------------------------
id
anio
estado
creadoEn
actualizadoEn
```

Restricciones:

```text
anio UNIQUE
```

Relación:

```text
Vigencia 1 ───── N MatrizRiesgos
```

---

# 4. Proceso

Representa los procesos institucionales.

```text
Proceso
-------------------------
id
codigo
nombre
tipo
estado
creadoEn
actualizadoEn
```

Restricciones:

```text
codigo UNIQUE
```

Relación:

```text
Proceso 1 ───── N MatrizRiesgos
```

El catálogo de procesos deberá ser reutilizable por otros módulos de GIGA.

---

# 5. MatrizRiesgos

Representa la matriz de un proceso dentro de una vigencia.

```text
MatrizRiesgos
-------------------------
id
vigenciaId
procesoId
version
estado
creadoEn
actualizadoEn
```

Relaciones:

```text
vigenciaId → Vigencia.id
procesoId  → Proceso.id
```

Cardinalidades:

```text
Vigencia 1 ───── N MatrizRiesgos
Proceso  1 ───── N MatrizRiesgos
```

Una combinación de:

```text
vigenciaId
procesoId
version
```

deberá ser única.

---

# 6. TipologiaRiesgo

Catálogo de tipologías.

```text
TipologiaRiesgo
-------------------------
id
codigo
nombre
descripcion
estado
```

Inicialmente:

```text
GES   Gestión
FIS   Fiscal
SIN   Seguridad de la Información
INP   Integridad Pública
```

Restricciones:

```text
codigo UNIQUE
nombre UNIQUE
```

No se incluye inicialmente `LA/FT` como tipología independiente.

---

# 7. Riesgo

Entidad principal.

```text
Riesgo
-------------------------
id
matrizRiesgosId
tipologiaRiesgoId

codigo
fechaIdentificacion
subproceso
descripcion
estado

responsableId

creadoEn
actualizadoEn
```

Relaciones:

```text
matrizRiesgosId   → MatrizRiesgos.id
tipologiaRiesgoId → TipologiaRiesgo.id
responsableId     → Usuario / responsable institucional
```

Restricciones:

```text
codigo UNIQUE
```

`subproceso` podrá mantenerse inicialmente como texto mientras GIGA no disponga de un catálogo institucional específico.

---

# 8. CausaRiesgo

Las causas se normalizan.

```text
CausaRiesgo
-------------------------
id
riesgoId
tipo
descripcion
orden
creadoEn
actualizadoEn
```

Relación:

```text
riesgoId → Riesgo.id
```

Tipos iniciales:

```text
INMEDIATA
RAIZ
```

Cardinalidad:

```text
Riesgo 1 ───── N CausaRiesgo
```

---

# 9. AfectacionRiesgo

Las afectaciones no se almacenarán como un arreglo dentro de `Riesgo`.

Se utilizará un catálogo:

```text
Afectacion
-------------------------
id
codigo
nombre
categoria
estado
```

Ejemplos:

```text
ECONOMICA
REPUTACIONAL

RECURSOS_PUBLICOS
BIENES_PUBLICOS
INTERESES_PATRIMONIALES
```

La relación será muchos a muchos:

```text
RiesgoAfectacion
-------------------------
riesgoId
afectacionId
```

Cardinalidad:

```text
Riesgo N ───── N Afectacion
```

Esto permite seleccionar una o varias afectaciones como actualmente hace el formulario.

---

# 10. AnalisisSeguridadInformacion

Solo existirá cuando la tipología corresponda a Seguridad de la Información.

```text
AnalisisSeguridadInformacion
-------------------------
id
riesgoId
activoInformacion
confidencialidad
integridad
disponibilidad
creadoEn
actualizadoEn
```

Restricción:

```text
riesgoId UNIQUE
```

Relación:

```text
Riesgo 1 ───── 0..1 AnalisisSeguridadInformacion
```

Los campos:

```text
confidencialidad
integridad
disponibilidad
```

serán booleanos.

Esto reemplaza el uso del prototipo donde C/I/D se almacenaban como causa inmediata.

---

# 11. Amenaza

Las amenazas relacionadas con Seguridad de la Información serán repetibles.

```text
Amenaza
-------------------------
id
analisisSeguridadId
descripcion
orden
creadoEn
actualizadoEn
```

Relación:

```text
analisisSeguridadId
    ↓
AnalisisSeguridadInformacion.id
```

Cardinalidad:

```text
AnalisisSeguridadInformacion 1 ───── N Amenaza
```

---

# 12. Vulnerabilidad

```text
Vulnerabilidad
-------------------------
id
analisisSeguridadId
descripcion
orden
creadoEn
actualizadoEn
```

Relación:

```text
analisisSeguridadId
    ↓
AnalisisSeguridadInformacion.id
```

Cardinalidad:

```text
AnalisisSeguridadInformacion 1 ───── N Vulnerabilidad
```

---

# 13. AnalisisFiscal

Contendrá información exclusiva de la tipología Fiscal que no corresponda al núcleo común del riesgo.

```text
AnalisisFiscal
-------------------------
id
riesgoId
observaciones
creadoEn
actualizadoEn
```

Restricción:

```text
riesgoId UNIQUE
```

Relación:

```text
Riesgo 1 ───── 0..1 AnalisisFiscal
```

Las afectaciones fiscales no necesitan columnas booleanas porque se registrarán mediante `RiesgoAfectacion`.

---

# 14. EscalaProbabilidad

La escala metodológica no deberá quedar dispersa dentro del código.

```text
EscalaProbabilidad
-------------------------
id
codigo
nivel
valor
criterio
orden
estado
```

Datos iniciales:

```text
MUY_BAJA   Muy Baja   20
BAJA       Baja       40
MEDIA      Media      60
ALTA       Alta       80
MUY_ALTA   Muy Alta   100
```

El criterio contendrá la descripción metodológica de frecuencia/exposición.

---

# 15. EscalaImpacto

```text
EscalaImpacto
-------------------------
id
codigo
nivel
valor
orden
estado
```

Inicialmente:

```text
LEVE           20
MENOR          40
MODERADO       60
MAYOR          80
CATASTROFICO   100
```

Los criterios específicos de impacto podrán parametrizarse separadamente.

---

# 16. CriterioImpacto

Permitirá representar los criterios utilizados por el formulario.

```text
CriterioImpacto
-------------------------
id
escalaImpactoId
tipo
descripcion
tipologiaRiesgoId
estado
```

Ejemplos de `tipo`:

```text
ECONOMICO
REPUTACIONAL
FISCAL
```

Esto evita codificar permanentemente los textos de las escalas dentro de los componentes Svelte.

---

# 17. ZonaRiesgo

Catálogo de zonas.

```text
ZonaRiesgo
-------------------------
id
codigo
nombre
orden
estado
```

Inicialmente:

```text
BAJO
MODERADO
ALTO
EXTREMO
```

---

# 18. MatrizSeveridad

La zona no se calculará mediante los umbrales numéricos utilizados por el HTML.

Se parametrizará la matriz metodológica.

```text
MatrizSeveridad
-------------------------
id
probabilidadId
impactoId
zonaRiesgoId
```

Relaciones:

```text
probabilidadId → EscalaProbabilidad.id
impactoId      → EscalaImpacto.id
zonaRiesgoId   → ZonaRiesgo.id
```

Restricción:

```text
(probabilidadId, impactoId) UNIQUE
```

El cálculo será:

```text
Probabilidad + Impacto
          ↓
MatrizSeveridad
          ↓
ZonaRiesgo
```

---

# 19. ValoracionRiesgo

Conserva las valoraciones históricas.

```text
ValoracionRiesgo
-------------------------
id
riesgoId

tipo

probabilidadId
impactoId
zonaRiesgoId

fecha
observaciones

creadoPorId
creadoEn
```

Tipos:

```text
INHERENTE
RESIDUAL
```

Relaciones:

```text
riesgoId       → Riesgo.id
probabilidadId → EscalaProbabilidad.id
impactoId      → EscalaImpacto.id
zonaRiesgoId   → ZonaRiesgo.id
```

Cardinalidad:

```text
Riesgo 1 ───── N ValoracionRiesgo
```

No se sobrescribirán las valoraciones anteriores.

---

# 20. Control

```text
Control
-------------------------
id
riesgoId

descripcion
responsableId

tipo
implementacion

documentacion
frecuencia
evidenciaDefinida
ejecucion

estado

creadoEn
actualizadoEn
```

Relación:

```text
riesgoId → Riesgo.id
```

Cardinalidad:

```text
Riesgo 1 ───── N Control
```

Tipos:

```text
PREVENTIVO
DETECTIVO
CORRECTIVO
```

Implementación:

```text
MANUAL
AUTOMATICO
```

No existirán columnas:

```text
controlA
controlB
controlC
```

---

# 21. ValoracionControl

Se separará la definición del control de su valoración metodológica.

```text
ValoracionControl
-------------------------
id
controlId

valorTipo
valorImplementacion
valorTotal

fecha
creadoEn
```

Relación:

```text
Control 1 ───── N ValoracionControl
```

Esto permite conservar cambios futuros en la valoración del control sin alterar su definición.

---

# 22. Tratamiento

```text
Tratamiento
-------------------------
id
riesgoId

opcion
justificacion
responsableId
fecha
estado

creadoEn
actualizadoEn
```

Relación:

```text
riesgoId → Riesgo.id
```

Inicialmente:

```text
Riesgo 1 ───── 0..1 Tratamiento
```

Las opciones deberán parametrizarse o validarse antes de implementar la regla definitiva.

---

# 23. AccionTratamiento

```text
AccionTratamiento
-------------------------
id
tratamientoId

descripcion
responsableId

fechaInicio
fechaLimite

estado
porcentajeAvance

creadoEn
actualizadoEn
```

Relación:

```text
tratamientoId → Tratamiento.id
```

Cardinalidad:

```text
Tratamiento 1 ───── N AccionTratamiento
```

---

# 24. Seguimiento

```text
Seguimiento
-------------------------
id
riesgoId

periodo
fecha
responsableId

observaciones
estado

creadoEn
actualizadoEn
```

Relación:

```text
riesgoId → Riesgo.id
```

Cardinalidad:

```text
Riesgo 1 ───── N Seguimiento
```

No existirán:

```text
t1
t2
t3
t4
```

como columnas del riesgo.

---

# 25. Materializacion

```text
Materializacion
-------------------------
id
riesgoId

fecha
descripcion
consecuencias
accionesTomadas

responsableId

creadoEn
actualizadoEn
```

Relación:

```text
riesgoId → Riesgo.id
```

Cardinalidad:

```text
Riesgo 1 ───── N Materializacion
```

---

# 26. Evidencia

Se utilizará una entidad única para los soportes.

```text
Evidencia
-------------------------
id

nombre
descripcion
tipo
ruta
fecha

responsableId

creadoEn
```

Las relaciones se realizarán mediante asociaciones específicas.

---

# 27. EvidenciaControl

```text
EvidenciaControl
-------------------------
evidenciaId
controlId
```

Relación:

```text
Control N ───── N Evidencia
```

---

# 28. EvidenciaAccionTratamiento

```text
EvidenciaAccionTratamiento
-------------------------
evidenciaId
accionTratamientoId
```

---

# 29. EvidenciaSeguimiento

```text
EvidenciaSeguimiento
-------------------------
evidenciaId
seguimientoId
```

---

# 30. EvidenciaMaterializacion

```text
EvidenciaMaterializacion
-------------------------
evidenciaId
materializacionId
```

Este enfoque evita una relación polimórfica difícil de garantizar mediante claves foráneas.

---

# 31. Usuarios y responsables

No se duplicarán nombres de funcionarios cuando exista un usuario institucional.

Las entidades que requieran responsable utilizarán:

```text
responsableId
```

relacionado posteriormente con el modelo de usuarios existente en GIGA.

Ejemplos:

```text
Riesgo.responsableId
Control.responsableId
Tratamiento.responsableId
AccionTratamiento.responsableId
Seguimiento.responsableId
Materializacion.responsableId
```

El `schema.prisma` deberá adaptarse al modelo real de usuarios que ya exista en el proyecto.

---

# 32. Auditoría

Las entidades modificables deberán incorporar, cuando corresponda:

```text
creadoEn
actualizadoEn
creadoPorId
actualizadoPorId
```

La auditoría completa podrá ampliarse posteriormente mediante un mecanismo transversal de GIGA.

No es necesario duplicar ahora todo el contenido de cada entidad para implementar historial.

---

# 33. Eliminación

Como principio general, la información histórica no deberá eliminarse físicamente cuando forme parte de la trazabilidad institucional.

Se preferirá:

```text
estado
```

o mecanismos de inactivación.

Especialmente para:

```text
Riesgo
MatrizRiesgos
Control
Tratamiento
AccionTratamiento
```

---

# 34. Índices principales

PostgreSQL deberá disponer posteriormente de índices sobre relaciones y campos de consulta frecuente.

Como mínimo:

```text
Riesgo.matrizRiesgosId
Riesgo.tipologiaRiesgoId
Riesgo.codigo

MatrizRiesgos.vigenciaId
MatrizRiesgos.procesoId

ValoracionRiesgo.riesgoId
ValoracionRiesgo.tipo

Control.riesgoId

Seguimiento.riesgoId

Materializacion.riesgoId
```

También serán útiles índices compuestos para consultas del dashboard.

---

# 35. Restricciones principales

El modelo deberá garantizar:

```text
Vigencia.anio
    UNIQUE

Proceso.codigo
    UNIQUE

TipologiaRiesgo.codigo
    UNIQUE

TipologiaRiesgo.nombre
    UNIQUE

Riesgo.codigo
    UNIQUE

AnalisisFiscal.riesgoId
    UNIQUE

AnalisisSeguridadInformacion.riesgoId
    UNIQUE

MatrizSeveridad(probabilidadId, impactoId)
    UNIQUE

MatrizRiesgos(vigenciaId, procesoId, version)
    UNIQUE
```

---

# 36. Dependencias principales

```text
Vigencia
   │
   └── MatrizRiesgos
          │
          ├── Proceso
          │
          └── Riesgo
                 │
                 ├── TipologiaRiesgo
                 ├── CausaRiesgo[]
                 ├── Afectacion[]
                 │
                 ├── AnalisisFiscal
                 │
                 ├── AnalisisSeguridadInformacion
                 │       ├── Amenaza[]
                 │       └── Vulnerabilidad[]
                 │
                 ├── ValoracionRiesgo[]
                 │
                 ├── Control[]
                 │       ├── ValoracionControl[]
                 │       └── Evidencia[]
                 │
                 ├── Tratamiento
                 │       └── AccionTratamiento[]
                 │               └── Evidencia[]
                 │
                 ├── Seguimiento[]
                 │       └── Evidencia[]
                 │
                 └── Materializacion[]
                         └── Evidencia[]
```

---

# 37. Tablas / modelos resultantes

El esquema lógico inicial queda compuesto por:

```text
Vigencia
Proceso
MatrizRiesgos

TipologiaRiesgo
Riesgo
CausaRiesgo

Afectacion
RiesgoAfectacion

AnalisisFiscal

AnalisisSeguridadInformacion
Amenaza
Vulnerabilidad

EscalaProbabilidad
EscalaImpacto
CriterioImpacto
ZonaRiesgo
MatrizSeveridad

ValoracionRiesgo

Control
ValoracionControl

Tratamiento
AccionTratamiento

Seguimiento
Materializacion

Evidencia
EvidenciaControl
EvidenciaAccionTratamiento
EvidenciaSeguimiento
EvidenciaMaterializacion
```

---

# 38. Datos parametrizables

No deberán quedar codificados directamente en componentes Svelte los valores que pertenecen a la metodología.

Se parametrizarán especialmente:

```text
Tipologías

Afectaciones

Escalas de probabilidad

Escalas de impacto

Criterios de impacto

Zonas de riesgo

Matriz de severidad

Tipos de control

Modos de implementación

Opciones de tratamiento
```

Esto permitirá modificar reglas metodológicas sin rediseñar la base de datos.

---

# 39. Datos calculados

Los siguientes valores serán producidos por la lógica del sistema:

```text
Código sugerido

Nivel de probabilidad

Nivel de impacto

Zona inherente

Valoración de controles

Probabilidad residual

Impacto residual

Zona residual

Indicadores del dashboard
```

Cuando un cálculo represente una valoración institucional que deba conservarse históricamente, su resultado deberá almacenarse en `ValoracionRiesgo`.

Los indicadores del dashboard se calcularán mediante consultas y no se almacenarán como datos independientes.

---

# 40. Separación entre datos y reglas

La base de datos almacenará:

```text
Qué riesgo existe
Qué información fue registrada
Qué controles tiene
Qué valoración obtuvo
Qué tratamiento tiene
Qué seguimiento recibió
```

La lógica del sistema determinará:

```text
Cómo se calcula
Qué campos aparecen
Qué campos son obligatorios
Qué regla corresponde a cada tipología
Cómo se determina la zona
Cómo afectan los controles
```

Por tanto:

```text
PostgreSQL
    ↓
Datos y relaciones

SvelteKit / servidor
    ↓
Reglas de negocio

Svelte
    ↓
Interfaz dinámica
```

---

# 41. Siguiente paso

Con este modelo lógico ya no es necesario crear otro documento intermedio.

El siguiente entregable será directamente:

```text
schema.prisma
```

El esquema Prisma deberá:

1. adaptarse al modelo `Usuario` existente en GIGA;
2. implementar las relaciones definidas aquí;
3. definir claves e índices;
4. utilizar nombres claros en español;
5. evitar estructuras JSON cuando exista una relación normalizable;
6. preparar PostgreSQL como proveedor;
7. permitir migraciones posteriores sin romper el historial.

Después:

```text
modelo-logico.md
        ↓
schema.prisma
        ↓
prisma migrate
        ↓
PostgreSQL
        ↓
servicios del módulo
        ↓
formulario SvelteKit
```