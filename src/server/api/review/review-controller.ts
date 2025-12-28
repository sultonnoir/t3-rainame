import { createTRPCRouter, publicProcedure } from "../trpc";
import { reviewInputSchema } from "./review-schema";
import { ReviewService } from "./review-service";

const reviewService = new ReviewService();

export const reviewRouter = createTRPCRouter({
  getByProductId: publicProcedure
    .input(reviewInputSchema)
    .query(async ({ input }) => {
      return reviewService.getByProductId(input);
    }),
});
