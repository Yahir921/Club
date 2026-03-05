# Club Toluca - Sitio informativo + Admin de eventos

Este proyecto tiene:
- Frontend en React (sitio publico).
- Backend en PHP (login admin sin roles + CRUD de eventos).

## Rutas importantes

- Sitio publico: `#/`, `#/eventos`, `#/equipo`, etc.
- Login admin oculto: `#/Login-Toluca`

## Backend PHP

Carpeta: `api/`

Archivos:
- `api/config.php`: credenciales de MySQL.
- `api/auth.php`: login, logout y estado de sesion.
- `api/events.php`: lista publica y CRUD protegido.

## Base de datos

1. Crea una base de datos (ejemplo: `club_toluca`).
2. Ejecuta el script [database/schema.sql](/c:/Users/LENOVO/Documents/Toluca/Club/Club/database/schema.sql).
3. Configura `DB_HOST`, `DB_NAME`, `DB_USER`, `DB_PASS` en [api/config.php](/c:/Users/LENOVO/Documents/Toluca/Club/Club/api/config.php).

## Crear usuario admin (sin roles)

Genera hash de tu contrasena en PHP:

```bash
php -r "echo password_hash('TuContrasenaSegura', PASSWORD_DEFAULT), PHP_EOL;"
```

Inserta el admin en MySQL:

```sql
INSERT INTO admins (username, password_hash)
VALUES ('admin_toluca', 'AQUI_TU_HASH');
```

## Conexion frontend -> backend

El frontend usa `VITE_API_BASE_URL` y por defecto apunta a `/api`.

Si en desarrollo tu PHP corre en otro host/puerto, crea `.env`:

```bash
VITE_API_BASE_URL=http://localhost/Club/api
```

## Comandos

```bash
npm install
npm run dev
npm run lint
```

## Nota de seguridad

La URL oculta no protege por si sola. La proteccion real esta en PHP con sesion y validacion de endpoints.

Adicionalmente ya esta implementado:
- CSRF token para `auth`, `events` y `upload`.
- Limite de intentos de login: 5 intentos por 5 minutos (por IP/usuario).
