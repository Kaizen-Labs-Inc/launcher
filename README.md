![Launcher](static/favicon-32x32.png 'Launcher')

# Launcher

_An open-source & accessible app launcher built with Sveltekit, Prisma, and Tailwind._

![Launcher](static/gif.gif 'Launcher')

We built launcher after scaling teams that rapidly adopted dozens of SaaS products. Keeping track of which teams use which apps became a guessing game. Centralize, find, and launch your growing team's apps with _Launcher_.

Get started by following the instructions below, or sign up for a managed instance at [launcher.team](https://launcher.team)!

<br>

# 👷‍♀️ Setup

Launcher is a serverless application. It's built on [Sveltekit](https://kit.svelte.dev) and uses [Prisma](https://prisma.io) as its ORM.

**Requirements**

- [node.js](https://nodejs.org)
- sqlite (recommended), postgresql, or another database that [plays nicely with Prisma](https://www.prisma.io/docs/reference/database-reference/supported-databases)

**You'll also need:**

- Your own [Google app](https://developers.google.com), including the app ID and key, for user authentication (Launcher only supports Google for now)
- Your own [Segment](https://segment.com) API key for analytics, should you choose to collect them.

See `.env.example` for all of the required environment variables.

<br>

## Let's go!

### 1) Create your `.env` file

Copy `.env.example` to a new `.env` file. The newly-copied `.env` file will be ignored by git and is safe for secrets like Google app credentials.

<br>

### 2) Set up node.js and the frontend environment

**Install node.js** (if not already installed).

Using Homebrew (mac):

```zsh
brew update
brew install node
```

**Install node packages and set up the Prisma schema.** From the project root:

```
npm i
npx prisma generate
```

### 3a) Set up Prisma to use SQLite (recommended)

Open up `/prisma/schema.prisma` and uncomment the following lines:

```
// uncomment to use sqlite (recommended)
//datasource db {
//  provider = "sqlite"
//  url      = "file:./dev.db"
//}
```

Remove or comment the following lines:

```
datasource db {
  provider = "postgresql"
  url      = env("PG_URL")
}
```

Finally, generate prisma js stubs:

```
npx prisma generate
```

Congrats! Your SQLite database is configured, and dev.db is pre-seeded with key data.

<br>

### 3b) Set up a local PostgreSQL database (optional, skip if you followed 3a above)

Install Postgresql (if not installed):

Using Homebrew (mac):

```
brew update
brew install postgresql
brew services start postgresql
```

Create the database

```
createdb launcher
```

Create a user (changing username `app` and password `r3pyujhj39Y` if desired; be sure to update the `PG_URL` variable in your `.env` file)

```
psql launcher
CREATE USER app WITH PASSWORD 'r3pyujhj39Y';
GRANT ALL PRIVILEGES ON DATABASE launcher TO app;
ALTER USER app CREATEDB;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO my_user;
```

Apply any migrations:

```zsh
npx prisma generate
npx prisma migrate reset
```

Congrats, your postgresql database is set up! However the first time you run the app, you will need to hit https://localhost:3000/api/initialize to seed your database with default data.

# Development

You're all set up because you followed the above instructions. Now, it's time to get Launcher running.

<br>

## Run & open the app

```
npm run dev -- --open
```

<br>

## Making schema changes

Make changes to `prisma/schema.prisma` and run:

```
npx prisma format
npx prisma generate
npx prisma migrate dev --name <MIGRATION_NAME>
```

<br>

## Applying migrations

To apply migrations locally e.g. from another branch that has been merged:

```zsh
npx prisma migrate reset
```

This will delete all data in your local database. You can rebuild the database base layer by hitting http://localhost:3000/api/greeting from your browser.

<br>

## 🍻 Toasts

This app uses toasts to notify users of outcomes and updates. Simple import `addToast` from our own custom store, then call that method like so:
`addToast({ dismissible: false, message: 'Added', type: 'success', timeout: 3000 });`

The types of toasts are `'success'`, `'info`, and `'error'`.

<br>

# ⚒️ Building

Before creating a production version of your app, install an [adapter](https://kit.svelte.dev/docs#adapters) for your target environment. Then:

```bash
npm run build
```

> You can preview the built app with `npm run preview`, regardless of whether you installed an adapter. This should _not_ be used to serve your app in production.

<br>

<br>

# ⚖️ License

Launcher is free and open-source, available under the [AGPL software license](https://www.gnu.org/licenses/agpl-3.0.txt).

<br>

# 🙏🏻 Support us

Support the core Launcher team by signing up for our managed product at [launcher.team](https://launcher.team).
