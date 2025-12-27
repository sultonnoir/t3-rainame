import z from "zod";

export const checkoutInputSchema = z.object({
  userId: z.string(),
});

export const validationSchema = z.object({
  checkoutId: z.string(),
});

export type ValidationSchema = {
  userId: string;
  checkoutId: string;
};
export type CheckoutInputSchema = z.infer<typeof checkoutInputSchema>;
export type CheckoutPageProps = {
  id: string;
  totalPrice: number;
  totalQuantity: number;
  checkoutItem: {
    product: {
      media: {
        url: string;
        blur: string;
      };
      stock: number;
      name: string;
      productVariant: {
        amount: number;
      }[];
      id: string;
      discountedPrice: number;
      slug: string;
    };
    id: string;
    quantity: number;
    size: string;
  }[];
};
