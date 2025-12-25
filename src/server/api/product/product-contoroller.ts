import { createTRPCRouter, publicProcedure } from "../trpc";
import { productFilterSchema } from "./product-schema";
import { ProductService } from "./product-service";

const productService = new ProductService();

export const productRouter = createTRPCRouter({
  getFilterProducts: publicProcedure
    .input(productFilterSchema)
    .query(async ({ input, ctx }) => {
      return await productService.filterProduct(input, ctx.session?.user.id);
    }),
});
