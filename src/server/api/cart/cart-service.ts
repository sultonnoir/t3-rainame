import { db } from "@/server/db";
import type { CreateCartInput, DeleteCartInput } from "./cart-schema";
import { TRPCError } from "@trpc/server";

export class CartService {
  async createCart(input: CreateCartInput) {
    const { userId, productId, size, quantity } = input;
    await db.$transaction(async (tx) => {
      const stock = await tx.productVariant.findFirst({
        where: {
          productId: input.productId,
          name: input.size,
        },
      });

      if (stock?.amount === 0) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "product is empty",
        });
      }
      await tx.cart.upsert({
        where: {
          userId_productId_size: {
            userId,
            productId,
            size,
          },
        },
        update: {
          quantity,
        },
        create: {
          userId,
          productId,
          size,
          quantity,
        },
      });
    });
  }
  async getCartCount(userId?: string) {
    if (!userId) return 0;
    const result = await db.cart.aggregate({
      where: {
        userId,
      },
      _sum: {
        quantity: true,
      },
    });

    const totalItems = result._sum.quantity ?? 0;
    return totalItems;
  }
  async removeCartItem(input: DeleteCartInput) {
    await db.cart.delete({
      where: {
        id: input.cartId,
        userId: input.userId,
      },
    });
  }
  async getCart(userId: string) {
    const cartItems = await db.cart.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
        quantity: true,
        size: true,
        product: {
          select: {
            id: true,
            discountedPrice: true,
            name: true,
            slug: true,
            media: {
              take: 1,
              orderBy: {
                createdAt: "asc", // atau "desc"
              },
              select: {
                url: true,
                blur: true,
              },
            },
            productVariant: {
              take: 1,
              select: {
                amount: true,
              },
            },
          },
        },
      },
    });
    const result = cartItems.map((item) => ({
      ...item,
      product: {
        ...item.product,
        media: item.product.media[0]!,
        stock: item.product.productVariant[0]?.amount ?? 0,
      },
    }));
    return result;
  }
}
