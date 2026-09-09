# Seguimiento del riesgo

## 1. Propósito

Este documento define la base metodológica para el seguimiento de los riesgos en GIGA.

El seguimiento permite verificar:

- evolución del riesgo;
- funcionamiento de los controles;
- cumplimiento del tratamiento;
- materialización;
- necesidad de una nueva valoración;
- evidencias.

---

## 2. Ubicación en el ciclo

[FP]

El seguimiento permite revisar periódicamente el comportamiento del riesgo después de su valoración y tratamiento.

```text
Identificación
      │
      ▼
Valoración
      │
      ▼
Controles
      │
      ▼
Tratamiento
      │
      ▼
Seguimiento
      │
      ▼
Revisión / Revaloración
```

---

## 3. Seguimientos múltiples

[GIGA]

Un riesgo podrá tener múltiples seguimientos.

```text
Riesgo
   │
   └── Seguimiento[]
```

No deberán utilizarse campos fijos como:

```text
seguimiento1
seguimiento2
seguimiento3
seguimiento4
```

La periodicidad deberá poder adaptarse a las reglas institucionales.

---

## 4. Información del seguimiento

[GIGA]

Conceptualmente un seguimiento podrá registrar:

```text
Seguimiento
├── Periodo
├── Fecha
├── Responsable
├── Observaciones
├── Estado
├── Materialización
└── Evidencia[]
```

La estructura definitiva se establecerá posteriormente en el modelo lógico.

---

## 5. Seguimiento de controles

[FP] / [GIGA]

El seguimiento deberá permitir verificar el comportamiento de los controles.

```text
Control
   │
   └── Seguimiento
       ├── Ejecución
       ├── Efectividad
       ├── Desviaciones
       └── Evidencias
```

Un control registrado no debe considerarse efectivo únicamente por existir.

---

## 6. Seguimiento del tratamiento

[GIGA]

Las acciones definidas durante el tratamiento también deberán poder revisarse.

```text
AccionTratamiento
      │
      └── Seguimiento
          ├── Avance
          ├── Estado
          ├── Observaciones
          └── Evidencias
```

Debe distinguirse entre:

```text
Seguimiento del riesgo
Seguimiento del control
Seguimiento de acciones
```

aunque puedan formar parte del mismo proceso de revisión.

---

## 7. Evidencias

[GIGA]

Los seguimientos podrán relacionarse con múltiples evidencias.

```text
Seguimiento
     │
     └── Evidencia[]
```

Las evidencias podrán corresponder a documentos, registros, reportes, actas, archivos u otros soportes institucionales.

---

## 8. Materialización

[FP]

El seguimiento deberá permitir identificar cuando un riesgo se materializa.

[GIGA]

La materialización deberá registrarse de manera estructurada.

```text
Riesgo
   │
   └── Materializacion[]
       ├── Fecha
       ├── Descripción
       ├── Consecuencias
       └── Evidencias
```

[PENDIENTE]

Los campos y acciones exactas ante una materialización deberán validarse contra V7.

---

## 9. Revaloración

[GIGA]

El seguimiento podrá determinar la necesidad de una nueva valoración cuando existan cambios relevantes.

Ejemplos:

```text
Cambio en las causas
Cambio en probabilidad
Cambio en impacto
Cambio en controles
Materialización
Cambio del proceso
Cambio metodológico
```

La nueva valoración no deberá eliminar las anteriores.

```text
Riesgo
│
├── Valoración V1
├── Valoración V2
└── Valoración V3
```

---

## 10. Periodicidad

[ALCALDÍA] / [PENDIENTE]

La periodicidad podrá depender de:

- política institucional;
- nivel del riesgo;
- tipología;
- proceso;
- responsabilidades de seguimiento.

[GIGA]

La periodicidad deberá ser configurable y no depender de una cantidad fija de campos.

---

## 11. Comparación con el HTML

[HTML]

El prototipo utiliza:

```text
T1
T2
T3
T4
```

como periodos de seguimiento.

[GIGA]

Esta estructura no deberá trasladarse directamente al modelo.

Se utilizará conceptualmente:

```text
Seguimiento[]
```

La interfaz podrá representar trimestres, cuatrimestres u otros periodos según la configuración institucional.

---

## 12. Responsabilidades

[FP]

El seguimiento involucra responsabilidades asociadas a las líneas de defensa.

[GIGA]

Deberá poder identificarse:

```text
Quién realiza el seguimiento
Quién revisa
Quién valida
```

cuando corresponda.

[PENDIENTE]

La distribución exacta entre primera, segunda y tercera línea deberá documentarse posteriormente.

---

## 13. Historial

[GIGA]

Los seguimientos deberán conservarse históricamente.

```text
Riesgo
│
├── Seguimiento 1
├── Seguimiento 2
├── Seguimiento 3
└── Seguimiento N
```

Un nuevo seguimiento no deberá sobrescribir los anteriores.

---

## 14. Estructura conceptual

[GIGA]

```text
Riesgo
│
├── ValoracionRiesgo[]
├── Control[]
├── Tratamiento
│   └── AccionTratamiento[]
├── Seguimiento[]
│   └── Evidencia[]
└── Materializacion[]
```

Esta estructura continúa siendo conceptual y no representa todavía el modelo Prisma.

---

## 15. Reglas GIGA

### [GIGA-RIESGO-040]

Un riesgo podrá tener múltiples seguimientos.

### [GIGA-RIESGO-041]

La periodicidad no estará limitada por campos fijos.

### [GIGA-RIESGO-042]

El seguimiento deberá permitir revisar riesgos, controles y acciones de tratamiento.

### [GIGA-RIESGO-043]

Las evidencias deberán conservarse relacionadas con el elemento correspondiente.

### [GIGA-RIESGO-044]

La materialización deberá registrarse de manera estructurada.

### [GIGA-RIESGO-045]

El seguimiento podrá generar una nueva valoración sin eliminar el historial anterior.

### [GIGA-RIESGO-046]

Los seguimientos deberán mantener trazabilidad histórica.

---

## 16. Pendientes

[PENDIENTE]

Antes de implementar deberán verificarse:

1. periodicidad establecida por V7 y la entidad;
2. responsabilidades por línea de defensa;
3. procedimiento ante materialización;
4. reglas de revaloración;
5. particularidades según tipología;
6. reglas institucionales de revisión y aprobación.

---

## 17. Conclusión

El seguimiento deberá manejarse como información repetible:

```text
Riesgo
   │
   └── Seguimiento[]
```

permitiendo revisar:

```text
Riesgo
Controles
Tratamiento
Materializaciones
Evidencias
```

y generar una nueva valoración cuando corresponda.

Con este documento se completa la secuencia metodológica principal:

```text
01 Marco general
02 Tipologías
03 Identificación
04 Probabilidad e impacto
05 Controles
06 Riesgo residual
07 Tratamiento
08 Seguimiento
```