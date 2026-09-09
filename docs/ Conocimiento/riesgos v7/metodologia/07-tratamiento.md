# Tratamiento del riesgo

## 1. Propósito

Este documento define la base metodológica para el tratamiento de los riesgos en GIGA.

El tratamiento corresponde a la decisión adoptada frente al riesgo después de conocer su valoración residual.

```text
Riesgo inherente
      │
      ▼
Controles
      │
      ▼
Riesgo residual
      │
      ▼
Tratamiento
```

---

## 2. Decisión de tratamiento

[FP]

La valoración residual permite determinar la respuesta que debe darse al riesgo.

Las opciones de tratamiento deberán corresponder exactamente a las establecidas por la Guía V7.

Como base de trabajo se consideran:

```text
Aceptar
Reducir
Evitar
Transferir / Compartir
```

[PENDIENTE]

La denominación y alcance exactos deberán verificarse directamente en V7 antes de parametrizarlos.

---

## 3. Aceptar

[FP]

Aceptar implica asumir conscientemente el nivel de riesgo existente.

[GIGA]

Aceptar un riesgo no significa:

```text
Eliminarlo
Cerrarlo
Dejar de monitorearlo
```

El riesgo continuará registrado y sujeto al seguimiento correspondiente.

La aceptación deberá conservar:

```text
Decisión
Justificación
Responsable
Fecha
Valoración asociada
```

---

## 4. Reducir

[FP]

Reducir implica adoptar medidas adicionales para disminuir la exposición al riesgo.

Puede implicar:

- fortalecer controles existentes;
- implementar nuevos controles;
- ejecutar acciones adicionales.

[GIGA]

Debe diferenciarse:

```text
Tratamiento
     │
     ▼
Acción de tratamiento
```

de:

```text
Control
```

Una acción puede posteriormente generar o fortalecer un control, pero ambos conceptos no son equivalentes.

---

## 5. Evitar

[FP]

Evitar implica eliminar o modificar la actividad que origina la exposición cuando la entidad decide no asumir el riesgo.

[GIGA]

El riesgo deberá conservarse históricamente junto con:

```text
Decisión
Justificación
Responsable
Fecha
```

Evitar el riesgo no significa eliminar su registro de GIGA.

---

## 6. Transferir o compartir

[FP]

El tratamiento puede contemplar mecanismos mediante los cuales parte de las consecuencias del riesgo sean asumidas o compartidas con terceros.

Ejemplos conceptuales:

```text
Seguros
Pólizas
Contratos
Tercerización
```

[GIGA]

Transferir una parte del riesgo no significa que desaparezcan todas las responsabilidades de la entidad.

[PENDIENTE]

Debe verificarse en V7 la diferencia y terminología exacta entre:

```text
Transferir
Compartir
```

---

## 7. Relación con la zona residual

[GIGA]

La zona residual será un insumo para determinar el tratamiento.

No deberá establecerse automáticamente:

```text
Bajo     = Aceptar
Moderado = Reducir
Alto     = Reducir
Extremo  = Evitar
```

salvo que la metodología o la política institucional establezcan expresamente estas reglas.

La decisión también puede depender de:

- apetito de riesgo;
- tolerancia;
- tipología;
- contexto institucional;
- responsabilidades de aprobación.

---

## 8. Acciones de tratamiento

[GIGA]

Cuando el tratamiento requiera medidas adicionales podrán definirse múltiples acciones.

```text
Tratamiento
     │
     └── AccionTratamiento[]
```

Conceptualmente cada acción podrá contener:

```text
Acción
├── Descripción
├── Responsable
├── Fecha límite
├── Estado
└── Evidencia[]
```

No deberán utilizarse columnas fijas como:

```text
accion1
accion2
accion3
```

---

## 9. Acción frente a control

[GIGA]

Debe mantenerse esta diferencia:

```text
ACCIÓN

Implementar una validación automática
antes del 30 de noviembre.
```

Una vez implementada puede convertirse en:

```text
CONTROL

El sistema valida automáticamente
la información antes de permitir
el registro.
```

Conceptualmente:

```text
AccionTratamiento
        │
        ▼
   Implementación
        │
        ▼
puede generar o fortalecer
        │
        ▼
      Control
```

---

## 10. Seguimiento de acciones

[GIGA]

Las acciones deberán poder ser objeto de seguimiento.

```text
AccionTratamiento
       │
       └── Seguimiento
            ├── Estado
            ├── Avance
            ├── Observaciones
            └── Evidencias
```

Una acción cumplida no significa automáticamente que el riesgo haya desaparecido.

Puede requerirse una nueva valoración.

---

## 11. Particularidades por tipología

[GIGA]

La estructura general será común:

```text
Riesgo
   │
   └── Tratamiento
```

pero podrán existir reglas particulares para:

```text
Gestión
Fiscal
Seguridad de la Información
Integridad Pública
```

[PENDIENTE]

Estas particularidades deberán obtenerse de V7 y sus anexos específicos.

---

## 12. Trazabilidad

[GIGA]

Toda decisión de tratamiento deberá permitir conocer:

```text
Qué se decidió
Por qué
Quién decidió
Cuándo
Sobre qué valoración residual
Qué acciones se definieron
```

Los cambios posteriores no deberán eliminar las decisiones históricas.

---

## 13. Estructura conceptual

[GIGA]

```text
Riesgo
│
├── ValoracionRiesgo
│   └── RESIDUAL
│
└── Tratamiento
    ├── Opción
    ├── Justificación
    ├── Responsable
    ├── Fecha
    │
    └── AccionTratamiento[]
        └── Evidencia[]
```

Esta estructura es conceptual y no representa todavía el modelo Prisma.

---

## 14. Reglas GIGA

### [GIGA-RIESGO-033]

El tratamiento deberá relacionarse con la valoración del riesgo sobre la cual fue decidido.

### [GIGA-RIESGO-034]

Aceptar un riesgo no implicará eliminarlo ni excluirlo automáticamente del seguimiento.

### [GIGA-RIESGO-035]

Una acción de tratamiento será conceptualmente diferente de un control.

### [GIGA-RIESGO-036]

Un tratamiento podrá contener múltiples acciones.

### [GIGA-RIESGO-037]

Las decisiones y acciones deberán mantener trazabilidad histórica.

### [GIGA-RIESGO-038]

El cumplimiento de las acciones no cerrará automáticamente el riesgo.

### [GIGA-RIESGO-039]

Las reglas particulares de tratamiento podrán depender de la tipología sin crear subtipos jerárquicos de `Riesgo`.

---

## 15. Pendientes

[PENDIENTE]

Antes de implementar esta etapa deberán verificarse:

1. opciones exactas de tratamiento en V7;
2. diferencia entre transferir y compartir;
3. criterios para aceptar riesgos;
4. relación con apetito y tolerancia;
5. responsables de aprobación;
6. estructura oficial de acciones;
7. particularidades para riesgos Fiscales;
8. particularidades para Integridad Pública;
9. particularidades para Seguridad de la Información.

---

## 16. Conclusión

El tratamiento deberá seguir conceptualmente:

```text
Riesgo residual
      │
      ▼
Decisión de tratamiento
      │
      ├── Aceptar
      ├── Reducir
      ├── Evitar
      └── Transferir / Compartir
                │
                ▼
        Acciones necesarias
```

GIGA deberá mantener separados:

```text
Tratamiento
Acción
Control
```

y conservar la trazabilidad de las decisiones tomadas.

El siguiente documento será:

```text
08-seguimiento.md
```