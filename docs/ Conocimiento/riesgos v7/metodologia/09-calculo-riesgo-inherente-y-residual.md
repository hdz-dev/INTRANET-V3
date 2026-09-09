# Calculo del riesgo inherente y residual

## 1. Proposito

Este documento describe la regla funcional utilizada en GIGA para calcular y mostrar la valoracion del riesgo inherente y residual, con base en el **Anexo 1 - Formato mapa de riesgos integral** de la Guia para la Gestion Integral del Riesgo en Entidades Publicas, version 7.

El documento distingue entre:

- reglas confirmadas en el Anexo 1 oficial;
- valores auxiliares utilizados para explicar el calculo;
- comportamientos del archivo de Turismo que no deben tomarse como autoridad metodologica.

La fuente oficial prevalece sobre cualquier prototipo, formula heredada o aproximacion tecnica.

---

## 2. Fuentes

La fuente principal es:

```text
2025-11-18_Anexo 1_Formato_mapa_riesgos_integral_vf_limpia_final.xlsx
```

Ubicacion:

```text
docs/ Conocimiento/riesgos v7/Anexos_guia_gestion_integral_riesgos_v7/
```

Hojas oficiales relacionadas:

```text
3 PROBABIL E IMPACTO INHERENTE
4 MAPA CALOR INHERENTE
5 VALORACION CONTROL PROBAB.
5 VALORACION CONTROL IMPACTO
6 MAPA CALOR RESIDUAL
7 MAPA CALOR INHEREN Y RESIDUAL
8 PEFIL RIESGO DEL PROCESO
```

El archivo `MATRIZ DE RIESGOS TURISMO.xlsx` se considera solamente una referencia funcional. Sus formulas no constituyen por si mismas la regla metodologica definitiva.

---

## 3. Conceptos

### 3.1 Riesgo inherente

Es el nivel de riesgo antes de considerar los controles existentes.

Se conserva con sus componentes:

```text
Probabilidad inherente
Impacto inherente
Zona inherente
```

### 3.2 Riesgo residual

Es el nivel de riesgo que permanece despues de considerar los controles aplicables.

Se conserva separado del riesgo inherente:

```text
Probabilidad residual
Impacto residual
Zona residual
```

La valoracion residual no debe sobrescribir la valoracion inherente.

---

## 4. Valoracion del riesgo inherente

### 4.1 Probabilidad

La probabilidad se determina mediante cinco niveles:

| Nivel | Valor de referencia |
|---|---:|
| Muy Baja | 20 % |
| Baja | 40 % |
| Media | 60 % |
| Alta | 80 % |
| Muy Alta | 100 % |

La frecuencia de la actividad es el criterio de exposicion utilizado para seleccionar el nivel de probabilidad.

El sistema debe conservar tanto el nivel como el criterio que lo sustenta.

### 4.1.1 Presentacion de valores

Los valores se representan internamente como decimales para realizar operaciones:

```text
20 %  = 0.20
60 %  = 0.60
100 % = 1.00
```

En la interfaz y en los reportes dirigidos al usuario deben mostrarse como porcentajes, siempre acompañados por su nivel metodologico. El decimal es un dato tecnico interno y no debe sustituir la lectura porcentual.

### 4.2 Impacto

El impacto se determina con los criterios aplicables a la tipologia y a las afectaciones seleccionadas.

Para riesgos generales pueden participar:

- impacto economico;
- impacto reputacional.

Cuando participan ambos, el impacto inherente corresponde al mayor nivel aplicable.

Para riesgos fiscales se utiliza el criterio economico asociado a la cuantia del efecto dañoso.

### 4.3 Zona inherente

La zona inherente se determina cruzando los niveles de probabilidad e impacto en la matriz oficial de severidad.

La matriz oficial utilizada por el Anexo 1 es:

| Probabilidad / Impacto | Leve | Menor | Moderado | Mayor | Catastrofico |
|---|---|---|---|---|---|
| Muy Alta | Alto | Alto | Alto | Alto | Extremo |
| Alta | Moderado | Moderado | Alto | Alto | Extremo |
| Media | Moderado | Moderado | Moderado | Alto | Extremo |
| Baja | Bajo | Moderado | Moderado | Alto | Extremo |
| Muy Baja | Bajo | Bajo | Moderado | Alto | Extremo |

El producto numerico de probabilidad por impacto puede conservarse como dato auxiliar de explicabilidad, pero no reemplaza el cruce por niveles para determinar la zona.

---

## 5. Valoracion de controles

Cada control se analiza de manera independiente y se relaciona con el componente que puede modificar.

### 5.1 Tipo de control

| Tipo | Componente relacionado |
|---|---|
| Preventivo | Probabilidad |
| Detectivo | Probabilidad |
| Correctivo | Impacto |

### 5.2 Implementacion

| Implementacion | Peso de referencia |
|---|---:|
| Automatico | 25 % |
| Manual | 15 % |

### 5.3 Peso por tipo

| Tipo | Peso de referencia |
|---|---:|
| Preventivo | 25 % |
| Detectivo | 15 % |
| Correctivo | 10 % |

El Anexo 1 representa el valor total individual del control como:

```text
Valor total del control = peso del tipo + peso de implementacion
```

Estos pesos se encuentran parametrizados en la hoja `11 FORMULAS` del Anexo 1.

Los atributos de formalizacion, como frecuencia, evidencia y documentacion, describen el control y permiten analizarlo, pero no deben sumarse automaticamente como si fueran pesos de eficiencia.

---

## 6. Aplicacion de multiples controles

El Anexo 1 separa la valoracion en dos hojas:

```text
5 VALORACION CONTROL PROBAB.
5 VALORACION CONTROL IMPACTO
```

Esto significa que los controles que actuan sobre probabilidad y los que actuan sobre impacto deben procesarse por separado.

La secuencia oficial representada en las hojas es:

```text
Valor inicial = valor inherente

Efecto del control = valor actual x eficiencia del control

Valor siguiente = valor actual - efecto del control
```

De forma equivalente:

```text
Valor siguiente = valor actual x (1 - eficiencia del control)
```

Para varios controles, el resultado de un control se convierte en la base del siguiente:

```text
Valor residual = valor inherente

Para cada control aplicable, en el orden definido:
    valor residual = valor residual x (1 - eficiencia del control)
```

No se debe sumar primero toda la eficiencia y aplicar una unica reduccion, porque esa es la aproximacion anterior del archivo de Turismo.

La aplicacion se realiza por componente:

```text
Controles preventivos y detectivos
        ↓
Probabilidad residual

Controles correctivos
        ↓
Impacto residual
```

La reduccion nunca debe producir valores inferiores a cero.

---

## 7. Conversion a niveles residuales

Los valores residuales se convierten nuevamente a niveles metodologicos.

La interfaz debe presentar el resultado con el nivel y el porcentaje correspondiente. Por ejemplo:

```text
Probabilidad residual: Alta (70 %)
Impacto residual: Moderado (60 %)
```

El motor puede conservar `0.70` y `0.60` internamente, pero esos valores no deben mostrarse al usuario como si fueran la escala metodologica principal.

### Probabilidad residual

| Rango de referencia | Nivel |
|---:|---|
| Mayor a 80 % y hasta 100 % | Muy Alta |
| Mayor a 60 % y hasta 80 % | Alta |
| Mayor a 40 % y hasta 60 % | Media |
| Mayor a 20 % y hasta 40 % | Baja |
| Mayor a 0 % y hasta 20 % | Muy Baja |

### Impacto residual

| Rango de referencia | Nivel |
|---:|---|
| Mayor a 80 % y hasta 100 % | Catastrofico |
| Mayor a 60 % y hasta 80 % | Mayor |
| Mayor a 40 % y hasta 60 % | Moderado |
| Mayor a 20 % y hasta 40 % | Menor |
| Mayor a 0 % y hasta 20 % | Leve |

Los limites deben implementarse con operadores consistentes. Un valor exactamente igual a 80 % pertenece al nivel inferior del siguiente rango, de acuerdo con la estructura observada en las tablas del Anexo 1.

---

## 8. Zona residual

La zona residual se obtiene cruzando:

```text
Nivel de probabilidad residual
+
Nivel de impacto residual
        ↓
Matriz oficial de severidad
```

No se debe determinar la zona residual mediante:

```text
probabilidad residual x impacto residual
```

ni mediante umbrales numericos heredados del prototipo.

El producto puede mostrarse como valor auxiliar, por ejemplo:

```text
Valor auxiliar = probabilidad residual x impacto residual
```

pero la zona debe salir de la matriz de niveles.

---

## 9. Ejemplo funcional

Supongamos:

```text
Probabilidad inherente: Muy Alta = 1.00
Impacto inherente: Moderado = 0.60
```

Y un control:

```text
Tipo: Detectivo
Implementacion: Manual
```

Su eficiencia individual de referencia es:

```text
15 % + 15 % = 30 %
```

La probabilidad residual se calcula secuencialmente:

```text
1.00 x (1 - 0.30) = 0.70
```

El impacto no cambia porque el control es detectivo:

```text
0.60
```

Conversion a niveles:

```text
0.70 → Alta
0.60 → Moderado
```

Cruce en la matriz oficial:

```text
Alta + Moderado = Alto
```

El producto auxiliar seria:

```text
0.70 x 0.60 = 0.42
```

Pero `0.42` no es la regla que determina la zona. La zona oficial se obtiene del cruce `Alta` y `Moderado`.

---

## 10. Reglas de implementacion en GIGA

El motor de valoracion debe:

1. conservar probabilidad, impacto y zona inherentes;
2. clasificar cada control por tipo e implementacion;
3. aplicar cada control secuencialmente;
4. separar controles de probabilidad y controles de impacto;
5. convertir los valores residuales a niveles;
6. consultar la matriz oficial de 25 combinaciones;
7. conservar los resultados residuales sin sobrescribir los inherentes;
8. mostrar el razonamiento del calculo;
9. registrar la version de la metodologia aplicada;
10. permitir actualizar los parametros sin cambiar la estructura del riesgo.

La informacion de formalizacion del control debe permanecer separada de la eficiencia:

```text
Eficiencia:
- tipo;
- implementacion.

Formalizacion y operacion:
- responsable;
- accion;
- complemento;
- frecuencia;
- evidencia;
- documentacion;
- desviaciones;
- ejecucion.
```

---

## 11. Alcance y advertencias

El Anexo 1 oficial contiene algunas formulas auxiliares con referencias rotas o dependencias heredadas. No se deben copiar errores como `#REF!`.

La regla implementada en GIGA se basa en la estructura funcional verificable del Anexo 1:

- valoracion separada de probabilidad e impacto;
- eficiencia individual por tipo e implementacion;
- aplicacion secuencial de controles;
- conversion a niveles;
- cruce en matriz oficial.

Si una version posterior de la Guia o del Anexo 1 modifica pesos, rangos, orden o matriz, estos valores deben actualizarse como parametros metodologicos versionados.

La matriz de Turismo no debe utilizarse para validar la correccion de la medicion, debido a que contiene aproximaciones y formulas que no representan necesariamente la regla oficial.
