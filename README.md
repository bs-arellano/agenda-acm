# Agenda ACM

Agenda ACM es una aplicación que te permite gestionar eventos, categorías y notas de manera sencilla.

## Instalación

1. Clona este repositorio en tu máquina local:

   ```bash
   git clone https://github.com/K0garash1/agenda-acm.git
   ```

2. Ingresa al directorio del proyecto:

   ```bash
   cd agenda-acm
   ```

3. Instala las dependencias del frontend y del backend:

   ```bash
   cd frontend
   npm install
   cd ../backend
   npm install
   ```

4. Asegúrate de tener MongoDB instalado en tu máquina. Puedes descargarlo [aquí](https://www.mongodb.com/try/download/community).

## Configuración

1. En el directorio `backend/configs`, crea un archivo `.env` y configura las variables de entorno necesarias. Por ejemplo:

   ```dotenv
   HOST=127.0.0.1
   PORT=3000
   DB_HOST=127.0.0.1
   DB_PORT=27017
   DB_USER=''
   DB_PSWD=''
   DB_ENCRYPTION_KEY='some32bytesBase64key'
   JWT_SECRET='some64bytesBase64key'
   ```

   Asegúrate de ajustar los valores según tu configuración.

## Despliegue

### Frontend (Cliente)

1. En el directorio `frontend`, ejecuta el siguiente comando para iniciar el servidor de desarrollo:

   ```bash
   npm run dev
   ```

   Esto desplegará la aplicación en [http://localhost:5173](http://localhost:5173).

### Backend (Servidor)

1. En el directorio `backend`, ejecuta el siguiente comando para iniciar el servidor:

   ```bash
   node index.js
   ```

   Asegúrate de que MongoDB esté en ejecución antes de iniciar el servidor.

   El servidor estará disponible en [http://localhost:3000](http://localhost:3000).

¡Listo! Tu aplicación Agenda ACM debería estar en funcionamiento con el frontend en el puerto 5173 y el backend en el puerto 3000.

## Uso

- Accede a [http://localhost:5173](http://localhost:5173) para comenzar a utilizar la aplicación.

## Contribuciones

Siéntete libre de contribuir al proyecto. Abre un problema o una solicitud de extracción para discutir cambios importantes.
