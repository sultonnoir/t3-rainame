import { db } from "@/server/db";
import type { ReviewInputSchema } from "./review-schema";

export class ReviewService {
  async getByProductId({ productId }: ReviewInputSchema) {
    return await db.rating.findMany({
      where: {
        productId,
      },
      take: 5,
      select: {
        value: true,
        id: true,
        message: true,
        createdAt: true,
        user: {
          select: {
            name: true,
            image: true,
            imageBlur: true,
          },
        },
      },
    });
  }
}
