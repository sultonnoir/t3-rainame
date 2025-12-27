import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { createCartFromUser, removeCartSchema } from "./cart-schema";
import { CartService } from "./cart-service";
const cartService = new CartService();

export const cartRouter = createTRPCRouter({
  create: protectedProcedure
    .input(createCartFromUser)
    .mutation(async ({ input, ctx }) => {
      await cartService.createCart({ ...input, userId: ctx.session.user.id });
    }),
  getCount: publicProcedure.query(async ({ ctx }) => {
    return await cartService.getCartCount(ctx.session?.user.id);
  }),
  removeItem: protectedProcedure
    .input(removeCartSchema)
    .mutation(async ({ input, ctx }) => {
      await cartService.removeCartItem({
        cartId: input.cartId,
        userId: ctx.session.user.id,
      });
    }),
  getItems: publicProcedure.query(async ({ ctx }) => {
    if (!ctx.session?.user.id) {
      return [];
    }
    const cartItems = await cartService.getCart(ctx.session.user.id);
    return cartItems;
  }),
});
