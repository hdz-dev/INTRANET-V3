# Controles y riesgo residual

## 1. Propósito

Este documento establece la base de conocimiento metodológica relacionada con:

- identificación y descripción de controles;
- atributos utilizados para analizar los controles;
- valoración de su eficiencia;
- efecto de los controles sobre la probabilidad y/o el impacto;
- determinación del riesgo residual;
- trazabilidad de los controles;
- diferencias metodológicas según la tipología del riesgo;
- comparación entre la metodología oficial y el comportamiento actualmente implementado en `index.html`.

La metodología oficial prevalece sobre cualquier fórmula, campo o comportamiento existente en el prototipo.

Este documento no constituye todavía:

- un modelo de datos;
- un modelo Prisma;
- una definición de tablas;
- una especificación definitiva de interfaz;
- una implementación del motor de cálculo.

---

## 2. Fuentes y clasificación del conocimiento

Las reglas contenidas en este documento utilizan las siguientes etiquetas:

### [FP]

Información proveniente del Departamento Administrativo de la Función Pública, principalmente de la **Guía para la Gestión Integral del Riesgo en Entidades Públicas — Versión 7** y sus anexos.

### [MINTIC]

Información proveniente de lineamientos oficiales del Ministerio de Tecnologías de la Información y las Comunicaciones.

### [ALCALDÍA]

Regla, procedimiento o práctica institucional propia de la Alcaldía Municipal de Jamundí.

### [GIGA]

Decisión conceptual, funcional o técnica adoptada para el diseño de GIGA.

### [HTML]

Comportamiento actualmente existente en el prototipo `index.html`.

### [PENDIENTE]

Elemento que requiere comprobación adicional contra la Guía V7, el Anexo 1 u otra fuente oficial antes de convertirse en una regla definitiva.

---

# 3. Ubicación dentro de la metodología

[FP]

El análisis de controles ocurre después de determinar el riesgo inherente.

Conceptualmente:

```text
Identificación del riesgo
          │
          ▼
Probabilidad + Impacto
          │
          ▼
   Riesgo inherente
          │
          ▼
       Controles
          │
          ▼
Análisis de los controles
          │
          ▼
   Riesgo residual
```

Por tanto, los controles no participan en la determinación inicial del riesgo inherente.

Su efecto debe analizarse posteriormente.

[GIGA]

El sistema deberá mantener claramente separados:

```text
Valoración inherente
        │
        ▼
Controles
        │
        ▼
Valoración residual
```

---

# 4. Concepto de control

[FP]

Un control corresponde a una medida establecida para modificar el riesgo.

Los controles deben analizarse en relación con el riesgo sobre el cual actúan.

Un control no debe ser únicamente una descripción genérica como:

```text
Se realizan verificaciones.
```

La información registrada debe permitir entender:

- quién ejecuta el control;
- qué acción realiza;
- cómo funciona;
- cuándo se ejecuta;
- cómo queda evidencia de su ejecución;
- qué ocurre frente a desviaciones;
- cuál es su naturaleza;
- cómo se implementa;
- sobre qué componente del riesgo actúa.

[GIGA]

Conceptualmente:

```text
Riesgo
  │
  └── Control[]
          │
          ├── Responsable
          ├── Acción
          ├── Tipo
          ├── Implementación
          ├── Frecuencia
          ├── Evidencia
          ├── Documentación
          ├── Ejecución
          └── Información complementaria
```

Un riesgo puede tener:

```text
0..N controles
```

Por tanto, los controles no deberán representarse mediante columnas fijas como:

```text
Control A
Control B
Control C
```

---

# 5. Relación entre riesgo y control

[GIGA]

Cada control deberá encontrarse relacionado con el riesgo al cual pretende modificar.

Conceptualmente:

```text
Riesgo
│
├── Control 1
├── Control 2
├── Control 3
└── ...
```

La cantidad de controles no deberá estar limitada artificialmente por la estructura de la matriz consolidada.

La matriz podrá posteriormente representar controles en columnas para efectos de reporte, pero dicha representación no deberá determinar la estructura conceptual ni la persistencia de los datos.

---

# 6. Descripción estructurada del control

[FP]

La metodología requiere que el diseño del control pueda comprenderse claramente.

[GIGA]

Debe evitarse almacenar todo el control exclusivamente dentro de un texto libre.

Es preferible separar los diferentes elementos que permiten analizarlo.

Conceptualmente:

```text
Control
│
├── Responsable
├── Acción
├── Complemento de la acción
├── Manejo de desviaciones
│
├── Tipo
├── Implementación
│
├── Documentación
├── Frecuencia
├── Evidencia
└── Ejecución
```

[PENDIENTE]

La denominación exacta de cada elemento deberá ajustarse a la terminología utilizada en la Guía V7 y en el Anexo 1.

---

# 7. Responsable del control

[FP]

El control debe permitir identificar quién es responsable de realizar la acción de control.

El responsable debe corresponder preferentemente a un cargo, rol o función institucional y no depender exclusivamente del nombre de una persona.

Esto permite mantener la vigencia del control cuando cambia el funcionario que ocupa el cargo.

[GIGA]

Conceptualmente:

```text
Control
   │
   └── Responsable
```

Siempre que la estructura organizacional se encuentre disponible dentro de GIGA, deberá procurarse relacionar el responsable con dicha estructura.

Por ejemplo:

```text
Cargo
Rol
Responsabilidad funcional
```

y no almacenar únicamente:

```text
"Carlos Pérez"
```

como texto libre.

[PENDIENTE]

Determinar posteriormente si la responsabilidad se relacionará directamente con:

- cargo;
- usuario;
- dependencia;
- rol institucional;
- combinación de los anteriores.

---

# 8. Responsable en controles automáticos

[FP]

La existencia de un control automático no elimina necesariamente la necesidad de identificar un responsable.

En controles implementados mediante sistemas de información puede existir responsabilidad relacionada con:

- parametrización;
- configuración;
- mantenimiento;
- calibración;
- revisión periódica;
- supervisión del funcionamiento.

[GIGA]

Por tanto:

```text
Implementación = Automática
```

no deberá producir automáticamente:

```text
Responsable = No aplica
```

El formulario deberá permitir identificar la responsabilidad asociada al funcionamiento del control automático cuando la metodología lo requiera.

---

# 9. Acción del control

[FP]

La acción representa lo que efectivamente realiza el control.

Debe formularse de manera suficientemente clara para comprender su funcionamiento.

Ejemplos conceptuales:

```text
Verificar...
Validar...
Comparar...
Autorizar...
Conciliar...
Revisar...
Bloquear...
```

[GIGA]

La acción deberá conservarse separadamente del responsable.

Conceptualmente:

```text
Responsable
    │
    ▼
ejecuta
    │
    ▼
Acción de control
```

No debe mezclarse en un único campo:

```text
Responsable + acción + frecuencia
```

si esos elementos pueden analizarse separadamente.

---

# 10. Complemento de la acción

[HTML]

El prototipo contiene actualmente un campo denominado:

```text
accion_complemento
```

[GIGA]

Este campo representa una idea funcional aprovechable:

la acción puede requerir información adicional que explique:

- qué se verifica;
- contra qué se compara;
- mediante qué mecanismo;
- qué criterio se utiliza;
- cuál es el alcance del control.

[PENDIENTE]

Debe verificarse si V7 lo maneja como un atributo independiente o como parte de la descripción estructurada del control.

No debe conservarse automáticamente el nombre técnico actual del HTML como concepto definitivo.

---

# 11. Manejo de desviaciones

[HTML]

El prototipo contiene:

```text
desviacion_registro
```

como información asociada al control.

[GIGA]

Conceptualmente es importante conocer qué ocurre cuando el control detecta una desviación.

Ejemplo:

```text
Control
   │
   ▼
detecta desviación
   │
   ▼
Acción frente a la desviación
```

Puede incluir aspectos como:

- corrección;
- devolución;
- bloqueo;
- escalamiento;
- registro;
- reporte;
- tratamiento de la inconsistencia.

[PENDIENTE]

Debe verificarse la denominación y tratamiento exactos establecidos por V7.

---

# 12. Atributos del control

[FP]

Para analizar los controles deben distinguirse atributos relacionados con su eficiencia y atributos utilizados para describir o formalizar su funcionamiento.

Conceptualmente:

```text
Control
│
├── Atributos de eficiencia
│
└── Atributos de formalización / información
```

[GIGA]

Esta separación deberá mantenerse en la base de conocimiento y posteriormente en el motor metodológico.

---

# 13. Atributos de eficiencia

[FP]

Los atributos de eficiencia considerados en la metodología comprenden:

```text
Tipo
Implementación
```

Estos atributos tienen incidencia en la valoración metodológica del control.

---

# 14. Tipo de control

[FP]

Los controles pueden clasificarse según el momento o forma en que intervienen frente al riesgo.

Las categorías contempladas son:

```text
Preventivo
Detectivo
Correctivo
```

---

# 15. Control preventivo

[FP]

El control preventivo actúa antes de que ocurra la materialización del riesgo.

Su finalidad se encuentra orientada a reducir la posibilidad de ocurrencia.

Conceptualmente:

```text
Antes del evento
      │
      ▼
Control preventivo
      │
      ▼
Reduce probabilidad
```

[GIGA]

Los controles preventivos deberán afectar el componente de probabilidad cuando así lo establezca la metodología.

---

# 16. Control detectivo

[FP]

El control detectivo permite identificar una situación o desviación asociada a la posible materialización del riesgo.

Conceptualmente:

```text
Situación / desviación
          │
          ▼
   Control detectivo
          │
          ▼
      detección
```

Dentro de la metodología utilizada como referencia, estos controles tienen incidencia sobre la probabilidad.

[GIGA]

Su tratamiento definitivo deberá responder exactamente a la regla establecida por V7 y el Anexo 1.

---

# 17. Control correctivo

[FP]

El control correctivo actúa frente a las consecuencias o efectos derivados de la materialización del riesgo.

Conceptualmente:

```text
Materialización
      │
      ▼
Consecuencia
      │
      ▼
Control correctivo
      │
      ▼
Reducción del efecto
```

Dentro de la metodología utilizada como referencia, su efecto se relaciona con el impacto.

[GIGA]

La aplicación definitiva sobre el impacto deberá implementarse según la regla oficial vigente.

---

# 18. Comparación con el HTML — Tipo de control

[HTML]

El prototipo contiene:

```text
Preventivo
Detectivo
Correctivo
```

y aplica:

```text
Preventivo
Detectivo
      ↓
Probabilidad

Correctivo
      ↓
Impacto
```

### Estado

**COINCIDE SUSTANCIALMENTE CON LA ESTRUCTURA METODOLÓGICA.**

[GIGA]

La clasificación puede conservarse conceptualmente.

El algoritmo exacto de reducción deberá validarse separadamente.

---

# 19. Implementación del control

[FP]

Otro atributo relevante corresponde a la forma de implementación del control.

Las categorías utilizadas son:

```text
Manual
Automático
```

---

# 20. Control manual

[FP]

Un control manual requiere intervención humana para su ejecución.

Conceptualmente:

```text
Persona / responsable
        │
        ▼
Ejecuta el control
```

La existencia de apoyo tecnológico no necesariamente convierte por sí sola un control en automático.

[PENDIENTE]

La definición exacta deberá conservarse conforme a la terminología de V7.

---

# 21. Control automático

[FP]

Un control automático es ejecutado principalmente mediante mecanismos tecnológicos o configuraciones de sistemas.

Conceptualmente:

```text
Sistema
   │
   ▼
ejecuta regla / validación
   │
   ▼
Control automático
```

Aun cuando su ejecución sea automática, puede existir una responsabilidad humana relacionada con su configuración y mantenimiento.

---

# 22. Comparación con el HTML — Implementación

[HTML]

El prototipo contiene:

```text
Manual
Automático
```

### Estado

**COINCIDE CON LA ESTRUCTURA GENERAL UTILIZADA POR LA METODOLOGÍA.**

---

# 23. Pesos metodológicos de eficiencia

[HTML]

El prototipo contiene actualmente los siguientes valores:

```text
TIPO

Preventivo  = 25 %
Detectivo   = 15 %
Correctivo  = 10 %

IMPLEMENTACIÓN

Manual      = 15 %
Automático  = 25 %
```

y calcula:

```text
efectividadControl =
    pesoTipo
    +
    pesoImplementacion
```

Por ejemplo:

```text
Preventivo + Manual

25 % + 15 %

= 40 %
```

Otro ejemplo:

```text
Preventivo + Automático

25 % + 25 %

= 50 %
```

Otro:

```text
Detectivo + Manual

15 % + 15 %

= 30 %
```

[FP]

Estos valores se encuentran alineados con la estructura metodológica utilizada como referencia para la valoración de eficiencia de controles.

### Estado

**BIEN ENCAMINADO Y CON ALTA COINCIDENCIA.**

[PENDIENTE CRÍTICO]

Antes de incorporarlos definitivamente al motor de GIGA deberán verificarse directamente contra:

```text
Guía V7
+
Anexo 1 parametrizado
```

La validación deberá confirmar:

- pesos exactos;
- combinaciones permitidas;
- tratamiento de cada tipo;
- tratamiento de cada implementación;
- regla exacta de aplicación sobre el riesgo.

---

# 24. Eficiencia del control

[GIGA]

Debe diferenciarse entre:

```text
características del control
```

y:

```text
efecto del control sobre el riesgo
```

Conceptualmente:

```text
Tipo
   +
Implementación
   │
   ▼
Valoración metodológica
del control
   │
   ▼
Efecto sobre el riesgo
```

La lógica exacta deberá provenir de la metodología oficial.

No se deberá asumir que cualquier combinación de atributos produce automáticamente un porcentaje final aplicable mediante una fórmula genérica sin verificar el Anexo 1.

---

# 25. Atributos de formalización

[FP]

Además de los atributos relacionados directamente con eficiencia, la metodología analiza información que permite conocer la formalización y operación del control.

Entre los elementos que deben revisarse se encuentran:

```text
Documentación
Frecuencia
Evidencia
Ejecución
```

[GIGA]

Estos elementos deberán mantenerse separados de:

```text
Tipo
Implementación
```

porque cumplen funciones metodológicas diferentes.

---

# 26. Documentación del control

[FP]

Debe poder identificarse si el control se encuentra formalmente documentado.

La documentación puede encontrarse en elementos institucionales como:

- procedimientos;
- manuales;
- instructivos;
- protocolos;
- políticas;
- sistemas;
- documentos equivalentes.

[GIGA]

Conceptualmente:

```text
Control
   │
   └── Documentación
```

No debe entenderse necesariamente como cargar un archivo en cada control.

Puede representar inicialmente la existencia y referencia del documento que formaliza el control.

[PENDIENTE]

Determinar posteriormente cómo se relacionará con el sistema documental o con evidencias institucionales dentro de GIGA.

---

# 27. Frecuencia del control

[FP]

La frecuencia describe cuándo o con qué periodicidad se ejecuta el control.

Debe diferenciarse de la frecuencia de la actividad utilizada previamente para calcular la probabilidad inherente.

Son conceptos diferentes:

```text
FRECUENCIA DE LA ACTIVIDAD
        │
        ▼
Probabilidad inherente
```

frente a:

```text
FRECUENCIA DEL CONTROL
        │
        ▼
Cómo / cuándo se ejecuta el control
```

[GIGA]

Esta distinción debe reflejarse claramente en el formulario.

---

# 28. Corrección al HTML — Responsable y frecuencia

[HTML]

El prototipo contiene actualmente un campo:

```text
responsable_frecuencia
```

[GIGA]

Este campo mezcla dos conceptos diferentes:

```text
Responsable
Frecuencia
```

En GIGA deberán separarse.

Conceptualmente:

```text
Control
│
├── Responsable
└── Frecuencia
```

### Corrección requerida

No trasladar:

```text
responsable_frecuencia
```

como un único atributo del modelo definitivo.

---

# 29. Evidencia del control

[FP]

La ejecución del control debe poder dejar evidencia cuando corresponda.

La evidencia permite demostrar que el control fue efectivamente ejecutado.

Ejemplos conceptuales:

```text
registro
reporte
log
firma
acta
lista de verificación
registro del sistema
documento
transacción
```

[GIGA]

Debe diferenciarse:

```text
Evidencia esperada del control
```

de:

```text
Evidencia concreta producida durante una ejecución
```

Esta diferencia será importante posteriormente.

Conceptualmente:

```text
CONTROL

Evidencia esperada:
"Registro de validación en el sistema"
```

frente a:

```text
EJECUCIÓN DEL CONTROL

Evidencia:
registro real producido
```

[PENDIENTE]

Determinar durante el análisis de seguimiento si GIGA debe almacenar:

- descripción del tipo de evidencia;
- evidencias concretas;
- ambas.

---

# 30. Ejecución del control

[FP]

La metodología no debe considerar únicamente cómo está diseñado el control.

También resulta relevante conocer si efectivamente se ejecuta.

Conceptualmente:

```text
DISEÑO DEL CONTROL
        │
        ▼
¿Está correctamente definido?
```

y:

```text
OPERACIÓN DEL CONTROL
        │
        ▼
¿Se ejecuta realmente?
```

[GIGA]

Debe distinguirse:

```text
Control diseñado
```

de:

```text
Control ejecutado
```

Esta diferencia es fundamental para futuras actividades de:

- seguimiento;
- segunda línea;
- auditoría;
- verificación;
- evaluación de efectividad.

---

# 31. Comparación con el HTML — Atributos de formalización

[HTML]

El prototipo actualmente maneja principalmente:

```text
responsable_frecuencia
accion_complemento
desviacion_registro
tipo_control
implementacion
```

[GIGA]

Frente a la estructura metodológica que se está documentando, el prototipo requiere una ampliación.

Conceptualmente faltan como elementos explícitos:

```text
Responsable
Frecuencia
Documentación
Evidencia
Ejecución
```

y debe revisarse la representación de:

```text
Acción
Complemento
Manejo de desviaciones
```

### Estado

**EL PROTOTIPO ESTÁ BIEN ENCAMINADO, PERO LA ESTRUCTURA DE CONTROL ES INCOMPLETA.**

---

# 32. Estructura conceptual provisional del control

[GIGA]

Con el conocimiento disponible hasta este punto puede plantearse:

```text
Control
│
├── Descripción
│
├── Responsable
│
├── Acción
│
├── Complemento
│
├── ManejoDesviacion
│
├── Tipo
│   ├── Preventivo
│   ├── Detectivo
│   └── Correctivo
│
├── Implementación
│   ├── Manual
│   └── Automático
│
├── Documentación
├── Frecuencia
├── Evidencia
└── Ejecución
```

[PENDIENTE]

Esta estructura es conceptual.

No constituye todavía una definición de tabla ni modelo Prisma.

---

# 33. Relación de controles con probabilidad e impacto

[FP]

Los controles pueden modificar los componentes utilizados para establecer la severidad del riesgo.

Dentro de la metodología de referencia:

```text
Preventivo
Detectivo
     │
     ▼
Probabilidad
```

mientras:

```text
Correctivo
     │
     ▼
Impacto
```

[GIGA]

El motor deberá conocer explícitamente sobre qué componente actúa cada control.

No será conveniente inferir esta relación únicamente desde texto libre.

Conceptualmente:

```text
Control
│
└── afecta
      │
      ├── Probabilidad
      └── Impacto
```

La relación definitiva deberá estar determinada por la metodología y no ser modificable arbitrariamente por el usuario.

---

# 34. Riesgo residual

## 34.1 Concepto

[FP]

El riesgo residual corresponde al nivel de riesgo que permanece después de considerar los controles.

Conceptualmente:

```text
Riesgo inherente
        │
        ▼
     Controles
        │
        ▼
Efecto de controles
        │
        ▼
Riesgo residual
```

---

# 35. Componentes del riesgo residual

[GIGA]

La valoración residual deberá conservar al menos conceptualmente:

```text
Probabilidad residual
Impacto residual
Zona residual
```

Debe permanecer diferenciada de:

```text
Probabilidad inherente
Impacto inherente
Zona inherente
```

Conceptualmente:

```text
ValoracionRiesgo
│
├── INHERENTE
│   ├── Probabilidad
│   ├── Impacto
│   └── Zona
│
└── RESIDUAL
    ├── Probabilidad
    ├── Impacto
    └── Zona
```

---

# 36. Comparación con el HTML — Riesgo residual

[HTML]

El prototipo actualmente calcula:

```text
Probabilidad residual
Impacto residual
Riesgo residual
Zona residual
```

### Estado

**LA SEPARACIÓN CONCEPTUAL ENTRE INHERENTE Y RESIDUAL ES CORRECTA.**

El problema no se encuentra en la existencia de ambas valoraciones sino en verificar el algoritmo exacto utilizado para pasar de una a otra.

---

# 37. Algoritmo actual del prototipo

[HTML]

Actualmente el prototipo:

1. calcula la eficiencia individual de cada control;
2. suma la eficiencia de todos los controles preventivos y detectivos;
3. suma la eficiencia de todos los controles correctivos;
4. aplica las sumas sobre probabilidad e impacto inherentes.

Conceptualmente:

```text
Σ eficiencia Preventivos + Detectivos
                │
                ▼
Probabilidad inherente
×
(1 - suma)
                │
                ▼
Probabilidad residual
```

y:

```text
Σ eficiencia Correctivos
                │
                ▼
Impacto inherente
×
(1 - suma)
                │
                ▼
Impacto residual
```

Además limita la reducción para evitar valores inferiores a cero.

---

# 38. Estado del algoritmo del HTML

[PENDIENTE CRÍTICO]

El algoritmo actual del prototipo **no deberá trasladarse automáticamente a GIGA**.

Debe verificarse directamente contra:

```text
Guía V7
Anexo 1 parametrizado
```

En particular deberá determinarse:

- si las eficiencias de múltiples controles se suman;
- si se aplican secuencialmente;
- si existe un máximo de desplazamiento;
- si la reducción opera mediante porcentajes;
- si la metodología utiliza desplazamientos por niveles;
- cómo se manejan múltiples controles del mismo tipo;
- cómo se combinan controles preventivos y detectivos;
- cómo se aplican correctivos;
- cómo se redondean resultados;
- cómo se convierte el resultado en un nivel residual.

Hasta que esta validación termine:

```text
calcResidual()
```

debe considerarse:

```text
[HTML]
REFERENCIA FUNCIONAL
NO REGLA METODOLÓGICA DEFINITIVA
```

---

# 39. Aplicación de múltiples controles

[PENDIENTE CRÍTICO]

Debe determinarse exactamente cómo la metodología V7 aplica varios controles sobre un mismo riesgo.

No se establecerá todavía como regla definitiva ninguna de estas alternativas:

## Alternativa A

```text
sumar eficiencias
        │
        ▼
aplicar una sola reducción
```

## Alternativa B

```text
Control 1
   │
   ▼
resultado
   │
   ▼
Control 2
   │
   ▼
resultado
```

## Alternativa C

```text
desplazamiento metodológico
por niveles dentro de la matriz
```

La regla deberá extraerse directamente del Anexo 1 o del ejemplo oficial correspondiente.

[GIGA]

La arquitectura deberá permitir implementar la regla oficial sin depender de la fórmula actualmente existente en el HTML.

---

# 40. Orden de aplicación de controles

[PENDIENTE]

Si la metodología establece aplicación secuencial, será necesario determinar:

- orden de los controles;
- criterio para ordenar;
- si el usuario define ese orden;
- si lo determina el tipo;
- si lo determina la metodología;
- si todos los controles se consideran simultáneamente.

No debe diseñarse todavía una propiedad:

```text
ordenAplicacion
```

hasta confirmar que metodológicamente sea necesaria.

---

# 41. Desplazamiento en la matriz

[FP]

La aplicación de controles modifica el nivel de riesgo y conduce a la valoración residual.

[PENDIENTE]

Debe estudiarse exactamente cómo V7 representa este efecto en la matriz.

La pregunta metodológica clave es:

```text
¿El control modifica valores porcentuales,
niveles de probabilidad/impacto,
posiciones dentro de la matriz,
o una combinación de estos elementos?
```

[GIGA]

Hasta resolverlo, no deberá implementarse un algoritmo definitivo de desplazamiento.

---

# 42. Zona residual

[GIGA]

Una vez obtenidos los niveles residuales:

```text
Probabilidad residual
Impacto residual
```

la zona residual deberá determinarse utilizando la misma lógica metodológica documentada para la matriz de severidad.

Es decir:

```text
Probabilidad residual
          +
Impacto residual
          │
          ▼
Matriz oficial
          │
          ▼
Zona residual
```

No deberá utilizarse:

```text
producto residual
        ↓
intervalos numéricos propios
        ↓
zona
```

si la metodología oficial no lo establece.

---

# 43. Corrección relacionada con `zonaDe()`

[HTML]

El prototipo utiliza la misma función:

```text
zonaDe()
```

tanto para:

```text
Riesgo inherente
```

como para:

```text
Riesgo residual
```

y clasifica un producto decimal mediante los umbrales definidos en el HTML.

[GIGA]

La corrección identificada en `04-probabilidad-impacto.md` también aplica aquí.

La zona residual deberá obtenerse mediante la matriz oficial correspondiente a los niveles residuales.

Por tanto:

```text
Valoración inherente
→ matriz oficial

Valoración residual
→ matriz oficial
```

---

# 44. Información calculada frente a información registrada

[GIGA]

El usuario deberá registrar la información necesaria para describir los controles.

Por ejemplo:

```text
Responsable
Acción
Tipo
Implementación
Frecuencia
Documentación
Evidencia esperada
Manejo de desviaciones
```

El sistema deberá determinar automáticamente, cuando corresponda:

```text
Valoración del control
Efecto sobre probabilidad
Efecto sobre impacto
Probabilidad residual
Impacto residual
Zona residual
```

El usuario no debería modificar directamente estos resultados cuando sean producto de una regla metodológica.

---

# 45. Explicabilidad del riesgo residual

[GIGA]

El sistema deberá poder explicar:

```text
¿Por qué este riesgo pasó
de zona inherente X
a zona residual Y?
```

Una explicación conceptual podría mostrar:

```text
RIESGO INHERENTE

Probabilidad:
Alta

Impacto:
Mayor

Zona:
[resultado]


CONTROLES CONSIDERADOS

Control 1
Tipo: Preventivo
Implementación: Automático
Valoración: [...]

Control 2
Tipo: Detectivo
Implementación: Manual
Valoración: [...]

Control 3
Tipo: Correctivo
Implementación: Manual
Valoración: [...]


RESULTADO RESIDUAL

Probabilidad:
[...]

Impacto:
[...]

Zona:
[...]
```

La valoración residual no debe ser una "caja negra".

---

# 46. Trazabilidad de los controles

[GIGA]

Los controles deberán poder mantener trazabilidad sobre:

- creación;
- modificación;
- responsable;
- estado;
- valoración;
- evidencias;
- cambios de diseño;
- cambios de implementación;
- cambios de frecuencia;
- cambios de documentación;
- cambios metodológicos.

Esto permitirá conocer posteriormente:

```text
qué control existía;
cómo estaba diseñado;
cuándo cambió;
quién lo modificó;
qué valoración tenía en cada momento.
```

---

# 47. Estado del control

[GIGA]

Puede ser necesario distinguir conceptualmente entre controles:

```text
Activo
Inactivo
```

o estados equivalentes.

Sin embargo, el estado definitivo deberá responder a las necesidades metodológicas e institucionales.

Un control inactivo históricamente utilizado no debería eliminarse si forma parte de valoraciones anteriores.

[PENDIENTE]

Definir posteriormente los estados permitidos y su comportamiento.

---

# 48. Eliminación de controles

[GIGA]

Los controles utilizados en valoraciones históricas no deberían eliminarse físicamente de manera que se pierda la trazabilidad.

Conceptualmente debe preferirse:

```text
Inactivar
Versionar
Cerrar vigencia
```

sobre:

```text
Eliminar definitivamente
```

cuando exista historia asociada.

[PENDIENTE]

La política exacta se definirá durante el diseño de auditoría e historial.

---

# 49. Evidencias de ejecución

[GIGA]

Debe diferenciarse conceptualmente:

```text
CONTROL
```

de:

```text
EJECUCIÓN DEL CONTROL
```

Un control puede ejecutarse múltiples veces.

Conceptualmente:

```text
Control
│
├── Ejecución 1
│   └── Evidencia
│
├── Ejecución 2
│   └── Evidencia
│
└── Ejecución N
    └── Evidencia
```

[PENDIENTE]

No se definirá todavía si cada ejecución individual será registrada dentro del módulo de riesgos o si el seguimiento utilizará una granularidad diferente.

Esta decisión debe revisarse en el documento de seguimiento.

---

# 50. Control y seguimiento

[GIGA]

El diseño del control pertenece al análisis y valoración del riesgo.

La verificación posterior de que el control continúa funcionando pertenece al seguimiento.

Conceptualmente:

```text
DISEÑO

Riesgo
  │
  └── Control
```

posteriormente:

```text
SEGUIMIENTO

Control
  │
  ├── ¿se ejecutó?
  ├── ¿funcionó?
  ├── ¿existe evidencia?
  └── ¿requiere ajuste?
```

No deben confundirse ambas etapas.

---

# 51. Particularidades según tipología

[GIGA]

La estructura común de Control deberá permitir particularidades metodológicas según la tipología del riesgo.

Conceptualmente:

```text
Control
     │
     ▼
Tipología del riesgo
     │
     ▼
Reglas específicas aplicables
```

Estas particularidades no convierten el control en entidades jerárquicamente diferentes.

---

# 52. Riesgo de Gestión

[PENDIENTE]

Debe verificarse si existen particularidades adicionales para controles asociados a riesgos de Gestión.

Inicialmente aplicará la estructura común documentada en este archivo.

---

# 53. Riesgo Fiscal

[FP]

Los riesgos fiscales pueden requerir controles relacionados específicamente con:

- manejo de recursos públicos;
- bienes públicos;
- intereses patrimoniales;
- puntos de riesgo fiscal.

[PENDIENTE]

Debe analizarse el capítulo fiscal y el Anexo 3 antes de definir reglas especiales de control.

[GIGA]

No se crearán por ahora entidades como:

```text
ControlFiscal
```

Los controles seguirán perteneciendo conceptualmente a:

```text
Control
```

con reglas metodológicas adicionales cuando corresponda.

---

# 54. Seguridad de la Información

[FP] / [MINTIC]

Los controles de Seguridad de la Información pueden encontrarse relacionados con:

- activos de información;
- amenazas;
- vulnerabilidades;
- Confidencialidad;
- Integridad;
- Disponibilidad;
- controles de seguridad aplicables.

[PENDIENTE]

Debe analizarse específicamente el Anexo 5 y los lineamientos de MinTIC antes de diseñar las relaciones definitivas.

[GIGA]

No deberá asumirse que los controles de seguridad pueden modelarse únicamente mediante los campos generales del prototipo.

Será necesario determinar si deben relacionarse adicionalmente con:

```text
Activo
Amenaza
Vulnerabilidad
Propiedad de seguridad
Control de seguridad
```

sin dejar de pertenecer a la misma entidad conceptual `Control`.

---

# 55. Integridad Pública

[FP]

Los riesgos para la Integridad Pública pueden requerir particularidades asociadas a SIGRIP.

[PENDIENTE]

Debe verificarse:

- características particulares de controles;
- tratamiento;
- responsabilidades;
- seguimiento;
- relación con señales de alerta;
- riesgos de corrupción;
- LA/FT/FP cuando corresponda dentro del sistema.

[GIGA]

No se asumirá que la lógica del prototipo general es suficiente para esta tipología.

---

# 56. Comparación estructural con el HTML

[HTML]

El prototipo representa cada control aproximadamente mediante:

```text
{
    responsable_frecuencia,
    accion_complemento,
    desviacion_registro,
    tipo_control,
    implementacion
}
```

[GIGA]

La estructura conceptual de GIGA deberá ser más cercana a:

```text
Control
│
├── Responsable
├── Acción
├── Complemento
├── Manejo de desviaciones
│
├── Tipo
├── Implementación
│
├── Documentación
├── Frecuencia
├── Evidencia
└── Ejecución
```

La estructura definitiva dependerá de la validación de V7.

---

# 57. Elementos del HTML que pueden conservarse

[HTML] / [GIGA]

Se consideran aprovechables:

```text
Controles repetibles
Tipo de control
Implementación
Responsable
Acción
Manejo de desviaciones
Separación entre riesgo inherente y residual
Cálculo automático
Visualización inmediata del residual
```

---

# 58. Elementos del HTML que deben modificarse

[HTML] / [GIGA]

Deberán revisarse:

```text
responsable_frecuencia
```

porque mezcla dos conceptos.

También deberá ampliarse la estructura para contemplar explícitamente:

```text
Documentación
Frecuencia
Evidencia
Ejecución
```

El algoritmo:

```text
suma de eficiencias
→ reducción directa
```

debe permanecer pendiente hasta validar la regla oficial.

La función utilizada para obtener la zona residual mediante umbrales numéricos también deberá reemplazarse por la matriz metodológica oficial.

---

# 59. Elementos que no deben convertirse en columnas fijas

[GIGA]

No deberán crearse campos como:

```text
controlA
controlB
controlC
```

ni:

```text
tipoControlA
tipoControlB
tipoControlC
```

La relación debe ser:

```text
Riesgo
   │
   └── Control[]
```

La matriz consolidada podrá transformar posteriormente esos registros en columnas para facilitar su visualización.

---

# 60. Valoración histórica

[GIGA]

Debe ser posible reconstruir qué controles fueron considerados cuando se produjo una valoración residual.

Esto es importante porque los controles pueden cambiar posteriormente.

Conceptualmente:

```text
Valoración 2026
   │
   ├── Control A versión vigente
   ├── Control B versión vigente
   └── Resultado residual
```

Si posteriormente se modifica el Control A:

```text
Valoración histórica 2026
```

no debería cambiar silenciosamente.

[PENDIENTE]

La estrategia técnica de versionamiento se definirá posteriormente.

---

# 61. Revaloración

[GIGA]

Cuando cambien significativamente:

- controles;
- diseño;
- implementación;
- probabilidad;
- impacto;
- metodología;

podría ser necesaria una nueva valoración.

Conceptualmente:

```text
Valoración anterior
        │
        ▼
Cambio significativo
        │
        ▼
Nueva valoración
```

No debería sobrescribirse necesariamente la valoración anterior.

[PENDIENTE]

Definir las reglas institucionales que obligan a realizar una nueva valoración.

---

# 62. Representación conceptual provisional

[GIGA]

Con el conocimiento disponible hasta el momento:

```text
Riesgo
│
├── ValoracionRiesgo
│   └── INHERENTE
│
├── Control[]
│   │
│   ├── Responsable
│   ├── Acción
│   ├── Complemento
│   ├── ManejoDesviacion
│   │
│   ├── Tipo
│   ├── Implementación
│   │
│   ├── Documentación
│   ├── Frecuencia
│   ├── Evidencia
│   └── Ejecución
│
└── ValoracionRiesgo
    └── RESIDUAL
```

Este esquema sigue siendo conceptual.

No corresponde todavía a la estructura definitiva de persistencia.

---

# 63. Reglas GIGA derivadas

## [GIGA-RIESGO-013] Multiplicidad de controles

Un riesgo podrá tener cero, uno o múltiples controles.

La cantidad de controles no estará limitada por la representación visual de la matriz consolidada.

---

## [GIGA-RIESGO-014] Separación de responsable y frecuencia

El responsable y la frecuencia del control serán conceptos independientes.

No se mantendrá como estructura definitiva un campo combinado equivalente a `responsable_frecuencia`.

---

## [GIGA-RIESGO-015] Tipo de control

El tipo del control deberá responder a las categorías metodológicas vigentes.

Inicialmente se reconocen:

- Preventivo;
- Detectivo;
- Correctivo.

---

## [GIGA-RIESGO-016] Implementación

La implementación del control deberá responder a las categorías metodológicas vigentes.

Inicialmente se reconocen:

- Manual;
- Automático.

---

## [GIGA-RIESGO-017] Cálculo metodológico

Los pesos, eficiencias y algoritmos utilizados para valorar controles deberán provenir de la metodología oficial vigente.

No deberán codificarse únicamente a partir de las fórmulas existentes en `index.html`.

---

## [GIGA-RIESGO-018] Atributos de formalización

El sistema deberá permitir registrar los atributos metodológicos requeridos para conocer la formalización y funcionamiento del control.

Entre ellos deberán verificarse:

- Documentación;
- Frecuencia;
- Evidencia;
- Ejecución.

---

## [GIGA-RIESGO-019] Riesgo residual

La valoración residual deberá conservarse separadamente de la valoración inherente.

La obtención del residual deberá poder explicarse a partir de:

- valoración inherente;
- controles considerados;
- metodología aplicada;
- resultado residual.

---

## [GIGA-RIESGO-020] Zona residual

La zona residual deberá determinarse utilizando la matriz metodológica oficial correspondiente a los niveles residuales.

No se utilizarán umbrales arbitrarios del producto probabilidad × impacto.

---

## [GIGA-RIESGO-021] Trazabilidad de controles

Los cambios realizados sobre los controles deberán mantener la trazabilidad necesaria para preservar las valoraciones históricas.

---

## [GIGA-RIESGO-022] Controles automáticos

Un control automático podrá tener responsables asociados a:

- parametrización;
- mantenimiento;
- configuración;
- supervisión;

cuando la metodología o la operación institucional así lo requiera.

---

## [GIGA-RIESGO-023] Datos calculados

Los resultados metodológicos derivados automáticamente de los controles no deberán ser modificados manualmente por el usuario salvo que exista una regla metodológica expresa y quede registrada la justificación.

---

## [GIGA-RIESGO-024] Particularidades por tipología

Las particularidades metodológicas de los controles dependerán de la tipología del riesgo cuando corresponda.

Esto no generará entidades jerárquicamente diferentes de `Control`.

---

# 64. Pendientes críticos

[PENDIENTE]

Antes de convertir esta base conceptual en reglas definitivas de programación deberán verificarse directamente:

1. pesos exactos de cada tipo de control;
2. pesos exactos de cada forma de implementación;
3. fórmula exacta de eficiencia;
4. tratamiento de controles preventivos;
5. tratamiento de controles detectivos;
6. tratamiento de controles correctivos;
7. algoritmo exacto cuando existen múltiples controles;
8. orden de aplicación, si existe;
9. mecanismo exacto de reducción de probabilidad;
10. mecanismo exacto de reducción de impacto;
11. posibles límites o máximos de reducción;
12. reglas de redondeo;
13. relación entre porcentajes y niveles residuales;
14. desplazamiento exacto dentro de la matriz;
15. atributos exactos de formalización;
16. efecto metodológico de documentación;
17. efecto metodológico de frecuencia;
18. efecto metodológico de evidencia;
19. efecto metodológico de ejecución;
20. particularidades para riesgo Fiscal;
21. particularidades para Seguridad de la Información;
22. particularidades para Integridad Pública.

---

# 65. Fuente prioritaria para resolver los cálculos

[FP]

La fuente prioritaria para cerrar los pendientes relacionados con la valoración de controles y riesgo residual será:

**Anexo 1 — Formato mapa de riesgos integral parametrizado**

Este deberá utilizarse para comprobar directamente:

```text
atributos;
pesos;
fórmulas;
aplicación de controles;
valoración residual;
desplazamientos;
matriz;
resultados.
```

El comportamiento real del Anexo parametrizado deberá tener prioridad sobre fórmulas inferidas a partir del HTML.

---

# 66. Fuente para Seguridad de la Información

[FP] / [MINTIC]

Para los controles asociados a Seguridad de la Información deberá utilizarse adicionalmente:

**Anexo 5 — Matriz de Riesgos de Seguridad de la Información**

y los lineamientos oficiales correspondientes de MinTIC.

Deberá verificarse particularmente la relación:

```text
Activo
   │
   ├── Amenaza
   ├── Vulnerabilidad
   ├── C/I/D
   │
   ▼
Riesgo
   │
   ▼
Control
```

---

# 67. Principio de prevalencia metodológica

[GIGA]

Para la implementación de controles se mantendrá el mismo principio general:

```text
FUENTE OFICIAL
      │
      ▼
BASE DE CONOCIMIENTO
      │
      ▼
REGLAS FUNCIONALES
      │
      ▼
MOTOR METODOLÓGICO
      │
      ▼
MODELO DE DATOS
      │
      ▼
INTERFAZ
```

No deberá utilizarse:

```text
HTML
  │
  ▼
copiar fórmula
  │
  ▼
asumir que es metodología
```

---

# 68. Estado actual del conocimiento

```text
Concepto de control
→ AVANZADO

Controles repetibles
→ CONFIRMADO CONCEPTUALMENTE

Responsable
→ AVANZADO

Acción
→ AVANZADO

Tipo de control
→ AVANZADO

Preventivo / Detectivo / Correctivo
→ AVANZADO

Implementación
→ AVANZADO

Manual / Automático
→ AVANZADO

Pesos del prototipo
→ ALTA COINCIDENCIA / VALIDACIÓN FINAL PENDIENTE

Documentación
→ REQUIERE VALIDACIÓN DETALLADA

Frecuencia
→ REQUIERE VALIDACIÓN DETALLADA

Evidencia
→ REQUIERE VALIDACIÓN DETALLADA

Ejecución
→ REQUIERE VALIDACIÓN DETALLADA

Riesgo residual
→ CONFIRMADO CONCEPTUALMENTE

Algoritmo de múltiples controles
→ PENDIENTE CRÍTICO

Desplazamiento residual
→ PENDIENTE CRÍTICO

Zona residual
→ DEPENDE DE MATRIZ OFICIAL

Seguridad de la Información
→ REQUIERE ANEXO 5

Integridad Pública
→ REQUIERE ANÁLISIS ESPECÍFICO

Fiscal
→ REQUIERE ANÁLISIS ESPECÍFICO
```

---

# 69. Comparación general del HTML

| Elemento del prototipo | Estado |
|---|---|
| Múltiples controles | CORRECTO |
| Control como elemento repetible | CORRECTO |
| Tipo Preventivo | COINCIDE |
| Tipo Detectivo | COINCIDE |
| Tipo Correctivo | COINCIDE |
| Implementación Manual | COINCIDE |
| Implementación Automática | COINCIDE |
| Preventivo asociado a probabilidad | BIEN ENCAMINADO |
| Detectivo asociado a probabilidad | BIEN ENCAMINADO |
| Correctivo asociado a impacto | BIEN ENCAMINADO |
| Peso Preventivo 25 % | VALIDACIÓN FINAL PENDIENTE |
| Peso Detectivo 15 % | VALIDACIÓN FINAL PENDIENTE |
| Peso Correctivo 10 % | VALIDACIÓN FINAL PENDIENTE |
| Peso Manual 15 % | VALIDACIÓN FINAL PENDIENTE |
| Peso Automático 25 % | VALIDACIÓN FINAL PENDIENTE |
| Responsable | PRESENTE, PERO MEZCLADO |
| Frecuencia | PRESENTE, PERO MEZCLADA |
| `responsable_frecuencia` | DEBE SEPARARSE |
| Acción / complemento | BIEN ENCAMINADO |
| Manejo de desviación | BIEN ENCAMINADO |
| Documentación | FALTA COMO ELEMENTO EXPLÍCITO |
| Evidencia | FALTA COMO ELEMENTO EXPLÍCITO |
| Ejecución | FALTA COMO ELEMENTO EXPLÍCITO |
| Riesgo inherente separado del residual | CORRECTO |
| Cálculo automático residual | CONCEPTO CORRECTO |
| Algoritmo de suma de eficiencias | NO VALIDADO |
| Aplicación de múltiples controles | PENDIENTE CRÍTICO |
| Zona residual mediante `zonaDe()` | DEBE CORREGIRSE |
| Matriz oficial para residual | DEBE IMPLEMENTARSE |

---

# 70. Correcciones prioritarias al prototipo

Cuando se utilice `index.html` como referencia para construir el formulario definitivo deberán aplicarse, como mínimo, las siguientes correcciones:

## 70.1 Separar responsable y frecuencia

```text
ACTUAL

responsable_frecuencia
```

deberá convertirse conceptualmente en:

```text
Responsable
Frecuencia
```

---

## 70.2 Completar los atributos del control

El bloque deberá contemplar, previa validación final:

```text
Responsable
Acción
Complemento
Manejo de desviaciones
Tipo
Implementación
Documentación
Frecuencia
Evidencia
Ejecución
```

---

## 70.3 No copiar `calcResidual()`

El algoritmo actual deberá considerarse provisional.

No se implementará en GIGA hasta comparar directamente sus resultados con el Anexo 1 oficial.

---

## 70.4 No utilizar `zonaDe()` para el residual

La zona residual deberá determinarse mediante el cruce de:

```text
Nivel de probabilidad residual
+
Nivel de impacto residual
```

dentro de la matriz metodológica.

---

## 70.5 Mantener controles repetibles

Esta característica sí deberá conservarse.

Conceptualmente:

```text
Riesgo
   │
   └── Control[]
```

sin límite fijo de tres controles.

---

# 71. Conclusión

El bloque de controles del prototipo `index.html` constituye una buena referencia funcional, pero todavía no representa completamente la estructura metodológica necesaria para GIGA.

Entre sus fortalezas se encuentran:

```text
controles repetibles;
clasificación Preventivo / Detectivo / Correctivo;
clasificación Manual / Automático;
separación entre riesgo inherente y residual;
identificación básica de responsable;
descripción de acciones;
manejo de desviaciones;
cálculo automático del residual.
```

Sin embargo, antes de trasladarlo al sistema definitivo deben realizarse varias correcciones.

La estructura:

```text
responsable_frecuencia
```

deberá separarse.

El control deberá analizarse de manera estructurada mediante elementos como:

```text
Responsable
Acción
Tipo
Implementación
Documentación
Frecuencia
Evidencia
Ejecución
```

La principal incertidumbre metodológica se encuentra actualmente en el algoritmo utilizado para aplicar múltiples controles y obtener la valoración residual.

Por ello:

```text
calcResidual()
```

no deberá considerarse una implementación normativa.

Su fórmula deberá compararse directamente contra el:

**Anexo 1 — Formato mapa de riesgos integral parametrizado**

antes de programar el motor definitivo.

La lógica objetivo será:

```text
Riesgo inherente
        │
        ▼
Controles correctamente descritos
        │
        ▼
Valoración metodológica de controles
        │
        ▼
Aplicación de la regla oficial
        │
        ▼
Probabilidad residual
+
Impacto residual
        │
        ▼
Matriz oficial
        │
        ▼
Zona residual
```

En todos los casos:

**la Guía V7 y sus anexos prevalecerán sobre las fórmulas existentes en `index.html`.**