# Aplicación de Búsqueda de Noticias

## Descripción

Esta aplicación web permite a los usuarios buscar noticias utilizando la API de NewsAPI.org. Los usuarios pueden registrarse, iniciar sesión y buscar noticias basadas en palabras clave.

## Tecnologías y Librerías

- **Backend**: Node.js, Express
- **Frontend**: Handlebars para plantillas, CSS para estilos
- **Autenticación**: bcrypt para hashing de contraseñas, jsonwebtoken para manejar tokens JWT
- **Base de Datos**: MongoDB con Mongoose para modelado de datos
- **Otras Librerías**: axios para solicitudes HTTP, dotenv para manejo de variables de entorno, cookie-parser para manejo de cookies

## Dependencias de Terceros

- [NewsAPI.org](https://newsapi.org/) 

### .env
NEWS_API_KEY=3d8e94b5e87e44fcb2c3280757a8c4ec
PORT=3000
DB_MONGO="mongodb+srv://anarosaura:iP5H8WMLx6FASh8d@cluster0.ijnrxas.mongodb.net/tarea4?retryWrites=true&w=majority"
JWT_SECRET="secret_key"
