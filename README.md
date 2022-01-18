![Launcher](static/favicon-32x32.png 'Launcher')

# Launcher

_An open-source & accessible app launcher built with Sveltekit, Prisma, and Tailwind._

We built launcher after scaling teams that rapidly adopted dozens of SaaS products. Keeping track of which teams use which apps became a guessing game. Centralize, find, and launch your growing team's apps with _Launcher_.

Get started by following the instructions below, or sign up for a managed instance at [launcher.team](https://launcher.team)!

<br>

# 👷‍♀️ Setup

Launcher is a serverless application. It's built on [Sveltekit](https://kit.svelte.dev) and uses [Prisma](https://prisma.io) as its ORM.

**Requirements**

- [node.js](https://nodejs.org)
- [Prisma](https://prisma.io)
- postgresql, or another database that [plays nicely with Prisma](https://www.prisma.io/docs/reference/database-reference/supported-databases)

**You'll also need:**

- Your own [Google app](https://developers.google.com), including the app ID and key, for user authentication (Launcher only supports Google for now)
- Your own [Segment](https://segment.com) API key for analytics, should you choose to collect them.
- Your own [Postmark](https://postmark.com) account, for sending invitation emails, including a key and sender + support email addresses

See `.env.example` for all of the required environment variables.

<br>

## Let's go!

### 1) Create your `.env` file

Copy `.env.example` to a new `.env` file with your own values.

<br>

### 2) Set up node.js and the frontend environment

**Install node.js** using Homebrew (if not already installed):

```zsh
brew update
brew install node
```

**Install node packages and set up the Prisma schema.** From the project root:

```
npm install
npx prisma generate
```

<br>

### 3) Set up a local PostgreSQL database

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
ALTER USER app CREATEDB;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO my_user;
```

Apply any migrations:

```zsh
npx prisma migrate reset
```

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
