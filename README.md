# MULTIVERSE GAMES - Proyecto con Docker Compose

Este proyecto configura un entorno de desarrollo que incluye servicios para el backend, frontend y una base de datos PostgreSQL, todo gestionado con Docker Compose.  

## Requisitos Previos

Asegúrate de que el archivo `.env` esté en la raíz del proyecto con las siguientes variables configuradas:

```env
POSTGRES_USER=admin
POSTGRES_PASSWORD=admin123
POSTGRES_DB=database
DB_HOST=db
DB_PORT=5432
```

Sigue estos pasos para ejecutar la API de Jugadores en tu máquina local.

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
Esto instalará todas las dependencias del archivo 'package.json'

### 3. Configurar variables de entorno
Crea un archivo .env en la raíz del proyecto y agrega las variables de entorno necesarias, como la conexión a la base de datos PostgreSQL. Un ejemplo de archivo .env puede ser:
```bash
POSTGRES_USER=admin
POSTGRES_PASSWORD=admin123
POSTGRES_DB=database
DB_HOST=db
DB_PORT=5432
```
Nota: los puertos son casi los mismos, así que no varían. Lo que sí contemplar las credenciales de la BD. El BASIC_AUTH_USER y el BASIC_AUTH_PASS pueden conservarse como prueba.

### 4. Construir y levantar los contenedores
   En la raíz del proyecto, ejecuta el siguiente comando:
   ```bash
   docker-compose up --build
```
