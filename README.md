# SERVICIO MULTIVERSE-GAMES
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
BACKEND_PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_NAME=nombre_db
BASIC_AUTH_USER=admin
BASIC_AUTH_PASSWORD=admin123
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
# 1) API Jugadores
## Descripción
La API de Jugadores permite gestionar información sobre los jugadores de un sistema. Esta API cuenta con funcionalidades para agregar, ver, modificar y eliminar jugadores, y está protegida mediante autenticación básica. Los jugadores están almacenados en una base de datos PostgreSQL.

## Funcionalidades
1. **Ver todos los jugadores**
2. **Ver jugador por ID**
3. **Agregar jugador**
4. **Modificar jugador**
5. **Eliminar jugador**

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
```

# 2) API Campeones
## Descripción
La API de Campeones permite gestionar información sobre los campeones del sistema. Esta API incluye funcionalidades para agregar, ver, modificar y eliminar campeones, y está protegida mediante autenticación básica. Los campeones están almacenados en una base de datos PostgreSQL y tienen un campo de imagen que se almacena en una carpeta específica del servidor.

## Funcionalidades
1. **Ver todos los campeones**
2. **Ver campeón por ID**
3. **Agregar campeón**
4. **Modificar campeón**
5. **Eliminar campeón**

## Endpoints
### 1. Ver todos los campeones

- **Método:** GET
- **URL:** /campeones
- **Descripción:** Obtiene una lista de todos los campeones.
- **Respuesta exitosa (200):**  
     ```json
  [
      {
          "id_campeon": 1,
          "nombre": "Ahri",
          "rol": "Mago",
          "imagen": "/img/campeones/1_Ahri.jpg",
          "historia": "Una zorra mágica que busca su humanidad.",
          "dificultad": "Media",
          "fecha_creacion": "2024-12-01T03:00:00.000Z",
          "habilidad": {
              "id": 1,
              "nombre": "Orbe del Engaño",
              "fuerza": 80,
              "descripcion": "Lanza un orbe mágico que regresa al lanzador, infligiendo daño en el camino.",
              "tiempo_enfriamiento": {
                  "seconds": 7
              },
              "consumo_mana": 65
          }
      },
      ...
  ]

    ```

- **Errores comunes:**
  - **401 Unauthorized:** No se ha proporcionado una autenticación válida.
- **Ejemplo de petición con `curl`:**
```bash
curl -u admin:admin123 -X GET http://localhost:5000/campeones/
```

### 2. Ver Campeón por ID

- **Método:** `GET`
- **URL:** `/campeones/{id}`
- **Descripción:** Obtiene la información de un campeón específico mediante su ID.
- **Parámetros de la URL:**
  - `id`: El ID único del campeón que se quiere consultar (por ejemplo, `1`).

- **Respuesta exitosa (200):**
    ```json
  {
    "id_campeon": 1,
    "nombre": "Garen",
    "rol": "Luchador",
    "imagen": "/uploads/images/garen.png",
    "historia": "Garen es un campeón...",
    "dificultad": "Media",
    "fecha_creacion": "2024-01-01T12:00:00.000Z",
    "habilidad": {
              "id": 1,
              "nombre": "Orbe del Engaño",
              "fuerza": 80,
              "descripcion": "Lanza un orbe mágico que regresa al lanzador, infligiendo daño en el camino.",
              "tiempo_enfriamiento": {
                  "seconds": 7
              },
              "consumo_mana": 65
    }
  }

    ```

- **Errores comunes:**
  - **404 Not Found:** El campeón con el `id` proporcionado no existe.
  - **401 Unauthorized:** No se ha proporcionado una autenticación válida.

- **Ejemplo de petición con `curl`:**
```bash
curl -u admin:admin123 -X GET http://localhost:5000/campeones/1
```

### 3. Agregar Campeón

- **Método:** `POST`
- **URL:** `/campeones`
- **Descripción:** Agrega un nuevo campeón al sistema. Esta solicitud debe incluir los datos del campeón y la imagen en formato multipart/form-data.
- **Cuerpo de la solicitud:**
    ```json
  {
    "nombre": "Yasuo",
    "habilidad": 1,
    "rol": "Espadachín",
    "imagen": "garen.png",
    "historia": "Yasuo es un campeón...",
    "dificultad": "Alta"
  }
    ```

- **Respuesta exitosa (201):**
    ```json
  {
    "id_campeon": 3,
    "nombre": "Yasuo",
    "habilidad": 1,
    "rol": "Espadachín",
    "imagen": "/uploads/images/yasuo.png",
    "historia": "Yasuo es un campeón...",
    "dificultad": "Alta",
    "fecha_creacion": "2024-01-01T12:00:00.000Z"
  }
    ```

- **Errores comunes:**
  - **400 Bad Request:** Los datos enviados no cumplen con el formato esperado o faltan campos requeridos.
  - **401 Unauthorized:** No se ha proporcionado una autenticación válida.
- **Ejemplo de petición con `curl`:**
```bash
curl -u admin:admin123 -X POST http://localhost:5000/campeones \
  -F "nombre=Yasuo" \
  -F "habilidad=Steel Tempest" \
  -F "rol=Espadachín" \
  -F "historia=Yasuo es un campeón..." \
  -F "dificultad=Alta" \
  -F "imagen=@/ruta/a/la/imagen/yasuo.png"

```
### 4. Modificar Campeón

- **Método:** `PUT`
- **URL:** `/campeones/{id}`
- **Descripción:** Modifica la información de un campeón existente mediante su ID.
- **Parámetros de la URL:**
  - `id`: El ID único del campeón que se desea modificar.

- **Cuerpo de la solicitud:**
    ```json
  {
    "nombre": "Yasuo Modificado",
    "habilidad": 2,
    "rol": "Espadachín",
    "imagen": "yasuo-modificado.png",
    "historia": "Yasuo ahora tiene una nueva habilidad...",
    "dificultad": "Alta"
  }
    ```

- **Respuesta exitosa (200):**
    ```json
  {
    "id_campeon": 3,
    "nombre": "Yasuo Modificado",
    "habilidad": 2,
    "rol": "Espadachín",
    "imagen": "/uploads/images/yasuo-modificado.png",
    "historia": "Yasuo ahora tiene una nueva habilidad...",
    "dificultad": "Alta",
    "fecha_creacion": "2024-01-01T12:00:00.000Z"
  }

    ```

- **Errores comunes:**
  - **400 Bad Request:** Los datos enviados no cumplen con el formato esperado o faltan campos requeridos.
  - **404 Not Found:** El campeón con el `id` proporcionado no existe.
  - **401 Unauthorized:** No se ha proporcionado una autenticación válida.

- **Ejemplo de petición con `curl`:**
```bash
curl -u admin:admin123 -X PUT http://localhost:5000/campeones/1 \
  -F "nombre=Yasuo Modificado" \
  -F "habilidad=2" \
  -F "rol=Espadachín" \
  -F "historia=Yasuo tiene una nueva habilidad..." \
  -F "dificultad=Alta" \
  -F "imagen=@/ruta/a/la/nueva_imagen/yasuo-modificado.png"
```

### 5. Eliminar Campeón

- **Método:** `DELETE`
- **URL:** `/campeones/{id}`
- **Descripción:** Elimina un campeón del sistema mediante su ID.
- **Parámetros de la URL:**
  - `id`: El ID único del campeón que se desea eliminar.

- **Respuesta exitosa (200):**
    ```json
    {
      "message": "Campeón eliminado exitosamente"
    }
    ```

- **Errores comunes:**
  - **404 Not Found:** El Campeón con el `id` proporcionado no existe.
  - **401 Unauthorized:** No se ha proporcionado una autenticación válida.

- **Ejemplo de petición con `curl`:**
```bash
curl -u admin:admin123 -X DELETE http://localhost:5000/campeones/1
```

# 3) API Habilidades
## Descripción
La API Habilidades permite gestionar las habilidades de los campeones en el sistema. Cada habilidad cuenta con un identificador único y características como fuerza, descripción, tiempo de enfriamiento y consumo de maná.

## Funcionalidades
1. **Ver todas las habilidades**
2. **Ver habilidad por ID**
3. **Agregar habilidad**
4. **Modificar habilidad**
5. **Eliminar habilidad**

## Endpoints
### 1. Ver todas habilidades

- **Método:** GET
- **URL:** /habilidades
- **Descripción:** Obtiene una lista de todas las habilidades.
- **Respuesta exitosa (200):**  
     ```json
  [
    {
      "id_habilidad": "1",
      "nombre": "Llamarada",
      "fuerza": "Media",
      "descripción": "Causa daño en un área pequeña.",
      "tiempo_enfriamiento": "5s",
      "consumo_mana": "20"
    },
    {
      "id_habilidad": "2",
      "nombre": "Escudo Arcano",
      "fuerza": "Alta",
      "descripción": "Crea un escudo protector durante 10 segundos.",
      "tiempo_enfriamiento": "15s",
      "consumo_mana": "40"
    }
  ]

    ```

- **Errores comunes:**
  - **401 Unauthorized:** No se ha proporcionado una autenticación válida.
- **Ejemplo de petición con `curl`:**
```bash
curl -X GET http://localhost:5000/api/habilidades
```

### 2. Ver habilidad por ID

- **Método:** `GET`
- **URL:** `/habilidades/{id}`
- **Descripción:** Obtiene la información de una habilidad específica mediante su ID.
- **Parámetros de la URL:**
  - `id`: El ID único del habilidad que se quiere consultar (por ejemplo, `1`).

- **Respuesta exitosa (200):**
    ```json
  {
    "id_habilidad": "1",
    "nombre": "Llamarada",
    "fuerza": "Media",
    "descripción": "Causa daño en un área pequeña.",
    "tiempo_enfriamiento": "5s",
    "consumo_mana": "20"
  }
    ```

- **Errores comunes:**
  - **404 Not Found:** La habilidad con el `id` proporcionado no existe.
  - **401 Unauthorized:** No se ha proporcionado una autenticación válida.

- **Ejemplo de petición con `curl`:**
```bash
curl -X GET http://localhost:5000/api/habilidades/1
```

### 3. Agregar habilidad

- **Método:** `POST`
- **URL:** `/habilidades`
- **Descripción:** Agrega una nueva habilidad al sistema.
- **Cuerpo de la solicitud:**
    ```json
  {
    "nombre": "Tormenta de Hielo",
    "fuerza": "Alta",
    "descripción": "Congela enemigos en un área grande.",
    "tiempo_enfriamiento": "30s",
    "consumo_mana": "50"
  }

    ```

- **Respuesta exitosa (201):**
    ```json
  {
    "id_habilidad": "3",
    "nombre": "Tormenta de Hielo",
    "fuerza": "Alta",
    "descripción": "Congela enemigos en un área grande.",
    "tiempo_enfriamiento": "30s",
    "consumo_mana": "50"
  }
    ```

- **Errores comunes:**
  - **400 Bad Request:** Los datos enviados no cumplen con el formato esperado o faltan campos requeridos.
  - **401 Unauthorized:** No se ha proporcionado una autenticación válida.
- **Ejemplo de petición con `curl`:**
```bash
  curl -X POST http://localhost:5000/api/habilidades \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Tormenta de Hielo",
    "fuerza": "Alta",
    "descripción": "Congela enemigos en un área grande.",
    "tiempo_enfriamiento": "30s",
    "consumo_mana": "50"
  }'

```
### 4. Modificar habilidad

- **Método:** `PUT`
- **URL:** `/habilidades/{id}`
- **Descripción:** Modifica la información de una habilidad existente mediante su ID.
- **Parámetros de la URL:**
  - `id`: El ID único del habilidad que se desea modificar.

- **Cuerpo de la solicitud:**
    ```json
  {
    "nombre": "Tormenta de Hielo Avanzada",
    "fuerza": "Muy Alta",
    "descripción": "Congela enemigos en un área más grande.",
    "tiempo_enfriamiento": "40s",
    "consumo_mana": "70"
  }

    ```

- **Respuesta exitosa (200):**
    ```json
  {
    "id_habilidad": "3",
    "nombre": "Tormenta de Hielo Avanzada",
    "fuerza": "Muy Alta",
    "descripción": "Congela enemigos en un área más grande.",
    "tiempo_enfriamiento": "40s",
    "consumo_mana": "70"
  }
    ```

- **Errores comunes:**
  - **400 Bad Request:** Los datos enviados no cumplen con el formato esperado o faltan campos requeridos.
  - **404 Not Found:** La habilidad con el `id` proporcionado no existe.
  - **401 Unauthorized:** No se ha proporcionado una autenticación válida.

- **Ejemplo de petición con `curl`:**
```bash
curl -X PUT http://localhost:5000/api/habilidades/3 \
-H "Content-Type: application/json" \
-d '{
  "nombre": "Tormenta de Hielo Avanzada",
  "fuerza": "Muy Alta",
  "descripción": "Congela enemigos en un área más grande.",
  "tiempo_enfriamiento": "40s",
  "consumo_mana": "70"
}'

```

### 5. Eliminar Habilidad

- **Método:** `DELETE`
- **URL:** `/habilidades/{id}`
- **Descripción:** Elimina una habilidad del sistema mediante su ID.
- **Parámetros de la URL:**
  - `id`: El ID único de la habilidad que se desea eliminar.

- **Respuesta exitosa (200):**
    ```json
    {
      "message": "Habilidad eliminada exitosamente"
    }
    ```

- **Errores comunes:**
  - **404 Not Found:** La habilidad con el `id` proporcionado no existe.
  - **401 Unauthorized:** No se ha proporcionado una autenticación válida.

- **Ejemplo de petición con `curl`:**
```bash
curl -X DELETE http://localhost:5000/api/habilidades/3
```

# 3) API Equipos
## Descripción
La API Habilidades permite gestionar las habilidades de los campeones en el sistema. Cada habilidad cuenta con un identificador único y características como fuerza, descripción, tiempo de enfriamiento y consumo de maná.

## Funcionalidades
1. **Ver todas los equipos**
2. **Ver equipo por ID**
3. **Agregar equipo**
4. **Modificar equipo**
5. **Eliminar equipo**

## Endpoints
### 1. Ver todos los equipos

- **Método:** GET
- **URL:** /equipos
- **Descripción:** Obtiene una lista de todos los equipos.
- **Respuesta exitosa (200):**  
     ```json
[
    {
        "id_equipo": 2,
        "nombre": "Equipo Invencible",
        "victorias": 10,
        "jugadores": [
            {
                "id_jugador": 5,
                "nombre": "Jugador2",
                "contrasena": "password2",
                "email": "jugador2@example.com",
                "fecha_creacion": "2024-01-02T16:00:00.000Z",
                "nivel": 12,
                "estado": "Activo",
                "pais": "Chile",
                "servidor": "LAS"
            },
            {
                "id_jugador": 6,
                "nombre": "Jugador3",
                "contrasena": "password3",
                "email": "jugador3@example.com",
                "fecha_creacion": "2024-01-03T17:00:00.000Z",
                "nivel": 7,
                "estado": "Inactivo",
                "pais": "Brasil",
                "servidor": "NA"
            },
            {
                "id_jugador": 7,
                "nombre": "Jugador4",
                "contrasena": "password4",
                "email": "jugador4@example.com",
                "fecha_creacion": "2024-01-04T18:00:00.000Z",
                "nivel": 20,
                "estado": "Activo",
                "pais": "México",
                "servidor": "LAN"
            },
            {
                "id_jugador": 8,
                "nombre": "Jugador5",
                "contrasena": "password5",
                "email": "jugador5@example.com",
                "fecha_creacion": "2024-01-05T19:00:00.000Z",
                "nivel": 15,
                "estado": "Activo",
                "pais": "Colombia",
                "servidor": "LAS"
            },
            {
                "id_jugador": 9,
                "nombre": "Jugador6",
                "contrasena": "password6",
                "email": "jugador6@example.com",
                "fecha_creacion": "2024-01-06T20:00:00.000Z",
                "nivel": 22,
                "estado": "Inactivo",
                "pais": "Perú",
                "servidor": "EUW"
            }
        ],
        "campeones": [
            {
                "id_campeon": 1,
                "nombre": "Ahri",
                "rol": "Mago",
                "imagen": "/img/campeones/1_Ahri.jpg",
                "historia": "Una zorra mágica que busca su humanidad.",
                "dificultad": "Media",
                "fecha_creacion": "2024-12-01T03:00:00.000Z",
                "habilidad": 1
            },
            {
                "id_campeon": 2,
                "nombre": "Darius",
                "rol": "Luchador",
                "imagen": "/img/campeones/2_Darius.jpg",
                "historia": "Un guerrero imparable que busca la gloria.",
                "dificultad": "Alta",
                "fecha_creacion": "2024-12-01T03:00:00.000Z",
                "habilidad": 2
            },
            {
                "id_campeon": 3,
                "nombre": "Ivern",
                "rol": "Soporte",
                "imagen": "/img/campeones/3_Ivern.jpg",
                "historia": "Un ser que se comunica con la naturaleza y sus árboles.",
                "dificultad": "Baja",
                "fecha_creacion": "2024-12-01T03:00:00.000Z",
                "habilidad": 3
            },
            {
                "id_campeon": 4,
                "nombre": "Miss Fortune",
                "rol": "Tirador",
                "imagen": "/img/campeones/4_MissFortune.jpg",
                "historia": "Una tiradora que busca venganza tras la muerte de su familia.",
                "dificultad": "Media",
                "fecha_creacion": "2024-12-01T03:00:00.000Z",
                "habilidad": 4
            },
            {
                "id_campeon": 5,
                "nombre": "Kennen",
                "rol": "Mago",
                "imagen": "/img/campeones/5_Kennen.jpg",
                "historia": "Un ninja eléctrico con la habilidad de controlar tormentas.",
                "dificultad": "Alta",
                "fecha_creacion": "2024-12-01T03:00:00.000Z",
                "habilidad": 5
            }
        ]
    }
]

    ```

- **Errores comunes:**
  - **401 Unauthorized:** No se ha proporcionado una autenticación válida.
- **Ejemplo de petición con `curl`:**
```bash
curl -X GET http://localhost:5000/api/habilidades
```

### 2. Ver habilidad por ID

- **Método:** `GET`
- **URL:** `/habilidades/{id}`
- **Descripción:** Obtiene la información de una habilidad específica mediante su ID.
- **Parámetros de la URL:**
  - `id`: El ID único del habilidad que se quiere consultar (por ejemplo, `1`).

- **Respuesta exitosa (200):**
    ```json
  {
    "id_habilidad": "1",
    "nombre": "Llamarada",
    "fuerza": "Media",
    "descripción": "Causa daño en un área pequeña.",
    "tiempo_enfriamiento": "5s",
    "consumo_mana": "20"
  }
    ```

- **Errores comunes:**
  - **404 Not Found:** La habilidad con el `id` proporcionado no existe.
  - **401 Unauthorized:** No se ha proporcionado una autenticación válida.

- **Ejemplo de petición con `curl`:**
```bash
curl -X GET http://localhost:5000/api/habilidades/1
```

### 3. Agregar habilidad

- **Método:** `POST`
- **URL:** `/habilidades`
- **Descripción:** Agrega una nueva habilidad al sistema.
- **Cuerpo de la solicitud:**
    ```json
  {
    "nombre": "Tormenta de Hielo",
    "fuerza": "Alta",
    "descripción": "Congela enemigos en un área grande.",
    "tiempo_enfriamiento": "30s",
    "consumo_mana": "50"
  }

    ```

- **Respuesta exitosa (201):**
    ```json
  {
    "id_habilidad": "3",
    "nombre": "Tormenta de Hielo",
    "fuerza": "Alta",
    "descripción": "Congela enemigos en un área grande.",
    "tiempo_enfriamiento": "30s",
    "consumo_mana": "50"
  }
    ```

- **Errores comunes:**
  - **400 Bad Request:** Los datos enviados no cumplen con el formato esperado o faltan campos requeridos.
  - **401 Unauthorized:** No se ha proporcionado una autenticación válida.
- **Ejemplo de petición con `curl`:**
```bash
  curl -X POST http://localhost:5000/api/habilidades \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Tormenta de Hielo",
    "fuerza": "Alta",
    "descripción": "Congela enemigos en un área grande.",
    "tiempo_enfriamiento": "30s",
    "consumo_mana": "50"
  }'

```
### 4. Modificar habilidad

- **Método:** `PUT`
- **URL:** `/habilidades/{id}`
- **Descripción:** Modifica la información de una habilidad existente mediante su ID.
- **Parámetros de la URL:**
  - `id`: El ID único del habilidad que se desea modificar.

- **Cuerpo de la solicitud:**
    ```json
  {
    "nombre": "Tormenta de Hielo Avanzada",
    "fuerza": "Muy Alta",
    "descripción": "Congela enemigos en un área más grande.",
    "tiempo_enfriamiento": "40s",
    "consumo_mana": "70"
  }

    ```

- **Respuesta exitosa (200):**
    ```json
  {
    "id_habilidad": "3",
    "nombre": "Tormenta de Hielo Avanzada",
    "fuerza": "Muy Alta",
    "descripción": "Congela enemigos en un área más grande.",
    "tiempo_enfriamiento": "40s",
    "consumo_mana": "70"
  }
    ```

- **Errores comunes:**
  - **400 Bad Request:** Los datos enviados no cumplen con el formato esperado o faltan campos requeridos.
  - **404 Not Found:** La habilidad con el `id` proporcionado no existe.
  - **401 Unauthorized:** No se ha proporcionado una autenticación válida.

- **Ejemplo de petición con `curl`:**
```bash
curl -X PUT http://localhost:5000/api/habilidades/3 \
-H "Content-Type: application/json" \
-d '{
  "nombre": "Tormenta de Hielo Avanzada",
  "fuerza": "Muy Alta",
  "descripción": "Congela enemigos en un área más grande.",
  "tiempo_enfriamiento": "40s",
  "consumo_mana": "70"
}'

```

### 5. Eliminar Habilidad

- **Método:** `DELETE`
- **URL:** `/habilidades/{id}`
- **Descripción:** Elimina una habilidad del sistema mediante su ID.
- **Parámetros de la URL:**
  - `id`: El ID único de la habilidad que se desea eliminar.

- **Respuesta exitosa (200):**
    ```json
    {
      "message": "Habilidad eliminada exitosamente"
    }
    ```

- **Errores comunes:**
  - **404 Not Found:** La habilidad con el `id` proporcionado no existe.
  - **401 Unauthorized:** No se ha proporcionado una autenticación válida.

- **Ejemplo de petición con `curl`:**
```bash
curl -X DELETE http://localhost:5000/api/habilidades/3
```