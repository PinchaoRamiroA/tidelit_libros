# Tidelit Libros

Aplicación de gestión y visualización de libros con un Backend en Symfony API, un Frontend web desarrollado en Vue 3 y una Aplicación Móvil creada con React Native y Expo.

## Requisitos Previos

Dependiendo de la parte del proyecto que quieras correr, necesitarás:

- **Generales:**
  - [Git](https://git-scm.com/)

- **Backend (Symfony API):**
  - **Recomendado:** [Docker](https://docs.docker.com/get-docker/) y Docker Compose.
  - **Modo Manual:**
    - PHP >= 8.1 (Recomendado 8.3)
    - [Composer](https://getcomposer.org/download/)
    - [PostgreSQL](https://www.postgresql.org/download/)

- **Frontend Web (Vue 3) / Mobile (React Native):**
  - [Node.js](https://nodejs.org/) (Versión 18 o superior recomendada)
  - Gestor de paquetes `npm` (o `yarn` / `pnpm`)
  - [Expo CLI](https://docs.expo.dev/get-started/installation/) (para mobile)

---

## ⚙️ Instrucciones de Instalación (Backend)

1. **Clona el repositorio** y entra en la carpeta principal:
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd tidelit_libros/backend
   ```

2. **Configura el entorno:**
   Copia el archivo de ejemplo para las variables de entorno (si existe) y configura tu base de datos:
   ```bash
   cp .env.example .env
   ```
   > Asegúrate de que `DATABASE_URL` apunte a la base de datos correcta, en el docker-compose.yml se encuentra el servicio de database con las credenciales para conectarse.

3. **Inicia el proyecto usando Docker (Opción más fácil):**
   ```bash
   docker-compose up -d --build
   ```
   Esto levantará tanto la base de datos PostgreSQL como el backend de Symfony.

4. **Instala dependencias y prepara la BD (Si usas el entorno local sin docker):**
   Entra al directorio `api` (`cd api`).
   - ```bash composer install```
   - ```bash php bin/console doctrine:database:create``` (Crea la base de datos si no existe)
   - ```bash php bin/console doctrine:migrations:migrate``` (Ejecuta las migraciones)
   - ```bash php bin/console doctrine:fixtures:load``` (Opcional, carga los datos de prueba, puedes presionar `y` para confirmar).
     > *Si prefieres cargar los datos manualmente con SQL*: `psql -U tu_usuario -d books < seed.sql`

5. **Levanta el servidor local:**
   ```bash
   symfony server:start
   ```
   O usando PHP nativo: `php -S 127.0.0.1:8000 -t public`

---

## 💻 Cómo correr el Frontend Web (Vue)

El frontend web se desarrolló con **Vue 3**. Para ejecutarlo:

1. Ingresa a la carpeta del frontend:
   ```bash
   cd frontend
   ```
2. Instala las dependencias:
   ```bash
   pnpm i
   ```
3. Levanta el servidor de desarrollo:
   ```bash
   pnpm dev
   ```
La aplicación web estará disponible, por lo general, en `http://localhost:5173`.

*(Para modo producción, puedes ejecutar `pnpm run build` y luego servir el dist generado).*

---

## 📱 Cómo correr el Frontend Mobile (React Native / Expo)

La aplicación móvil está construida con **React Native** usando el framework **Expo**, lo que facilita las pruebas en dispositivos físicos o emuladores.

1. Ingresa a la carpeta mobile:
   ```bash
   cd mobile
   ```
2. Instala las dependencias:
   ```bash
   pnpm i
   ```
3. Inicia el servidor de Expo:
   ```bash
   pnpm expo start
   ```
> Se abrirá un menú en la terminal (y en una pestaña de tu navegador) mostrando un **Código QR**. Descarga la app **Expo Go** en tu dispositivo móvil (iOS o Android) y escanea el código para visualizar y probar la aplicación en tu propio dispositivo. Alternativamente, presiona `a` para abrir en un emulador Android o `i` para un simulador iOS (requieren configuración previa).

---

## 🔌 Endpoints de la API

### Listar Libros
- **Endpoint:** `GET /api/books`
- **Descripción:** Obtiene un listado de libros con sus evaluaciones promedio.
- **Ejemplo de Respuesta:**
  ```json
    [
        {
            "id": 4,
            "title": "El Arte de Programar",
            "author": "Donald Knuth",
            "published_year": 1968,
            "average_rating": 4.5
        },
        {
            "id": 6,
            "title": "Refactoring",
            "author": "Martin Fowler",
            "published_year": 1999,
            "average_rating": 4
        }
    ]
  ```

### Crear Reseña (Evaluación)
- **Endpoint:** `POST /api/reviews`
- **Descripción:** Crea una nueva reseña (comentario y calificación) de un libro en particular.
- **Ejemplo de Request:**
  ```json
    {
    "book_id": 4,
    "rating": 5,
    "comment": "Excelente libro"
    }
  ```
- **Ejemplo de Response (201 Created):**
  ```json
    {
        "id": 8,
        "created_at": "2026-03-15 14:24:59"
    }
  ```

### Probando el Endpoint (Curl)
```bash
curl -X GET http://localhost:8000/api/books -H 'Accept: application/json'
```

---

## 🚨 Respuestas esperadas ante Errores de Validación

Si se envía una petición incorrecta (por ejemplo, publicando un `rating` mayor a 5 o sin enviar el `bookId`), la API devolverá una respuesta `400 Bad Request` o `422 Unprocessable Entity`.

**Ejemplo de Response (Error DTO / Validator):**
```json
{
    "error": "book_id is required"
}
```

---

## 📈 Escalabilidad a gran escala

> **¿Qué cambiarías para escalar esta app a cientos de miles de libros y usuarios?**

1. **Optimización de la Base de Datos:** Usaría tecnologías de bases de datos como vistas y índices para optimizar las consultas y reducir el tiempo de respuesta.
2. **Escritura Asíncrona de Reseñas:** Si muchos usuarios insertan la reseña `Un libro excelente` al mismo tiempo, el proceso de guardar la reseña y recalcular el `averageRating` debería desacoplarse enviando eventos a un sistema de colas (ej. **RabbitMQ** o Mensajería de Symfony Messenger) para ser procesado por workers en segundo plano. Así la app nunca bloquea el frontend de los usuarios en eventos masivos.
3. **Almacenamiento CDN para Media:** Imágenes de los libros deberían servirse usando un **CDN (Content Delivery Network)** en edge locations más cercanas al origen de las peticiones para disminuir peso a nuestros servidores web.
4. **Horizontal Scaling:** Empleo de Kubernetes o auto-scaling groups en la nube para levantar dinámicamente varios pods / contenedores del API backend en función del uso de CPU o memoria en horas de mucha actividad.

---

## 📹 Video Evidencia
- **Enlace de funcionamiento (Vue y React Native):** [Añade el enlace aquí (YouTube / Drive)]

## 📋 Información de Evaluación
- **Branch Evaluado:** [Nombre_de_Rama_Ej_main]
- **Commit Final:** [Hash_del_Commit_Ej_7a8b9c]
