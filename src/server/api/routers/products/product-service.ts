"use server";
import { db } from "@/server/db";
import { type ProductFilter } from "./product-schema";
import type { Prisma } from "generated/prisma";

export const getProducts = async () => {
  const start = Date.now();
  const products = await db.product.findMany({
    take: 10,
  });
  const end = Date.now();

  return {
    products,
    duration: end - start,
  };
};

export async function filterProduct(filters: ProductFilter) {
  const where: Prisma.productWhereInput = {};

  // 🔍 Pencarian teks
  if (filters.search) {
    where.OR = [
      { name: { contains: filters.search, mode: "insensitive" } },
      { summary: { contains: filters.search, mode: "insensitive" } },
      { desc: { contains: filters.search, mode: "insensitive" } },
    ];
  }

  // 🎯 Filter dasar
  if (filters.category) where.category = filters.category;
  if (filters.subcategory) where.subcategory = filters.subcategory;

  if (filters.minPrice || filters.maxPrice) {
    where.discounted_price = {};
    if (filters.minPrice) where.discounted_price.gte = filters.minPrice;
    if (filters.maxPrice) where.discounted_price.lte = filters.maxPrice;
  }

  if (filters.rating) where.rating_average = { gt: filters.rating };
  if (filters.discount) where.discount = { gte: filters.discount };

  // 🔢 Pagination
  const skip = (filters.page - 1) * filters.limit;
  const take = filters.limit;

  // 🧭 Sorting logic
  let orderBy: Prisma.productOrderByWithRelationInput = { createdAt: "desc" };
  switch (filters.sortBy) {
    case "price-high":
      orderBy = { discounted_price: "desc" };
      break;
    case "price-low":
      orderBy = { discounted_price: "asc" };
      break;
    case "rating":
      orderBy = { rating_average: "desc" };
      break;
    case "hot-sale":
      orderBy = { selling: "desc" };
      break;
    case "new-arrival":
      orderBy = { createdAt: "desc" };
      break;
  }
  return await db.product.findMany({
    where,
    orderBy,
    skip,
    take,
    include: {
      media: true,
    },
  });
}
