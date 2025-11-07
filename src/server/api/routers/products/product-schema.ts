import type { media, product } from "generated/prisma";
import { z } from "zod";

export const productFilterSchema = z.object({
  category: z.string().optional(),
  subcategory: z.string().optional(),
  minPrice: z.number().min(0).optional(),
  maxPrice: z.number().min(0).optional(),
  rating: z.number().min(0).max(5).optional(),
  discount: z.number().min(0).optional(),
  search: z.string().optional(),
  sortBy: z
    .enum(["price-high", "price-low", "rating", "hot-sale", "new-arrival"])
    .optional(),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(20),
});

export const sortBy = z
  .enum(["price-high", "price-low", "rating", "hot-sale", "new-arrival"])
  .default("new-arrival");

export const productSortedSchema = z.object({
  sortBy: sortBy,
  limit: z.number().min(1).max(100).default(5),
});

export type SortBy = z.infer<typeof sortBy>;

export type ProductSortedSchema = z.infer<typeof productSortedSchema>;

export type ProductFilter = z.infer<typeof productFilterSchema>;

export type ProductWithMedia = product & {
  media: media[];
};
