# Lean Techniques Photo Album Showcase

This was bootstrapped from using create-t3-turbo with the following example https://github.com/t3-oss/create-t3-turbo, but slightly stripped down. It utilizes turborepo, trpc, nextjs, expo, and workspaces to provide both a web and mobile app.

## Quick Start

To get it running, follow the steps below:

### Setup dependencies

```diff
# Install dependencies
pnpm i

# Configure environment variables.
# There is an `.env.example` in the root directory you can use for reference
cp .env.example .env

## run nextjs project
pnpm --filter nextjs dev
```

### Configure Expo `dev`-script to try mobile app

It's recommended to use the Expo Go app, you can update the script to the following.

```diff
+  "dev": "expo start --tunnel",

## run the expo project
pnpm --filter expo dev
```

You can also run both projects at once but with limited output/logging using `pnpm dev` at the project root folder.

## Tests

To run the tests you can run `pnpm run test`

This project is using vitest to handle the unit tests.

## Notes

Slight issue right now with trpc and expo through the tunnel. When using --tunnel it utilizes ngrok to create the tunnel and the trpc requests are not currently making it to the api since the mobile app is running on the ngrok host name provided and the next server is running on localhost.
