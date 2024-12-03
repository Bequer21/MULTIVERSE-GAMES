# MULTIVERSE GAMES - Proyecto con Docker Compose

Este proyecto configura un entorno de desarrollo que incluye servicios para el backend, frontend y una base de datos PostgreSQL, todo gestionado con Docker-compose.yml.  

Sigue estos pasos para ejecutar la los contenedores de docker en tu máquina local.

### 1. Clonar el repositorio

Primero, clona el repositorio en tu máquina local usando `git`:

```bash
git clone https://github.com/Bequer21/MULTIVERSE-GAMES.git
cd MULTIVERSE-GAMES
```

### 2. Instalar dependencias

Este proyecto está basado en Node.js. Antes de ejecutarlo, necesitas instalar todas las dependencias requeridas. Ejecuta el siguiente comando para instalar las dependencias utilizando npm:

```bash
npm install
```

### 3. Configurar variables de entorno

Crea un archivo .env en la raíz del proyecto y agrega las variables de entorno necesarias, como la conexión a la base de datos PostgreSQL. Cómo debería estar confeccionado para su funcionamiento:

```env
BACKEND_PORT=5000
FRONTEND_PORT=3000

POSTGRES_DB=db

DB_HOST=db
DB_USER=admin
DB_PASSWORD=admin123
DB_NAME=db
DB_PORT=5432

BASIC_AUTH_USER=admin
BASIC_AUTH_PASSWORD=admin123
```
Nota: los puertos son casi los mismos, así que no varían. Lo que sí contemplar las credenciales de la BD. El BASIC_AUTH_USER y el BASIC_AUTH_PASS pueden conservarse como prueba.

### 4. Construir y levantar los contenedores
   En la raíz del proyecto, ejecuta el siguiente comando:
   ```bash
   docker-compose up --build
```

### 5. Listo, el backend se levantó en el puerto 5000:5000, el frontend en el puerto 3000:3000, y la base de datos en el puerto 5432:5432