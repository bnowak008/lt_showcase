import { imageRouter } from "./routers/images";
import { createTRPCRouter, publicProcedure } from "./trpc";

export const appRouter = createTRPCRouter({
  healthCheck: publicProcedure.query(() => "Running!"),
  images: imageRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
