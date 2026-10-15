**Pulsa Ctrl + Shift + V para abrir la vista previa de Markdown.**


Documentación de la API — Menú Digital Mulan

API REST desarrollada con Node.js, Express y MySQL para consultar y gestionar los platos de la carta del restaurante Mulan.

URL base: https://menu-digital-back-v2.onrender.com

1. Endpoints disponibles

| Método | Ruta | Función |
|---|---|---|
| GET | `/platos` | Listar, buscar, filtrar y paginar platos. |
| GET | `/platos/:id` | Consultar el detalle de un plato. |
| POST | `/platos` | Crear un plato. |
| PUT | `/platos/:id` | Actualizar un plato. |
| DELETE | `/platos/:id` | Eliminar un plato. |

2. Listar platos

Método: GET
Ruta: /platos

Devuelve los platos de la carta y permite combinar los siguientes parámetros:

### Parámetros de consulta

| Parámetro | Descripción | Ejemplo |
|---|---|---|
| `buscar` | Busca por nombre, ingredientes o categoría. | `buscar=pollo` |
| `categoria` | Filtra por identificador de categoría. | `categoria=2` |
| `destacados` | Filtra los platos destacados cuando vale `1`. | `destacados=1` |
| `pagina` | Número de página. Por defecto, `1`. | `pagina=2` |
| `limite` | Resultados por página. Por defecto, `9`; máximo, `13`. | `limite=9` |

Los parámetros se pueden combinar.

Ejemplo de petición:

GET /platos?buscar=arroz&categoria=2&pagina=1&limite=9

Respuesta correcta: 200 OK
{
  "platos": [
    {
      "id": 1,
      "nombre": "Rollito Mulan",
      "ingredientes": "ternera, setas, fideos de arroz",
      "precio": "4.00",
      "destacados": 1,
      "categoria_id": 1,
      "imagen": "/FotosPlatos/rollito.webp"
    }
  ],
  "total": 28
}


platos contiene los registros devueltos y total indica el número de resultados contabilizados por la consulta.

Si no se encuentran registros en la página consultada, devuelve una lista vacía.

3. Consultar el detalle de un plato

Método: GET
Ruta: /platos/:id

Obtiene un plato por su identificador e incluye el nombre de la categoría y los alérgenos asociados.

Ejemplo de petición:

GET /platos/28


Respuesta correcta: 200 OK, con el objeto del plato.

Error: 404 Not Found
{
  "error": "Plato no encontrado"
}

4. Crear un plato

Método: POST
Ruta: /platos

Crea un plato mediante los datos enviados en formato JSON.

Ejemplo del cuerpo de la petición
{
  "nombre": "Rollito Mulan",
  "ingredientes": "ternera, setas, fideos de arroz",
  "precio": 4.00,
  "categoria_id": 1,
  "destacados": 1
}

Respuesta correcta: 201 Created
{
  "mensaje": "Plato creado correctamente."
}

Error de validación: 400 Bad Request
{
  "error": "Faltan datos obligatorios."
}

5. Actualizar un plato

Método: PUT
Ruta: /platos/:id

Actualiza los datos de un plato existente. El cuerpo debe incluir los campos obligatorios y puede incluir imagen.

Respuesta correcta: 200 OK
{
  "mensaje": "Plato actualizado correctamente."
}

Errores
400 Bad Request: faltan datos obligatorios.
404 Not Found: el plato no existe.
6. Eliminar un plato

Método: DELETE
Ruta: /platos/:id

Elimina un plato por su identificador.

Respuesta correcta: 200 OK
{
  "mensaje": "Plato eliminado correctamente."
}

Error: 404 Not Found
{
  "error": "Plato no encontrado"
}

7. Errores generales

Las rutas inexistentes responden con 404 Not Found:

{
  "error": "Ruta no encontrada"
}


Los errores gestionados por el middleware centralizado incluyen el código HTTP, un código identificador y un mensaje.

Ejemplo de error interno: 500 Internal Server Error
{
  "status": 500,
  "code": "INTERNAL_SERVER_ERROR",
  "message": "Ha ocurrido un error interno."
}


El código y el mensaje pueden variar según el error producido.

8. Consideraciones técnicas
La API utiliza Node.js, Express y MySQL.
Las consultas SQL utilizan parámetros para los valores recibidos.
La validación de los campos obligatorios se aplica al crear y actualizar platos.
Las rutas de platos no tienen autenticación mediante API key implementada en el código de rutas mostrado.

Nota: los ejemplos muestran la estructura de las respuestas; los datos de los platos son ilustrativos.