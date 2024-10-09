## Preparing the project
Once you've cloned the project, be sure to install dependencies with `npm install` (or `pnpm install` or `yarn`) NODEJS MUST BE INSTALLED ON YOUR COMPUTER, 

### Database
we will be using local instance of pocketbase in the meantime, so go and download a version from [here](https://pocketbase.io/docs/) once downloaded, open the folder in your terminal (cmd/ powershell, vs code terminal etc then run the below)

```bash
http://127.0.0.1:8090/_/
```

- be sure to create a .env file in your repo folder and add the above url as an environment variable
```bash
VITE_PB_URL="http://127.0.0.1:8090"
```

NOTE: in the "\src\lib\types" you'll find the "pocketbaseschema.json" where you can import the collections into your local instance.

To start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

## About the Project
This sveltekit app will be built to run using nixpacks(so docker), An important think to note is that the project will be using [SSR mode](https://kit.svelte.dev/docs/page-options#ssr) and this means most of our business logic will live on the server.

### Dependencies
below are a list of external tools/libraries the project above uses:
- [pocketbase](https://pocketbase.io/)
- [lucide](https://lucide.dev/)
- [skeleton ui](https://www.skeleton.dev/)
- [font source](https://fontsource.org/)
- [superforms](https://superforms.rocks/)
- [zod](https://zod.dev/)

### Up to SPEED
- [Server Side Rendering Pages](https://www.youtube.com/watch?v=rsmLu5nmh4g&t)
- [project structure](https://youtu.be/5VBdyfGhs7A?si=nkSGRljFfYqkBV80)
- [routing](https://www.youtube.com/watch?v=7hXHbGj6iE0)
- [Endpoints & API](https://www.youtube.com/watch?v=qlmDj7q2x0c&t)
- [Data flow](https://youtu.be/ampDDmT3TU0?si=qwbdSA0LbH_FTAnq)
