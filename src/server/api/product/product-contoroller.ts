import { createTRPCRouter, publicProcedure } from "../trpc";
import { productFilterSchema, productMetadataInput } from "./product-schema";
import { ProductService } from "./product-service";

const productService = new ProductService();

export const productRouter = createTRPCRouter({
  getFilterProducts: publicProcedure
    .input(productFilterSchema)
    .query(async ({ input }) => {
      return await productService.filterProduct(input);
    }),
  getHomeProducts: publicProcedure
    .input(productFilterSchema)
    .query(async ({ input, ctx }) => {
      return await productService.homeProduct(input, ctx.session?.user.id);
    }),
  getMetadata: publicProcedure
    .input(productMetadataInput)
    .query(async ({ input }) => {
      return await productService.getProductMeta(input.slug);
    }),
  getProductBySlug: publicProcedure
    .input(productMetadataInput)
    .query(async ({ input }) => {
      return await productService.getProductBySlug(input.slug);
    }),
});
