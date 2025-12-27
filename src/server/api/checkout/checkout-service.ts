import { db } from "@/server/db";
import type { CheckoutInputSchema, ValidationSchema } from "./checkout-schema";
import { TRPCError } from "@trpc/server";

export class CheckoutService {
  async create(input: CheckoutInputSchema) {
    return db.$transaction(async (tx) => {
      // Cleanup expired checkout
      await tx.checkout.deleteMany({
        where: {
          userId: input.userId,
          status: "PENDING",
          expiresAt: { lt: new Date() },
        },
      });

      // Cegah checkout aktif
      const activeCheckout = await tx.checkout.findFirst({
        where: {
          userId: input.userId,
          status: "PENDING",
          expiresAt: { gt: new Date() },
        },
      });

      if (activeCheckout) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message:
            "There are still active checkouts that have not been completed.",
        });
      }

      const carts = await tx.cart.findMany({
        where: { userId: input.userId },
        select: {
          quantity: true,
          size: true,
          product: {
            select: {
              discountedPrice: true,
              id: true,
            },
          },
        },
      });

      if (carts.length === 0) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Cart is empty",
        });
      }

      const finalQuantity = carts.reduce((cur, acc) => cur + acc.quantity, 0);

      const finalPrice = carts.reduce(
        (cur, acc) => cur + acc.product.discountedPrice * acc.quantity,
        0,
      );

      const checkout = await tx.checkout.create({
        data: {
          userId: input.userId,
          status: "PENDING",
          price: finalPrice,
          quantity: finalQuantity,
          expiresAt: new Date(Date.now() + 30 * 60 * 1000),
        },
      });

      await tx.checkoutItem.createMany({
        data: carts.map((cart) => ({
          checkoutId: checkout.id,
          productId: cart.product.id,
          quantity: cart.quantity,
          size: cart.size,
          price: cart.product.discountedPrice,
        })),
      });

      return checkout.id;
    });
  }
  async validation(input: ValidationSchema) {
    const isActive = await db.checkout.findFirst({
      where: {
        id: input.checkoutId,
        userId: input.userId,
        expiresAt: { gt: new Date() },
      },
      select: { id: true },
    });

    return !!isActive;
  }
  async paidCheckout(input: ValidationSchema) {
    await db.$transaction(async (tx) => {
      const checkout = await tx.checkout.findFirst({
        where: {
          id: input.checkoutId,
          userId: input.userId,
          status: "PENDING",
          expiresAt: { gt: new Date() },
        },
        include: { checkoutItems: true },
      });

      if (!checkout)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Checkout invalid or expired",
        });

      // Loop melalui item checkout
      for (const item of checkout.checkoutItems) {
        const productVariant = await tx.productVariant.findFirst({
          where: {
            name: item.size,
            productId: item.productId,
          },
          select: {
            amount: true,
            id: true,
            product: { select: { name: true } },
          },
        });

        if (!productVariant || productVariant.amount < item.quantity) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: `Product ${productVariant?.product.name ?? "Unknown"} is sold out`,
          });
        }

        await tx.productVariant.update({
          where: { id: productVariant.id },
          data: { amount: { decrement: item.quantity } },
        });
      }

      // remove cart
      await tx.cart.deleteMany({ where: { userId: input.userId } });

      // update checkout
      await tx.checkout.update({
        where: { id: input.checkoutId },
        data: { status: "PAID" },
      });
    });
  }
  async getCheckout(input: ValidationSchema) {
    const checkout = await db.checkout.findUnique({
      where: {
        id: input.checkoutId,
      },
      select: {
        quantity: true,
        price: true,
        id: true,
        checkoutItems: {
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
        },
      },
    });

    if (!checkout) {
      throw new TRPCError({
        message: "Checkout not found",
        code: "NOT_FOUND",
      });
    }

    const checkoutItem = checkout.checkoutItems.map((item) => ({
      ...item,
      product: {
        ...item.product,
        media: item.product.media[0]!,
        stock: item.product.productVariant[0]?.amount ?? 0,
      },
    }));
    const result = {
      id: checkout.id,
      totalPrice: checkout.price,
      totalQuantity: checkout.quantity,
      checkoutItem,
    };

    return result;
  }
}
