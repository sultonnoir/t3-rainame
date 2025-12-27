import { createTRPCRouter, protectedProcedure } from "../trpc";
import { validationSchema } from "./checkout-schema";
import { CheckoutService } from "./checkout-service";

const checkoutService = new CheckoutService();
export const checkoutRouter = createTRPCRouter({
  creat: protectedProcedure.mutation(async ({ ctx }) => {
    return await checkoutService.create({
      userId: ctx.session.user.id,
    });
  }),
  validation: protectedProcedure
    .input(validationSchema)
    .query(async ({ ctx, input }) => {
      return await checkoutService.validation({
        checkoutId: input.checkoutId,
        userId: ctx.session.user.id,
      });
    }),
  paid: protectedProcedure
    .input(validationSchema)
    .mutation(async ({ ctx, input }) => {
      return await checkoutService.paidCheckout({
        checkoutId: input.checkoutId,
        userId: ctx.session.user.id,
      });
    }),
  getCheckout: protectedProcedure
    .input(validationSchema)
    .query(async ({ ctx, input }) => {
      return await checkoutService.getCheckout({
        checkoutId: input.checkoutId,
        userId: ctx.session.user.id,
      });
    }),
});
