# Análisis del formulario HTML de referencia

## 1. Propósito

Este documento describe el comportamiento observado en el archivo `index.html`.

Su función es conservar el trabajo funcional ya realizado y compararlo posteriormente con la metodología oficial.

Ningún elemento identificado exclusivamente en este archivo debe considerarse automáticamente una regla de la Guía V7.

## 2. Estructura general del riesgo

[HTML]

El prototipo representa un riesgo mediante los siguientes grupos principales:

### Identificación

- id
- código
- fecha de identificación
- proceso
- subproceso
- responsable

### Clasificación

- tipología

### Afectaciones y datos específicos

- tipo de afectación
- efectos fiscales
- activo de información
- causa inmediata de seguridad de la información

### Causas y descripción

- causa inmediata
- causa raíz
- descripción automática
- descripción manual

### Valoración

- nivel de frecuencia/probabilidad
- criterio económico de impacto
- criterio reputacional de impacto

### Controles

- lista dinámica de controles

### Estado

- activo / inactivo

### Seguimiento

- periodos de seguimiento

## 3. Tipologías

[HTML]

El prototipo incluye:

- Gestión
- Fiscal
- Seguridad de la Información
- Integridad Pública
- LA/FT

[PENDIENTE]

Validar la clasificación de LA/FT antes de trasladarla al sistema definitivo.

## 4. Datos dependientes de tipología

### Riesgo fiscal

[HTML]

El prototipo permite seleccionar efectos fiscales relacionados con:

- recursos públicos;
- bienes públicos;
- intereses patrimoniales de naturaleza pública.

[PENDIENTE]

Validar terminología, opciones y cardinalidad contra V7 y el anexo fiscal.

### Seguridad de la Información

[HTML]

El prototipo contempla:

- activo de información;
- selección de confidencialidad;
- disponibilidad;
- integridad.

La selección puede ser múltiple.

[PENDIENTE]

Validar si estos elementos corresponden exactamente a la ubicación y función metodológica utilizada en la Guía V7.

### Gestión e Integridad Pública

[HTML]

El prototipo utiliza afectación:

- Económica
- Reputacional

[PENDIENTE]

Validar si esta estructura aplica de la misma forma a ambas tipologías.

## 5. Causas

[HTML]

El prototipo distingue:

- causa inmediata;
- causa raíz.

Para Seguridad de la Información, la causa inmediata se construye de forma especial utilizando las propiedades seleccionadas.

[PENDIENTE]

Revisar si la asociación entre confidencialidad, integridad o disponibilidad y la causa inmediata corresponde exactamente a la metodología oficial.

## 6. Descripción automática

[HTML]

El prototipo genera automáticamente una descripción con una estructura aproximada:

Probabilidad de [afectación] por [causa inmediata], debido a [causa raíz].

También permite modificar manualmente la descripción.

[PENDIENTE]

Verificar las estructuras específicas de redacción para cada tipología.

No asumir una única plantilla universal.

## 7. Probabilidad

[HTML]

El prototipo contiene cinco niveles:

- Muy Baja
- Baja
- Media
- Alta
- Muy Alta

y los relaciona con rangos de frecuencia.

[PENDIENTE]

Validar completamente rangos, porcentajes y reglas contra V7.

## 8. Impacto

[HTML]

El prototipo contempla criterios:

- económicos;
- reputacionales.

El impacto final puede obtenerse tomando el mayor valor de los criterios seleccionados.

Para riesgos fiscales utiliza específicamente el criterio económico.

[PENDIENTE]

No trasladar esta regla a GIGA hasta verificarla contra la metodología oficial.

## 9. Riesgo inherente

[HTML]

El prototipo calcula:

riesgo inherente = probabilidad × impacto

y posteriormente determina una zona:

- Bajo
- Moderado
- Alto
- Extremo

[PENDIENTE]

Verificar:

- fórmula;
- matriz;
- límites;
- zonas;
- tratamiento de resultados.

## 10. Controles

[HTML]

Los controles son una colección dinámica.

Cada control contiene actualmente:

- responsable y frecuencia;
- acción y complemento;
- desviación y registro;
- tipo de control;
- implementación.

El usuario puede agregar o eliminar controles.

[GIGA]

El carácter repetible de los controles se conservará conceptualmente.

[PENDIENTE]

Los atributos definitivos del control deberán salir de la metodología oficial.

## 11. Valoración de controles

[HTML]

El prototipo asigna porcentajes fijos según:

- Preventivo
- Detectivo
- Correctivo

y según:

- Manual
- Automático

Estos valores se utilizan para disminuir probabilidad o impacto.

[PENDIENTE]

Esta regla no debe implementarse en GIGA hasta ser validada contra V7.

## 12. Riesgo residual

[HTML]

El prototipo calcula el riesgo residual aplicando la efectividad de los controles al riesgo inherente.

[PENDIENTE]

Validar completamente la metodología de desplazamiento o reducción del riesgo.

## 13. Seguimiento

[HTML]

El prototipo contiene cuatro periodos trimestrales:

- marzo;
- junio;
- septiembre;
- diciembre.

[GIGA]

El modelo definitivo no deberá almacenar estos periodos como columnas fijas.

Conceptualmente:

Riesgo
   │
   └── Seguimiento[]

[PENDIENTE]

La periodicidad definitiva deberá salir de la metodología y de las reglas institucionales de la Alcaldía.

## 14. Matriz consolidada

[HTML]

El prototipo genera una vista consolidada que reúne:

- identificación;
- proceso;
- responsable;
- tipología;
- activo de información;
- afectaciones;
- causas;
- descripción;
- probabilidad;
- impacto;
- riesgo inherente;
- controles;
- riesgo residual;
- seguimientos;
- estado.

[GIGA]

La matriz consolidada debe entenderse como una proyección de los datos, no como la estructura de almacenamiento.

## 15. Panorama

[HTML]

El prototipo incluye:

- total de riesgos;
- riesgos inherentes extremos;
- riesgos inherentes altos;
- riesgos residuales extremos;
- mapa de calor;
- distribución por tipología.

[GIGA]

Esta funcionalidad puede conservarse como referencia para el futuro panel de riesgos.

## 16. Conclusión

El prototipo contiene una base funcional valiosa para el diseño de GIGA.

Debe conservarse como referencia para:

- flujo del formulario;
- interacción;
- campos candidatos;
- visualización;
- consolidado;
- controles;
- indicadores.

Sin embargo, las reglas metodológicas deberán sustituirse o confirmarse mediante la documentación oficial antes de ser implementadas en el sistema definitivo.