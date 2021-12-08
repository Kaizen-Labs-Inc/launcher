# Springboard

Powered by Sveltekit

## Setup

**Requirements**

 - node.js
 - postgresql
 
### Setting up node.js and the frontend environment

**Install node.js** using Homebrew (if not already installed):
```zsh
brew update
brew install node
```
**Install node packages.** From the project root:

`npm install`

### Setting up a local PostgreSQL database

If Postgresql is not installed:
```
brew update
brew install postgresql
brew services start postgresql
```

Create the database
```
createdb launcher
```

Create a user
```
psql launcher
CREATE USER app WITH PASSWORD 'ujOs6jXjGXar';
GRANT ALL PRIVILEGES ON DATABASE launcher TO app;
```

## Configuring local settings

**Copy the exmaple .env file** and make any changes necessary to your local settings

```zsh
cp .env.example .env
```

## Connecting to the production DB

The following connection string will connect you to the prod heroku db:
```
psql -U keupcsyxrzwgrt -p 5432 -h ec2-44-193-111-218.compute-1.amazonaws.com d23jb9b00ccftl
```
You will be prompted to enter a password. You will find the password in heroku -> databases -> credentials.

### Installing Cockroach (unused)

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
cockroach sql --certs-dir=certs --host=localhost:26257/launcher
```

*Create a database and user* and assign privileges. While connected to cockroach using the above command:

```sql
CREATE USER app WITH PASSWORD 'ujOs6jXjGXar';
CREATE DATABASE launcher;
GRANT ALL PRIVILEGES ON DATABASE launcher TO app;
\q
```

You should now be able to connect to the app using:
```
psql -U app -p 26257 -h localhost launcher
```

Enter the password `ujOs6jXjGXar` when prompted.

## Manually running a migration

To manually run a migration (replacing `<MIGRATION_DIR>` with the directory containing the migration):
```zsh
psql -U app -p 26257 -h localhost launcher < prisma/migrations/<MIGRATION_DIR>/migration.sql
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
