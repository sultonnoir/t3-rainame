import type { Media, Product, ProductVariant } from "generated/prisma";
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
  page: z.number().min(0).optional(),
  limit: z.number().min(0).optional(),
});

export const productMetadataInput = z.object({
  slug: z.string(),
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

export type ProductWithMedia = Product & {
  media: Media[];
};

export interface ProductPageProp extends Product {
  media: Media[];
  productVariant: ProductVariant[];
}

export type ProductPage = {
  data: ProductWithMedia[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export type SearchProductsClient = {
  params?: { category?: string; subcategory?: string };
  title: string;
  searchParams: ProductFilter;
};
