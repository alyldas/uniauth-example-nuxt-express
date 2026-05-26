# Local rules

This repository is the example app for the full UniAuth ecosystem path:

```text
Nuxt frontend -> Express backend -> Drizzle adapter -> Postgres
```

Keep auth business logic in `@alyldas/uniauth-core`. The example may own HTTP routes, cookies, runtime
configuration, Drizzle schema, and demo-only bootstrapping.

Before running this example against the local core package, prepare the local core export after
installing example dependencies:

```sh
npm run prepare:core
```
