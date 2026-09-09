# Riesgo residual

## 1. Propósito

Este documento define la base metodológica para determinar el **riesgo residual** en GIGA.

El riesgo residual corresponde al nivel de riesgo que permanece después de considerar los controles aplicables.

```text
Riesgo inherente
      │
      ▼
   Controles
      │
      ▼
Riesgo residual
```

La fórmula y reglas definitivas deberán provenir de la Guía V7 y sus anexos.

---

## 2. Punto de partida

[FP]

La valoración residual parte de la valoración inherente previamente determinada.

```text
Valoración inherente
├── Probabilidad inherente
├── Impacto inherente
└── Zona inherente
```

Posteriormente se analiza el efecto de los controles.

[GIGA]

La valoración inherente nunca deberá sobrescribirse al calcular el residual.

---

## 3. Efecto de los controles

[FP]

Los controles pueden modificar los componentes de la valoración del riesgo.

Como principio metodológico:

```text
Preventivo
Detectivo
     │
     ▼
Probabilidad
```

y:

```text
Correctivo
     │
     ▼
Impacto
```

El efecto exacto dependerá de la valoración metodológica de cada control.

---

## 4. Probabilidad residual

[GIGA]

La probabilidad residual representa la probabilidad que permanece después de aplicar los controles que actúan sobre ella.

Conceptualmente:

```text
Probabilidad inherente
        │
        ▼
Controles aplicables
        │
        ▼
Probabilidad residual
```

El sistema deberá conservar tanto el valor inherente como el residual.

---

## 5. Impacto residual

[GIGA]

El impacto residual representa el impacto que permanece después de considerar los controles que metodológicamente actúan sobre este componente.

```text
Impacto inherente
      │
      ▼
Controles aplicables
      │
      ▼
Impacto residual
```

No todos los controles necesariamente modifican el impacto.

---

## 6. Múltiples controles

[HTML]

El prototipo actualmente suma las eficiencias de los controles y aplica posteriormente la reducción acumulada.

Conceptualmente:

```text
Σ eficiencias
      │
      ▼
Valor inherente × (1 - suma)
```

[PENDIENTE CRÍTICO]

Esta fórmula **no deberá copiarse todavía a GIGA**.

Debe verificarse directamente en la Guía V7 y principalmente en el **Anexo 1 parametrizado**:

- cómo se aplican varios controles;
- si la aplicación es acumulativa o secuencial;
- el orden de aplicación;
- posibles límites de reducción;
- reglas de redondeo;
- conversión del resultado a nivel residual.

---

## 7. Valoración residual

[GIGA]

Conceptualmente:

```text
ValoracionRiesgo
│
├── tipo: RESIDUAL
├── probabilidad
├── impacto
├── zona
├── metodologiaAplicada
└── versionMetodologia
```

Esta estructura es conceptual y no representa todavía el modelo Prisma.

---

## 8. Zona residual

[FP]

Una vez determinados los niveles residuales de:

```text
Probabilidad
+
Impacto
```

deberá establecerse la zona residual utilizando la matriz metodológica oficial.

```text
Probabilidad residual
          +
Impacto residual
          │
          ▼
Matriz de severidad
          │
          ▼
Zona residual
```

---

## 9. Corrección al prototipo

[HTML]

Actualmente el prototipo obtiene un producto numérico:

```text
probabilidad residual × impacto residual
```

y posteriormente utiliza umbrales para determinar:

```text
Bajo
Moderado
Alto
Extremo
```

[GIGA]

Esta lógica no deberá trasladarse directamente.

La regla será:

```text
zonaResidual =
    matrizMetodologica
        [nivelProbabilidadResidual]
        [nivelImpactoResidual]
```

[PENDIENTE]

Las 25 combinaciones de la matriz deberán verificarse directamente en el Anexo 1.

---

## 10. Inherente frente a residual

[GIGA]

GIGA deberá mostrar claramente ambas valoraciones.

```text
RIESGO INHERENTE

Probabilidad: Alta
Impacto: Mayor
Zona: [...]
```

```text
RIESGO RESIDUAL

Probabilidad: [...]
Impacto: [...]
Zona: [...]
```

Esto permitirá visualizar el efecto de los controles.

---

## 11. Explicabilidad

[GIGA]

El sistema deberá poder explicar cómo se obtuvo el residual.

Ejemplo conceptual:

```text
Probabilidad inherente
        │
        ▼
Control 1
        │
        ▼
Control 2
        │
        ▼
Probabilidad residual
```

y mostrar:

- controles considerados;
- valoración de cada control;
- componente afectado;
- resultado obtenido;
- zona residual.

El resultado no deberá funcionar como una "caja negra".

---

## 12. Controles sin efecto

[GIGA]

Un control registrado no deberá reducir automáticamente el riesgo simplemente por existir.

Su efecto dependerá de:

- tipo;
- implementación;
- valoración;
- condiciones metodológicas aplicables.

[PENDIENTE]

Debe verificarse en V7 cuándo un control puede considerarse insuficiente o no efectivo para producir desplazamiento.

---

## 13. Particularidades por tipología

[GIGA]

La estructura general será común:

```text
Riesgo
     │
     ▼
Valoración inherente
     │
     ▼
Controles
     │
     ▼
Valoración residual
```

Sin embargo, podrán existir reglas particulares para:

```text
Gestión
Fiscal
Seguridad de la Información
Integridad Pública
```

Estas particularidades no crearán diferentes entidades de `Riesgo`.

---

## 14. Historial

[GIGA]

Una nueva valoración residual no deberá eliminar necesariamente la anterior.

Conceptualmente:

```text
Riesgo
│
├── Valoración residual V1
├── Valoración residual V2
└── Valoración residual V3
```

Esto permitirá conocer la evolución del riesgo y sus controles.

---

## 15. Revaloración

[GIGA]

Cambios significativos en los controles pueden requerir una nueva valoración residual.

Ejemplos:

```text
Nuevo control
Modificación de control
Eliminación o inactivación
Cambio de implementación
Cambio de efectividad
```

La valoración anterior deberá conservarse para trazabilidad.

---

## 16. Reglas GIGA

### [GIGA-RIESGO-025]

La valoración residual deberá calcularse a partir de la valoración inherente y los controles aplicables.

### [GIGA-RIESGO-026]

La valoración inherente deberá conservarse independientemente de la residual.

### [GIGA-RIESGO-027]

Los controles preventivos y detectivos actuarán sobre la probabilidad cuando así lo establezca la metodología vigente.

### [GIGA-RIESGO-028]

Los controles correctivos actuarán sobre el impacto cuando así lo establezca la metodología vigente.

### [GIGA-RIESGO-029]

La aplicación de múltiples controles seguirá la fórmula oficial de la metodología y no la fórmula provisional del HTML.

### [GIGA-RIESGO-030]

La zona residual deberá determinarse mediante la matriz de severidad oficial.

### [GIGA-RIESGO-031]

GIGA deberá conservar suficiente información para explicar cómo se obtuvo la valoración residual.

### [GIGA-RIESGO-032]

Las valoraciones residuales deberán mantener trazabilidad histórica.

---

## 17. Pendientes

[PENDIENTE]

Antes de implementar el cálculo deberán verificarse:

1. fórmula exacta para múltiples controles;
2. orden de aplicación;
3. límites máximos de reducción;
4. reglas de redondeo;
5. conversión del resultado a niveles de probabilidad e impacto;
6. matriz oficial de severidad;
7. comportamiento de controles insuficientes;
8. particularidades por tipología.

La fuente prioritaria será:

**Anexo 1 — Formato mapa de riesgos integral parametrizado de la Guía V7.**

---

## 18. Conclusión

El riesgo residual deberá mantener una relación clara:

```text
Riesgo inherente
      │
      ▼
Controles
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

El prototipo contiene una aproximación funcional útil, pero su fórmula para múltiples controles y su clasificación mediante umbrales numéricos no deberán trasladarse a GIGA hasta ser validadas contra el Anexo 1.


```