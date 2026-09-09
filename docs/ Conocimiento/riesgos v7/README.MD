# Base de conocimiento — Gestión Integral de Riesgos

## Propósito

Esta carpeta contiene la base conceptual, metodológica y funcional utilizada para diseñar e implementar el módulo de Gestión Integral de Riesgos de GIGA.

El propósito de esta base es separar el conocimiento del dominio de la implementación técnica.

Antes de programar el módulo, esta documentación deberá permitir responder con claridad:

- qué se entiende por riesgo;
- cómo se identifica;
- qué tipologías deben gestionarse;
- qué información es común a todas las tipologías;
- qué información depende de la tipología;
- cómo se analiza la probabilidad;
- cómo se analiza el impacto;
- cómo se determina el riesgo inherente;
- cómo se diseñan y analizan los controles;
- cómo se determina el riesgo residual;
- cómo se define el tratamiento;
- cómo se realiza el seguimiento;
- qué responsabilidades corresponden a los distintos actores y líneas de defensa.

## Fuentes

Las reglas, conceptos y decisiones deberán identificar siempre su origen.

Se utilizarán las siguientes etiquetas:

[FP]  
Lineamiento, definición o regla proveniente del Departamento Administrativo de la Función Pública, incluyendo la Guía para la Gestión Integral del Riesgo en Entidades Públicas — Versión 7 y sus anexos.

[MINTIC]  
Lineamiento proveniente del Ministerio de Tecnologías de la Información y las Comunicaciones.

[ST]  
Lineamiento proveniente de la Secretaría de Transparencia de la Presidencia de la República.

[ALCALDÍA]  
Regla, procedimiento, política o decisión institucional propia de la Alcaldía Municipal de Jamundí.

[GIGA]  
Decisión funcional o técnica adoptada para el diseño del sistema GIGA.

[HTML]  
Comportamiento observado en el prototipo funcional `index.html`.

[PENDIENTE]  
Elemento que requiere validación metodológica, jurídica, institucional o funcional.

## Jerarquía de fuentes

Cuando exista una diferencia entre el prototipo funcional y la metodología oficial, prevalecerá la fuente oficial.

El archivo `index.html` constituye una referencia funcional y de experiencia de usuario, pero no una fuente normativa.

Las prácticas institucionales de la Alcaldía deberán respetar los lineamientos obligatorios o metodológicos aplicables.

Las decisiones de GIGA no podrán modificar el significado metodológico de la información.

## Principio conceptual

Todos los registros de riesgo corresponden a una única entidad conceptual:

Riesgo

La tipología determina las particularidades metodológicas aplicables a su identificación, análisis, valoración, tratamiento y seguimiento.

No se crearán jerarquías conceptuales independientes como:

- RiesgoFiscal
- RiesgoGestion
- RiesgoSeguridadInformacion
- RiesgoIntegridad

salvo que posteriormente exista una razón metodológica o técnica debidamente sustentada.

Las particularidades de cada tipología deberán relacionarse con el mismo Riesgo.

## Regla de desarrollo

No se implementarán reglas de cálculo en código hasta que hayan sido identificadas y clasificadas dentro de esta base de conocimiento.

Las fórmulas observadas en el prototipo `index.html` deberán considerarse [HTML] y, cuando corresponda, [PENDIENTE] hasta ser verificadas contra las fuentes oficiales.