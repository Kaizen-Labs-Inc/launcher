# Springboard

## Powered by Sveltekit

`npm install`

then

`npm run dev -- --open`


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
