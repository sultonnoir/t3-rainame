import { z } from "zod";

export const PaymentFormSchema = z.object({
  paymentMethod: z.enum(["credit", "debit"]),
  cardNumber: z
    .string()
    .min(16, "Card number must be 16 digits.")
    .max(16, "Card number must be 16 digits.")
    .regex(/^\d+$/, "Must contain only numbers"),
  cardHolder: z
    .string()
    .min(2, "Cardholder name must be at least 2 characters.")
    .max(50, "Cardholder name must be less than 50 characters."),
  email: z.string(),
  expiryDate: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, "Must be in MM/YY format"),
  cvv: z
    .string()
    .min(3, "CVV must be 3 or 4 digits.")
    .max(4, "CVV must be 3 or 4 digits.")
    .regex(/^\d+$/, "Must contain only numbers"),
  address: z.string().min(1, {
    message: "Please enter a valid address",
  }),
  city: z.string().min(1, {
    message: "Please enter a valid city",
  }),
  state: z.string().min(1, {
    message: "Please enter a valid state",
  }),
  zipcode: z.string().min(1, {
    message: "Please enter a valid zipcode",
  }),
  country: z.string().min(1, {
    message: "Please enter a valid country",
  }),
});

export type PaymentFormSchema = z.infer<typeof PaymentFormSchema>;
