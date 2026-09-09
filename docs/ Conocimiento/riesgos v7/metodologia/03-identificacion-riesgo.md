# Identificación y descripción del riesgo

## 1. Propósito

Este documento establece el conocimiento necesario para identificar
y describir un riesgo dentro del módulo de Gestión Integral de
Riesgos de GIGA.

Corresponde a la primera etapa de la metodología general establecida
por la Guía para la Gestión Integral del Riesgo en Entidades Públicas
Versión 7.

Este documento todavía no define estructuras de base de datos ni
componentes de interfaz.

---

## 2. Ubicación dentro de la metodología

[FP]

La metodología general de Gestión Integral del Riesgo establece
como primera etapa:

Identificación y descripción del riesgo.

Posteriormente se desarrollan:

1. Análisis del riesgo inherente.
2. Diseño y análisis de controles.
3. Valoración del riesgo residual.

[GIGA]

Por lo tanto, GIGA debe separar conceptualmente:

Identificar el riesgo

de:

Valorar el riesgo

Un riesgo puede existir y encontrarse identificado antes de que
haya finalizado su valoración.

Esto permitirá posteriormente manejar estados como borrador o
identificación incompleta sin exigir anticipadamente todos los
datos de valoración.

---

## 3. Contexto del riesgo

[FP]

La gestión del riesgo no debe realizarse de forma aislada.

Antes de aplicar la metodología deben considerarse elementos
institucionales relacionados con:

- planeación estratégica;
- estructura organizacional;
- procesos;
- talento humano;
- recursos;
- bienes utilizados para la prestación de los servicios;
- grupos de valor.

[GIGA]

Por esta razón, el riesgo deberá encontrarse contextualizado dentro
de la estructura institucional.

El formulario no debería depender únicamente de campos de texto
libre para identificar elementos institucionales que ya existan
dentro de GIGA.

Ejemplo:

Proceso
   │
   └── Riesgo

y no simplemente:

Riesgo.proceso = "Gestión TIC"

[PENDIENTE]

Definir posteriormente la relación exacta entre:

- proceso;
- dependencia;
- subproceso;
- objetivo;
- responsable;
- matriz de riesgos.

---

## 4. Entidad conceptual

[GIGA]

Todo registro identificado dentro del módulo corresponde
conceptualmente a:

Riesgo

La tipología es una característica del riesgo.

Riesgo
   │
   ├── identificación
   ├── contexto
   ├── tipología
   ├── causas
   ├── descripción
   └── consecuencias

La tipología podrá determinar información adicional necesaria
durante esta etapa.

---

## 5. Identificación administrativa

[HTML]

El prototipo actual contiene:

- código;
- fecha de identificación;
- proceso;
- subproceso/dependencia;
- responsable.

[GIGA]

Estos elementos son útiles para identificar y administrar el
registro dentro del sistema.

Sin embargo, deben distinguirse los datos administrativos del
registro de los elementos metodológicos utilizados para identificar
el riesgo.

Ejemplo:

DATOS DEL REGISTRO

Código
Fecha
Proceso
Responsable

IDENTIFICACIÓN DEL RIESGO

Tipología
Causas
Evento
Consecuencias
Elementos específicos de la tipología

[PENDIENTE]

Determinar cuáles de los campos administrativos son exigencias
metodológicas y cuáles serán decisiones propias de GIGA o de la
Alcaldía.

---

## 6. Código del riesgo

[HTML]

El prototipo genera códigos similares a:

R-[PROCESO]-[TIPOLOGÍA]-[CONSECUTIVO]

Ejemplo:

R-GTH-FIS-001

[GIGA]

Se considera conveniente mantener separados:

- identificador interno del sistema;
- código institucional visible del riesgo.

El identificador interno servirá para relaciones técnicas.

El código institucional servirá para identificación humana,
reportes y matrices.

[PENDIENTE]

La estructura definitiva del código deberá validarse con las
prácticas institucionales de la Alcaldía.

No asumir que la estructura utilizada por el prototipo constituye
una regla de Función Pública.

---

## 7. Tipología

[FP]

La gestión integral contempla elementos metodológicos comunes para
las tipologías:

- Gestión.
- Fiscal.
- Seguridad de la Información.
- Integridad Pública.

[GIGA]

Todo riesgo deberá estar relacionado con una tipología.

TipologiaRiesgo no representa una especialización jerárquica de
Riesgo.

La selección de la tipología determina qué información y reglas
serán aplicables posteriormente.

Riesgo
   │
   └── Tipología
          │
          └── metodología aplicable

---

## 8. Causas

[HTML]

El prototipo diferencia actualmente:

- causa inmediata;
- causa raíz.

[GIGA]

La causa no debe almacenarse únicamente dentro del texto final de
la descripción del riesgo.

Debe conservarse estructuradamente para permitir:

- análisis;
- modificación;
- generación de descripción;
- trazabilidad;
- reportes;
- análisis posteriores.

Conceptualmente:

Riesgo
   │
   └── CausaRiesgo[]
            │
            ├── tipo
            └── descripción

[PENDIENTE V7]

Antes de definir el modelo definitivo se deberá verificar:

- definición exacta de causa;
- definición de causa inmediata;
- definición de causa raíz;
- cardinalidad;
- particularidades según tipología.

---

## 9. Descripción del riesgo

[HTML]

El prototipo genera actualmente una descripción estructurada
aproximadamente de la siguiente manera:

Probabilidad de [afectación] por [causa inmediata],
debido a [causa raíz].

También permite edición manual.

[PENDIENTE V7]

Esta estructura no debe considerarse todavía una plantilla
universal.

Debe verificarse la estructura de descripción establecida por
la metodología para cada tipología.

[GIGA]

Cuando la metodología permita construir la descripción a partir
de datos estructurados, GIGA debería generarla automáticamente.

La descripción generada deberá ser visible mientras el usuario
diligencia el riesgo.

---

## 10. Descripción estructurada frente a texto libre

[GIGA]

Se debe evitar que toda la identificación del riesgo dependa de un
único campo de texto.

Es preferible:

Datos estructurados
        │
        ├── causa
        ├── evento
        ├── afectación
        ├── consecuencia
        └── otros elementos
                 │
                 ▼
        Descripción del riesgo

Esto permitirá posteriormente:

- validar información;
- aplicar reglas según tipología;
- generar reportes;
- buscar patrones;
- comparar riesgos;
- mejorar la calidad de los datos.

[PENDIENTE]

La estructura exacta dependerá de lo establecido por V7 para cada
tipología.

---

## 11. Consecuencias

[GIGA]

Las consecuencias deben analizarse como información diferente de
las causas.

Conceptualmente:

Causa
   ↓
Riesgo / evento
   ↓
Consecuencia

[PENDIENTE V7]

Determinar:

- definición metodológica;
- obligatoriedad;
- cardinalidad;
- diferencias por tipología;
- relación con impacto.

No asumir que consecuencia e impacto son equivalentes.

---

## 12. Particularidades por tipología

La identificación tendrá un núcleo común, pero puede requerir
información diferente según la tipología.

### Gestión

[PENDIENTE]

Extraer de V7 los elementos específicos necesarios para identificar
un riesgo de gestión.

### Fiscal

[FP]

Los riesgos fiscales poseen particularidades conceptuales y
metodológicas propias dentro del esquema integral.

[HTML]

El prototipo incorpora actualmente:

- recursos públicos;
- bienes públicos;
- intereses patrimoniales públicos.

[PENDIENTE]

Contrastar estos elementos con:

- capítulo de riesgo fiscal;
- catálogo indicativo de puntos de riesgo fiscal;
- ejemplos oficiales.

### Seguridad de la Información

[HTML]

El prototipo incorpora:

- activo de información;
- confidencialidad;
- integridad;
- disponibilidad.

[PENDIENTE]

Determinar exactamente cómo V7 y los lineamientos de MinTIC
relacionan estos elementos durante la identificación.

No asumir todavía que confidencialidad, integridad y disponibilidad
corresponden metodológicamente al campo denominado "causa inmediata".

### Integridad Pública

[FP]

La identificación debe incorporar las particularidades establecidas
por SIGRIP.

[PENDIENTE]

Estudiar específicamente:

- riesgos asociados a corrupción;
- lavado de activos;
- financiación del terrorismo;
- proliferación de armas;
- demás elementos contemplados por SIGRIP.

No crear todavía LA/FT como una tipología independiente.

---

## 13. Núcleo común provisional

[GIGA]

Con el conocimiento disponible hasta este punto, puede plantearse
provisionalmente:

Riesgo
│
├── Identificación administrativa
│   ├── Código
│   ├── Fecha
│   ├── Proceso
│   └── Responsable
│
├── Clasificación
│   └── Tipología
│
├── Identificación metodológica
│   ├── Causas
│   ├── Evento / descripción
│   └── Consecuencias
│
└── Información específica
    └── determinada por Tipología

[PENDIENTE]

Esta estructura no es todavía el modelo de datos.

Debe ajustarse a medida que se complete el análisis de V7.

---

## 14. Implicación para el formulario

[GIGA]

El futuro formulario no debería mostrar desde el principio todos
los campos posibles.

Flujo preliminar:

Seleccionar proceso
       ↓
Identificación básica
       ↓
Seleccionar tipología
       ↓
┌──────────────────────────────┐
│ GIGA conoce la metodología   │
│ aplicable                    │
└──────────────────────────────┘
       ↓
Mostrar identificación
específica de esa tipología
       ↓
Causas
       ↓
Descripción
       ↓
Consecuencias
       ↓
Continuar al análisis inherente

---

## 15. Estado de conocimiento

### Confirmado

[FP]

La identificación y descripción constituye la primera etapa de la
metodología común.

[FP]

Existe una estructura metodológica común para las diferentes
tipologías.

[FP]

Las tipologías generales contempladas incluyen Gestión, Fiscal,
Seguridad de la Información e Integridad Pública.

[GIGA]

Todas las tipologías se representarán mediante la misma entidad
conceptual Riesgo.

[HTML]

El prototipo proporciona una referencia funcional útil para campos,
flujo e interacción.

### Pendiente

[PENDIENTE]

Todavía deben extraerse directamente de V7:

- estructura exacta de descripción;
- causas;
- consecuencias;
- cardinalidades;
- campos obligatorios;
- particularidades de Gestión;
- particularidades de Fiscal;
- particularidades de Seguridad de la Información;
- particularidades de Integridad Pública.