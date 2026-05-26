# Local rules

## Language

All repository-facing and GitHub-facing content must be written in English only: branch names,
commit messages, PR titles and bodies, issues, labels, milestones, changelog entries,
version-controlled documentation, code comments, generated artifacts, and release notes. Local
documents that are not tracked by Git are the only exception. Do not introduce new Russian text into
repository or GitHub artifacts.

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
