# SERVICIO MULTIVERSE-GAMES
# 1) API Jugadores
## Descripción
La API de Jugadores permite gestionar información sobre los jugadores de un sistema. Esta API cuenta con funcionalidades para agregar, ver, modificar y eliminar jugadores, y está protegida mediante autenticación básica. Los jugadores están almacenados en una base de datos PostgreSQL.

## Funcionalidades
1. **Ver todos los jugadores**
2. **Ver jugador por ID**
3. **Agregar jugador**
4. **Modificar jugador**
5. **Eliminar jugador**

## ¿Cómo ejecutar el proyecto?

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
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_NAME=jugadores_db
BASIC_AUTH_USER=admin
BASIC_AUTH_PASS=admin123
```
Nota: los puertos son casi los mismos, así que no varían. Lo que sí contemplar las credenciales de la BD. El BASIC_AUTH_USER y el BASIC_AUTH_PASS pueden conservarse como prueba.

### 4. Iniciar el servidor
Para iniciar el servidor, ejecuta el siguiente comando:

```bash
npm start
```

### 5. Probar los endpoints
Con esta preconfiguración ya se puede probar con diferentes endpoints de la API utilizando los métodos HTTP correspondientes (GET, POST, PUT, DELETE) junto con la autenticación básica configurada en el archivo .env (usuario: admin, contraseña: admin123).

Por ejemplo, para ver todos los jugadores:
```bash
curl -u admin:admin123 -X GET http://localhost:3000/jugadores
```

## Endpoints
### 1. Ver todos los jugadores

- **Método:** GET
- **URL:** /jugadores
- **Descripción:** Obtiene una lista de todos los jugadores.
- **Respuesta exitosa (200):**  
     ```json
    [
      {
        "id_jugador": 1,
        "nombre": "Mario Schieder",
        "email": "mariiotomas16@hotmail.com",
        "fecha_creacion": "2024-01-01T12:00:00.000Z",
        "nivel": 5,
        "estado": "activo",
        "pais": "Argentina",
        "servidor": "LAS"
      },{
        "id_jugador": 2,
        "nombre": "Bequer",
        "email": "Bequer@gmail.com",
        "fecha_creacion": "2024-01-01T12:00:00.000Z",
        "nivel": 5,
        "estado": "activo",
        "pais": "Argentina",
        "servidor": "LAS"
     }
    ]
    ```

- **Errores comunes:**
  - **401 Unauthorized:** No se ha proporcionado una autenticación válida.
- **Ejemplo de petición con `curl`:**
```bash
curl -u admin:admin123 -X GET http://localhost:3000/jugadores/
```

### 2. Ver jugador por ID

- **Método:** `GET`
- **URL:** `/jugadores/{id}`
- **Descripción:** Obtiene la información de un jugador específico mediante su ID.
- **Parámetros de la URL:**
  - `id`: El ID único del jugador que se quiere consultar (por ejemplo, `1`).

- **Respuesta exitosa (200):**
    ```json
    {
      "id_jugador": 1,
      "nombre": "Mario Schieder",
      "email": "mariiotomas16@hotmail.com",
      "fecha_creacion": "2024-01-01T12:00:00.000Z",
      "nivel": 5,
      "estado": "activo",
      "pais": "Argentina",
      "servidor": "LAS"
    }
    ```

- **Errores comunes:**
  - **404 Not Found:** El jugador con el `id` proporcionado no existe.
  - **401 Unauthorized:** No se ha proporcionado una autenticación válida.

- **Ejemplo de petición con `curl`:**
```bash
curl -u admin:admin123 -X GET http://localhost:3000/jugadores/1
```

### 3. Agregar jugador

- **Método:** `POST`
- **URL:** `/jugadores`
- **Descripción:** Agrega un nuevo jugador al sistema.
- **Cuerpo de la solicitud:**
    ```json
    {
      "nombre": "Nuevo Jugador",
      "contrasena": "password123",
      "email": "nuevojugador@example.com",
      "nivel": 1,
      "estado": "activo",
      "pais": "Argentina",
      "servidor": "LAS"
    }
    ```

- **Respuesta exitosa (201):**
    ```json
    {
      "id_jugador": 3,
      "nombre": "Nuevo Jugador",
      "email": "nuevojugador@example.com",
      "fecha_creacion": "2024-01-01T12:00:00.000Z",
      "nivel": 1,
      "estado": "activo",
      "pais": "Argentina",
      "servidor": "LAS"
    }
    ```

- **Errores comunes:**
  - **400 Bad Request:** Los datos enviados no cumplen con el formato esperado o faltan campos requeridos.
  - **401 Unauthorized:** No se ha proporcionado una autenticación válida.
- **Ejemplo de petición con `curl`:**
```bash
curl -u admin:admin123 -X POST http://localhost:3000/jugadores \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Nuevo Jugador",
    "contrasena": "password123",
    "email": "nuevojugador@example.com",
    "nivel": 1,
    "estado": "activo",
    "pais": "Argentina",
    "servidor": "LAS"
  }'```
```
### 4. Modificar jugador

- **Método:** `PUT`
- **URL:** `/jugadores/{id}`
- **Descripción:** Modifica la información de un jugador existente mediante su ID.
- **Parámetros de la URL:**
  - `id`: El ID único del jugador que se desea modificar.

- **Cuerpo de la solicitud:**
    ```json
    {
      "nombre": "Mario Schieder Modificado",
      "contrasena": "newpassword123",
      "email": "mariiotomas16new@example.com",
      "nivel": 6,
      "estado": "activo",
      "pais": "Argentina",
      "servidor": "LAS"
    }
    ```

- **Respuesta exitosa (200):**
    ```json
    {
      "id_jugador": 1,
      "nombre": "Mario Schieder Modificado",
      "email": "mariiotomas16new@example.com",
      "fecha_creacion": "2024-01-01T12:00:00.000Z",
      "nivel": 6,
      "estado": "activo",
      "pais": "Argentina",
      "servidor": "LAS"
    }
    ```

- **Errores comunes:**
  - **400 Bad Request:** Los datos enviados no cumplen con el formato esperado o faltan campos requeridos.
  - **404 Not Found:** El jugador con el `id` proporcionado no existe.
  - **401 Unauthorized:** No se ha proporcionado una autenticación válida.

- **Ejemplo de petición con `curl`:**
```bash
curl -u admin:admin123 -X PUT http://localhost:3000/jugadores/1 \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Mario Schieder Modificado",
    "contrasena": "newpassword123",
    "email": "mariiotomas16new@example.com",
    "nivel": 6,
    "estado": "activo",
    "pais": "Argentina",
    "servidor": "LAS"
  }'
```

### 5. Eliminar jugador

- **Método:** `DELETE`
- **URL:** `/jugadores/{id}`
- **Descripción:** Elimina un jugador del sistema mediante su ID.
- **Parámetros de la URL:**
  - `id`: El ID único del jugador que se desea eliminar.

- **Respuesta exitosa (200):**
    ```json
    {
      "message": "Jugador eliminado exitosamente"
    }
    ```

- **Errores comunes:**
  - **404 Not Found:** El jugador con el `id` proporcionado no existe.
  - **401 Unauthorized:** No se ha proporcionado una autenticación válida.

- **Ejemplo de petición con `curl`:**
```bash
curl -u admin:admin123 -X DELETE http://localhost:3000/jugadores/1
```bash

