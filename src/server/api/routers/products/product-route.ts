import { createTRPCRouter, publicProcedure } from "../../trpc";
import { productFilterSchema } from "./product-schema";
import { filterProduct } from "./product-service";

export const productRoute = createTRPCRouter({
  getFilterProducts: publicProcedure
    .input(productFilterSchema)
    .query(async ({ input }) => {
      return await filterProduct(input);
    }),
});
