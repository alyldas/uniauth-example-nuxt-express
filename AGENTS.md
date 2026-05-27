# Local rules

## Language

All repository-facing, Git-facing, and GitHub-facing content must be written in English only: branch names,
commit messages, PR titles and bodies, issues, labels, milestones, changelog entries,
version-controlled documentation, code comments, generated artifacts, and release notes. Local
documents that are not tracked by Git are the only exception. Russian text is forbidden in Git and
GitHub artifacts.

## Commit Messages

Use strict Conventional Commits in English only. Commit messages must describe the completed result
in past-tense/result form, not a future task or imperative instruction. Use forms such as `fixed`,
`added`, `updated`, `removed`, `hardened`, or `disabled`.

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
