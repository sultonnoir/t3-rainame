import { createTRPCRouter, publicProcedure } from "../../trpc";

export const categoryRoute = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.category.findMany({
      include: {
        subcategory: true,
      },
    });
  }),
});
