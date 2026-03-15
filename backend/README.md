# Tidelit Libros - Backend

Este es el backend de la aplicación, desarrollado utilizando el framework [Symfony 6.4](https://symfony.com/) con PHP 8.3 y PostgreSQL como motor de base de datos.
El proyecto incluye un entorno preconfigurado con Docker para facilitar el desarrollo, y también puede ejecutarse de manera manual si dispones de los requisitos en tu máquina.

## Requisitos Previos Generales

Dependiendo de si deseas usar Docker o ejecutar el proyecto manualmente, necesitarás:

- **Con Docker (Recomendado):**
  - [Docker](https://docs.docker.com/get-docker/) y Docker Compose instalados.
- **Modo Manual:**
  - PHP >= 8.1 (Recomendado 8.3) con las extensiones `pdo`, `pdo_pgsql`, `zip` habilitadas.
  - [Composer](https://getcomposer.org/download/)
  - [PostgreSQL](https://www.postgresql.org/download/)
  - [Symfony CLI](https://symfony.com/download) (opcional, pero recomendado)

---

## Opción 1: Ejecutar con Docker (Recomendado)

El uso de Docker permite levantar la base de datos y el servidor web preconfigurados rápidamente, sin tener que instalar PHP y PostreSQL localmente.

1. Copia el archivo .env.example a .env
   ```bash
   cp .env.example .env
   ```

3. **Inicia los contenedores en segundo plano:**
   Desde el directorio `backend` ejecuta:
   ```bash
   docker-compose up -d --build
   ```
   > Esto levantará un contenedor `tidelit_postgres` en el puerto `5432` y un contenedor `tidelit_backend` en el puerto `8000`.

4. **Instala las dependencias de Composer:**
   Accede al contenedor del backend e instala las librerías:
   ```bash
   docker exec -it tidelit_backend composer install
   ```

5. **Ejecuta las migraciones de la base de datos:**
   ```bash
   docker exec -it tidelit_backend php bin/console doctrine:migrations:migrate --no-interaction
   ```

6. **Acceso al Backend:**
   Una vez configurado, podrás acceder a la API a través de:
   [http://localhost:8000](http://localhost:8000)

> **Nota:** Para detener ambos contenedores en cualquier momento: `docker-compose down`

---

## Opción 2: Ejecutar de manera Manual

Si prefieres tener control sobre tus servicios o ya cuentas con el entorno local, sigue estos pasos:

1. **Navega al directorio de la aplicación API:**
   Entra en la carpeta donde reside el código de Symfony:
   ```bash
   cd api
   ```

2. **Instala las dependencias:**
   Ejecuta composer para descargar las librerías:
   ```bash
   composer install
   ```

3. **Configura la Base de Datos:**
   Copia o crea un archivo `.env.local` basado en el `.env` (si es necesario) y actualiza el valor de `DATABASE_URL` para reflejar tus credenciales locales de PostgreSQL. Por defecto espera:
   ```env
   DATABASE_URL="postgresql://db_symfony:db_symfony@127.0.0.1:5432/books?serverVersion=15&charset=utf8"
   ```
   *Crea el usuario `db_symfony` y la base de datos `books` en tu gestor PostgreSQL local o modifícalo según prefieras.*

4. **Ejecuta las migraciones:**
   Crea la estructura de tablas localmente:
   ```bash
   php bin/console doctrine:migrations:migrate --no-interaction
   ```

5. **Inicia el servidor local:**
   Puedes usar el comando interno de PHP para desarrollo:
   ```bash
   php -S 127.0.0.1:8000 -t public
   ```
   *Alternativa (Si tienes Symfony CLI)*: `symfony server:start -d`

La API estará disponible en `http://127.0.0.1:8000/`.

---

## Comandos Útiles

- **Limpiar la caché:**
  ```bash
  php bin/console cache:clear
  ```
  *(Añade `docker exec -it tidelit_backend` previamente si usas Docker)*.

- **Crear nuevas migraciones** (después de cambiar entidades):
  ```bash
  php bin/console make:migration
  ```

- **Ejecutar Pruebas (PHPUnit):**
  ```bash
  php bin/phpunit
  ```
