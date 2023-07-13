import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../../trpc";

const RespData = z.array(
  z.object({
    albumId: z.number(),
    id: z.number(),
    title: z.string(),
    url: z.string(),
    thumbnailUrl: z.string(),
  }),
);

export const imageRouter = createTRPCRouter({
  byId: publicProcedure.input(z.object({ id: z.number() })).query(async ({ ctx, input }) => {
    try {
      const { id } = input;

      const resp = await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${id}`);

      if (!resp.ok) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", cause: "Error requesting images from API." });

      const images = RespData.parse(await resp.json());

      return images;
    } catch (e) {
      console.error(e);
      return [];
    }
  }),
});
