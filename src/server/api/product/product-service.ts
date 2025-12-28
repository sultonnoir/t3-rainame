import { db } from "@/server/db";
import { type ProductFilter } from "./product-schema";
import type { Prisma } from "generated/prisma";

export class ProductService {
  async filterProduct(filters: ProductFilter) {
    const andConditions: Prisma.ProductWhereInput[] = [];

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

    if (filters.minPrice != null || filters.maxPrice != null) {
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

    const page = Math.max(filters.page ?? 1, 1);
    const limit = Math.min(filters.limit ?? 12, 50);
    const skip = (page - 1) * limit;

    const orderByMap: Record<string, Prisma.ProductOrderByWithRelationInput> = {
      "price-high": { discountedPrice: "desc" },
      "price-low": { discountedPrice: "asc" },
      rating: { ratingAverage: "desc" },
      "hot-sale": { selling: "desc" },
      "new-arrival": { createdAt: "desc" },
    };

    const orderBy = orderByMap[filters.sortBy ?? ""] ?? { createdAt: "desc" };

    const whereFiltered: Prisma.ProductWhereInput | undefined =
      andConditions.length > 0 ? { AND: andConditions } : undefined;

    // 1️⃣ Query dengan filter
    const [filteredItems, filteredTotal] = await Promise.all([
      db.product.findMany({
        where: whereFiltered,
        orderBy,
        skip,
        take: limit,
        include: {
          media: {
            take: 1,
            orderBy: { createdAt: "asc" },
          },
        },
      }),
      db.product.count({ where: whereFiltered }),
    ]);

    // 2️⃣ Jika ada hasil → langsung return
    if (filteredItems.length > 0) {
      return {
        data: filteredItems,
        meta: {
          page,
          limit,
          total: filteredTotal,
          totalPages: Math.ceil(filteredTotal / limit),
          fallback: false,
        },
      };
    }

    // 3️⃣ Fallback: ambil product tanpa filter
    const fallbackItems = await db.product.findMany({
      orderBy: {
        createdAt: "asc",
      },
      include: {
        media: true,
      },
      skip,
      take: 8,
    });

    return {
      data: fallbackItems,
      meta: {
        page: 0,
        limit: 0,
        total: 0,
        totalPages: 0,
        fallback: true, // 🔥 penting buat FE
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

  async getProductMeta(slug: string) {
    const name = await db.product.findFirst({
      where: {
        slug,
      },
      select: {
        name: true,
      },
    });
    return name;
  }

  async getProductBySlug(slug: string) {
    return await db.product.findFirst({
      where: {
        slug,
      },
      include: {
        media: true,
        productVariant: true,
      },
    });
  }
}
