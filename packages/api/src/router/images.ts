import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

export const imageRouter = createTRPCRouter({
  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const { id } = input;

      const resp = await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${id}`);

      if (!resp.ok) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", cause: "Error requesting images from API." });

      const images = await resp.json();

      return images;
    }),
});
