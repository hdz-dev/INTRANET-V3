# Especificación funcional y modelo técnico — Activos de Información

## 1. Propósito

Este documento define la especificación funcional y el modelo técnico inicial del módulo de **Activos de Información** de GIGA.

El módulo permitirá:

- registrar activos de información;
- consultar y editar activos;
- identificar proceso, subproceso y dependencia;
- clasificar los activos;
- identificar propietario y custodio;
- registrar condiciones de conservación;
- valorar confidencialidad, integridad y disponibilidad;
- registrar criticidad;
- gestionar condiciones de publicación, clasificación y reserva;
- identificar tratamiento de datos personales;
- disponer de una **matriz consolidada** con todos los activos registrados;
- relacionar posteriormente los activos con riesgos de Seguridad de la Información.

La matriz institucional existente constituye la referencia funcional inicial.

---

# 2. Principio general

La matriz actual no se utilizará directamente como formulario.

El funcionamiento será:

```text
Formulario de Activo
        ↓
Base de datos
        ↓
Matriz consolidada
```

Por tanto:

```text
Formulario
= captura y edición

Matriz consolidada
= consulta, control, exportación y reporte
```

La información se almacenará estructuradamente, pero la matriz consolidada podrá reconstruir todas las columnas institucionales.

---

# 3. Rutas propuestas

```text
/mipg/activos-informacion
```

Panel principal.

```text
/mipg/activos-informacion/nuevo
```

Creación de activo.

```text
/mipg/activos-informacion/[id]
```

Consulta y edición.

```text
/mipg/activos-informacion/matriz
```

Matriz consolidada.

---

# 4. Flujo del formulario

```text
1. Ubicación institucional
        ↓
2. Identificación del activo
        ↓
3. Gestión documental
        ↓
4. Propiedad y custodia
        ↓
5. Conservación y formato
        ↓
6. Clasificación y seguridad
        ↓
7. Publicación y ubicación
        ↓
8. Clasificación / reserva
        ↓
9. Datos personales
        ↓
10. Guardar
```

El formulario podrá presentarse mediante secciones, acordeones o pasos, manteniendo la línea visual de GIGA.

---

# 5. Ubicación institucional

Campos:

```text
Proceso
Subproceso
Dependencia
```

## Proceso

Debe seleccionarse desde el catálogo institucional de procesos.

```text
Proceso → ActivoInformacion[]
```

No debe duplicarse un proceso existente en GIGA.

## Subproceso

Si existe catálogo institucional se utilizará una relación.

En caso contrario podrá mantenerse inicialmente como texto.

## Dependencia

Debe seleccionarse desde el catálogo institucional de dependencias cuando este exista.

---

# 6. Identificación del activo

Campos:

```text
Código del sistema de gestión documental
Identificador
Tipo
Nombre
Cantidad
Descripción
```

## Identificador

Cada activo tendrá un identificador funcional único.

Ejemplo:

```text
AI-000001
AI-000002
AI-000003
```

Este código será diferente del identificador interno de base de datos.

## Tipo

Se utilizará un catálogo parametrizable.

Valores iniciales:

```text
Software
Servicio
Información
Base de datos
Documento
Hardware
Repositorio
Sistema de información
Otro
```

No deberá quedar codificado directamente en el formulario.

## Cantidad

Campo numérico entero.

Valor mínimo:

```text
1
```

---

# 7. Gestión documental

Campos:

```text
Código del sistema de gestión documental
Serie documental
Subserie documental
```

Conceptualmente:

```text
SerieDocumental
        │
        └── SubserieDocumental[]
```

Al seleccionar una serie, deberán mostrarse únicamente las subseries asociadas.

Los campos podrán ser opcionales cuando el tipo de activo no corresponda a información documental.

---

# 8. Propiedad y custodia

Campos:

```text
Cargo de la producción de la información
(Propietario del activo)

Fecha de generación de la información

Cargo de la persona encargada de la información
(Custodio del activo)

Fecha de ingreso del activo al archivo
```

Siempre que sea posible, propietario y custodio deberán relacionarse con cargos institucionales.

```text
ActivoInformacion
├── propietarioCargoId
└── custodioCargoId
```

No deberán confundirse necesariamente con el funcionario que actualmente ocupa el cargo.

Esto permite conservar la responsabilidad institucional aunque cambie la persona.

---

# 9. Fechas

Los siguientes campos deberán almacenarse como fechas reales:

```text
fechaGeneracion
fechaIngresoArchivo
fechaClasificacion
```

No deberán almacenarse fechas como números provenientes de Excel.

Valores históricos como:

```text
46167
46177
```

deberán convertirse a fechas reales durante una eventual importación.

---

# 10. Conservación y formato

Campos:

```text
Medio de conservación
Formato
```

## Medio de conservación

Catálogo inicial:

```text
Digital
Físico
Mixto
Otro
```

## Formato

Catálogo inicial:

```text
Sistema de información
Base de datos
Documento electrónico
Documento físico
Hoja de cálculo
Correo electrónico
Imagen
Audio
Video
Repositorio
Otro
```

Ambos catálogos deberán ser parametrizables.

---

# 11. Clasificación y seguridad

Esta sección contendrá:

```text
Confidencialidad
Integridad
Disponibilidad
Criticidad del activo
```

Estos datos serán especialmente importantes para la posterior relación con riesgos de Seguridad de la Información.

---

# 12. Confidencialidad

Valores iniciales:

```text
Información pública
Información pública clasificada
Información pública reservada
```

Se utilizará un catálogo.

La selección controlará la aparición de campos relacionados con clasificación y reserva.

---

# 13. Integridad

Valores iniciales:

```text
Baja
Media
Alta
```

---

# 14. Disponibilidad

Valores iniciales:

```text
Baja
Media
Alta
```

---

# 15. Criticidad

Valores iniciales:

```text
BAJA
MEDIA
ALTA
```

Inicialmente podrá almacenarse la criticidad registrada por el usuario.

Posteriormente podrá automatizarse si se define formalmente una regla institucional basada en:

```text
Confidencialidad
Integridad
Disponibilidad
        ↓
Criticidad
```

No se deberá inventar una fórmula mientras esta no esté definida.

---

# 16. Publicación y ubicación

Campos:

```text
Información publicada
Lugar de consulta o ubicación
```

## Estado de publicación

Se utilizará un catálogo.

Valores iniciales:

```text
Publicada
No publicada o disponible
Publicación parcial
```

## Lugar de consulta o ubicación

Debe permitir identificar dónde se encuentra disponible o conservado el activo.

Ejemplos:

```text
Archivo físico
Servidor institucional
Sistema de información
Portal web institucional
Portal web de terceros
Repositorio
Google Drive
Otro
```

Podrá existir adicionalmente:

```text
detalleUbicacion
```

para URL, ruta, nombre del sistema o descripción.

---

# 17. Clasificación, reserva y excepción

Esta sección será dinámica.

Si la confidencialidad corresponde a:

```text
Información pública
```

los campos de excepción podrán ocultarse o marcarse como no aplicables.

Si corresponde a:

```text
Información pública clasificada
```

o:

```text
Información pública reservada
```

se habilitarán:

```text
Objeto legítimo de la excepción
Fundamento constitucional o legal
Fundamento jurídico de la excepción
Excepción total o parcial
Fecha de clasificación
Tiempo de clasificación
```

---

# 18. Objeto legítimo de la excepción

Control:

```text
Sí
No
```

Podrá acompañarse posteriormente de una descripción si la metodología institucional lo requiere.

---

# 19. Fundamentos

Campos:

```text
Fundamento constitucional o legal
Fundamento jurídico de la excepción
```

Inicialmente podrán ser campos de texto.

Posteriormente podrá evaluarse la creación de un catálogo normativo reutilizable.

Ejemplo:

```text
Ley 1581 de 2012
Artículo 10 y 13
```

No es necesario crear inicialmente una entidad normativa compleja.

---

# 20. Excepción total o parcial

Valores:

```text
TOTAL
PARCIAL
```

Solo deberá solicitarse cuando exista clasificación o reserva que lo haga aplicable.

---

# 21. Tiempo de clasificación

No se almacenará como texto libre:

```text
"1 año"
```

Se separará en:

```text
tiempoClasificacion
unidadTiempoClasificacion
```

Unidades:

```text
DÍAS
MESES
AÑOS
```

Ejemplo:

```text
tiempoClasificacion = 1
unidad = AÑOS
```

---

# 22. Datos personales

Primera pregunta:

```text
¿Contiene datos personales?

Sí
No
```

Si la respuesta es:

```text
No
```

los campos restantes se ocultarán.

Si es:

```text
Sí
```

se habilitarán:

```text
¿Contiene datos personales de niños, niñas o adolescentes?

Tipos de datos personales

Finalidad de la recolección de los datos personales

¿Existe autorización para el tratamiento de los datos personales?
```

---

# 23. Datos de niños, niñas o adolescentes

Control:

```text
Sí
No
```

Solo será visible cuando:

```text
contieneDatosPersonales = Sí
```

---

# 24. Tipos de datos personales

Será selección múltiple.

Catálogo inicial:

```text
Identificación
Contacto
Ubicación
Financieros
Laborales
Académicos
Biométricos
Salud
Datos sensibles
Otros
```

La lista deberá ser parametrizable.

Relación:

```text
ActivoInformacion N ───── N TipoDatoPersonal
```

---

# 25. Finalidad de la recolección

Campo:

```text
Textarea
```

Debe permitir describir la finalidad institucional para la cual son recolectados o tratados los datos.

---

# 26. Autorización para tratamiento

Valores iniciales:

```text
Sí
No
No aplica
```

Solo será visible cuando el activo contenga datos personales.

---

# 27. Reglas dinámicas del formulario

El formulario deberá reaccionar a las respuestas.

Ejemplo:

```text
¿Contiene datos personales?
        │
        ├── No
        │    └── Ocultar sección detallada
        │
        └── Sí
             ├── Datos de menores
             ├── Tipos de datos
             ├── Finalidad
             └── Autorización
```

También:

```text
Confidencialidad
        │
        ├── Información pública
        │      └── Excepción no aplicable
        │
        ├── Información pública clasificada
        │      └── Mostrar clasificación
        │
        └── Información pública reservada
               └── Mostrar clasificación
```

---

# 28. Validaciones

Como mínimo:

```text
Proceso
Tipo
Nombre
Cantidad
Dependencia
Propietario
Custodio
Medio de conservación
Formato
Confidencialidad
Integridad
Disponibilidad
Criticidad
```

deberán validarse según su aplicabilidad.

Las reglas condicionales se ejecutarán también del lado servidor.

No se dependerá exclusivamente de validaciones del navegador.

---

# 29. Guardado

El formulario deberá permitir:

```text
Crear
Consultar
Editar
Inactivar
```

No se recomienda eliminación física de activos que hayan formado parte del inventario institucional.

Estados iniciales:

```text
ACTIVO
INACTIVO
```

---

# 30. Matriz consolidada

Debe existir una vista independiente:

```text
/mipg/activos-informacion/matriz
```

La matriz consolidada mostrará **todos los activos de información registrados**.

No será una tabla física duplicada en PostgreSQL.

Será construida mediante consultas sobre los datos existentes.

```text
Datos normalizados
        ↓
Consulta
        ↓
Matriz consolidada
```

---

# 31. Columnas de la matriz consolidada

La matriz deberá poder mostrar las columnas institucionales originales:

```text
Proceso
Subproceso
Código del sistema de gestión documental
Identificador
Tipo
Dependencia
Serie documental
Subserie documental
Nombre
Cantidad
Descripción
Cargo de la producción de la información / Propietario
Fecha de generación de la información
Cargo encargado / Custodio
Fecha de ingreso del activo al archivo
Medio de conservación
Formato
Confidencialidad
Integridad
Disponibilidad
Criticidad del activo
Información publicada
Lugar de consulta o ubicación
Objeto legítimo de la excepción
Fundamento constitucional o legal
Fundamento jurídico de la excepción
Excepción total o parcial
Fecha de clasificación
Tiempo de clasificación
¿Contiene datos personales?
¿Contiene datos personales de niños, niñas o adolescentes?
Tipos de datos personales
Finalidad de la recolección
Existe autorización para tratamiento
```

La matriz deberá reproducir funcionalmente la estructura utilizada actualmente por la entidad.

---

# 32. Funciones de la matriz

La matriz consolidada deberá permitir como mínimo:

```text
Buscar
Filtrar
Ordenar
Consultar
Editar
Exportar
```

Filtros principales:

```text
Proceso
Subproceso
Dependencia
Tipo de activo
Confidencialidad
Integridad
Disponibilidad
Criticidad
Datos personales
Estado
```

---

# 33. Tabla ancha

Debido al número de columnas, la matriz será necesariamente amplia.

La interfaz deberá permitir:

```text
scroll horizontal
encabezados fijos
primera columna o columnas fijas
selección de columnas visibles
```

No se debe intentar comprimir todas las columnas simultáneamente hasta hacer ilegible la información.

---

# 34. Columnas configurables

El usuario podrá ocultar o mostrar grupos de columnas.

Ejemplo:

```text
☑ Identificación
☑ Gestión documental
☑ Propiedad y custodia
☑ Seguridad
☑ Publicación
☐ Excepciones
☐ Datos personales
```

Esto permitirá utilizar la misma matriz para diferentes necesidades institucionales.

---

# 35. Acciones desde la matriz

Cada fila representará un activo.

Acciones:

```text
Ver
Editar
```

Opcionalmente:

```text
⋮
```

para acciones secundarias.

Al seleccionar un activo deberá poder abrirse:

```text
/mipg/activos-informacion/[id]
```

---

# 36. Exportación

La matriz deberá prepararse para exportación.

Inicialmente:

```text
Excel / XLSX
```

También podrá soportarse:

```text
CSV
```

La exportación deberá conservar los nombres institucionales de las columnas.

---

# 37. Panel principal

La ruta:

```text
/mipg/activos-informacion
```

podrá mostrar indicadores derivados.

Ejemplos:

```text
Total de activos

Activos por proceso

Activos por tipo

Activos con criticidad alta

Información pública clasificada

Información pública reservada

Activos con datos personales

Activos con datos de niños, niñas o adolescentes
```

Estos valores se calcularán desde la base de datos.

No se almacenarán como registros independientes.

---

# 38. Modelo conceptual

Entidad central:

```text
ActivoInformacion
```

Relaciones principales:

```text
Proceso
     │
     └── ActivoInformacion
              │
              ├── Subproceso
              ├── Dependencia
              ├── TipoActivo
              ├── SerieDocumental
              ├── SubserieDocumental
              ├── Cargo propietario
              ├── Cargo custodio
              ├── MedioConservacion
              ├── FormatoActivo
              ├── ClasificacionConfidencialidad
              ├── NivelIntegridad
              ├── NivelDisponibilidad
              ├── CriticidadActivo
              ├── EstadoPublicacion
              ├── ClasificacionExcepcion
              └── TipoDatoPersonal[]
```

---

# 39. Entidad ActivoInformacion

Modelo lógico inicial:

```text
ActivoInformacion
-------------------------
id
identificador

procesoId
subprocesoId / subproceso
dependenciaId

codigoGestionDocumental

tipoActivoId

serieDocumentalId
subserieDocumentalId

nombre
cantidad
descripcion

propietarioCargoId
fechaGeneracion

custodioCargoId
fechaIngresoArchivo

medioConservacionId
formatoActivoId

confidencialidadId
integridadId
disponibilidadId
criticidadId

estadoPublicacionId
lugarConsulta
detalleUbicacion

objetoLegitimoExcepcion
fundamentoConstitucionalLegal
fundamentoJuridicoExcepcion
tipoExcepcion

fechaClasificacion
tiempoClasificacion
unidadTiempoClasificacion

contieneDatosPersonales
contieneDatosMenores
finalidadRecoleccion
autorizacionTratamiento

estado

creadoEn
actualizadoEn
creadoPorId
actualizadoPorId
```

---

# 40. TipoActivo

```text
TipoActivo
-------------------------
id
codigo
nombre
descripcion
estado
```

Relación:

```text
TipoActivo 1 ───── N ActivoInformacion
```

---

# 41. MedioConservacion

```text
MedioConservacion
-------------------------
id
codigo
nombre
estado
```

Relación:

```text
MedioConservacion 1 ───── N ActivoInformacion
```

---

# 42. FormatoActivo

```text
FormatoActivo
-------------------------
id
codigo
nombre
estado
```

Relación:

```text
FormatoActivo 1 ───── N ActivoInformacion
```

---

# 43. ClasificacionConfidencialidad

```text
ClasificacionConfidencialidad
-------------------------
id
codigo
nombre
orden
estado
```

Valores iniciales:

```text
PUBLICA
PUBLICA_CLASIFICADA
PUBLICA_RESERVADA
```

Relación:

```text
ClasificacionConfidencialidad 1 ───── N ActivoInformacion
```

---

# 44. NivelIntegridad

```text
NivelIntegridad
-------------------------
id
codigo
nombre
valor
orden
estado
```

Valores iniciales:

```text
BAJA
MEDIA
ALTA
```

---

# 45. NivelDisponibilidad

```text
NivelDisponibilidad
-------------------------
id
codigo
nombre
valor
orden
estado
```

Valores iniciales:

```text
BAJA
MEDIA
ALTA
```

---

# 46. CriticidadActivo

```text
CriticidadActivo
-------------------------
id
codigo
nombre
valor
orden
estado
```

Valores iniciales:

```text
BAJA
MEDIA
ALTA
```

No se implementará todavía una fórmula automática hasta definir la regla institucional.

---

# 47. EstadoPublicacion

```text
EstadoPublicacion
-------------------------
id
codigo
nombre
estado
```

Valores iniciales:

```text
PUBLICADA
NO_PUBLICADA
PUBLICACION_PARCIAL
```

---

# 48. SerieDocumental

```text
SerieDocumental
-------------------------
id
codigo
nombre
estado
```

Relación:

```text
SerieDocumental
        │
        ├── ActivoInformacion[]
        │
        └── SubserieDocumental[]
```

---

# 49. SubserieDocumental

```text
SubserieDocumental
-------------------------
id
serieDocumentalId
codigo
nombre
estado
```

Relación:

```text
SerieDocumental 1 ───── N SubserieDocumental
```

---

# 50. TipoDatoPersonal

```text
TipoDatoPersonal
-------------------------
id
codigo
nombre
descripcion
estado
```

Un activo puede contener varios tipos.

Por tanto:

```text
ActivoInformacion N ───── N TipoDatoPersonal
```

---

# 51. ActivoTipoDatoPersonal

Tabla asociativa:

```text
ActivoTipoDatoPersonal
-------------------------
activoInformacionId
tipoDatoPersonalId
```

Clave compuesta:

```text
activoInformacionId
tipoDatoPersonalId
```

---

# 52. Catálogos institucionales reutilizables

No deberán duplicarse si ya existen en GIGA:

```text
Proceso
Subproceso
Dependencia
Cargo
Usuario
```

Antes de crear modelos nuevos, el agente deberá revisar el proyecto existente.

---

# 53. Catálogos propios del módulo

Inicialmente:

```text
TipoActivo
MedioConservacion
FormatoActivo
ClasificacionConfidencialidad
NivelIntegridad
NivelDisponibilidad
CriticidadActivo
EstadoPublicacion
TipoDatoPersonal
```

Además:

```text
SerieDocumental
SubserieDocumental
```

si todavía no existen institucionalmente.

---

# 54. Valores estructurales simples

Algunos valores suficientemente estables pueden manejarse como opciones estructurales.

Ejemplo:

```text
TipoExcepcion

TOTAL
PARCIAL
```

```text
UnidadTiempoClasificacion

DIAS
MESES
ANIOS
```

Los catálogos institucionales modificables no deberán convertirse innecesariamente en ENUM rígidos.

---

# 55. Relación con Gestión Integral de Riesgos

Este módulo deberá diseñarse desde el inicio para relacionarse con Gestión Integral de Riesgos.

Especialmente:

```text
ActivoInformacion
        │
        ▼
Riesgo
        │
        ▼
Seguridad de la Información
```

Un riesgo de Seguridad de la Información podrá asociarse posteriormente con uno o varios activos.

A su vez, un activo podrá estar relacionado con varios riesgos.

Por tanto:

```text
ActivoInformacion N ───── N Riesgo
```

La implementación deberá utilizar una tabla asociativa.

Conceptualmente:

```text
RiesgoActivoInformacion
-------------------------
riesgoId
activoInformacionId
```

---

# 56. Cambio respecto al modelo inicial de riesgos

Cuando se implemente esta integración, no será necesario guardar únicamente:

```text
activoInformacion: String
```

dentro del análisis de Seguridad de la Información.

La relación correcta será:

```text
AnalisisSeguridadInformacion
        │
        └── ActivoInformacion[]
```

Esto permitirá seleccionar activos reales previamente registrados.

---

# 57. Beneficio de la integración

El sistema podrá conocer automáticamente para un activo:

```text
Nombre
Tipo
Proceso
Dependencia
Propietario
Custodio
Confidencialidad
Integridad
Disponibilidad
Criticidad
Datos personales
```

y utilizar esta información durante el análisis de riesgos.

No será necesario volver a capturar esos datos.

---

# 58. Modelo técnico resumido

```text
Proceso
   │
   │
   └───────┐
           │
Dependencia│
   │       │
   └───────┤
           ▼
    ActivoInformacion
           │
           ├── TipoActivo
           ├── SerieDocumental
           │      └── SubserieDocumental
           ├── Cargo propietario
           ├── Cargo custodio
           ├── MedioConservacion
           ├── FormatoActivo
           ├── ClasificacionConfidencialidad
           ├── NivelIntegridad
           ├── NivelDisponibilidad
           ├── CriticidadActivo
           ├── EstadoPublicacion
           │
           └── TipoDatoPersonal[]
                    │
                    ▼
          ActivoTipoDatoPersonal
```

Integración futura:

```text
ActivoInformacion[]
        │
        ▼
RiesgoActivoInformacion
        │
        ▼
Riesgo
        │
        ▼
AnalisisSeguridadInformacion
```

---

# 59. Separación formulario / matriz

La arquitectura funcional será:

```text
                    ┌── Formulario nuevo
                    │
ActivoInformacion ──┼── Consulta / edición
                    │
                    ├── Matriz consolidada
                    │
                    ├── Dashboard
                    │
                    └── Riesgos asociados
```

No se crearán modelos distintos para cada representación.

---

# 60. Matriz consolidada como proyección

La matriz consolidada podrá obtener información de múltiples relaciones.

Ejemplo conceptual:

```text
ActivoInformacion
JOIN Proceso
JOIN Dependencia
JOIN TipoActivo
JOIN SerieDocumental
JOIN SubserieDocumental
JOIN Cargo propietario
JOIN Cargo custodio
JOIN MedioConservacion
JOIN FormatoActivo
JOIN ClasificacionConfidencialidad
JOIN NivelIntegridad
JOIN NivelDisponibilidad
JOIN CriticidadActivo
JOIN EstadoPublicacion
JOIN TipoDatoPersonal
        ↓
Matriz consolidada
```

La matriz es una **representación de los datos**, no una segunda fuente de información.

---

# 61. Búsqueda de la matriz

La búsqueda general deberá poder localizar activos por campos como:

```text
Identificador
Nombre
Descripción
Proceso
Dependencia
Propietario
Custodio
Tipo
```

---

# 62. Filtros de la matriz

Como mínimo:

```text
Proceso
Subproceso
Dependencia
Tipo
Medio de conservación
Formato
Confidencialidad
Integridad
Disponibilidad
Criticidad
Estado de publicación
Contiene datos personales
Contiene datos de menores
Estado
```

Los filtros deberán poder combinarse.

---

# 63. Paginación

La matriz deberá utilizar paginación del lado servidor cuando la cantidad de activos lo justifique.

Ejemplo:

```text
25
50
100
```

registros por página.

No deberá ser necesario cargar todo el inventario en el navegador para mostrar la primera página.

---

# 64. Ordenamiento

La matriz permitirá ordenar por campos relevantes:

```text
Identificador
Nombre
Proceso
Dependencia
Tipo
Criticidad
Fecha de generación
Fecha de actualización
```

El ordenamiento deberá poder ejecutarse desde el servidor.

---

# 65. Exportación

La exportación deberá utilizar la consulta completa correspondiente a los filtros seleccionados.

No deberá exportar únicamente la página actualmente visible.

Ejemplo:

```text
Filtro:
Proceso = Gestión Turística
Criticidad = ALTA

        ↓

Exportar

        ↓

Todos los registros que cumplen esos filtros
```

---

# 66. Permisos

El módulo deberá integrarse con el sistema de autenticación y autorización existente.

Conceptualmente deberán poder diferenciarse permisos como:

```text
Consultar activos
Crear activos
Editar activos
Inactivar activos
Consultar matriz
Exportar matriz
Administrar catálogos
```

No se implementará un sistema paralelo de autenticación.

---

# 67. Seguridad

Las operaciones de creación y modificación deberán validarse en servidor.

No se utilizarán:

```text
contraseñas compartidas en JavaScript
localStorage como mecanismo de autorización
validaciones exclusivamente del cliente
```

La identidad del usuario deberá provenir de la sesión autenticada de GIGA.

---

# 68. Auditoría

Como mínimo, `ActivoInformacion` deberá conservar:

```text
creadoEn
actualizadoEn
creadoPorId
actualizadoPorId
```

La auditoría detallada podrá integrarse posteriormente con un mecanismo transversal de GIGA.

---

# 69. Estado e inactivación

No se eliminarán normalmente activos que hayan formado parte del inventario.

Se utilizará:

```text
ACTIVO
INACTIVO
```

Un activo inactivo conservará:

```text
historial
clasificación
relaciones
riesgos asociados
```

---

# 70. Validaciones de integridad

Como mínimo:

```text
identificador UNIQUE
cantidad >= 1
```

Además:

```text
subserieDocumental
```

deberá pertenecer a la:

```text
serieDocumental
```

seleccionada.

Si:

```text
contieneDatosPersonales = false
```

no deberán registrarse tipos de datos personales asociados.

---

# 71. Reglas que no deben implementarse todavía

Hasta disponer de definición institucional suficiente, no deberán inventarse:

```text
Fórmula automática de criticidad

Reglas automáticas para determinar confidencialidad

Reglas automáticas para determinar tiempo de clasificación

Clasificaciones automáticas de datos personales
```

El sistema deberá permitir registrar la información existente sin inventar metodología.

---

# 72. No implementar

No deberá trasladarse directamente el comportamiento de una hoja de cálculo.

Evitar:

```text
Una tabla SQL con textos repetidos para todos los catálogos

Fechas seriales de Excel

Campos multivalor separados por comas

Propietarios escritos siempre como texto

Custodios escritos siempre como texto

Tipos de datos personales almacenados como una cadena

Toda la matriz almacenada como JSON

Duplicar la matriz consolidada en otra tabla

Hardcodear todos los catálogos en componentes Svelte
```

---

# 73. Arquitectura propuesta

```text
SvelteKit
   │
   ├── /mipg/activos-informacion
   │
   ├── /mipg/activos-informacion/nuevo
   │
   ├── /mipg/activos-informacion/[id]
   │
   └── /mipg/activos-informacion/matriz
   │
   ▼
src/lib/server/
   │
   └── activos-informacion/
           │
           ├── acceso a datos
           ├── servicios
           ├── validaciones
           └── reglas de negocio
                    │
                    ▼
                  Prisma
                    │
                    ▼
                PostgreSQL
```

La estructura exacta deberá adaptarse a las convenciones que ya existan en el proyecto.

---

# 74. Componentes funcionales sugeridos

El formulario podrá dividirse internamente en componentes como:

```text
UbicacionInstitucional
IdentificacionActivo
GestionDocumental
PropiedadCustodia
ConservacionFormato
ClasificacionSeguridad
PublicacionUbicacion
ClasificacionExcepcion
DatosPersonales
```

La matriz será un componente independiente.

```text
MatrizActivosInformacion
```

No es obligatorio utilizar exactamente estos nombres; deberán respetarse las convenciones existentes del proyecto.

---

# 75. Flujo técnico de creación

```text
Usuario
   ↓
Formulario
   ↓
Validación cliente
   ↓
SvelteKit servidor
   ↓
Validación de negocio
   ↓
Prisma
   ↓
PostgreSQL
   ↓
Activo creado
   ↓
Matriz consolidada actualizada
```

No será necesario actualizar manualmente una segunda matriz.

---

# 76. Flujo técnico de edición

```text
Matriz consolidada
        ↓
Seleccionar activo
        ↓
Formulario
        ↓
Editar
        ↓
Validación
        ↓
Actualizar ActivoInformacion
        ↓
Matriz refleja automáticamente el cambio
```

---

# 77. Relación con la matriz de riesgos

Cuando se implemente Gestión Integral de Riesgos:

```text
Nuevo riesgo
    ↓
Tipología:
Seguridad de la Información
    ↓
Seleccionar activo(s)
    ↓
Buscar inventario
    ↓
ActivoInformacion[]
    ↓
Amenazas
Vulnerabilidades
Causas
Valoración
Controles
```

El inventario de activos se convierte así en una fuente institucional para el análisis de riesgos.

---

# 78. Entidades iniciales

El modelo técnico deberá considerar:

```text
ActivoInformacion

TipoActivo
MedioConservacion
FormatoActivo

ClasificacionConfidencialidad
NivelIntegridad
NivelDisponibilidad
CriticidadActivo

EstadoPublicacion

SerieDocumental
SubserieDocumental

TipoDatoPersonal
ActivoTipoDatoPersonal
```

Reutilizando, cuando ya existan:

```text
Proceso
Subproceso
Dependencia
Cargo
Usuario
```

Posteriormente:

```text
RiesgoActivoInformacion
```

para integrar el módulo de riesgos.

---

# 79. Principio de diseño

La entidad principal seguirá siendo:

```text
ActivoInformacion
```

No se crearán entidades independientes como:

```text
ActivoSoftware
ActivoServicio
ActivoDocumento
ActivoBaseDatos
```

salvo que en el futuro exista una necesidad funcional real que lo justifique.

El tipo del activo determinará su clasificación, pero no generará una jerarquía artificial de entidades.

---

# 80. Resultado esperado

El módulo deberá proporcionar tres capacidades principales:

```text
                 Activos de Información
                         │
          ┌──────────────┼──────────────┐
          ▼              ▼              ▼
      Formulario       Matriz        Integración
      de captura    consolidada     con Riesgos
```

El formulario será optimizado para capturar información.

La matriz consolidada será optimizada para revisar, filtrar y exportar el inventario completo.

La integración con riesgos permitirá reutilizar los activos registrados en el análisis de Seguridad de la Información.

---

# 81. Orden de implementación

La implementación recomendada será:

```text
1. Revisar modelos institucionales existentes
        ↓
2. Crear/adaptar modelo Prisma
        ↓
3. Crear migración PostgreSQL
        ↓
4. Crear catálogos iniciales
        ↓
5. Implementar servicios del servidor
        ↓
6. Implementar formulario de activos
        ↓
7. Implementar consulta y edición
        ↓
8. Implementar matriz consolidada
        ↓
9. Implementar filtros y búsqueda
        ↓
10. Implementar exportación
        ↓
11. Integrar posteriormente con Riesgos
```

---

# 82. Criterio final

La matriz institucional seguirá existiendo visual y funcionalmente, pero dejará de ser el mecanismo principal de captura.

La arquitectura será:

```text
FORMULARIO
    ↓
DATOS NORMALIZADOS
    ↓
POSTGRESQL
    ↓
┌───────────────────────┐
│                       │
▼                       ▼
MATRIZ CONSOLIDADA    RIESGOS
│                       │
▼                       ▼
Consulta / reporte    Seguridad de la Información
```

De esta forma GIGA conserva la matriz institucional requerida, pero obtiene una estructura de datos reutilizable, trazable y preparada para los demás módulos.