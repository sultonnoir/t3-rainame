import z from "zod";

export const createCartSchema = z.object({
  productId: z.string(),
  quantity: z.number().min(1).max(100).default(1),
  userId: z.string(),
  size: z.string().min(1).max(100).default("S"),
});

export const createCartFromUser = z.object({
  productId: z.string(),
  quantity: z.number().min(1).max(100).default(1),
  size: z.string().min(1).max(100).default("S"),
});

export const deleteCartSchema = z.object({
  cartId: z.string(),
  userId: z.string(),
});

export const removeCartSchema = z.object({
  cartId: z.string(),
});

export const getCarCount = z.object({
  userId: z.string().optional(),
});

export type DeleteCartInput = z.infer<typeof deleteCartSchema>;
export type CreateCartInput = z.infer<typeof createCartSchema>;
export type DeleteCartItemInput = z.infer<typeof getCarCount>;
export type CartLists = {
  product: {
    media: {
      url: string;
      blur: string;
    };
    stock: number;
    id: string;
    name: string;
    slug: string;
    discountedPrice: number;
    productVariant: {
      amount: number;
    }[];
  };
  quantity: number;
  id: string;
  size: string;
};
