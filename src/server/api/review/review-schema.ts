import z from "zod";

export const reviewInputSchema = z.object({
  productId: z.string(),
});

export type ReviewInputSchema = z.infer<typeof reviewInputSchema>;
