"use client";

import { httpBatchLink, loggerLink } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";
import superjson from "superjson";

import type { AppRouter } from "@lt/api";

const getBaseUrl = () => {
  if (typeof window !== "undefined") return ""; // browser should use relative url

  return `http://localhost:3000`; // dev SSR should use localhost
};

export const trpc = createTRPCNext<AppRouter>({
  config() {
    return {
      transformer: superjson,
      links: [
        loggerLink({
          enabled: (opts) => process.env.NODE_ENV === "development" || (opts.direction === "down" && opts.result instanceof Error),
        }),
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
        }),
      ],
      queryClientConfig: {
        defaultOptions: {
          queries: {
            staleTime: Infinity,
            refetchOnWindowFocus: false
          }
        }
      }
    };
  },
  ssr: false,
});

export { type RouterInputs, type RouterOutputs } from "@lt/api";
