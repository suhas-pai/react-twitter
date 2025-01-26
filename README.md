# React Twitter

A remake of X (formerly Twitter) with the technologies listed below

- [Bun](https://bun.sh) as bundler
- [ReactTS](https://react.dev) as framework
- [TanStack Router](https://tanstack.com/router/latest) for Routing
- [Vinxi](https://vinxi.vercel.app/) + [Nitro](https://nitro.build/) for backend
- [TRPC](https://trpc.io/) as middleware
- [shadcn/ui](https://ui.shadcn.com/) for UI Components
- [better-auth](https://www.better-auth.com/) for user authentication

Currently a work-in-progress, the following will soon be integrated.

- [@uploadthing/react](https://docs.uploadthing.com/api-reference/react) for image uploading for user posts

This project will be migrated to `TanStack Start` once the meta-framework reaches v1.0

## Configuration

This project can be either locally built for development and production, or for a vercel environment.
Create a `.env` file as such, take a look at `.env.example` for a list of necessary variables.

This project also provides a `./start_database.sh` file to help create a local `postgres` database
using `Docker`. See comments inside the script file for more information.

## Building

This project uses the `bun` runtime and bundler. The following commands are available for running/building this project:

- `bun run dev` (for development)
- `bun run build` (for production)
- `bun run start` (for production and to run)

Note that at time of writing, `bun run start` is currently not supported due to an issue in `vinxi`

This project also has several commands (provided by `drizzle`) to investigate the `postgres` database linked in your `.env`. See `package.json` for more information
