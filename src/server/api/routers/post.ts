import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      const start = performance.now();
      const newPost = await ctx.db.posts.create({
        data: {
          name: input.name,
          id: Date.now().toString(),
        },
      });
      const end = performance.now();
      return {
        message: `Post "${newPost.name}" added in ${(end - start).toFixed(0)}ms`,
      };
    }),

  getPosts: publicProcedure.query(async ({ ctx }) => {
    const start = Date.now();
    const posts = await ctx.db.posts.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    });
    const end = Date.now();
    return {
      posts,
      duration: end - start,
    };
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
