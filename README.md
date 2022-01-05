![Launcher](static/favicon-96x96.png 'Launcher')

# Launcher

_An open-source & accessible app launcher built with Sveltekit, Prisma, and Tailwind._

<br>

# 👷‍♀️ Setup

**Requirements**

- node.js
- [Prisma](https://prisma.io)
- postgresql

**You'll also need:**

- Your own Google app, including the app ID and key, for user authentication (Launcher only supports Google for now)
- Your own [Segment](https://segment.com) API key for analytics
- Your own [Postmark](https://postmark.com) account, for sending invitation emails, including a key and sender + support email addresses

See `.env.example` for all of the required environment variables. Copy this file to a new `.env` file with your own values.

<br>

## Setting up node.js and the frontend environment

**Install node.js** using Homebrew (if not already installed):

```zsh
brew update
brew install node
```

**Install node packages.** From the project root:

```
npm install
npx prisma generate
```

<br>

## Setting up a local PostgreSQL database

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

## Configuring local settings

**Copy the exmaple .env file** and make any changes necessary to your local settings

```zsh
cp .env.example .env
```

# Development

Commands for development workflow

<br>

## Running the app

`npm run dev -- --open`

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
