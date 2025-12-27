import { type Control } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { formatCardNumber, formatExpiryDate } from "@/lib/utils";
import { type PaymentFormSchema } from "./schema";

interface CardDetailsFieldsProps {
  control: Control<PaymentFormSchema>;
}

export function CardDetailsFields({ control }: CardDetailsFieldsProps) {
  return (
    <>
      <FormField
        control={control}
        name="cardNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Card Number</FormLabel>
            <FormControl>
              <Input
                placeholder="1234 5678 9012 3456"
                {...field}
                onChange={(e) => {
                  field.onChange(formatCardNumber(e.target.value));
                }}
                maxLength={19}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="cardHolder"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Cardholder Name</FormLabel>
            <FormControl>
              <Input
                placeholder="John Doe"
                {...field}
                onChange={(e) => {
                  field.onChange(e.target.value);
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input
                placeholder="Example@mail.com"
                {...field}
                onChange={(e) => {
                  field.onChange(e.target.value);
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={control}
          name="expiryDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Expiry Date</FormLabel>
              <FormControl>
                <Input
                  placeholder="MM/YY"
                  {...field}
                  onChange={(e) => {
                    field.onChange(formatExpiryDate(e.target.value));
                  }}
                  maxLength={5}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="cvv"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CVV</FormLabel>
              <FormControl>
                <Input
                  placeholder="123"
                  type="password"
                  {...field}
                  maxLength={4}
                  onChange={(e) => {
                    field.onChange(e.target.value.replace(/\D/g, ""));
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  );
}
