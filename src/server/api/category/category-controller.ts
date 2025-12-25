import { createTRPCRouter, publicProcedure } from "../trpc";
import { CategoryService } from "./category-service";

const categoryService = new CategoryService();

export const categoryRouter = createTRPCRouter({
  getAll: publicProcedure.query(async () => {
    return await categoryService.list();
  }),
});
