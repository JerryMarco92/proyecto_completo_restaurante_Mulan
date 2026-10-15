Menú Digital — Restaurante Mulan

Aplicación web responsive para consultar la carta del restaurante Mulan, buscar platos y filtrarlos por categorías.

Descripción

El proyecto facilita a los clientes el acceso a la carta del restaurante desde cualquier dispositivo. Combina páginas informativas estáticas con una carta dinámica conectada a una API REST y una base de datos MySQL.

La web permite navegar mediante el teclado utilizando `Tab`, `Shift + Tab` y `Enter`. Los elementos interactivos muestran un indicador visual de foco.

Funcionalidades
Consulta de platos mediante tarjetas.
Búsqueda por nombre o ingredientes.
Filtrado por categorías y paginación.
Páginas de detalle de los platos.
Página estática de menús.
Página de contacto con formulario validado y envío mediante Formspree.
Página de sobre nosotros.
Diseño responsive para móvil y escritorio.
Tecnologías
Frontend: Astro, React, HTML, CSS y JavaScript.
Backend: Node.js y Express.
Base de datos: MySQL.
Formulario: Formspree.
Despliegue: Netlify, Render y Clever Cloud.
Arquitectura
Frontend (Astro + React)
          |
          v
       API REST
  (Node.js + Express)
          |
          v
   MySQL (Clever Cloud)


El frontend obtiene los datos mediante la API, que consulta la base de datos.

Instalación
Requisitos

Node.js, npm y Git.

1. Clonar el repositorio
git clone URL_DEL_REPOSITORIO
cd NOMBRE_DEL_REPOSITORIO

2. Configurar el backend
cd back
npm install


Crear el archivo .env a partir de back/.env.example y completar las variables necesarias para conectar con MySQL.

El archivo back/src/data/sqchema.sql contiene el esquema SQL necesario para crear la estructura de la base de datos.

Iniciar el backend:

npm run dev

3. Configurar el frontend

En otra terminal, desde la raíz del proyecto:

cd frontend
npm install


Crear el archivo .env a partir de frontend/.env.example y configurar la dirección de la API según el entorno.

Iniciar el frontend:

npm run dev


Abrir en el navegador la dirección local que indique Astro en la terminal.

Para ejecutar el proyecto localmente, es necesario disponer de una base de datos MySQL con la estructura y los datos necesarios, y configurar correctamente las variables de entorno.

Despliegue
Aplicación web (frontend): https://menu-digital-mulan.netlify.app/
Backend (API REST): https://menu-digital-back-v2.onrender.com/platos
Hosting del frontend: Netlify.
Hosting del backend: Render.
Base de datos: MySQL alojada en Clever Cloud.
Diseño

Las vistas de escritorio y móvil se encuentran en la carpeta docs/diseño.

Documentación de la API

La documentación de los endpoints, sus parámetros y las respuestas se encuentra en docs/API.md.

Autor

Jerome Camarena