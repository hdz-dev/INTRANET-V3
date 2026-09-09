# Especificación funcional del módulo de Gestión Integral de Riesgos

## 1. Propósito

Este documento será la **fuente funcional principal** para construir el módulo de Gestión Integral de Riesgos de GIGA.

La base será el comportamiento y estructura del prototipo `index.html`, conservando lo que ya funciona y aplicando únicamente las correcciones metodológicas identificadas durante la revisión.

A partir de este documento se construirán posteriormente:

```text
Especificación funcional
        ↓
Modelo conceptual
        ↓
Modelo lógico
        ↓
Prisma
        ↓
PostgreSQL
        ↓
Implementación
```

El prototipo actual ya maneja identificación, tipología, afectación, causas, probabilidad, impacto, riesgo inherente, controles y riesgo residual en un flujo único. :contentReference[oaicite:0]{index=0} :contentReference[oaicite:1]{index=1}

---

# 2. Principio de diseño

Se conservará el enfoque general del HTML:

```text
Un formulario
     │
     ▼
Un riesgo
     │
     ▼
Tipología seleccionada
     │
     ▼
El formulario se adapta
```

Todos los registros corresponden al mismo concepto:

```text
Riesgo
```

La tipología modifica los campos y reglas aplicables, pero no crea clases diferentes de riesgo.

---

# 3. Flujo principal

El formulario seguirá este flujo:

```text
1. Identificación
        ↓
2. Tipología y afectación
        ↓
3. Causas y descripción
        ↓
4. Probabilidad
        ↓
5. Impacto
        ↓
6. Riesgo inherente
        ↓
7. Controles
        ↓
8. Riesgo residual
        ↓
9. Tratamiento
        ↓
10. Seguimiento
```

Los primeros ocho bloques parten directamente del formulario actual. :contentReference[oaicite:2]{index=2}

Los bloques de **Tratamiento** y **Seguimiento** se incorporarán como evolución del prototipo.

---

# 4. Identificación

Se conservarán los campos principales del HTML:

```text
Código
Fecha de identificación
Proceso
Subproceso / dependencia
Responsable
Estado
```

El prototipo ya almacena estos datos dentro del riesgo. :contentReference[oaicite:3]{index=3}

## Correcciones

### Proceso

No será texto libre.

Deberá relacionarse posteriormente con el catálogo institucional de procesos.

### Responsable

Deberá evolucionar hacia una relación con usuarios, cargos o responsables institucionales.

### Código

Podrá continuar generándose automáticamente a partir de:

```text
Proceso + Tipología + Consecutivo
```

El HTML ya utiliza esta estructura para sugerir códigos únicos. :contentReference[oaicite:4]{index=4}

---

# 5. Tipologías

Se trabajará inicialmente con:

```text
Gestión
Fiscal
Seguridad de la Información
Integridad Pública
```

El HTML actualmente incluye además `LA/FT`. :contentReference[oaicite:5]{index=5}

## Corrección

`LA/FT` no se manejará inicialmente como una quinta tipología independiente hasta establecer metodológicamente su ubicación dentro del esquema de Integridad Pública.

Por tanto:

```text
LA/FT
→ pendiente de definición metodológica
```

---

# 6. Comportamiento según tipología

La selección de tipología deberá modificar dinámicamente el formulario.

## Gestión

Utilizará principalmente el flujo general:

```text
Afectación
Causas
Descripción
Probabilidad
Impacto
Controles
Residual
Tratamiento
Seguimiento
```

## Fiscal

Mostrará información específica relacionada con:

```text
Recursos públicos
Bienes públicos
Intereses patrimoniales públicos
```

Estas tres afectaciones ya están contempladas por el HTML. :contentReference[oaicite:6]{index=6}

## Seguridad de la Información

Mostrará información específica de seguridad:

```text
Activo de información
Propiedad afectada
Amenaza
Vulnerabilidad
```

Las propiedades serán seleccionables:

```text
Confidencialidad
Integridad
Disponibilidad
```

El HTML ya contempla el activo de información y las tres propiedades. :contentReference[oaicite:7]{index=7} :contentReference[oaicite:8]{index=8}

### Corrección importante

El HTML actualmente utiliza:

```text
Confidencialidad
Integridad
Disponibilidad
```

como `causa_inmediata_si`.

Esto deberá corregirse conceptualmente.

No son una causa inmediata genérica sino **propiedades de la información que pueden resultar afectadas**.

Además se incorporarán:

```text
Amenaza
Vulnerabilidad
```

como información propia del análisis de Seguridad de la Información.

## Integridad Pública

Mantendrá el flujo general mientras se incorporan las reglas específicas que correspondan metodológicamente.

---

# 7. Afectación

## Riesgos generales

El HTML permite:

```text
Económica
Reputacional
```

con selección múltiple. :contentReference[oaicite:9]{index=9}

Se conservará inicialmente este comportamiento.

## Riesgo Fiscal

Utilizará:

```text
Efecto dañoso sobre recursos públicos
Efecto dañoso sobre bienes públicos
Efecto dañoso sobre intereses patrimoniales públicos
```

permitiendo selección múltiple. :contentReference[oaicite:10]{index=10}

## Seguridad de la Información

La afectación específica incluirá:

```text
Confidencialidad
Integridad
Disponibilidad
```

también con selección múltiple.

---

# 8. Causas y descripción

El HTML utiliza actualmente:

```text
Causa inmediata
Causa raíz
Descripción
```

y genera automáticamente una descripción con la estructura:

```text
Probabilidad de [afectación]
por [causa inmediata],
debido a [causa raíz].
```

Esta lógica está implementada actualmente en el prototipo. :contentReference[oaicite:11]{index=11}

Se conservará el concepto de:

```text
Causa inmediata
Causa raíz
Descripción estructurada
```

permitiendo además edición manual de la descripción, como ya hace el HTML. :contentReference[oaicite:12]{index=12}

---

# 9. Corrección para Seguridad de la Información

Para esta tipología el flujo deberá evolucionar desde:

```text
Activo
C/I/D como causa inmediata
Causa raíz
```

hacia:

```text
Activo de información
        ↓
Propiedad afectada
├── Confidencialidad
├── Integridad
└── Disponibilidad
        ↓
Amenaza
        ↓
Vulnerabilidad
        ↓
Descripción del riesgo
```

Esto será una excepción funcional activada por la tipología, no una nueva clase de riesgo.

---

# 10. Probabilidad

Se conservará la escala utilizada por el HTML:

```text
Muy Baja   → 20 %
Baja       → 40 %
Media      → 60 %
Alta       → 80 %
Muy Alta   → 100 %
```

El prototipo vincula estos niveles con la frecuencia de exposición. :contentReference[oaicite:13]{index=13}

El usuario seleccionará la frecuencia y el sistema determinará el nivel correspondiente.

```text
Frecuencia
     ↓
Nivel de probabilidad
```

---

# 11. Impacto

Se conservará la estructura de cinco niveles:

```text
Leve          → 20 %
Menor         → 40 %
Moderado      → 60 %
Mayor         → 80 %
Catastrófico  → 100 %
```

El formulario deberá presentar los criterios correspondientes según la tipología y afectación seleccionadas.

El HTML ya diferencia impacto económico y reputacional y, para riesgo Fiscal, utiliza el criterio económico/patrimonial. :contentReference[oaicite:14]{index=14}

---

# 12. Riesgo inherente

El sistema calculará automáticamente:

```text
Probabilidad inherente
Impacto inherente
Zona inherente
```

El HTML actualmente obtiene primero probabilidad e impacto y después calcula la clasificación inherente. :contentReference[oaicite:15]{index=15}

## Corrección

La **zona de riesgo no deberá obtenerse mediante los umbrales numéricos actuales del HTML**.

Se utilizará la matriz metodológica oficial:

```text
Probabilidad
      +
Impacto
      ↓
Matriz de severidad
      ↓
Zona
```

Por tanto:

```text
zona =
matriz[probabilidad][impacto]
```

---

# 13. Controles

Se conservará el enfoque del HTML de permitir:

```text
0..N controles
```

No existirán columnas rígidas:

```text
Control A
Control B
Control C
```

Cada control deberá registrar como mínimo:

```text
Responsable
Acción
Manejo de desviaciones
Tipo de control
Implementación
```

El HTML actualmente utiliza esos elementos para sus controles y distingue entre Preventivo, Detectivo y Correctivo. :contentReference[oaicite:16]{index=16}

Se complementará con los atributos metodológicos que sean necesarios, principalmente:

```text
Documentación
Frecuencia
Evidencia
Ejecución
```

---

# 14. Tipos de control

Se conservarán:

```text
Preventivo
Detectivo
Correctivo
```

Conceptualmente:

```text
Preventivo ─┐
            ├── afectan probabilidad
Detectivo ──┘

Correctivo ─── afecta impacto
```

Este mismo comportamiento ya existe en el motor del prototipo. :contentReference[oaicite:17]{index=17}

---

# 15. Implementación del control

Se conservará:

```text
Manual
Automático
```

El HTML actualmente asigna valores a tipo e implementación del control. :contentReference[oaicite:18]{index=18}

Los valores definitivos deberán quedar parametrizados y no dispersos directamente en la lógica de interfaz.

---

# 16. Riesgo residual

El flujo será:

```text
Riesgo inherente
      ↓
Controles
      ↓
Probabilidad residual
Impacto residual
      ↓
Matriz oficial
      ↓
Zona residual
```

## Corrección principal

El HTML actualmente:

1. suma la efectividad de los controles;
2. aplica esa suma sobre probabilidad o impacto;
3. multiplica los resultados;
4. clasifica el producto mediante umbrales. :contentReference[oaicite:19]{index=19}

Esta parte **no se trasladará literalmente**.

El algoritmo definitivo deberá utilizar la regla metodológica validada para:

```text
Aplicación de múltiples controles
Reducción de probabilidad
Reducción de impacto
Conversión a niveles
Zona residual
```

---

# 17. Tratamiento

Se incorporará después del riesgo residual.

```text
Riesgo residual
      ↓
Tratamiento
```

Las opciones se parametrizarán conforme a la metodología vigente.

Como base funcional:

```text
Aceptar
Reducir
Evitar
Transferir / Compartir
```

El tratamiento podrá contener múltiples acciones.

```text
Tratamiento
     │
     └── Acciones[]
```

Cada acción podrá manejar:

```text
Descripción
Responsable
Fecha límite
Estado
Evidencias
```

---

# 18. Seguimiento

El HTML actualmente almacena cuatro campos:

```text
T1
T2
T3
T4
```

dentro de cada riesgo. :contentReference[oaicite:20]{index=20}

## Corrección

No se trasladarán como columnas fijas.

Se utilizará:

```text
Riesgo
   │
   └── Seguimientos[]
```

Cada seguimiento podrá registrar:

```text
Periodo
Fecha
Responsable
Observaciones
Estado
Evidencias
```

La periodicidad podrá configurarse institucionalmente.

---

# 19. Materialización

Se incorporará el registro estructurado de materializaciones.

```text
Riesgo
   │
   └── Materializaciones[]
```

Como mínimo deberá permitir registrar:

```text
Fecha
Descripción
Consecuencias
Acciones tomadas
Evidencias
```

Una materialización podrá provocar una revisión del riesgo.

---

# 20. Evidencias

Las evidencias podrán asociarse a:

```text
Control
Acción de tratamiento
Seguimiento
Materialización
```

No deberán limitarse a un único archivo o campo de texto.

---

# 21. Estado del riesgo

El HTML actualmente utiliza:

```text
Activo
Inactivo
```

y permite activar o inactivar riesgos desde el formulario. :contentReference[oaicite:21]{index=21} :contentReference[oaicite:22]{index=22}

Se conservará este principio, aunque posteriormente podrán definirse estados adicionales si son necesarios.

La eliminación física deberá evitarse cuando exista información histórica relevante.

---

# 22. Historial

El sistema deberá conservar la evolución del riesgo.

No deberá sobrescribirse información histórica crítica.

Especialmente:

```text
Valoración inherente
Valoración residual
Controles
Tratamientos
Seguimientos
Materializaciones
```

Esto permitirá reconstruir qué ocurrió con un riesgo durante una vigencia.

---

# 23. Vigencia

El módulo deberá manejar el concepto de:

```text
Vigencia
```

para organizar las matrices y riesgos institucionales por periodo.

Esto permitirá posteriormente consultar, por ejemplo:

```text
Matriz 2026
Matriz 2027
Matriz 2028
```

sin perder el histórico.

---

# 24. Matriz consolidada

La tabla consolidada existente en el HTML se conservará como concepto de visualización y reporte.

No será el mecanismo principal de captura.

```text
Base de datos normalizada
        ↓
Consulta
        ↓
Matriz consolidada
```

El usuario registrará el riesgo mediante el formulario.

La matriz será una representación de los datos almacenados.

---

# 25. Panel de control

También se conservará el concepto del dashboard del prototipo.

Podrá mostrar:

```text
Total de riesgos
Riesgos por tipología
Riesgos por proceso
Riesgos por zona inherente
Riesgos por zona residual
Riesgos materializados
Tratamientos pendientes
Seguimientos pendientes
```

Estos datos deberán obtenerse desde PostgreSQL y no almacenarse como valores independientes.

---

# 26. Lo que no se trasladará del HTML

No se trasladarán:

```text
localStorage
api.php
persistencia PHP opcional
estado completo almacenado como JSON
contraseña o clave compartida del navegador
columnas fijas T1/T2/T3/T4
clasificación de zona mediante umbrales numéricos
fórmula residual actual sin validación
LA/FT automáticamente como tipología independiente
C/I/D como "causa inmediata"
```

La persistencia del prototipo actualmente contempla almacenamiento local y un backend PHP opcional; esto será reemplazado completamente por la arquitectura de GIGA. :contentReference[oaicite:23]{index=23}

---

# 27. Lo que sí se conservará

Se conservará el enfoque funcional del HTML:

```text
Formulario único de riesgo
Código automático
Proceso
Responsable
Tipología
Formulario dinámico
Afectaciones múltiples
Causa inmediata
Causa raíz
Descripción asistida
Probabilidad por frecuencia
Impacto por criterios
Valoración automática
Riesgo inherente
Controles múltiples
Riesgo residual
Vista consolidada
Dashboard
```

Y se ampliará con:

```text
Amenazas
Vulnerabilidades
Tratamiento
Acciones
Seguimientos normalizados
Materializaciones
Evidencias
Historial
Vigencias
```

---

# 28. Estructura funcional resultante

```text
MATRIZ DE RIESGOS
        │
        ▼
      RIESGO
        │
        ├── Identificación
        │
        ├── Tipología
        │      │
        │      └── Información específica
        │
        ├── Afectación
        ├── Causas
        ├── Descripción
        │
        ├── Probabilidad
        ├── Impacto
        │
        ▼
   Riesgo inherente
        │
        ▼
     Controles[]
        │
        ▼
   Riesgo residual
        │
        ▼
     Tratamiento
        │
        └── Acciones[]
        │
        ▼
    Seguimientos[]
        │
        ├── Evidencias[]
        │
        └── Materializaciones[]
```

---

# 29. Regla principal para el desarrollo

A partir de este punto:

> **El prototipo `index.html` será la referencia funcional del módulo de riesgos.**

Cuando exista una diferencia entre el prototipo y las correcciones metodológicas ya identificadas, prevalecerá la corrección.

Por tanto, el desarrollo seguirá:

```text
HTML actual
    +
Correcciones metodológicas
    ↓
Especificación funcional
    ↓
Modelo conceptual
    ↓
Modelo lógico
    ↓
Prisma
    ↓
PostgreSQL
    ↓
SvelteKit
```

No será necesario continuar generando documentación metodológica antes de avanzar.

Las dudas metodológicas que aparezcan durante el modelado o desarrollo se resolverán de forma puntual contra la Guía V7 y sus anexos.

---

# 30. Siguiente paso

Con esta especificación funcional cerrada, el siguiente entregable será:

```text
modelo-conceptual.md
```

Ese documento ya no volverá a explicar la metodología.

Su función será exclusivamente transformar esta especificación en:

```text
Entidades
Relaciones
Cardinalidades
Responsabilidades de cada entidad
Información común
Información específica por tipología
Historial
```

y servirá como entrada directa para construir posteriormente:

```text
modelo-logico.md
        ↓
schema.prisma
        ↓
PostgreSQL
```