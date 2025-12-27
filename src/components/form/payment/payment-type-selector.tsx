import { type Control } from "react-hook-form";
import { CreditCard, Wallet } from "lucide-react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { type PaymentFormSchema } from "./schema";

interface PaymentTypeSelectorProps {
  control: Control<PaymentFormSchema>;
}

export function PaymentTypeSelector({ control }: PaymentTypeSelectorProps) {
  return (
    <FormField
      control={control}
      name="paymentMethod"
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormLabel>Payment Type</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="credit" />
                <Label
                  htmlFor="credit-option"
                  className="flex items-center space-x-2"
                >
                  <CreditCard className="h-4 w-4" />
                  <span>Credit Card</span>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="debit" />
                <Label
                  htmlFor="debit-option"
                  className="flex items-center space-x-2"
                >
                  <Wallet className="h-4 w-4" />
                  <span>Debit Card</span>
                </Label>
              </div>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
