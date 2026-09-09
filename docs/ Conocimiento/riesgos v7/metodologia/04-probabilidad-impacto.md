# Probabilidad, impacto y riesgo inherente

## 1. Propósito

Este documento establece la base de conocimiento metodológica para el análisis del riesgo inherente dentro del módulo de Gestión Integral de Riesgos de GIGA.

Su propósito es documentar:

- la determinación de la probabilidad;
- la determinación del impacto;
- la valoración del riesgo inherente;
- la ubicación del riesgo dentro de la matriz de severidad;
- las particularidades que puedan existir según la tipología de riesgo;
- las diferencias encontradas entre la metodología oficial y el prototipo `index.html`.

La fuente metodológica oficial prevalece sobre cualquier comportamiento actualmente implementado en el prototipo.

Este documento no constituye todavía una definición del modelo de datos, del esquema Prisma ni de la interfaz definitiva.

---

## 2. Fuentes y clasificación del conocimiento

Las reglas de este documento utilizan las siguientes etiquetas:

### [FP]

Información proveniente del Departamento Administrativo de la Función Pública, principalmente de la **Guía para la Gestión Integral del Riesgo en Entidades Públicas — Versión 7** y sus anexos.

### [MINTIC]

Información proveniente de lineamientos oficiales del Ministerio de Tecnologías de la Información y las Comunicaciones.

### [ALCALDÍA]

Regla, procedimiento o decisión institucional propia de la Alcaldía Municipal de Jamundí.

### [GIGA]

Decisión conceptual, funcional o técnica adoptada para el diseño del sistema.

### [HTML]

Comportamiento actualmente implementado en el prototipo `index.html`.

### [PENDIENTE]

Elemento que requiere validación adicional contra las fuentes oficiales antes de convertirse en una regla definitiva del sistema.

---

## 3. Ubicación dentro de la metodología

[FP]

La metodología general de gestión integral del riesgo comprende, entre sus etapas principales:

1. identificación y descripción del riesgo;
2. análisis del riesgo inherente;
3. diseño y análisis de controles;
4. valoración del riesgo residual.

Este documento se concentra principalmente en la segunda etapa:

**análisis del riesgo inherente**.

Conceptualmente:

```text
Identificación del riesgo
          │
          ▼
      Probabilidad
          +
        Impacto
          │
          ▼
  Riesgo inherente
          │
          ▼
      Controles
          │
          ▼
   Riesgo residual
```

Las reglas relacionadas específicamente con controles y riesgo residual se documentarán posteriormente en un documento independiente.

---

# 4. Riesgo inherente

## 4.1 Concepto

[FP]

El riesgo inherente corresponde al nivel de riesgo existente antes de considerar los controles establecidos por la entidad.

Por tanto, debe analizarse inicialmente el riesgo en ausencia del efecto de los controles.

Conceptualmente:

```text
RIESGO IDENTIFICADO
        │
        ├── Probabilidad
        │
        └── Impacto
                │
                ▼
        RIESGO INHERENTE
```

Posteriormente:

```text
RIESGO INHERENTE
        │
        ▼
     CONTROLES
        │
        ▼
RIESGO RESIDUAL
```

---

## 4.2 Separación entre valoración inherente y residual

[GIGA]

La valoración inherente y la valoración residual deberán mantenerse como conceptos independientes.

La aplicación posterior de controles no deberá sobrescribir la valoración inherente.

El sistema deberá conservar suficiente información para conocer:

- cuál era la probabilidad inherente;
- cuál era el impacto inherente;
- cuál era la zona inherente;
- cuáles controles fueron considerados;
- cuál fue posteriormente la valoración residual.

Conceptualmente:

```text
Riesgo
│
├── Valoración inherente
│
├── Controles
│
└── Valoración residual
```

---

# 5. Probabilidad

## 5.1 Concepto

[FP]

La probabilidad representa la posibilidad de ocurrencia del riesgo.

Su determinación se relaciona con la exposición de la actividad asociada al riesgo.

La metodología utiliza como referencia la frecuencia con la cual se ejecuta la actividad que puede dar lugar a la materialización del riesgo.

Por tanto, la probabilidad no debe establecerse únicamente mediante una apreciación subjetiva del usuario.

No debería plantearse simplemente:

```text
¿Qué tan probable considera que ocurra el riesgo?
```

La valoración debe apoyarse en criterios metodológicos de exposición.

Conceptualmente:

```text
Actividad asociada al riesgo
            │
            ▼
Frecuencia de ejecución
            │
            ▼
Nivel de exposición
            │
            ▼
Nivel de probabilidad
```

---

## 5.2 Escala de probabilidad

[FP]

La metodología utiliza cinco niveles de probabilidad:

| Nivel | Valor |
|---|---:|
| Muy Baja | 20 % |
| Baja | 40 % |
| Media | 60 % |
| Alta | 80 % |
| Muy Alta | 100 % |

La escala se encuentra relacionada con la frecuencia de ejecución de la actividad.

Como referencia metodológica utilizada actualmente:

| Nivel | Frecuencia de la actividad | Probabilidad |
|---|---|---:|
| Muy Baja | Máximo 2 veces por año | 20 % |
| Baja | Entre 3 y 24 veces por año | 40 % |
| Media | Entre 25 y 500 veces por año | 60 % |
| Alta | Más de 500 y hasta 5.000 veces por año | 80 % |
| Muy Alta | Más de 5.000 veces por año | 100 % |

[PENDIENTE]

Los límites y operadores exactos deberán verificarse directamente contra la tabla correspondiente de la Guía V7 y, preferentemente, contra el Anexo 1 parametrizado antes de convertirse en reglas técnicas definitivas.

Esto es especialmente importante en los valores frontera para evitar intervalos ambiguos.

---

# 6. Comparación con el HTML — Probabilidad

[HTML]

El prototipo contiene actualmente los siguientes valores:

```text
Muy Baja
20 %
Máximo 2 veces por año

Baja
40 %
Entre 3 y 24 veces por año

Media
60 %
Entre 25 y 500 veces por año

Alta
80 %
Más de 500 y máximo 5.000 veces por año

Muy Alta
100 %
Más de 5.000 veces por año
```

También representa internamente los valores como:

```text
Muy Baja = 0.2
Baja     = 0.4
Media    = 0.6
Alta     = 0.8
Muy Alta = 1.0
```

### Estado

**COINCIDE SUSTANCIALMENTE CON LA METODOLOGÍA.**

[GIGA]

La estructura del prototipo puede conservarse como referencia funcional.

Sin embargo, la fuente definitiva de los rangos será la metodología oficial y no las constantes existentes en `index.html`.

---

# 7. Información que debe conservarse sobre la probabilidad

[GIGA]

La probabilidad no debería almacenarse exclusivamente como un porcentaje.

La valoración debe conservar suficiente información para reconstruir posteriormente cómo fue obtenida.

Conceptualmente:

```text
Probabilidad
│
├── Nivel
├── Valor metodológico
├── Criterio aplicado
└── Información utilizada para determinar el criterio
```

Ejemplo:

```text
Nivel:
Media

Valor:
60 %

Criterio:
Frecuencia de ejecución de la actividad correspondiente
al intervalo metodológico de probabilidad Media.
```

No sería suficiente conservar únicamente:

```text
probabilidad = 0.60
```

porque se perdería el contexto metodológico que explica el resultado.

[PENDIENTE]

La estructura definitiva se determinará durante el diseño del modelo lógico.

---

# 8. Datos ingresados y resultados calculados en probabilidad

[GIGA]

Debe distinguirse entre la información suministrada por el usuario y el resultado producido por la metodología.

Conceptualmente:

```text
USUARIO

Frecuencia de la actividad
          │
          ▼
       SISTEMA
          │
          ├── Nivel de probabilidad
          └── Valor de probabilidad
```

Cuando la metodología permita determinar automáticamente el nivel, el usuario no debería seleccionar directamente:

```text
Probabilidad = 60 %
```

sino proporcionar la información requerida para que GIGA determine el nivel correspondiente.

---

# 9. Impacto

## 9.1 Concepto

[FP]

El impacto representa la magnitud de las consecuencias que podría generar la materialización del riesgo.

Debe diferenciarse conceptualmente entre:

- causa;
- evento de riesgo;
- consecuencia;
- valoración del impacto.

Conceptualmente:

```text
Causa
  │
  ▼
Evento de riesgo
  │
  ▼
Consecuencia
  │
  ▼
Valoración del impacto
```

La consecuencia describe qué puede ocurrir como resultado de la materialización del riesgo.

El nivel de impacto corresponde a la valoración de la magnitud de dichas consecuencias utilizando los criterios establecidos por la metodología.

---

# 10. Escala general de impacto

[FP]

La metodología utiliza cinco niveles generales de impacto:

| Nivel | Valor |
|---|---:|
| Leve | 20 % |
| Menor | 40 % |
| Moderado | 60 % |
| Mayor | 80 % |
| Catastrófico | 100 % |

Estos niveles son posteriormente utilizados para establecer la posición correspondiente dentro de la matriz de severidad.

---

# 11. Impacto económico

[FP]

Para las tipologías y situaciones en las cuales resulte aplicable, la metodología contempla criterios asociados a la magnitud económica de la afectación.

[HTML]

El prototipo contiene actualmente la siguiente escala:

| Nivel | Criterio económico | Valor |
|---|---|---:|
| Leve | Afectación menor a 10 SMLMV | 20 % |
| Menor | Mayor a 10 y menor a 50 SMLMV | 40 % |
| Moderado | Mayor a 50 y menor a 100 SMLMV | 60 % |
| Mayor | Mayor a 100 y menor a 500 SMLMV | 80 % |
| Catastrófico | Mayor a 500 SMLMV | 100 % |

### Estado

**COINCIDE SUSTANCIALMENTE CON LA METODOLOGÍA DE REFERENCIA.**

[PENDIENTE]

Debe verificarse la redacción y los operadores exactos de los intervalos directamente contra la fuente oficial.

La forma actual del HTML presenta expresiones como:

```text
Mayor a 10 y menor a 50
```

que pueden generar ambigüedad para valores exactamente iguales a:

```text
10
50
100
500
```

[GIGA]

Los límites numéricos deberán parametrizarse mediante valores y operadores explícitos.

Conceptualmente:

```text
valorMinimo
valorMaximo
incluyeMinimo
incluyeMaximo
```

La interfaz podrá mostrar una descripción legible, pero el sistema no deberá deducir las reglas numéricas analizando esa descripción.

---

# 12. Impacto reputacional

[FP]

La metodología contempla criterios asociados al alcance de la afectación reputacional de la entidad.

[HTML]

El prototipo contiene actualmente:

### Leve — 20 %

Afecta la imagen de alguna área de la entidad.

### Menor — 40 %

Afecta la imagen interna: alta dirección y/o proveedores.

### Moderado — 60 %

Afecta la imagen con usuarios de relevancia frente a los objetivos.

### Mayor — 80 %

Efecto publicitario sostenido a nivel departamental o municipal.

### Catastrófico — 100 %

Afecta la imagen a nivel nacional con efecto publicitario sostenido.

### Estado

**COINCIDE SUSTANCIALMENTE CON LA METODOLOGÍA DE REFERENCIA.**

[PENDIENTE]

La redacción definitiva deberá tomarse directamente de la tabla oficial correspondiente de la Guía V7 o de su Anexo 1.

---

# 13. Tipos de afectación

[HTML]

Para determinados riesgos diferentes de Fiscal, el prototipo permite actualmente seleccionar:

```text
Económica
Reputacional
```

La selección puede ser múltiple.

Dependiendo de la selección realizada, el formulario muestra los criterios correspondientes.

[GIGA]

No debe asumirse que esta estructura aplica de manera idéntica a todas las tipologías.

La tipología deberá determinar:

```text
Tipología
    │
    ▼
Tipos de afectación aplicables
    │
    ▼
Criterios de impacto
    │
    ▼
Regla de valoración
```

Por tanto, la interfaz futura deberá ser capaz de modificar el bloque de impacto según la tipología seleccionada.

---

# 14. Múltiples tipos de afectación

[HTML]

Cuando se seleccionan simultáneamente:

```text
Económica
Reputacional
```

el prototipo calcula ambos impactos y selecciona el valor mayor.

Conceptualmente, el HTML realiza:

```text
impactoFinal =
    MAX(
        impactoEconomico,
        impactoReputacional
    )
```

[PENDIENTE V7]

Esta regla no deberá trasladarse automáticamente a GIGA hasta comprobar expresamente que corresponde a la metodología oficial aplicable.

[GIGA]

La arquitectura deberá permitir que la metodología correspondiente determine:

```text
criterios aplicables
        │
        ▼
valoración de cada criterio
        │
        ▼
regla de combinación
        │
        ▼
impacto resultante
```

No se establecerá una regla universal:

```text
impacto = MAX(económico, reputacional)
```

mientras no haya sido confirmada por la metodología.

---

# 15. Particularidades del impacto según tipología

[GIGA]

La existencia de cinco niveles generales de impacto no significa necesariamente que todas las tipologías utilicen los mismos criterios para llegar a esos niveles.

Conceptualmente:

```text
Tipología
    │
    ▼
Metodología aplicable
    │
    ├── criterios
    ├── escalas
    ├── preguntas
    ├── condiciones
    └── reglas
            │
            ▼
      Nivel de impacto
```

Este principio es fundamental para el diseño del formulario dinámico de GIGA.

---

# 16. Riesgo de Gestión

[FP]

Los riesgos de Gestión forman parte de la estructura metodológica general de gestión integral del riesgo.

[PENDIENTE]

Debe verificarse directamente en la Guía V7 y el Anexo 1:

- cuáles tipos de afectación aplican;
- cuáles criterios de impacto se utilizan;
- cómo se determina el impacto cuando existen varias afectaciones;
- si existen reglas particulares adicionales.

[HTML]

El prototipo utiliza actualmente:

```text
Económica
Reputacional
```

como tipos de afectación para esta clase de análisis.

### Estado

**BIEN ENCAMINADO, PENDIENTE DE VALIDACIÓN DEFINITIVA.**

---

# 17. Riesgo Fiscal

## 17.1 Particularidad conceptual

[FP]

Los riesgos fiscales presentan particularidades relacionadas con la posibilidad de producir un efecto dañoso sobre:

- recursos públicos;
- bienes públicos;
- intereses patrimoniales de naturaleza pública.

[HTML]

El prototipo reconoce esta diferencia y permite seleccionar efectos fiscales relacionados con esos elementos.

### Estado

**BIEN ENCAMINADO.**

---

## 17.2 Impacto fiscal

[HTML]

El prototipo utiliza específicamente la cuantía patrimonial expresada en SMLMV para determinar el nivel de impacto de los riesgos fiscales.

[GIGA]

Esta valoración deberá mantenerse diferenciada de los bloques generales utilizados para otras tipologías.

No deberá forzarse un riesgo Fiscal a utilizar exactamente el mismo bloque:

```text
Económica
Reputacional
```

utilizado para otros riesgos.

[PENDIENTE V7]

Antes de cerrar la metodología fiscal deberán estudiarse específicamente:

- el capítulo correspondiente de la Guía V7;
- el Anexo 1 — Formato mapa de riesgos integral parametrizado;
- el Anexo 3 — Catálogo indicativo de puntos de riesgo fiscal;
- los ejemplos oficiales de riesgos fiscales.

No deberá asumirse todavía que la cuantía económica constituye por sí sola toda la valoración del impacto Fiscal.

---

# 18. Riesgos para la Integridad Pública

[FP]

Los riesgos para la Integridad Pública forman parte del enfoque integral incorporado en la Guía V7 y presentan particularidades metodológicas asociadas al Sistema de Gestión de Riesgos para la Integridad Pública — SIGRIP.

[GIGA]

No debe asumirse automáticamente que:

```text
Afectación económica
+
Afectación reputacional
```

representan toda la valoración de impacto para esta tipología.

[PENDIENTE]

Deben extraerse de la metodología correspondiente:

- criterios de impacto;
- reglas de valoración;
- condiciones particulares;
- relación con riesgos asociados a corrupción;
- lavado de activos;
- financiación del terrorismo;
- financiación de la proliferación de armas;
- demás categorías contempladas por SIGRIP.

[HTML]

El prototipo utiliza actualmente la estructura general de afectación económica y reputacional para Integridad Pública.

### Estado

**PROVISIONAL.**

No deberá trasladarse automáticamente a GIGA hasta estudiar la metodología específica de Integridad Pública.

---

# 19. Seguridad de la Información

## 19.1 Particularidades

[FP] / [MINTIC]

Los riesgos de Seguridad de la Información presentan particularidades relacionadas con los activos de información y con la posible afectación de las propiedades de:

- Confidencialidad;
- Integridad;
- Disponibilidad.

Estas propiedades deberán considerarse dentro de la metodología específica aplicable a esta tipología.

---

## 19.2 Activo de información

[HTML]

El prototipo ya contempla un campo destinado a identificar el activo de información relacionado con el riesgo.

### Estado

**CONCEPTUALMENTE PERTINENTE.**

[GIGA]

En el sistema definitivo, siempre que el activo ya exista dentro del inventario institucional de activos de información, deberá procurarse una relación con dicho registro en lugar de duplicar su información mediante texto libre.

Conceptualmente:

```text
Activo de información
          │
          ▼
Riesgo de Seguridad
de la Información
```

[PENDIENTE]

La relación definitiva deberá validarse con el Anexo 5 y con la estructura institucional del inventario de activos de información.

---

## 19.3 Confidencialidad, Integridad y Disponibilidad

[HTML]

El prototipo permite seleccionar múltiples propiedades:

```text
Confidencialidad
Integridad
Disponibilidad
```

y utiliza estas selecciones para construir expresiones relacionadas con la pérdida de dichas propiedades.

### Estado

**EL CONCEPTO ES PERTINENTE, PERO SU UBICACIÓN ACTUAL DEBE REVISARSE.**

Actualmente el HTML las presenta dentro de un elemento denominado:

```text
Causa inmediata
```

[GIGA]

No deberán confundirse las propiedades de seguridad con:

- amenazas;
- vulnerabilidades;
- causas;
- consecuencias.

Provisionalmente deberán distinguirse:

```text
Riesgo de Seguridad de la Información
│
├── Activo de información
│
├── Propiedad afectada
│   ├── Confidencialidad
│   ├── Integridad
│   └── Disponibilidad
│
├── Amenaza
├── Vulnerabilidad
├── Causas
├── Consecuencias
└── Impacto
```

[PENDIENTE]

La estructura definitiva deberá obtenerse principalmente del:

**Anexo 5 — Matriz de Riesgos de Seguridad de la Información**

y de los lineamientos oficiales de MinTIC incorporados o referenciados por la metodología.

---

# 20. Determinación del riesgo inherente

[FP]

Una vez determinados:

```text
Nivel de probabilidad
Nivel de impacto
```

se establece el nivel de riesgo inherente mediante la matriz de severidad o mapa de calor definido por la metodología.

Conceptualmente:

```text
Probabilidad
      │
      └──────────────┐
                     ▼
              MATRIZ DE
              SEVERIDAD
                     ▲
      ┌──────────────┘
      │
   Impacto
      │
      ▼
Zona de riesgo
inherente
```

La zona resultante representa una clasificación metodológica.

---

# 21. Matriz de severidad

[FP]

La matriz combina:

```text
5 niveles de probabilidad
            ×
5 niveles de impacto
```

produciendo:

```text
25 cruces posibles
```

Los niveles de probabilidad son:

```text
Muy Baja
Baja
Media
Alta
Muy Alta
```

Los niveles de impacto son:

```text
Leve
Menor
Moderado
Mayor
Catastrófico
```

Las zonas utilizadas por la metodología son:

```text
Bajo
Moderado
Alto
Extremo
```

[PENDIENTE CRÍTICO]

La asignación exacta de las 25 combinaciones deberá tomarse directamente de la matriz oficial contenida en la Guía V7 o en el Anexo 1 parametrizado.

No deberá reconstruirse mediante inferencias matemáticas ni utilizando los umbrales existentes en el prototipo.

---

# 22. Comparación con el HTML — Riesgo inherente

[HTML]

El prototipo actualmente obtiene:

```text
riesgo = probabilidad × impacto
```

Posteriormente utiliza el resultado numérico para determinar la zona.

La lógica conceptual actual es:

```text
Probabilidad
      ×
Impacto
      │
      ▼
Producto decimal
      │
      ▼
Clasificación por intervalos
      │
      ▼
Zona
```

El prototipo contiene actualmente los siguientes límites:

```text
Hasta 0.08
→ Bajo

Hasta 0.24
→ Moderado

Hasta 0.48
→ Alto

Superior
→ Extremo
```

### Estado

**NO DEBE TRASLADARSE AUTOMÁTICAMENTE A GIGA.**

---

# 23. Corrección metodológica de la determinación de zona

[GIGA]

La zona deberá obtenerse mediante el cruce establecido por la matriz metodológica oficial.

No mediante una clasificación independiente basada exclusivamente en el producto aritmético.

Por tanto:

```text
NO UTILIZAR COMO REGLA DE ZONA

zona =
    clasificar(
        probabilidad × impacto
    )
```

La estructura deberá ser:

```text
UTILIZAR

zona =
    matrizMetodologica
        [nivelProbabilidad]
        [nivelImpacto]
```

Conceptualmente:

```text
Nivel de probabilidad
          │
          ├────────────┐
          │            │
          │            ▼
          │      MATRIZ OFICIAL
          │            ▲
          │            │
          └──────┐     │
                 │     │
Nivel de impacto ──────┘
                 │
                 ▼
              Zona
```

[PENDIENTE CRÍTICO]

Antes de implementar esta regla deberán cargarse y validarse las 25 combinaciones directamente desde la fuente metodológica oficial.

---

# 24. Producto probabilidad × impacto

[GIGA]

El producto matemático:

```text
probabilidad × impacto
```

no debe confundirse automáticamente con la zona metodológica.

Podrá conservarse únicamente si la metodología oficial lo utiliza o si resulta útil como:

- dato auxiliar;
- referencia numérica;
- indicador;
- elemento de visualización;
- apoyo para reportes.

En ese caso deberán diferenciarse claramente:

```text
Valor numérico
```

y:

```text
Zona metodológica
```

[PENDIENTE]

Debe verificarse en V7 y en el Anexo 1 cuál es el papel exacto del producto numérico dentro de la metodología.

Hasta entonces no deberá utilizarse como regla principal para clasificar la severidad.

---

# 25. Representación conceptual de la valoración inherente

[GIGA]

Con el conocimiento disponible hasta este punto puede plantearse provisionalmente:

```text
ValoracionRiesgo
│
├── tipo
│   └── INHERENTE
│
├── Probabilidad
│   ├── nivel
│   ├── valor
│   └── criterio
│
├── Impacto
│   ├── nivel
│   ├── valor
│   └── criterio
│
├── zona
│
├── metodologiaAplicada
└── versionMetodologia
```

Esta estructura representa conocimiento conceptual.

No constituye todavía:

- una tabla;
- un modelo Prisma;
- una clase;
- una estructura JSON definitiva.

---

# 26. Versionamiento metodológico

[GIGA]

Las reglas utilizadas para valorar un riesgo pueden cambiar con futuras versiones de la metodología.

Por tanto, debe ser posible conocer bajo qué metodología fue realizada una valoración.

Ejemplo:

```text
Riesgo:
R-GTI-001

Valoración:
Inherente

Metodología:
Guía para la Gestión Integral del Riesgo
en Entidades Públicas

Versión:
7
```

Una futura actualización de la metodología no deberá modificar silenciosamente el significado histórico de valoraciones realizadas con versiones anteriores.

---

# 27. Parametrización metodológica

[GIGA]

Las reglas metodológicas no deberán quedar dispersas dentro de los componentes del formulario.

Deberán mantenerse organizadas y controladas.

Entre ellas:

```text
Escalas de probabilidad
Frecuencias
Escalas de impacto
Criterios de impacto
Matriz de severidad
Zonas
Reglas particulares por tipología
```

Conceptualmente:

```text
Metodología
│
├── EscalaProbabilidad
├── EscalaImpacto
├── MatrizSeveridad
└── ReglasTipologia
```

Esto permitirá mantener las reglas metodológicas separadas de la presentación visual.

No significa construir un generador universal de formularios ni una arquitectura excesivamente genérica.

Las reglas deberán permanecer explícitas, comprensibles y trazables.

---

# 28. Datos aportados frente a datos calculados

[GIGA]

El futuro formulario deberá diferenciar claramente:

## Información aportada por el usuario

Dependiendo de la tipología:

```text
Frecuencia de la actividad
Criterios de impacto
Tipos de afectación
Información fiscal
Activo de información
Información específica de la tipología
```

## Información determinada por GIGA

Cuando la metodología lo permita:

```text
Nivel de probabilidad
Valor de probabilidad
Nivel de impacto
Valor de impacto
Zona de riesgo inherente
```

El usuario no debería seleccionar directamente:

```text
Zona = Alto
```

cuando la zona pueda determinarse automáticamente mediante la metodología.

---

# 29. Explicabilidad de la valoración

[GIGA]

Una valoración debe poder explicar cómo se obtuvo su resultado.

El sistema debería poder responder:

```text
¿Por qué este riesgo quedó ubicado en esta zona?
```

Ejemplo conceptual:

```text
PROBABILIDAD

Nivel:
Media

Valor:
60 %

Criterio:
Frecuencia de ejecución correspondiente
al nivel Media.


IMPACTO

Nivel:
Mayor

Valor:
80 %

Criterio:
Criterio metodológico correspondiente.


CRUCE METODOLÓGICO

Probabilidad:
Media

Impacto:
Mayor


RESULTADO

Zona:
[resultado de la matriz oficial]
```

No debería conservarse únicamente:

```text
zona = "Alto"
```

sin los elementos que permitieron obtenerla.

---

# 30. Trazabilidad

[GIGA]

La valoración deberá conservar información suficiente para conocer:

```text
qué información ingresó el usuario;
qué criterio metodológico se aplicó;
qué resultado produjo;
qué versión metodológica se utilizó;
cuándo se realizó la valoración;
quién realizó o modificó la valoración.
```

Este principio será especialmente importante cuando se realicen:

- seguimientos;
- actualizaciones;
- nuevas vigencias;
- auditorías;
- comparaciones históricas;
- cambios metodológicos.

---

# 31. Relación con los controles

[FP]

La valoración documentada hasta este punto corresponde al riesgo antes de considerar controles.

Posteriormente:

```text
RIESGO INHERENTE
        │
        ▼
     CONTROLES
        │
        ▼
VALORACIÓN DE CONTROLES
        │
        ▼
RIESGO RESIDUAL
```

[GIGA]

Las reglas correspondientes a:

- identificación de controles;
- diseño de controles;
- tipo de control;
- implementación;
- eficiencia;
- aplicación de múltiples controles;
- reducción de probabilidad;
- reducción de impacto;
- determinación del riesgo residual;
- ubicación residual dentro de la matriz;

se documentarán separadamente.

Documento previsto:

```text
05-controles-riesgo-residual.md
```

---

# 32. Comparación general del HTML frente a esta etapa

El análisis realizado hasta este punto produce la siguiente clasificación:

| Elemento del prototipo | Estado |
|---|---|
| Cinco niveles de probabilidad | COINCIDE |
| Valores 20/40/60/80/100 | COINCIDE |
| Uso de frecuencia de la actividad | COINCIDE SUSTANCIALMENTE |
| Cinco niveles de impacto | COINCIDE |
| Valores 20/40/60/80/100 | COINCIDE |
| Criterios económicos | COINCIDE SUSTANCIALMENTE |
| Criterios reputacionales | COINCIDE SUSTANCIALMENTE |
| Selección Económica/Reputacional | PENDIENTE POR TIPOLOGÍA |
| Máximo entre impacto económico y reputacional | PENDIENTE DE VALIDACIÓN |
| Tratamiento diferenciado del riesgo Fiscal | BIEN ENCAMINADO |
| Cuantía fiscal en SMLMV | REQUIERE VALIDACIÓN ESPECÍFICA |
| Activo de información | PERTINENTE |
| Confidencialidad | PERTINENTE |
| Integridad | PERTINENTE |
| Disponibilidad | PERTINENTE |
| C/I/D como causa inmediata | REPLANTEAR |
| Riesgo inherente separado del residual | CORRECTO |
| Existencia de mapa de calor | CORRECTO |
| Cinco niveles de probabilidad × cinco de impacto | CORRECTO CONCEPTUALMENTE |
| Producto probabilidad × impacto | PENDIENTE COMO DATO AUXILIAR |
| Clasificar zona mediante umbrales del producto | NO TRASLADAR A GIGA |
| Umbrales 0.08 / 0.24 / 0.48 | NO ASUMIR COMO METODOLOGÍA |
| Matriz oficial de 25 cruces | PENDIENTE DE EXTRAER DEL ANEXO 1 |
| Reglas específicas de Integridad Pública | PENDIENTE |
| Reglas específicas de Seguridad de la Información | PENDIENTE |

---

# 33. Reglas de GIGA derivadas

## [GIGA-RIESGO-003] Determinación de probabilidad

La probabilidad deberá determinarse mediante los criterios de exposición establecidos por la metodología aplicable.

Cuando sea posible calcularla a partir de dichos criterios, el usuario no seleccionará directamente el porcentaje de probabilidad.

---

## [GIGA-RIESGO-004] Determinación del impacto

El impacto deberá determinarse aplicando los criterios establecidos por la metodología correspondiente a la tipología del riesgo.

No se asumirá que todas las tipologías utilizan los mismos criterios.

---

## [GIGA-RIESGO-005] Independencia del riesgo inherente

La valoración inherente deberá conservarse independientemente de cualquier valoración residual posterior.

Los controles no modificarán históricamente la información que permitió determinar el riesgo inherente.

---

## [GIGA-RIESGO-006] Determinación de la zona

La zona de severidad deberá determinarse mediante la matriz metodológica oficial vigente.

No deberá determinarse mediante intervalos arbitrarios aplicados exclusivamente al producto numérico de probabilidad e impacto.

---

## [GIGA-RIESGO-007] Explicabilidad

Toda valoración deberá conservar información suficiente para reconstruir posteriormente cómo se obtuvieron:

- la probabilidad;
- el impacto;
- la zona resultante.

---

## [GIGA-RIESGO-008] Versionamiento metodológico

Las escalas, criterios y matrices utilizadas deberán poder asociarse con la versión metodológica bajo la cual se realizó la valoración.

---

## [GIGA-RIESGO-009] Resultados calculados

Los resultados que puedan determinarse automáticamente mediante reglas metodológicas no deberán ser modificables directamente por el usuario, salvo que la metodología permita expresamente una modificación y exista trazabilidad de la justificación.

---

## [GIGA-RIESGO-010] Particularidades por tipología

Las particularidades relacionadas con probabilidad e impacto dependerán de la tipología del riesgo.

Estas particularidades no convertirán las tipologías en entidades jerárquicamente diferentes de `Riesgo`.

---

## [GIGA-RIESGO-011] Separación entre datos y metodología

Los datos registrados por el usuario deberán mantenerse conceptualmente separados de las reglas metodológicas utilizadas para interpretarlos y producir una valoración.

---

## [GIGA-RIESGO-012] Trazabilidad de la valoración

Toda valoración deberá permitir identificar:

- información de origen;
- criterios aplicados;
- resultados;
- versión metodológica;
- fecha;
- responsable de la valoración o modificación.

---

# 34. Correcciones que deberán realizarse al prototipo

[HTML] / [GIGA]

Cuando el prototipo sea utilizado posteriormente como referencia para construir el formulario definitivo, deberán considerarse al menos las siguientes correcciones:

## 34.1 Zona de severidad

No trasladar:

```text
probabilidad × impacto
        ↓
intervalos numéricos
        ↓
zona
```

Sustituir conceptualmente por:

```text
nivel de probabilidad
        +
nivel de impacto
        ↓
matriz oficial
        ↓
zona
```

---

## 34.2 Matriz de severidad

No utilizar automáticamente los límites actuales:

```text
0.08
0.24
0.48
```

La matriz deberá construirse a partir de las 25 combinaciones oficiales.

---

## 34.3 Múltiples afectaciones

No trasladar automáticamente:

```text
MAX(
    impacto económico,
    impacto reputacional
)
```

hasta verificar la regla oficial correspondiente.

---

## 34.4 Seguridad de la Información

No utilizar:

```text
Confidencialidad
Integridad
Disponibilidad
```

como si fueran directamente una "causa inmediata".

Deben analizarse separadamente:

```text
Activo
Propiedad afectada
Amenaza
Vulnerabilidad
Causa
Consecuencia
Impacto
```

según la metodología específica.

---

## 34.5 Integridad Pública

No reutilizar automáticamente el mismo análisis de impacto de Gestión.

La interfaz deberá responder a las particularidades establecidas por la metodología de Integridad Pública y SIGRIP.

---

## 34.6 Riesgo Fiscal

Conservar el tratamiento diferenciado que ya presenta el prototipo, pero validar completamente sus criterios contra el capítulo fiscal y los anexos correspondientes antes de implementarlos.

---

# 35. Pendientes metodológicos

[PENDIENTE]

Antes de considerar completamente cerrado este documento deberán verificarse directamente en las fuentes oficiales:

1. redacción exacta de los rangos de frecuencia;
2. operadores exactos de los valores frontera de probabilidad;
3. límites exactos del impacto económico;
4. operadores exactos de los intervalos económicos;
5. redacción oficial de los criterios reputacionales;
6. regla aplicable cuando existen múltiples tipos de afectación;
7. distribución exacta de las 25 posiciones de la matriz de severidad;
8. papel exacto del producto numérico probabilidad × impacto;
9. criterios particulares para riesgos de Gestión;
10. criterios particulares para riesgos Fiscales;
11. criterios particulares para Integridad Pública;
12. criterios particulares para Seguridad de la Información;
13. relación exacta entre activo, amenaza, vulnerabilidad, C/I/D e impacto;
14. reglas aplicables a las categorías desarrolladas dentro de SIGRIP.

---

# 36. Fuentes prioritarias para cerrar los pendientes

## [FP] Fuente principal

**Guía para la Gestión Integral del Riesgo en Entidades Públicas — Versión 7**

Esta constituye la fuente metodológica principal.

---

## [FP] Anexo 1

**Formato mapa de riesgos integral parametrizado**

Debe utilizarse prioritariamente para verificar:

- escalas;
- criterios;
- parametrizaciones;
- probabilidad;
- impacto;
- matriz de severidad;
- reglas utilizadas en el mapa integral de riesgos.

---

## [FP] Anexo 3

**Catálogo indicativo de puntos de riesgo fiscal**

Debe utilizarse para complementar el análisis específico de riesgos fiscales.

---

## [FP] Anexo 5

**Matriz de Riesgos de Seguridad de la Información**

Debe utilizarse para establecer las particularidades correspondientes a:

- activos de información;
- propiedades de seguridad;
- amenazas;
- vulnerabilidades;
- valoración;
- tratamiento de riesgos de Seguridad de la Información.

---

## [MINTIC]

Los lineamientos oficiales de MinTIC deberán utilizarse cuando sean requeridos por la metodología de Seguridad de la Información o sean incorporados/referenciados por la Guía V7.

---

# 37. Principio de prevalencia metodológica

[GIGA]

Para el desarrollo del módulo se aplicará el siguiente orden:

```text
FUENTE OFICIAL
      │
      ▼
BASE DE CONOCIMIENTO
      │
      ▼
REGLAS FUNCIONALES DE GIGA
      │
      ▼
MODELO DE DATOS
      │
      ▼
LÓGICA DEL SISTEMA
      │
      ▼
FORMULARIO
```

No deberá utilizarse el orden inverso:

```text
HTML EXISTENTE
      │
      ▼
inferir metodología
```

El prototipo será utilizado para:

- conservar ideas funcionales útiles;
- identificar campos candidatos;
- analizar experiencia de usuario;
- detectar reglas previamente consideradas;
- comparar el comportamiento existente con la metodología.

Pero no será utilizado como autoridad metodológica.

---

# 38. Estado del documento

El estado actual de esta parte de la base de conocimiento es:

```text
Probabilidad general
        → AVANZADA

Impacto general
        → AVANZADO

Impacto económico
        → AVANZADO / VALIDACIÓN FINAL PENDIENTE

Impacto reputacional
        → AVANZADO / VALIDACIÓN FINAL PENDIENTE

Riesgo Fiscal
        → REQUIERE ANÁLISIS ESPECÍFICO

Integridad Pública
        → REQUIERE ANÁLISIS ESPECÍFICO

Seguridad de la Información
        → REQUIERE ANEXO 5

Matriz de severidad
        → REQUIERE ANEXO 1

Múltiples afectaciones
        → PENDIENTE DE VALIDACIÓN
```

Por tanto, el documento puede utilizarse como base conceptual, pero los elementos marcados `[PENDIENTE]` no deberán convertirse todavía en reglas definitivas del motor de GIGA.

---

# 39. Conclusión

El análisis realizado demuestra que el prototipo `index.html` se encuentra bien encaminado en varios elementos fundamentales de probabilidad e impacto.

Se consideran especialmente aprovechables:

- los cinco niveles de probabilidad;
- los valores 20 %, 40 %, 60 %, 80 % y 100 %;
- la relación entre probabilidad y frecuencia de ejecución;
- los cinco niveles generales de impacto;
- los criterios económicos;
- los criterios reputacionales;
- la separación entre riesgo inherente y riesgo residual;
- el concepto de mapa de calor;
- el tratamiento diferenciado de determinados campos según la tipología;
- la incorporación del activo de información;
- la consideración de Confidencialidad, Integridad y Disponibilidad.

Sin embargo, el prototipo no constituye una fuente metodológica.

La corrección conceptual más importante identificada hasta este punto corresponde a la determinación de la zona de severidad.

El prototipo actualmente sigue aproximadamente:

```text
Probabilidad
      ×
Impacto
      │
      ▼
Producto numérico
      │
      ▼
Umbrales
      │
      ▼
Zona
```

La implementación definitiva de GIGA deberá seguir:

```text
Nivel de probabilidad
          +
Nivel de impacto
          │
          ▼
Matriz metodológica oficial
          │
          ▼
Zona de severidad
```

La asignación exacta de las zonas deberá provenir directamente de la Guía V7 o de su Anexo 1 parametrizado.

Asimismo, deberán validarse antes de implementarse:

```text
regla para múltiples afectaciones;
criterios fiscales;
criterios de Integridad Pública;
criterios de Seguridad de la Información;
relación entre C/I/D, amenazas y vulnerabilidades.
```

En todos los casos:

**la metodología oficial prevalecerá sobre el comportamiento existente en `index.html`.**

El objetivo de GIGA no será reproducir el prototipo, sino utilizarlo como referencia funcional para construir una implementación fiel, trazable y mantenible de la metodología oficial.