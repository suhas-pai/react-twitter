# React Twitter
### React + TypeScript + TanStack Router + Vinxi + shadcn/ui

An remake of X (formerly Twitter) with the technologies listed above

Currently a work-in-progress, the following will soon be integrated.

- [@clerk/clerk-react](https://clerk.com/docs/quickstarts/react) for user authentication
- [@uploadthing/react](https://docs.uploadthing.com/api-reference/react) for image uploading for user posts

This project will be migrated to `TanStack Start` once the meta-framework reaches v1.0

## Configuration

This project can be built for development and production locally, or for a vercel environment.
Create a `.env` file as such, take a look at `.env.example` for a list of necessary variables.

This project also provides a `./start_database.sh` file to help create a local `postgres` database
using `Docker`. See comments inside the script file for more information.

## Building

This project uses the `pnpm` package manager. The following commands are available for running/building this project:
- `pnpm run dev` (for development)
- `pnpm run build` (for production)
- `pnpm run start` (for production)

Note that at time of writing, `pnpm run start` is currently not supported due to an issue in `vinxi`

This project also has several commands (provided by `drizzle`) to investigate the `postgres` database linked in your `.env`. See `package.json` for more information
