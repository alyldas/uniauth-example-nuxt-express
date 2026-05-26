# UniAuth Nuxt + Express example

This app demonstrates the smallest full-stack runtime chain:

```text
Nuxt frontend
  -> Express backend
  -> Drizzle-backed UniAuth repository adapter
  -> Postgres
```

The app uses sibling packages through local `file:` dependencies:

- `uniauth-core`
- `uniauth-drizzle`
- `uniauth-express`
- `uniauth-nuxt`

## Configuration

Defaults are ready for local development. Override them through environment variables when needed:

```text
DATABASE_URL=postgres://uniauth:uniauth@127.0.0.1:5432/uniauth_example
EXPRESS_HOST=127.0.0.1
EXPRESS_PORT=4000
NUXT_AUTH_BACKEND_ORIGIN=http://127.0.0.1:4000
```

## Run

1. Install dependencies:

   ```sh
   npm install
   ```

2. Prepare the local core package:

   ```sh
   npm run prepare:core
   ```

3. Start Postgres:

   ```sh
   docker compose up -d postgres
   ```

4. Apply the schema:

   ```sh
   npm run db:apply-schema
   ```

5. Start Nuxt and Express:

   ```sh
   npm run dev
   ```

6. With `npm run dev` still running, check the live auth flow:

   ```sh
   npm run smoke:auth
   ```

Nuxt runs on `http://127.0.0.1:3000`. Express runs on `http://127.0.0.1:4000`.

For the local static verification pass, run:

```sh
npm run check
```

For the live auth smoke flow, keep Postgres, Express, and Nuxt running through the steps above, then
run:

```sh
npm run check:live
```

Demo credentials are seeded on backend startup:

```text
email: demo@example.com
password: demo-password-123
```

## Backend Routes

- `POST /auth/password/sign-in`
- `GET /auth/account/session`
- `POST /auth/account/session/refresh`
- `POST /auth/account/sessions/revoke-current`
- `GET /health`

The browser talks to Nuxt. The UniAuth Nuxt module proxies `/api/_uniauth/*` to the Express backend.
