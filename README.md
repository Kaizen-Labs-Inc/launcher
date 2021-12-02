# Springboard

Powered by Sveltekit

## Requirements

 - node.js
 - cockroachdb

## Setup

**Install node.js** using Homebrew (if not already installed):
```zsh
brew update
brew install node
```
**Install node packages.** From the project root:

`npm install`

**Install cockroach** using Homebrew:
```zsh
brew update
brew install cockroachdb/tap/cockroach
```

Generate **SSL certificates** for cockroach

From the project root
```
mkdir local
cockroach cert create-ca --certs-dir=certs --ca-key=local/ca.key
cockroach cert create-node localhost $(hostname) --certs-dir=certs --ca-key=local/ca.key
cockroach cert create-client root --certs-dir=certs --ca-key=local/ca.key
```

**Start cockroach** in its own terminal window:

```zsh
cockroach start-single-node --certs-dir=certs --listen-addr=localhost:26257 --http-addr=localhost:8081
```

This starts cockroach postgresql wire interface on `postgresql://root@localhost:26257` and a web server on `https://localhost:8081` that will show the cockroach cluster status.

**Verify the connection** from a shell SQL client:

```zsh
cockroach sql --certs-dir=certs --host=localhost:26257
```

*Create a database and user* and assign privileges. While connected to cockroach using the above command:

```sql
CREATE USER app WITH PASSWORD 'ujOs6jXjGXar';
CREATE DATABASE springboard;
GRANT ALL PRIVILEGES ON DATABASE springboard TO app;
\q
```

## Running the app

`npm run dev -- --open`

## Making schema changes

Make changes to `prisma/schema.prisma` and run:
```
npx prisma format
npx prisma generate
npx prisma migrate dev --name <MIGRATION_NAME>
```

## Building

Before creating a production version of your app, install an [adapter](https://kit.svelte.dev/docs#adapters) for your target environment. Then:

```bash
npm run build
```

> You can preview the built app with `npm run preview`, regardless of whether you installed an adapter. This should _not_ be used to serve your app in production.

## Toasts

This app uses toasts to notify users of outcomes and updates. Simple import `addToast` from our own custom store, then call that method like so:
`addToast({ dismissible: false, message: 'Added', type: 'success', timeout: 3000 });`

The types of toasts are `'success'`, `'info`, and `'error'`.
