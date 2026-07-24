# Brand New Day — Spider-Man Mission Brief

A cinematic, comic-book-themed web invite to watch Spider-Man: Brand New Day together.

## Development

You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Deployment

This app is a TanStack Start SSR app, so it must be deployed on a runtime that supports Nitro/Vercel server functions.

If you deploy to Vercel:

- Keep the project root at the repository root.
- Use `npm run build` as the build command.
- Do not deploy it as a static-only site.
- Add the production environment variables in the Vercel project settings:
	- `GMAIL_USER`
	- `GMAIL_APP_PASSWORD`

The repo includes `nitro.config.ts` with the `vercel` preset so Vercel can detect the correct runtime.

## Built with

- TanStack Start
- TypeScript
- React
- Tailwind CSS
