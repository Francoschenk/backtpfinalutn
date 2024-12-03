VOYAGEVISTA

La idea de este proyecto fue hacerle un back end a una pagina web que aún no la tenía. La aplicación utiliza React en el frontend y Node.js con Express en el backend. Ofrece funcionalidades CRUD (Crear, Leer, Actualizar y Eliminar) para gestionar reseñas y usuarios, almacenando los datos en una base de datos MongoDB. En cuanto a particularidad, en la sección buscador de lugares se utiliza una API externa para conseguir los datos, y el front end del mismo son anteriores al desarrollo del back end, y como eran a modos de aprendizaje no tienen el soporte requerido. De igual manera, en la sección lugares recomendados nos centramos en el front ya que era a modo de práctica pasada. 

TECNOLOGÍAS DEL PROYECTO

Frontend: React, CSS
Backend: Node.js, Express, bcrypt
Base de Datos: MongoDB, Mongoose

ESTRUCTURA DEL PROYECTO 

Backend: Código fuente en el directorio src/
Frontend: Código fuente en el directorio src/

INSTALACIÓN

Backend

1) Instala las dependencias del proyecto. npm install

2) Configura las variables de entorno. PORT a elección del lector.
Crea un archivo .env en el directorio backend/ y agrega la siguiente línea:

MONGODB_URI=mongodb+srv://schenkschenk:schenkschenk1@voyage.m2xsl.mongodb.net/voyage?retryWrites=true&w=majority
SESSION_SECRET=60101d2445307dfde5fa5bab634fb6ca713f495a53b5936b7d4c18f7a571e13

3) Inicia el servidor del backend. npm start
 
Front End

1) Entrar. cd front
   
2) Instalar dependencias. npm i
 
3) Inicializar el front. npm run dev 

FUNCIONALIDADES CON BACK END 

Reseñas:

Crear una nueva reseña.
Listar todas las reseñas disponibles.
Eliminar una reseña.

Usuarios:

Registrar nuevos usuarios.
Iniciar sesión de usuarios existentes.
Cerrar sesión.

ENDPOINTS DEL API

Reseñas

POST /api/review - Crea una nueva reseña.
GET /api/review - Obtiene todas las reseñas.
DELETE /api/review/:id - Elimina una reseña por ID.

Usuarios

POST /api/users/register - Registra un nuevo usuario.
POST /api/users/login - Inicia sesión con un usuario existente.
GET /api/users/logout - Cierra la sesión del usuario.
