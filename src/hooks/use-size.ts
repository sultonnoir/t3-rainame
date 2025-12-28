import type { ProductVariant } from "generated/prisma";
import { create } from "zustand";

interface SizesStore {
  sizes: ProductVariant | undefined;
  setSizes: (values: ProductVariant | undefined) => void;
}

export const useSizes = create<SizesStore>((set) => ({
  sizes: undefined,
  setSizes: (values: ProductVariant | undefined) => set({ sizes: values }),
}));
