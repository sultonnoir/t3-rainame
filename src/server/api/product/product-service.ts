import { db } from "@/server/db";
import { type ProductFilter } from "./product-schema";
import type { Prisma } from "generated/prisma";

export class ProductService {
  async filterProduct(filters: ProductFilter, userId?: string) {
    const andConditions: Prisma.ProductWhereInput[] = [];

    // 🔍 Search
    if (filters.search) {
      andConditions.push({
        OR: [
          { name: { contains: filters.search, mode: "insensitive" } },
          { summary: { contains: filters.search, mode: "insensitive" } },
          { desc: { contains: filters.search, mode: "insensitive" } },
        ],
      });
    }

    if (filters.category) {
      andConditions.push({ category: filters.category });
    }

    if (filters.subcategory) {
      andConditions.push({ subcategory: filters.subcategory });
    }

    if (filters.minPrice || filters.maxPrice) {
      andConditions.push({
        discountedPrice: {
          gte: filters.minPrice,
          lte: filters.maxPrice,
        },
      });
    }

    if (filters.rating) {
      andConditions.push({
        ratingAverage: { gte: filters.rating },
      });
    }

    if (filters.discount) {
      andConditions.push({
        discount: { gte: filters.discount },
      });
    }

    const where: Prisma.ProductWhereInput = {
      AND: andConditions.length ? andConditions : undefined,
    };

    const page = Math.max(filters.page ?? 1, 1);
    const limit = Math.min(filters.limit ?? 20, 50);
    const skip = (page - 1) * limit;

    const orderByMap: Record<string, Prisma.ProductOrderByWithRelationInput> = {
      "price-high": { discountedPrice: "desc" },
      "price-low": { discountedPrice: "asc" },
      rating: { ratingAverage: "desc" },
      "hot-sale": { selling: "desc" },
      "new-arrival": { createdAt: "desc" },
    };

    const orderBy = orderByMap[filters.sortBy ?? ""] ?? { createdAt: "desc" };

    const [items, total] = await Promise.all([
      db.product.findMany({
        where,
        orderBy,
        skip,
        take: limit,
        include: {
          media: {
            take: 1,
            orderBy: {
              createdAt: "asc",
            },
          },
          productVariant: true,
          _count: userId
            ? {
                select: {
                  wishlist: {
                    where: { userId },
                  },
                },
              }
            : undefined,
        },
      }),
      db.product.count({ where }),
    ]);

    return {
      data: items.map((product) => ({
        ...product,
        isWishlisted: userId ? product._count?.wishlist > 0 : false,
      })),
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
  async homeProduct(filters: ProductFilter, userId?: string) {
    const page = Math.max(filters.page ?? 1, 1);
    const limit = Math.min(filters.limit ?? 20, 50);
    const skip = (page - 1) * limit;

    const orderByMap: Record<string, Prisma.ProductOrderByWithRelationInput> = {
      "price-high": { discountedPrice: "desc" },
      "price-low": { discountedPrice: "asc" },
      rating: { ratingAverage: "desc" },
      "hot-sale": { selling: "desc" },
      "new-arrival": { createdAt: "desc" },
    };

    const orderBy = orderByMap[filters.sortBy ?? ""] ?? { createdAt: "desc" };

    const items = await db.product.findMany({
      orderBy,
      skip,
      take: limit,
      include: {
        media: {
          take: 1,
          orderBy: {
            createdAt: "asc",
          },
        },
        productVariant: {
          orderBy: {
            createdAt: "asc",
          },
        },
        _count: userId
          ? {
              select: {
                wishlist: {
                  where: { userId },
                },
              },
            }
          : undefined,
      },
    });

    const products = items.map((product) => ({
      ...product,
      isWishlisted: userId ? product._count?.wishlist > 0 : false,
    }));

    return products;
  }
}
